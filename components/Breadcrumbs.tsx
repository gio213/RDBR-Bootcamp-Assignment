"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronIcon } from "@/helper/Icon";

// route segment → readable label mapping
const ROUTE_LABELS: Record<string, string> = {
  courses: "Browse",
  enrolled: "Enrolled Courses",
  profile: "Profile",
};

interface BreadcrumbsProps {
  // dynamic segment-ებისთვის — მაგ. course title-ი id-ის მაგივრად
  overrides?: Record<string, string>;
  className?: string;
}

export function Breadcrumbs({ overrides = {}, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  // "/courses/123" → ["courses", "123"]
  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    // override გაქვს? (მაგ. course title id-ის მაგივრად)
    // თუ არა — ROUTE_LABELS-ში ვეძებთ, თუ არა — segment-ს ვაჩვენებთ
    const label = overrides[segment] ?? ROUTE_LABELS[segment] ?? segment;

    return { label, href: isLast ? undefined : href };
  });

  // Home ყოველთვის პირველია
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-0.5">
        {allItems.map((item, i) => {
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronIcon />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-1 py-0.5 text-[18px] font-medium leading-5.5 text-grey-500 transition-colors hover:text-grey-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="px-1 py-0.5 text-[18px] font-medium leading-5.5 text-purple-500"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
