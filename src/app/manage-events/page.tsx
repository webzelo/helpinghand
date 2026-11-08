import Link from "next/link";
import { headers } from "next/headers";
import { CalendarDays, CalendarPlus, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCarousel } from "@/components/event-carousel";
import { auth } from "@/lib/auth";
import { EVENTS_API, type Event } from "@/lib/events";

const ManageEvents = async () => {
  let events: Event[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${EVENTS_API}/manage-events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`The events API responded with ${res.status}.`);
    }

    events = (await res.json()) as Event[];
  } catch {
    error = `Could not load your events from ${EVENTS_API}. Make sure the server is running.`;
  }

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:py-20">
          {/* Page Header */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
                Your board
              </p>

              <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-[#f5f4ec]">
                Manage events
              </h1>

              <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#a4a59c]">
                Everything you have posted, in one place. Open an event to
                change its details.
              </p>

              {!error && events.length > 0 && (
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#8f9187]">
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
                className="h-11 w-fit rounded-full border-white/15 bg-transparent px-6 text-sm text-[#d7d8cf] hover:bg-white/5 hover:text-[#f4f4ec]"
              >
                <CalendarDays />
                Joined events
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/create-event" />}
                className="h-11 w-fit rounded-full bg-[#ef8658] px-6 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
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
              className="flex items-start gap-3 rounded-2xl border border-[#f0875c]/25 bg-[#f0875c]/10 px-5 py-4 text-sm text-[#f2a183]"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-[#20211d] px-6 py-16 text-center">
              <h2 className="font-heading text-2xl text-[#f5f4ec]">
                No events yet
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#a4a59c]">
                Post your first event and it will show up here, ready to edit
                whenever plans change.
              </p>

              <Button
                nativeButton={false}
                render={<Link href="/create-event" />}
                className="mt-6 h-11 rounded-full bg-[#ef8658] px-6 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
              >
                <CalendarPlus />
                Create your first event
              </Button>
            </div>
          ) : (
            <EventCarousel events={events} userId={session?.user.id} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageEvents;
