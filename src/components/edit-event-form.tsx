"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EVENTS_API,
  EVENT_TYPES,
  fieldClassName,
  selectClassName,
  type Event,
} from "@/lib/events";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type EditEventFormProps = {
  event: Event;
  minDate: string;
};

export function EditEventForm({ event, minDate }: EditEventFormProps) {
  const router = useRouter();

  const [dateError, setDateError] = React.useState("");
  const [submissionError, setSubmissionError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const formData = new FormData(submitEvent.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const eventDate = values.eventDate ?? "";

    if (!eventDate || eventDate < minDate) {
      setDateError("Choose a date in the future — tomorrow or later.");
      return;
    }

    setDateError("");
    setSubmissionError("");
    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${EVENTS_API}/manage-events/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update the event.");
      }

      router.push(`/manage-events/${event._id}`);
      router.refresh();
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-surface p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Event Title */}
        <div className="sm:col-span-2">
          <Label htmlFor="title" className="text-ink-soft">
            Event title
          </Label>

          <Input
            id="title"
            name="title"
            required
            defaultValue={event.title}
            placeholder="Lake clean-up at Gulshan"
            className={fieldClassName}
          />
        </div>

        {/* Event Type */}
        <div>
          <Label htmlFor="eventType" className="text-ink-soft">
            Event type
          </Label>

          <select
            id="eventType"
            name="eventType"
            required
            defaultValue={event.eventType || ""}
            className={selectClassName}
          >
            <option value="" disabled>
              Select a type
            </option>

            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Event Date */}
        <div>
          <Label htmlFor="eventDate" className="text-ink-soft">
            Event date
          </Label>

          <Input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            min={minDate}
            defaultValue={event.eventDate}
            onChange={() => setDateError("")}
            onInvalid={(invalidEvent) => {
              invalidEvent.preventDefault();

              setDateError(
                "Choose a date in the future — tomorrow or later."
              );
            }}
            aria-invalid={dateError ? true : undefined}
            aria-describedby={dateError ? "event-date-error" : undefined}
            className={`${fieldClassName} [color-scheme:light] dark:[color-scheme:dark]`}
          />

          {dateError && (
            <p id="event-date-error" className="mt-2 text-xs text-brand">
              {dateError}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <Label htmlFor="location" className="text-ink-soft">
            Location
          </Label>

          <Input
            id="location"
            name="location"
            required
            defaultValue={event.location}
            placeholder="East bank, Gulshan Lake"
            className={fieldClassName}
          />
        </div>

        {/* Thumbnail Image */}
        <div className="sm:col-span-2">
          <Label htmlFor="thumbnail" className="text-ink-soft">
            Thumbnail image URL
          </Label>

          <Input
            id="thumbnail"
            name="thumbnail"
            type="url"
            required
            defaultValue={event.thumbnail}
            placeholder="https://images.example.com/cleanup.jpg"
            className={fieldClassName}
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <Label htmlFor="description" className="text-ink-soft">
            Description
          </Label>

          <Textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={event.description}
            placeholder="What are you doing, what should people bring, and where should they meet?"
            className={`${fieldClassName} h-auto min-h-32 py-3`}
          />
        </div>
      </div>

      {/* Submit Section */}
      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-muted">
          The date must be in the future before the event can be saved.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            render={<Link href={`/manage-events/${event._id}`} />}
            variant="ghost"
            className="h-11 rounded-full px-5 text-sm text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {submissionError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-brand"
        >
          {submissionError}
        </p>
      )}
    </form>
  );
}
