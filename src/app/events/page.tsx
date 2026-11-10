import Link from "next/link";
import { headers } from "next/headers";
import {
  CalendarDays,
  MapPin,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JoinButton } from "@/components/join-button";
import { auth } from "@/lib/auth";
import { EVENTS_API, formatEventDate, type Event } from "@/lib/events";

export const dynamic = "force-dynamic";

function todayDateString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

export default async function EventsPage() {
  let events: Event[] = [];
  let error: string | null = null;
  let res: Response | null = null;

  try {
    res = await fetch(`${EVENTS_API}/events`, { cache: "no-store" });
  } catch {
    error = `Could not load events from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      events = (await res.json()) as Event[];
    }
  }

  // The API already filters out past events; this keeps the page safe too.
  const today = todayDateString();
  events = events
    .filter((event) => event.eventDate >= today)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:py-20">
          {/* Page Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
              Find your people
            </p>

            <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-[#f5f4ec]">
              Upcoming events
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#a4a59c]">
              Good causes with a date on the calendar. Pick one, meet your
              neighbors, and show up for something that matters.
            </p>

            {!error && events.length > 0 && (
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#8f9187]">
                {events.length} {events.length === 1 ? "event" : "events"} coming
                up
              </p>
            )}
          </div>

          {/* Content */}
          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-[#f0875c]/25 bg-[#f0875c]/10 px-5 py-4 text-sm text-[#f2a183]"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-[#20211d] px-6 py-16 text-center">
              <h2 className="font-heading text-2xl text-[#f5f4ec]">
                No upcoming events yet
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#a4a59c]">
                Nothing is on the calendar right now. Create an event and give
                your community a date to show up for.
              </p>

              <Button
                nativeButton={false}
                render={<Link href="/create-event" />}
                className="mt-6 h-11 rounded-full bg-[#ef8658] px-6 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
              >
                Create an event
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card
                  key={event._id}
                  className="gap-0 rounded-2xl bg-[#20211d] py-0 text-[#f4f4ec] ring-white/10 transition-colors focus-within:ring-[#c8d9b5]/60 hover:ring-white/25"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#262722]">
                    {/* Thumbnails are arbitrary URLs, so next/image has no allow-list. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 h-6 rounded-full bg-[#1a1b18]/85 px-3 text-[11px] font-semibold tracking-wide text-[#e9e9df] backdrop-blur-sm"
                    >
                      {event.eventType}
                    </Badge>
                  </div>

                  <CardHeader className="px-4 pt-4">
                    <CardTitle className="line-clamp-2 font-heading text-xl leading-snug text-[#f5f4ec]">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-2 px-4 pt-2">
                    <p className="flex items-center gap-2 text-sm text-[#d7d8cf]">
                      <CalendarDays className="size-4 shrink-0 text-[#c8d9b5]" />
                      {formatEventDate(event.eventDate)}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-[#a4a59c]">
                      <MapPin className="size-4 shrink-0 text-[#c8d9b5]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-[#a4a59c]">
                      <Users className="size-4 shrink-0 text-[#c8d9b5]" />
                      {event.participants?.length ?? 0} joined
                    </p>

                    <p className="mt-1 line-clamp-3 text-sm leading-6 text-[#a4a59c]">
                      {event.description}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto gap-2 border-white/10 bg-transparent px-4 py-4">
                    <Button
                      nativeButton={false}
                      render={<Link href={`/events/${event._id}`} />}
                      className="h-10 flex-1 rounded-full bg-[#c8d9b5] text-sm font-semibold text-[#1b2415] hover:bg-[#d7e4c7]"
                    >
                      View event
                    </Button>

                    <div className="flex-1">
                      <JoinButton
                        eventId={event._id}
                        userId={userId}
                        joined={
                          event.participants?.includes(userId ?? "") ?? false
                        }
                        className="w-full"
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
