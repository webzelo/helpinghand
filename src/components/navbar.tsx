
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";

const navLinks = [
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/events/joined", label: "Joined Events" },
];

const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "SignUp" },
];

const profileLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/events/joined", label: "Joined Events" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-6">
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

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium transition-colors hover:text-ink",
                index === 0
                  ? "text-ink"
                  : "text-ink-muted"
              )}
            >
              {link.label}
            </Link>
          ))}

          <span
            className="h-4 w-px bg-line"
            aria-hidden="true"
          />

          {user ? (
            <Popover>
              <PopoverTrigger
                openOnHover
                delay={100}
                closeDelay={150}
                nativeButton={false}
                render={
                  <Link
                    href="/profile"
                    aria-label="Your profile"
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <Avatar>
                      <AvatarImage src={user?.image ?? undefined} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                }
              />

              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>
                    {user?.name}
                  </PopoverTitle>

                  <PopoverDescription>
                    {user?.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="flex flex-col gap-0.5 border-t border-line pt-2">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                >
                  LogOut
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="hidden size-9 cursor-pointer place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/20 hover:bg-ink/5 sm:grid"
          >
            <Sun
              className="hidden size-[17px] dark:block"
              strokeWidth={1.6}
            />
            <Moon
              className="size-[17px] dark:hidden"
              strokeWidth={1.6}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/20 hover:bg-ink/5 lg:hidden"
          >
            {menuOpen ? (
              <X
                className="size-[18px]"
                strokeWidth={1.6}
              />
            ) : (
              <Menu
                className="size-[18px]"
                strokeWidth={1.6}
              />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-page px-5 pb-5 pt-3 lg:hidden"
        >
          <nav
            className="flex flex-col"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex gap-6 border-t border-line pt-3">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="py-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="cursor-pointer py-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
