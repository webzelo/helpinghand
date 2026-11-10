import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, TriangleAlert } from "lucide-react";
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
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const token = await getTokenFromServer();

  if (!token) {
    redirect("/login");
  }

  let joined: Event[] = [];
  let error: string | null = null;
  let res: Response | null = null;

  try {
    res = await fetch(`${EVENTS_API}/manage-events`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    error = `Could not load your joined events from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (res.status === 401) {
      redirect("/login");
    }

    if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      const events = (await res.json()) as Event[];

      joined = events
        .filter((event) => event.participants?.includes(session.user.id))
        .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-page text-ink">
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:py-20">
          {/* Page Header */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Your plans
              </p>

              <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-ink">
                Joined events
              </h1>

              <p className="mt-4 max-w-[520px] text-sm leading-6 text-ink-muted">
                Events you signed up for, sorted by the date they happen.
              </p>
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/manage-events" />}
              variant="outline"
              className="h-11 w-fit rounded-full border-line bg-transparent px-6 text-sm text-ink-soft hover:bg-ink/5 hover:text-ink"
            >
              Browse events
            </Button>
          </div>

          {/* Content */}
          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand/10 px-5 py-4 text-sm text-brand"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : joined.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-surface px-6 py-16 text-center">
              <h2 className="font-heading text-2xl text-ink">
                No joined events yet
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-ink-muted">
                Open an event and choose Join event — it will show up here.
              </p>

              <Button
                render={<Link href="/manage-events" />}
                className="mt-6 h-11 rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
              >
                Find an event
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {joined.map((event) => (
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
                      className="absolute top-3 left-3 h-6 rounded-full bg-page/85 px-3 text-[11px] font-semibold text-ink backdrop-blur-sm"
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
                  </CardContent>

                  <CardFooter className="mt-auto gap-2 border-line bg-transparent px-4 py-4">
                    <Button
                      nativeButton={false}
                      render={
                        <Link href={`/manage-events/${event._id}`} />
                      }
                      className="h-10 flex-1 rounded-full bg-brand-green text-sm font-semibold text-brand-green-foreground hover:bg-brand-green-hover"
                    >
                      View details
                    </Button>

                    <JoinButton
                      eventId={event._id}
                      userId={session.user.id}
                      joined
                    />
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
