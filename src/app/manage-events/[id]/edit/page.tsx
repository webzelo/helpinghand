import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { EditEventForm } from "@/components/edit-event-form";
import { EVENTS_API, tomorrowDateString, type Event } from "@/lib/events";

export default async function EditEventPage({
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
      cache: "no-store",
    });
  } catch {
    error = `Could not load this event from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (res.status === 404 || res.status === 400) {
      notFound();
    }

    if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      event = (await res.json()) as Event;
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 lg:py-20">
          <Link
            href="/manage-events"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#a4a59c] transition-colors hover:text-[#f4f4ec]"
          >
            <ArrowLeft className="size-3.5" />
            Back to manage events
          </Link>

          {/* Page Header */}
          <div className="mt-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
              Update the plan
            </p>

            <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-[#f5f4ec]">
              Edit event
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#a4a59c]">
              Change the details below and save. Volunteers will see the new
              information right away.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-[#f0875c]/25 bg-[#f0875c]/10 px-5 py-4 text-sm text-[#f2a183]"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          ) : event ? (
            <EditEventForm event={event} minDate={tomorrowDateString()} />
          ) : null}
        </div>
      </main>
    </div>
  );
}
