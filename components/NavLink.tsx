"use client";

import type { ReactNode } from "react";
import { BookIcon, SparkleIcon } from "@/helper/Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  icon: "sparkle" | "book";
  children: ReactNode;
  onClick?: () => void;
  activeOverride?: boolean;
}

function NavLink({
  href,
  icon,
  children,
  onClick,
  activeOverride,
}: NavLinkProps) {
  const pathname = usePathname();
  const pathIsActive = pathname === href || pathname.startsWith(href + "/");
  const isActive = activeOverride ?? pathIsActive;

  const className = cn(
    "flex items-center gap-1.5 text-[14px] font-medium transition-colors",
    isActive ? "text-purple-500" : "text-grey-700 hover:text-purple-500",
  );

  const content = (
    <>
      {icon === "sparkle" ? <SparkleIcon /> : <BookIcon />}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default NavLink;
