import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Open crews", value: "8" },
  { label: "Seats taken", value: "0" },
  { label: "Places", value: "8" },
];

export function Banner() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_0%,var(--line),transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <p className="text-sm font-semibold text-brand">
            Community service, posted by neighbors
          </p>

          <h1 className="mt-5 max-w-[560px] font-heading text-[clamp(2.5rem,5vw,4.15rem)] leading-[0.98] tracking-[-0.02em] text-ink">
            Show up for the
            <br className="hidden sm:block" /> street you live on.
          </h1>

          <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-ink-muted">
            Helping Hand is where people post cleanups, plantation drives,
            donation tables, and classrooms that need one more adult in the
            room. The board only keeps what is still ahead.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-fill-hover"
            >
              See upcoming events
            </Link>
            <Link
              href="/events/create"
              className="inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Host a crew
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-line bg-surface px-4 py-3.5"
              >
                <dt className="text-[11px] leading-none text-ink-muted">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold leading-none text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="relative row-span-2 min-h-[330px] overflow-hidden rounded-2xl sm:min-h-[430px]">
            <Image
              src="/images/community-bins.jpg"
              alt="A row of colorful community recycling bins"
              fill
              priority
              sizes="(max-width: 1024px) 45vw, 260px"
              className="object-cover"
            />
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/soil-scoop.jpg"
              alt="A scoop of fresh soil beside a small seedling pot"
              fill
              sizes="(max-width: 1024px) 45vw, 260px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-brand-green p-5 text-brand-green-foreground">
            <h2 className="font-heading text-[clamp(1.3rem,1.6vw,1.55rem)] leading-[1.06]">
              No past dates. No empty promises.
            </h2>
            <p className="mt-3 text-[12.5px] leading-5 text-brand-green-foreground/80">
              If the day has passed, it leaves the board.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
