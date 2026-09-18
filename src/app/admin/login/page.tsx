"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("admin@modularhome.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error?.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#14161c] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-white/10 backdrop-blur-xl">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Administrator Email
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@modularhome.com"
              className="block w-full pl-10 pr-4 py-3 bg-[#0d0e12] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e20b16] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="block w-full pl-10 pr-4 py-3 bg-[#0d0e12] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e20b16] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#e20b16] hover:bg-[#c50812] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e20b16] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-gray-400">
          Default Development Credentials:
        </p>
        <p className="text-xs text-gray-300 font-mono mt-1 bg-black/40 py-1 px-2 rounded-md inline-block border border-white/5">
          admin@modularhome.com / Admin@ModularHome2026!
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0d0e12] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#e20b16] selection:text-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
          <div className="bg-white/10 border border-white/20 p-3 rounded-2xl inline-flex items-center gap-3 backdrop-blur-md">
            <Image
              src="/newlogo2.png"
              alt="ModularHome Logo"
              width={160}
              height={36}
              className="h-7 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure Admin Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
          Sign In to Management
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-400">
          ModularHome CMS & Production Backend Control
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<div className="text-white text-center py-8">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
