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
    <div className="bg-white py-8 px-6 sm:px-10 shadow-[0_12px_35px_rgba(16,24,40,0.08)] rounded-[18px] border border-[#e7e9ee]">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-[#d97706] text-xs animate-in fade-in font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-[#101114] uppercase tracking-wider mb-2">
            Administrator Email
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@modularhome.com"
              className="block w-full pl-10 pr-4 py-3 bg-[#f6f7f9] border border-[#d5d9e0] rounded-xl text-[#101114] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcb907] focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-[#101114] uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="block w-full pl-10 pr-4 py-3 bg-[#f6f7f9] border border-[#d5d9e0] rounded-xl text-[#101114] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcb907] focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-sm text-sm font-black text-[#101114] bg-[#fcb907] hover:bg-[#e5a706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fcb907] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
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

      <div className="mt-6 pt-6 border-t border-[#e7e9ee] text-center">
        <p className="text-xs text-[#6b7280]">
          Development Credentials:
        </p>
        <p className="text-xs text-[#101114] font-mono mt-1.5 bg-[#f6f7f9] py-1.5 px-3 rounded-lg inline-block border border-[#e7e9ee] font-bold">
          admin@modularhome.com / Admin@ModularHome2026!
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#fcb907] selection:text-[#101114]">
      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#d97706] via-[#fcb907] to-[#b45309]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
          <div className="bg-white border border-[#e7e9ee] p-2.5 rounded-2xl inline-flex items-center gap-3 shadow-[0_12px_35px_rgba(16,24,40,0.06)]">
            <Image
              src="/finallogo.avif"
              alt="ModularHome Logo"
              width={160}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain"
              priority
            />
          </div>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#d97706] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure Admin Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101114] font-serif">
          Sign In to Management
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#6b7280]">
          ModularHome CMS & Production Backend Control
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<div className="text-[#101114] text-center py-8 font-medium">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
