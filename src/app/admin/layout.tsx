"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Layers,
  Home,
  FolderOpen,
  BookOpen,
  Video,
  Search,
  Users,
  FileSpreadsheet,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/admin/auth/me")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Unauthenticated");
        })
        .then((data) => {
          if (data.success) setUser(data.user);
        })
        .catch(() => {
          router.push(`/admin/login?redirect=${pathname}`);
        });
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navSections = [
    {
      group: "Core",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      group: "Website CMS",
      items: [
        { label: "Global Settings", href: "/admin/settings", icon: Globe },
        { label: "Pages", href: "/admin/pages", icon: FileText },
        { label: "Sections", href: "/admin/sections", icon: Layers },
      ],
    },
    {
      group: "Catalog",
      items: [
        { label: "Products / Models", href: "/admin/products", icon: Home },
        { label: "Collections", href: "/admin/collections", icon: FolderOpen },
      ],
    },
    {
      group: "Content & Media",
      items: [
        { label: "Blogs & Guides", href: "/admin/blogs", icon: BookOpen },
        { label: "Video Manager", href: "/admin/videos", icon: Video },
      ],
    },
    {
      group: "Phase 3 Pipeline",
      items: [
        { label: "Leads & Inquiries", href: "/admin/leads", icon: Users },
        { label: "Quotations", href: "/admin/quotations", icon: FileSpreadsheet },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f7] flex text-[#101114]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111317] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e20b16] flex items-center justify-center font-bold text-white text-sm shadow-sm">
              M
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm text-white block">
                ModularHome
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block -mt-0.5">
                Admin CMS v1.0
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((group) => (
            <div key={group.group}>
              <div className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#e20b16] text-white shadow-sm"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Admin Info & Logout */}
        <div className="p-3 border-t border-white/10 bg-[#0c0d10]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="min-w-0 flex-1 pr-2">
              <div className="text-xs font-bold text-white truncate">
                {user?.name || "Administrator"}
              </div>
              <div className="text-[10px] text-gray-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span>{user?.role || "ADMIN"}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Bar */}
        <header className="h-16 bg-white border-b border-[#e5e7eb] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold text-gray-500 hidden sm:block">
              Environment: <span className="text-emerald-600 font-bold">Phase 1 Database-Backed</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
