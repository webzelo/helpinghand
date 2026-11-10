import { CalendarDays, HandHeart, Shield, Sprout } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Future dates only",
    description:
      "A crew that already happened never sits on the public board. The date has to be ahead of today.",
  },
  {
    icon: HandHeart,
    title: "Join with a role",
    description:
      "Show up as setup, greeter, heavy lift, documentation, or first aid so the host knows who is carrying what.",
  },
  {
    icon: Shield,
    title: "Hosts keep the pen",
    description:
      "You can edit or delete only the events you created. Someone else's plantation drive stays theirs.",
  },
  {
    icon: Sprout,
    title: "Local on purpose",
    description:
      "Clean a ghat, plant a ridge, pack parcels, or sit with readers. The work is the neighborhood, not a feed.",
  },
];

export function BoardFeatures() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-14 sm:px-6 lg:pb-24 lg:pt-16">
        <h2 className="font-heading text-[clamp(2rem,3vw,2.6rem)] leading-none tracking-[-0.01em] text-ink">
          What the board is for
        </h2>
        <p className="mt-4 max-w-[540px] text-sm leading-6 text-ink-muted">
          A short list of things Helping Hand actually does, instead of a
          slogan pile.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-line bg-surface p-6 lg:min-h-[230px]"
              >
                <Icon
                  className="size-5 text-brand-green"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-base font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-ink-muted">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
