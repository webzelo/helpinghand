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
      const res = await fetch(`${EVENTS_API}/manage-events/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

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
      className="rounded-3xl border border-white/10 bg-[#20211d] p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Event Title */}
        <div className="sm:col-span-2">
          <Label htmlFor="title" className="text-[#d7d8cf]">
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
          <Label htmlFor="eventType" className="text-[#d7d8cf]">
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
          <Label htmlFor="eventDate" className="text-[#d7d8cf]">
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
            className={`${fieldClassName} [color-scheme:dark]`}
          />

          {dateError && (
            <p id="event-date-error" className="mt-2 text-xs text-[#f0875c]">
              {dateError}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <Label htmlFor="location" className="text-[#d7d8cf]">
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
          <Label htmlFor="thumbnail" className="text-[#d7d8cf]">
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
          <Label htmlFor="description" className="text-[#d7d8cf]">
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
      <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#8f9187]">
          The date must be in the future before the event can be saved.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            render={<Link href={`/manage-events/${event._id}`} />}
            variant="ghost"
            className="h-11 rounded-full px-5 text-sm text-[#d7d8cf] hover:bg-white/5 hover:text-[#f4f4ec]"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-full bg-[#ef8658] px-6 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {submissionError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-[#f0875c]/20 bg-[#f0875c]/10 px-4 py-3 text-sm text-[#f0875c]"
        >
          {submissionError}
        </p>
      )}
    </form>
  );
}
