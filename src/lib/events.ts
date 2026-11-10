import { format, parseISO } from "date-fns";

export const EVENTS_API = "http://localhost:5000";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Teaching",
  "First Aid",
  "Other",
] as const;

export type Event = {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  participants?: string[];
};

export type EventInput = Omit<Event, "_id">;

/** Dark input styling shared by the create and edit event forms. */
export const fieldClassName =
  "mt-2 h-10 border-line bg-input-bg text-ink placeholder:text-ink-muted focus-visible:border-brand-green/60 focus-visible:ring-brand-green/20";

export const selectClassName =
  "mt-2 h-10 w-full rounded-lg border border-line bg-input-bg px-3 text-sm text-ink outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark] focus:border-brand-green/60";

/** `yyyy-MM-dd` for tomorrow in local time, used as the earliest valid date. */
export function tomorrowDateString() {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatEventDate(value: string) {
  if (!value) return "Date to be announced";

  const date = parseISO(value);

  if (Number.isNaN(date.getTime())) return value;

  return format(date, "EEE, MMM d, yyyy");
}

export function isPastDate(value: string, minDate: string) {
  if (!value) return false;

  return value < minDate;
}
