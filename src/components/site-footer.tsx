import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Upcoming Events", href: "/events" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Newsletter", href: "/#newsletter" },
    ],
  },
  {
    title: "Host",
    links: [
      { label: "Create Event", href: "/events/create" },
      { label: "Manage Events", href: "/events/manage" },
      { label: "Joined Events", href: "/events/joined" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Logout", href: "/logout" },
      { label: "Profile", href: "/profile" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#1a1b18]">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Helping Hand home"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#c8d9b5] font-heading text-xl leading-none text-[#1b2415]">
                H
              </span>
              <span className="font-heading text-[26px] leading-none tracking-tight text-[#f4f4ec]">
                Helping Hand
              </span>
            </Link>
            <p className="mt-4 max-w-[290px] text-sm leading-6 text-[#a4a59c]">
              A board for the work that makes a neighborhood feel like one.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#d7d8cf] transition-colors hover:text-white"
            >
              Find a crew
              <ArrowUpRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f9187]">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#d7d8cf] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-[#8f9187] sm:flex-row sm:items-center sm:justify-between">
          <p>© Helping Hand. Built for the neighborhood.</p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#d7d8cf]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#d7d8cf]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
