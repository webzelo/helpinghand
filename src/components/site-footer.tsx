"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const baseFooterColumns = [
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
];

export function SiteFooter() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const footerColumns = [
    ...baseFooterColumns,
    {
      title: "Account",
      links: user
        ? [
            { label: "Profile", href: "/profile" },
            { label: "Logout", href: "/logout" },
          ]
        : [
            { label: "Login", href: "/login" },
            { label: "SignUp", href: "/signup" },
          ],
    },
  ];

  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Helping Hand home"
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-green font-heading text-xl leading-none text-brand-green-foreground">
                H
              </span>
              <span className="font-heading text-[26px] leading-none tracking-tight text-ink">
                Helping Hand
              </span>
            </Link>
            <p className="mt-4 max-w-[290px] text-sm leading-6 text-ink-muted">
              A board for the work that makes a neighborhood feel like one.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Find a crew
              <ArrowUpRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© Helping Hand. Built for the neighborhood.</p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-ink-soft"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-ink-soft"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
