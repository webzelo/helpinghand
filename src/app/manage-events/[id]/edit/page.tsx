import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { EditEventForm } from "@/components/edit-event-form";
import { EVENTS_API, tomorrowDateString, type Event } from "@/lib/events";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event: Event | null = null;
  let error: string | null = null;
  let res: Response | null = null;

  const token = await getTokenFromServer();

  if (!token) {
    redirect("/login");
  }

  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manage-events/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    error = `Could not load this event from ${EVENTS_API}. Make sure the server is running.`;
  }

  if (res) {
    if (res.status === 401) {
      // The token came from a live session, so this is the API rejecting it
      // (usually a CLIENT_URL/JWKS mismatch), not a logged-out visitor.
      error =
        "The events API rejected your session token (401). Sign in again, and if it keeps happening the API server's CLIENT_URL is not pointing at this site's /api/auth/jwks.";
    } else if (res.status === 404 || res.status === 400) {
      notFound();
    } else if (!res.ok) {
      error = `The events API responded with ${res.status}.`;
    } else {
      event = (await res.json()) as Event;
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-page text-ink">
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 lg:py-20">
          <Link
            href={`/manage-events/${id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            Back to event details
          </Link>

          {/* Page Header */}
          <div className="mt-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Update the plan
            </p>

            <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-ink">
              Edit event
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-ink-muted">
              Change the details below and save. Volunteers will see the new
              information right away.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand/10 px-5 py-4 text-sm text-brand"
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
