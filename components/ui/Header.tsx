"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CTAButton } from "./Button";

interface HeaderProps {
  isAuth?: boolean;
  user?: { name: string; avatarUrl?: string };
}

// Figma: bg grey-100 (#f5f5f5), border-b grey-200, height 108px, px-177px (1920px frame)
export function Header({ isAuth = false, user }: HeaderProps) {
  return (
    <header className="w-full bg-grey-100 border-b border-grey-200">
      <div className="mx-auto flex h-27 max-w-391.5 items-center justify-between px-4 lg:px-44.25">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <RedberryLogo />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/courses">Courses</NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuth ? <AuthControls user={user} /> : <GuestControls />}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "text-[16px] font-medium transition-colors",
        isActive ? "text-purple-500" : "text-grey-700 hover:text-purple-500",
      )}
    >
      {children}
    </Link>
  );
}

function GuestControls() {
  return (
    <>
      <Link href="/login">
        <CTAButton className="w-28.5" variant="ghost">
          Sign In
        </CTAButton>
      </Link>
      <Link href="/register">
        <CTAButton className="w-31.25" variant="primary">
          Sign Up
        </CTAButton>
      </Link>
    </>
  );
}

function AuthControls({
  user,
}: {
  user?: { name: string; avatarUrl?: string };
}) {
  return (
    <Link href="/profile" className="flex items-center gap-2 group">
      <div className="flex size-10 items-center justify-center rounded-full bg-purple-500 text-white text-[14px] font-semibold uppercase shrink-0">
        {user?.name?.charAt(0) ?? "U"}
      </div>
      <span className="hidden lg:block text-[14px] font-medium text-grey-700 group-hover:text-purple-500 transition-colors">
        {user?.name ?? "Profile"}
      </span>
    </Link>
  );
}

// Redberry wordmark
function RedberryLogo() {
  return (
    <svg
      width="120"
      height="32"
      viewBox="0 0 120 32"
      fill="none"
      aria-label="Redberry"
    >
      <rect width="32" height="32" rx="8" fill="#4f46e5" />
      <path
        d="M9 22.5c6.5-6.7 11.5-11.5 15-14.7 1.1-1 2.8-.9 3.8.2s.8 2.8-.3 3.8c-3.4 3.1-8.3 7.9-14.7 14.4L8.5 27 9 22.5Z"
        fill="white"
      />
      <text
        x="40"
        y="22"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="#141414"
      >
        redberry
      </text>
    </svg>
  );
}
