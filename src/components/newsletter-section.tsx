"use client";

import * as React from "react";
import { Check, Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  }

  return (
    <section id="newsletter" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-green/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-brand-fill/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Stay in the loop
              </p>
              <h2 className="mt-4 max-w-[520px] font-heading text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.01em] text-ink">
                One email, only when the board needs hands.
              </h2>
              <p className="mt-4 max-w-[480px] text-sm leading-6 text-ink-muted">
                New crews, changed dates, and the occasional story from the
                neighborhood. No noise between them.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex items-center gap-2 rounded-full border border-line bg-page p-1.5 pl-4 transition-colors focus-within:border-brand-green/40">
                  <Mail
                    className="size-4 shrink-0 text-ink-muted"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSubscribed(false);
                    }}
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                  />
                  <button
                    type="submit"
                    className="h-10 shrink-0 cursor-pointer rounded-full bg-brand-fill px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-fill-hover"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <div className="mt-3 min-h-5" aria-live="polite">
                {subscribed ? (
                  <p className="flex items-center gap-1.5 text-xs text-brand-green">
                    <Check className="size-3.5" strokeWidth={2} />
                    You are on the list. We will be in touch.
                  </p>
                ) : (
                  <p className="text-xs text-ink-muted">
                    No spam. Unsubscribe whenever you want.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
