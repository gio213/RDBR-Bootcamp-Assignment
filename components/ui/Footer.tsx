import Link from "next/link";

// Figma: bg grey-100 (#f5f5f5), height 334px, px-177px (1920px frame)
export function Footer() {
  return (
    <footer className="w-full bg-grey-100 border-t border-grey-200">
      <div className="mx-auto max-w-[1566px] px-4 lg:px-[177px] py-[60px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[280px]">
            <Link href="/" className="w-fit">
              <FooterLogo />
            </Link>
            <p className="text-[14px] text-grey-500 leading-[1.6]">
              Redberry Bootcamp — hands-on courses to kickstart your tech career.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <FooterLinkGroup
              title="Platform"
              links={[
                { label: "Courses", href: "/courses" },
                { label: "Dashboard", href: "/" },
              ]}
            />
            <FooterLinkGroup
              title="Company"
              links={[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ]}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-grey-200 pt-8">
          <p className="text-[12px] text-grey-400">
            © {new Date().getFullYear()} Redberry. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[12px] text-grey-400 hover:text-purple-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[12px] text-grey-400 hover:text-purple-500 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] font-semibold uppercase tracking-widest text-grey-400">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-grey-700 hover:text-purple-500 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLogo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-label="Redberry">
      <rect width="32" height="32" rx="8" fill="#4f46e5" />
      <path
        d="M9 22.5c6.5-6.7 11.5-11.5 15-14.7 1.1-1 2.8-.9 3.8.2s.8 2.8-.3 3.8c-3.4 3.1-8.3 7.9-14.7 14.4L8.5 27 9 22.5Z"
        fill="white"
      />
      <text x="40" y="22" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="600" fill="#141414">
        redberry
      </text>
    </svg>
  );
}
