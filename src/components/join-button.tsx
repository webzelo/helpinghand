"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { EVENTS_API } from "@/lib/events";

type JoinButtonProps = {
  eventId: string;
  userId?: string;
  joined: boolean;
  className?: string;
};

export function JoinButton({
  eventId,
  userId,
  joined,
  className,
}: JoinButtonProps) {
  const router = useRouter();

  const [isJoined, setIsJoined] = React.useState(joined);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  // Logged-out visitors are asked to log in first.
  if (!userId) {
    return (
      <Button
        render={<Link href="/login" />}
        className={cn("h-10 rounded-full px-5 text-sm", className)}
      >
        Login to join
      </Button>
    );
  }

  const handleClick = async () => {
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch(`${EVENTS_API}/manage-events/${eventId}/join`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, joined: !isJoined }),
      });

      if (!res.ok) {
        throw new Error("Failed to update your joined events.");
      }

      setIsJoined(!isJoined);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        onClick={handleClick}
        disabled={isSaving}
        className={cn(
          "h-10 rounded-full px-5 text-sm",
          isJoined
            ? "border border-[#f0875c]/30 bg-transparent text-[#f0875c] hover:bg-[#f0875c]/10 hover:text-[#f2a183]"
            : "bg-[#c8d9b5] font-semibold text-[#1b2415] hover:bg-[#d7e4c7]",
          className
        )}
      >
        {isSaving ? "Saving…" : isJoined ? "Leave event" : "Join event"}
      </Button>

      {error && <p className="text-xs text-[#f0875c]">{error}</p>}
    </div>
  );
}
