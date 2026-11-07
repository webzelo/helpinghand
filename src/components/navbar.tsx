"use client"

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/events/joined", label: "Joined Events" },
];

const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "SignUp" },
  { href: "/logout", label: "Logout" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);

  function toggleTheme() {
    setIsDark((current) => !current);
  }

  const {data: session} = authClient.useSession() 
  const user = session?.user 

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#1a1b18]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-6">
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

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium transition-colors hover:text-[#f4f4ec]",
                index === 0 ? "text-[#f4f4ec]" : "text-[#a8a99f]"
              )}
            >
              {link.label}
            </Link>
          ))}

          <span className="h-4 w-px bg-white/10" aria-hidden="true" />

          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#a8a99f] transition-colors hover:text-[#f4f4ec]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Avatar>
        <AvatarImage src={user?.image as string} />
        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
            className="hidden size-9 cursor-pointer place-items-center rounded-full border border-white/10 text-[#d7d8cf] transition-colors hover:border-white/20 hover:bg-white/5 sm:grid"
          >
            {isDark ? (
              <Sun className="size-[17px]" strokeWidth={1.6} />
            ) : (
              <Moon className="size-[17px]" strokeWidth={1.6} />
            )}
          </button>

          <Link
            href="/profile"
            aria-label="Your profile"
            className="grid size-9 place-items-center rounded-full bg-[#2b3325] text-sm font-medium text-[#dce7cf] ring-1 ring-white/5 transition-colors hover:bg-[#343e2c]"
          >
            G
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/10 text-[#d7d8cf] transition-colors hover:border-white/20 hover:bg-white/5 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-[18px]" strokeWidth={1.6} />
            ) : (
              <Menu className="size-[18px]" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-white/[0.07] bg-[#1a1b18] px-5 pb-5 pt-3 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#d7d8cf] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex gap-6 border-t border-white/[0.07] pt-3">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-medium text-[#a8a99f] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
