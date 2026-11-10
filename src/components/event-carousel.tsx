"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DeleteEventButton } from "@/components/delete-event-button";
import { JoinButton } from "@/components/join-button";
import { formatEventDate, type Event } from "@/lib/events";

export function EventCarousel({
  events,
  userId,
}: {
  events: Event[];
  userId?: string;
}) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="w-full">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem
            key={event._id}
            className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="relative h-full gap-0 rounded-2xl bg-surface py-0 text-ink ring-line transition-colors focus-within:ring-brand-green/60 hover:ring-ink/25">
              {/* Card-wide link; the footer stays above it so Edit still works. */}
              <Link
                href={`/manage-events/${event._id}`}
                aria-label={`View details for ${event.title}`}
                className="absolute inset-0 z-0 rounded-2xl outline-none"
              />

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                {/* Thumbnails are arbitrary URLs, so next/image has no fixed allow-list. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-[1.03]"
                />

                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 h-6 rounded-full bg-page/85 px-3 text-[11px] font-semibold tracking-wide text-ink backdrop-blur-sm"
                >
                  {event.eventType}
                </Badge>
              </div>

              <CardHeader className="px-4 pt-4">
                <CardTitle className="line-clamp-2 font-heading text-xl leading-snug text-ink group-hover/card:underline">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-2 px-4 pt-2">
                <p className="flex items-center gap-2 text-sm text-ink-soft">
                  <CalendarDays className="size-4 shrink-0 text-brand-green" />
                  {formatEventDate(event.eventDate)}
                </p>

                <p className="flex items-center gap-2 text-sm text-ink-muted">
                  <MapPin className="size-4 shrink-0 text-brand-green" />
                  <span className="line-clamp-1">{event.location}</span>
                </p>

                <p className="mt-1 line-clamp-3 text-sm leading-6 text-ink-muted">
                  {event.description}
                </p>
              </CardContent>

              <CardFooter className="relative z-10 mt-auto flex-col items-stretch gap-2 border-line bg-transparent px-4 py-4">
                <JoinButton
                  eventId={event._id}
                  userId={userId}
                  joined={event.participants?.includes(userId ?? "") ?? false}
                  className="w-full"
                />

                <div className="flex w-full gap-2">
                  <Button
                    nativeButton={false}
                    render={<Link href={`/manage-events/${event._id}/edit`} />}
                    className="h-10 flex-1 rounded-full bg-brand-green text-sm font-semibold text-brand-green-foreground hover:bg-brand-green-hover"
                  >
                    <Pencil />
                    Edit event
                  </Button>

                  <DeleteEventButton
                    eventId={event._id}
                    eventTitle={event.title}
                  />
                </div>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden border-line bg-page text-ink hover:bg-surface-2 hover:text-ink sm:inline-flex" />
      <CarouselNext className="hidden border-line bg-page text-ink hover:bg-surface-2 hover:text-ink sm:inline-flex" />
    </Carousel>
  );
}
