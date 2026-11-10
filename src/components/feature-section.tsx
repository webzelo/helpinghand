import { ArrowUpRight, CalendarPlus, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";

const featurePoints = [
  {
    icon: CalendarPlus,
    title: "Post a crew in minutes",
    description:
      "Set the date, place, roles, and how many hands you need. No forms that feel like paperwork.",
  },
  {
    icon: UsersRound,
    title: "Let neighbors pick a role",
    description:
      "Setup, greeter, heavy lift, documentation, or first aid — everyone knows what they are carrying.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the board honest",
    description:
      "Only future events stay up, and only the host can edit their own crew.",
  },
];

const roles = ["Setup", "Heavy lift", "Greeter"];

export function FeatureSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              The board, up close
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              Built for the people who show up.
            </h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-ink-muted">
              Every crew needs a few good hands and one place to point them.
              Helping Hand keeps the details clear, the roles open, and the
              dates honest.
            </p>

            <ul className="mt-9 space-y-5">
              {featurePoints.map((point) => {
                const Icon = point.icon;

                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-brand-green/10 text-brand-green">
                      <Icon
                        className="size-[18px]"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-1 max-w-[420px] text-sm leading-6 text-ink-muted">
                        {point.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(200,217,181,0.12),transparent_60%)]"
            />

            <article className="relative rounded-3xl border border-line bg-surface p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-brand-fill/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                  Sat, 14 Nov
                </span>
                <span className="text-xs font-medium text-brand-green">
                  8 spots left
                </span>
              </div>

              <h3 className="mt-5 font-heading text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.08] text-ink">
                Lake clean-up at Gulshan
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                We are clearing the east bank before the weekend rush. Bring
                gloves — we have the bags, grabbers, and chai.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                <MapPin
                  className="size-3.5 text-brand-green"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                East bank, Gulshan Lake
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-ink-soft"
                  >
                    {role}
                  </span>
                ))}
                <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-ink-muted">
                  +2 more
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-full bg-brand-green/15 text-xs font-medium text-brand-green">
                    N
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-medium text-ink">
                      Nusrat J.
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink-muted">
                      Hosting this crew
                    </p>
                  </div>
                </div>

                <Link
                  href="/events"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-fill px-4 text-xs font-semibold text-brand-foreground transition-colors hover:bg-brand-fill-hover"
                >
                  Join crew
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </Link>
              </div>
            </article>

            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-line bg-brand-green px-4 py-3 text-brand-green-foreground shadow-xl sm:flex">
              <UsersRound className="size-5" strokeWidth={1.7} />
              <div className="leading-tight">
                <p className="text-sm font-semibold">32 neighbors</p>
                <p className="text-[10px] text-brand-green-foreground/80">showed up last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
