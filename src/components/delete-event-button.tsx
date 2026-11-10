"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EVENTS_API } from "@/lib/events";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteEventButtonProps = {
  eventId: string;
  eventTitle: string;
};

export function DeleteEventButton({
  eventId,
  eventTitle,
}: DeleteEventButtonProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");

  

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    const token = await getTokenFromClient();

    if (!token) {
      setError("Your session expired. Please log in again.");
      setIsDeleting(false);
      return;
    }

    try {
      const res = await fetch(`${EVENTS_API}/manage-events/${eventId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to delete the event.");
      }

      setOpen(false);
      router.refresh(); // Reload the server page so the card disappears.
    } catch {
      setError("Could not delete this event. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            aria-label={`Delete ${eventTitle}`}
            className="h-10 w-10 shrink-0 rounded-full border border-brand/30 bg-brand/10 text-brand hover:bg-brand/20 hover:text-brand"
          />
        }
      >
        <Trash2 />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-surface text-ink ring-line">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-ink">
            Delete this event?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-ink-muted">
            “{eventTitle}” will be permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-brand"
          >
            {error}
          </p>
        )}

        <AlertDialogFooter className="border-line bg-transparent">
          <AlertDialogCancel className="border-line bg-transparent text-ink-soft hover:bg-ink/5 hover:text-ink">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-brand-fill text-brand-foreground hover:bg-brand-fill-hover"
          >
            {isDeleting ? "Deleting…" : "Delete event"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
