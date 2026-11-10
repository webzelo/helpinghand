
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EVENT_TYPES,
  fieldClassName,
  selectClassName,
  tomorrowDateString,
} from "@/lib/events";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function CreateEventPage() {
  // State management
  const tomorrow = tomorrowDateString();
  const [dateError, setDateError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");

  // Handle form submission
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const token = await getTokenFromClient()

    const form = event.currentTarget;

    // Reset previous messages
    setSubmitted(false);
    setSubmissionError("");

    // Collect form data
    const formData = new FormData(form);

    const eventDate = String(formData.get("eventDate") ?? "");

    // Validate event date
    if (!tomorrow || !eventDate || eventDate < tomorrow) {
      setDateError(
        "Choose a date in the future — tomorrow or later."
      );
      return;
    }

    setDateError("");

    // Convert form data into an object
    const formObject = Object.fromEntries(formData.entries());

    try {
      // Send data to backend
      const res = await fetch("http://localhost:5000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formObject),
      });

      const result = await res.json();

      // Check API response
      if (!res.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      console.log("Event created successfully:", result);

      // Show success message
      setSubmitted(true);

      // Reset form
      form.reset();

    } catch (error) {
      console.error("Error creating event:", error);

      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-page text-ink">
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 lg:py-20">

          {/* Page Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Host a crew
            </p>

            <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-ink">
              Create an event
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-ink-muted">
              Post the details, open a few roles, and give neighbors a date to
              show up for.
            </p>
          </div>

          {/* Event Form */}
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
                  defaultValue=""
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
                  min={tomorrow || undefined}
                  onChange={() => setDateError("")}
                  onInvalid={(event) => {
                    event.preventDefault();

                    setDateError(
                      "Choose a date in the future — tomorrow or later."
                    );
                  }}
                  aria-invalid={dateError ? true : undefined}
                  aria-describedby={
                    dateError ? "event-date-error" : undefined
                  }
                  className={`${fieldClassName} [color-scheme:light] dark:[color-scheme:dark]`}
                />

                {dateError && (
                  <p
                    id="event-date-error"
                    className="mt-2 text-xs text-brand"
                  >
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
                  placeholder="What are you doing, what should people bring, and where should they meet?"
                  className={`${fieldClassName} h-auto min-h-32 py-3`}
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-ink-muted">
                The date must be in the future before the event can be posted.
              </p>

              <Button
                type="submit"
                className="h-11 rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
              >
                Publish event
              </Button>
            </div>

            {/* Success Message */}
            {submitted && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-brand-green/20 bg-brand-green/10 px-4 py-3 text-sm text-brand-green"
              >
                Event created. It is ready for the board.
              </p>
            )}

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
        </div>
      </main>
    </div>
  );
}
