"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CTAButton } from "./Button";

interface HeaderProps {
  isAuth?: boolean;
  user?: { name: string; avatarUrl?: string };
}

export function Header({ isAuth = false, user }: HeaderProps) {
  return (
    <header className="w-full bg-grey-100 border-b border-grey-200">
      <div className="mx-auto flex h-27 max-w-391.5 items-center justify-between px-4 lg:px-44.25">
        {/* Logo — purple rounded square icon only */}
        <Link href="/" className="shrink-0">
          <LogoIcon />
        </Link>

        {/* Right side nav */}
        <div className="flex items-center gap-6">
          <NavLink href="/courses" icon="sparkle">
            Browse Courses
          </NavLink>

          {isAuth ? (
            <>
              <NavLink href="/enrolled" icon="book">
                Enrolled Courses
              </NavLink>
              <UserAvatar user={user} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <CTAButton className="w-28.5 h-15" variant="outline">
                  Log In
                </CTAButton>
              </Link>
              <Link href="/register">
                <CTAButton className="w-31.25 h-15" variant="primary">
                  Sign Up
                </CTAButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: "sparkle" | "book";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 text-[14px] font-medium transition-colors",
        isActive ? "text-purple-500" : "text-grey-700 hover:text-purple-500",
      )}
    >
      {icon === "sparkle" ? <SparkleIcon /> : <BookIcon />}
      {children}
    </Link>
  );
}

function UserAvatar({ user }: { user?: { name: string; avatarUrl?: string } }) {
  return (
    <Link
      href="/profile"
      className="relative flex shrink-0 items-center justify-center"
    >
      {/* Person icon circle */}
      <div className="flex size-9 items-center justify-center rounded-full border border-grey-200 bg-white text-grey-500 hover:border-purple-300 transition-colors">
        <PersonIcon />
      </div>
      {/* Orange status dot */}
      <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#f4a316] ring-2 ring-grey-100" />
    </Link>
  );
}

/* ── Icons ── */
function LogoIcon() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M5 15.5c4.5-4.6 8-8 10.5-10.2.8-.7 2-.6 2.6.1.7.8.6 2-.2 2.6C15.5 10.2 12 13.5 7.5 18L5 18.5l.5-3Z"
          fill="white"
        />
        <path
          d="M10.5 14 13 16.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M7 1l1.2 3.8L12 7l-3.8 1.2L7 12l-1.2-3.8L2 7l3.8-1.2L7 1Z"
        stroke="#4f46e5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="1.5"
        y="1.5"
        width="11"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 4.5h6M4 7h6M4 9.5h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
