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

    try {
      const res = await fetch(`${EVENTS_API}/manage-events/${eventId}`, {
        method: "DELETE",
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
            className="h-10 w-10 shrink-0 rounded-full border border-[#f0875c]/30 bg-[#f0875c]/10 text-[#f0875c] hover:bg-[#f0875c]/20 hover:text-[#f2a183]"
          />
        }
      >
        <Trash2 />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#20211d] text-[#f4f4ec] ring-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#f5f4ec]">
            Delete this event?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#a4a59c]">
            “{eventTitle}” will be permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-[#f0875c]/20 bg-[#f0875c]/10 px-4 py-3 text-sm text-[#f0875c]"
          >
            {error}
          </p>
        )}

        <AlertDialogFooter className="border-white/10 bg-transparent">
          <AlertDialogCancel className="border-white/15 bg-transparent text-[#d7d8cf] hover:bg-white/5 hover:text-[#f4f4ec]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-[#f0875c] text-[#1b1b18] hover:bg-[#f2a183]"
          >
            {isDeleting ? "Deleting…" : "Delete event"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
