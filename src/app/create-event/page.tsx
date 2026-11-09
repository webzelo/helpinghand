
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
import { authClient } from "@/lib/auth-client";

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

    const {data, error} = await authClient.token()
    console.log(data)

    const token = data?.token

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
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 lg:py-20">

          {/* Page Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
              Host a crew
            </p>

            <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-[#f5f4ec]">
              Create an event
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#a4a59c]">
              Post the details, open a few roles, and give neighbors a date to
              show up for.
            </p>
          </div>

          {/* Event Form */}
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
                <Label htmlFor="eventDate" className="text-[#d7d8cf]">
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
                  className={`${fieldClassName} [color-scheme:dark]`}
                />

                {dateError && (
                  <p
                    id="event-date-error"
                    className="mt-2 text-xs text-[#f0875c]"
                  >
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
                  placeholder="What are you doing, what should people bring, and where should they meet?"
                  className={`${fieldClassName} h-auto min-h-32 py-3`}
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-[#8f9187]">
                The date must be in the future before the event can be posted.
              </p>

              <Button
                type="submit"
                className="h-11 rounded-full bg-[#ef8658] px-6 text-sm font-semibold text-[#1b1b18] hover:bg-[#f39a73]"
              >
                Publish event
              </Button>
            </div>

            {/* Success Message */}
            {submitted && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-[#c8d9b5]/20 bg-[#c8d9b5]/10 px-4 py-3 text-sm text-[#c8d9b5]"
              >
                Event created. It is ready for the board.
              </p>
            )}

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
        </div>
      </main>
    </div>
  );
}
