import { connection } from "next/server";
import { verifyAdminRole } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  CreditCard,
  ShieldAlert,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Admin Workspace | Unisex Fitness",
  description: "Administrative console for Unisex Fitness plans, members, and transactions.",
};

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/plans", label: "Plans Manager", icon: Dumbbell },
  { href: "/admin/members", label: "Member Directory", icon: Users },
  { href: "/admin/payments", label: "Transactions", icon: CreditCard },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const auth = await verifyAdminRole();

  if (!auth.isAdmin) {
    if (auth.reason === "unauthenticated") {
      redirect("/sign-in");
    }

    // 403 Access Denied State (User is logged in but lacks admin role)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-red-700/60 bg-[#141414] p-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-600 flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl text-white tracking-wide">
              403 • ACCESS DENIED
            </h1>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              Your account (<span className="text-white font-mono">{auth.email}</span>) does not possess verified administrator privileges.
            </p>
          </div>
          <div className="p-4 bg-black border border-[#2B2B2B] text-[11px] text-[#888888] text-left">
            Administrator roles cannot be self-assigned. An authorized owner must provision access via the database procedure documented in{" "}
            <code className="text-white">supabase/migrations/</code>.
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/member"
              className="px-4 py-2.5 bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-[#BDBDBD] transition-colors"
            >
              Return to Member Portal
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-xs text-[#888888] hover:text-white transition-colors"
            >
              Public Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#343434] bg-[#121212] shrink-0 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Brand & Badge */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/brand/logo.jpg"
                alt="Unisex Fitness"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="font-display text-lg tracking-widest text-white">
                UNISEX FITNESS
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white text-black text-[10px] font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3 h-3" />
              ADMIN CONSOLE
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-[#BDBDBD] hover:text-white hover:bg-[#1A1A1A] transition-colors rounded"
                >
                  <Icon className="w-4 h-4 text-[#888888]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#262626] space-y-3 mt-8 md:mt-0">
          <div className="text-[11px] text-[#707070] font-mono truncate">
            User: {auth.email}
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#888888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
