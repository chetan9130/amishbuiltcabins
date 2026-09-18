import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { convexQuery, convexMutation, api } from "./convex";

const COOKIE_NAME = "admin_session";
const SESSION_EXPIRY_DAYS = 7;

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}

export async function verifyPassword(plainText: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashed);
}

export interface AdminSessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// In-memory session store fallback if Convex is offline during dev/build
const memorySessions = new Map<
  string,
  { user: AdminSessionUser; expiresAt: number }
>();

export async function createAdminSession(userId: string, userFallback?: AdminSessionUser): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  try {
    await convexMutation(api.auth.createSession, {
      userId: userId as any,
      sessionToken,
      expiresAt,
    });
  } catch (e) {
    console.warn("Could not persist session to Convex, falling back to memory:", e);
  }

  if (userFallback) {
    memorySessions.set(sessionToken, { user: userFallback, expiresAt });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return sessionToken;
}

export async function getAdminSession(): Promise<AdminSessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    // Check memory store first for rapid response / offline fallback
    const mem = memorySessions.get(token);
    if (mem) {
      if (Date.now() > mem.expiresAt) {
        memorySessions.delete(token);
        return null;
      }
      return mem.user;
    }

    const sessionData = await convexQuery<any>(api.auth.getSession, {
      sessionToken: token,
    });

    if (sessionData && sessionData.user) {
      return {
        id: sessionData.user.id || sessionData.user._id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        role: sessionData.user.role,
      };
    }

    return null;
  } catch (error) {
    console.error("Error retrieving admin session:", error);
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {
      memorySessions.delete(token);
      try {
        await convexMutation(api.auth.deleteSession, { sessionToken: token });
      } catch {}
    }

    cookieStore.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });
  } catch (error) {
    console.error("Error destroying admin session:", error);
  }
}

export async function requireAdminAuth(): Promise<{ user: AdminSessionUser } | NextResponse> {
  const user = await getAdminSession();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Unauthorized. Authentication required for admin operations.",
          code: "UNAUTHORIZED",
        },
      },
      { status: 401 }
    );
  }

  return { user };
}
