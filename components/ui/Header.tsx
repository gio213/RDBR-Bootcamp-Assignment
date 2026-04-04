"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CTAButton } from "./Button";
import { BookIcon, LogoIcon, PersonIcon, SparkleIcon } from "@/helper/Icon";

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
