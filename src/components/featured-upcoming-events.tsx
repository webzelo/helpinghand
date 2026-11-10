import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EVENTS_API, formatEventDate, type Event } from "@/lib/events";

export default async function FeaturedUpcomingEvents() {
  let events: Event[] = [];

  try {
    const res = await fetch(`${EVENTS_API}/featured-upcoming-events`, {
      cache: "no-store",
    });

    if (res.ok) {
      events = (await res.json()) as Event[];
    }
  } catch {
    // The home page still works when the events API is offline.
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Featured
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,3vw,2.6rem)] leading-none tracking-[-0.01em] text-ink">
            Upcoming events
          </h2>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          See all events
          <ArrowUpRight className="size-4" strokeWidth={1.8} />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event._id}
            className="gap-0 rounded-2xl bg-surface py-0 text-ink ring-line"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.thumbnail}
                alt={event.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              <Badge
                variant="secondary"
                className="absolute top-3 left-3 h-6 rounded-full bg-page/85 px-3 text-[11px] font-semibold tracking-wide text-ink backdrop-blur-sm"
              >
                {event.eventType}
              </Badge>
            </div>

            <CardHeader className="px-4 pt-4">
              <CardTitle className="line-clamp-2 font-heading text-xl leading-snug text-ink">
                {event.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 px-4 pt-2">
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <CalendarDays className="size-4 shrink-0 text-brand-green" />
                {formatEventDate(event.eventDate)}
              </p>

              <p className="flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="size-4 shrink-0 text-brand-green" />
                <span className="line-clamp-1">{event.location}</span>
              </p>

              <p className="flex items-center gap-2 text-sm text-ink-muted">
                <Users className="size-4 shrink-0 text-brand-green" />
                {event.participants?.length ?? 0} joined
              </p>
            </CardContent>

            <CardFooter className="mt-auto border-line bg-transparent px-4 py-4">
              <Button
                nativeButton={false}
                render={<Link href={`/events/${event._id}`} />}
                className="h-10 w-full rounded-full bg-brand-green text-sm font-semibold text-brand-green-foreground hover:bg-brand-green-hover"
              >
                View event
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
