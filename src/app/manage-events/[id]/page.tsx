import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Pencil,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JoinButton } from "@/components/join-button";
import { auth } from "@/lib/auth";
import { EVENTS_API, formatEventDate, type Event } from "@/lib/events";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event: Event | null = null;
  let error: string | null = null;
  let res: Response | null = null;

  try {
    res = await fetch(`${EVENTS_API}/manage-events/${id}`, {
      // cache: "no-store",
      headers: {
        authorization: 'user logged in'
      }
    });
  } catch {
    error = `Could not load this event from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (res.status === 400 || res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      event = (await res.json()) as Event;
    }
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  const isJoined = Boolean(userId && event?.participants?.includes(userId));

  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      <main className="flex-1">
        <div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-6 lg:py-20">
          <Link
            href="/manage-events"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#a4a59c] transition-colors hover:text-[#f4f4ec]"
          >
            <ArrowLeft className="size-3.5" />
            Back to manage events
          </Link>

          {error ? (
            <div
              role="alert"
              className="mt-8 flex items-start gap-3 rounded-2xl border border-[#f0875c]/25 bg-[#f0875c]/10 px-5 py-4 text-sm text-[#f2a183]"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : event ? (
            <article className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#20211d] lg:grid lg:grid-cols-[1.05fr_1fr]">
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full bg-[#262722]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />

                <Badge
                  variant="secondary"
                  className="absolute top-4 left-4 h-6 rounded-full bg-[#1a1b18]/85 px-3 text-[11px] font-semibold tracking-wide text-[#e9e9df] backdrop-blur-sm"
                >
                  {event.eventType}
                </Badge>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
                    Event details
                  </p>

                  <h1 className="mt-3 font-heading text-[clamp(2rem,3.5vw,2.8rem)] leading-tight tracking-[-0.02em] text-[#f5f4ec]">
                    {event.title}
                  </h1>
                </div>

                <p className="flex items-center gap-2 text-sm text-[#d7d8cf]">
                  <CalendarDays className="size-4 shrink-0 text-[#c8d9b5]" />
                  {formatEventDate(event.eventDate)}
                </p>

                <p className="flex items-center gap-2 text-sm text-[#a4a59c]">
                  <MapPin className="size-4 shrink-0 text-[#c8d9b5]" />
                  {event.location}
                </p>

                <p className="text-sm leading-6 whitespace-pre-line text-[#a4a59c]">
                  {event.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <JoinButton
                    eventId={event._id}
                    userId={userId}
                    joined={isJoined}
                  />

                  <Button
                    render={
                      <Link href={`/manage-events/${event._id}/edit`} />
                    }
                    className="h-10 rounded-full bg-[#ef8658] px-5 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
                  >
                    <Pencil />
                    Edit event
                  </Button>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  );
}
