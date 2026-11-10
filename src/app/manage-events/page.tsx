import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, CalendarPlus, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCarousel } from "@/components/event-carousel";
import { auth } from "@/lib/auth";
import { EVENTS_API, type Event } from "@/lib/events";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const ManageEvents = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const token = await getTokenFromServer();

  if (!token) {
    redirect("/login");
  }

  let events: Event[] = [];
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
    error = `Could not load your events from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (res.status === 401) {
      redirect("/login");
    }

    if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      events = (await res.json()) as Event[];
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
                Your board
              </p>

              <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-ink">
                Manage events
              </h1>

              <p className="mt-4 max-w-[520px] text-sm leading-6 text-ink-muted">
                Everything you have posted, in one place. Open an event to
                change its details.
              </p>

              {!error && events.length > 0 && (
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {events.length} {events.length === 1 ? "event" : "events"} on
                  the board
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                render={<Link href="/events/joined" />}
                variant="outline"
                className="h-11 w-fit rounded-full border-line bg-transparent px-6 text-sm text-ink-soft hover:bg-ink/5 hover:text-ink"
              >
                <CalendarDays />
                Joined events
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/create-event" />}
                className="h-11 w-fit rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
              >
                <CalendarPlus />
                Create event
              </Button>
            </div>
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
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line bg-surface px-6 py-16 text-center">
              <h2 className="font-heading text-2xl text-ink">
                No events yet
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-ink-muted">
                Post your first event and it will show up here, ready to edit
                whenever plans change.
              </p>

              <Button
                nativeButton={false}
                render={<Link href="/create-event" />}
                className="mt-6 h-11 rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
              >
                <CalendarPlus />
                Create your first event
              </Button>
            </div>
          ) : (
            <EventCarousel events={events} userId={session.user.id} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageEvents;
