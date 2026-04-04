import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-grey-100 border-t border-grey-200">
      <div className="mx-auto max-w-[1566px] px-4 lg:px-[177px] py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-[240px]">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <LogoIcon />
              <span className="text-[18px] font-semibold text-grey-900">Bootcamp</span>
            </Link>
            <p className="text-[13px] text-grey-500 leading-[1.6]">
              Your learning journey starts here!<br />
              Browse courses to get started.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <SocialLink href="#" label="Facebook"><FacebookIcon /></SocialLink>
              <SocialLink href="#" label="Twitter"><TwitterIcon /></SocialLink>
              <SocialLink href="#" label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href="#" label="LinkedIn"><LinkedInIcon /></SocialLink>
              <SocialLink href="#" label="YouTube"><YouTubeIcon /></SocialLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-10 lg:gap-16">
            <FooterLinkGroup
              title="Explore"
              links={[
                { label: "Enrolled Courses", href: "/enrolled" },
                { label: "Browse Courses", href: "/courses" },
              ]}
            />
            <FooterLinkGroup
              title="Account"
              links={[
                { label: "My Profile", href: "/profile" },
              ]}
            />
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-semibold text-grey-900">Contact</p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-[13px] text-grey-500">
                  <MailIcon /> contact@company.com
                </li>
                <li className="flex items-center gap-2 text-[13px] text-grey-500">
                  <PhoneIcon /> (+995) 555 111 222
                </li>
                <li className="flex items-center gap-2 text-[13px] text-grey-500">
                  <PinIcon /> Aghmashenbeli St.115
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-grey-200 pt-6">
          <p className="text-[12px] text-grey-400">
            Copyright © 2026 Redberry International
          </p>
          <div className="flex items-center gap-2 text-[12px] text-grey-400">
            <span>All Rights Reserved</span>
            <span>|</span>
            <Link href="/terms" className="hover:text-purple-500 transition-colors">Terms and Conditions</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[13px] font-semibold text-grey-900">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[13px] text-grey-500 hover:text-purple-500 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} className="text-grey-400 hover:text-purple-500 transition-colors">
      {children}
    </a>
  );
}

/* ── Logo ── */
function LogoIcon() {
  return (
    <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500 shrink-0">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 13.5c4-4.2 7.2-7.2 9.5-9.2.7-.6 1.8-.5 2.4.2.6.7.5 1.8-.2 2.4C13.5 8.8 10.3 11.7 6 16L4 16.5l.5-3Z" fill="white" />
        <path d="M9.5 12.5 12 15" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Social Icons ── */
function FacebookIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9 6H11V8H9V14H7V8H5V6H7V5C7 3.34 7.34 2 9 2H11V4H9.5C9.22 4 9 4.22 9 4.5V6Z" /></svg>;
}
function TwitterIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 3a6.46 6.46 0 01-1.65.45 2.85 2.85 0 001.26-1.58c-.55.33-1.16.57-1.8.7A2.84 2.84 0 008.46 2C6.93 2 5.7 3.23 5.7 4.76c0 .22.03.44.07.65A8.07 8.07 0 012 3.18a2.76 2.76 0 00-.38 1.4c0 .98.5 1.85 1.26 2.36a2.8 2.8 0 01-1.29-.35v.03c0 1.38.98 2.53 2.28 2.79-.24.06-.49.1-.75.1-.18 0-.36-.02-.53-.05.36 1.12 1.4 1.93 2.63 1.96A5.7 5.7 0 012 12.6a8.07 8.07 0 004.37 1.28c5.24 0 8.1-4.34 8.1-8.1 0-.12 0-.24-.01-.36A5.8 5.8 0 0016 3.54a5.66 5.66 0 01-2.5.66V3Z" /></svg>;
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2" width="12" height="12" rx="3.5" /><circle cx="8" cy="8" r="3" /><circle cx="11.5" cy="4.5" r="0.7" fill="currentColor" stroke="none" /></svg>;
}
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 5h2v8h-2V5Zm1-3a1.25 1.25 0 110 2.5A1.25 1.25 0 014.5 2ZM6.5 5h1.9v1.1h.02C8.8 5.5 9.7 5 11 5c2.1 0 2.5 1.4 2.5 3.2V13h-2V8.6c0-.75 0-1.72-1.05-1.72S9 7.76 9 8.55V13H6.5V5Z" /></svg>;
}
function YouTubeIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.5 4.5S14.3 3.3 13.7 2.7c-.7-.7-1.4-.7-1.75-.75C9.75 1.75 8 1.75 8 1.75s-1.75 0-3.95.2C3.7 2 3 2 2.3 2.7 1.7 3.3 1.5 4.5 1.5 4.5S1.25 5.9 1.25 7.3v1.3c0 1.4.25 2.7.25 2.7s.2 1.2.8 1.8c.7.7 1.6.68 2 .75C5.5 14 8 14 8 14s1.75 0 3.95-.2c.35-.07 1.05-.07 1.75-.77.6-.6.8-1.8.8-1.8s.25-1.3.25-2.7V7.3c0-1.4-.25-2.8-.25-2.8ZM6.5 10V6l4 2-4 2Z" /></svg>;
}

/* ── Contact Icons ── */
function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M4.5 1.5h-2A1 1 0 001.5 2.5C1.5 8.5 5.5 12.5 11.5 12.5a1 1 0 001-1v-2a1 1 0 00-1-1l-1.5-.5a1 1 0 00-1 .25l-.5.5a6.5 6.5 0 01-3-3l.5-.5a1 1 0 00.25-1L5.5 2.5a1 1 0 00-1-1Z" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
function PinIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M7 1.5a4 4 0 014 4c0 3-4 7-4 7S3 8.5 3 5.5a4 4 0 014-4Z" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" /></svg>;
}
