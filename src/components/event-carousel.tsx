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
import { formatEventDate, type Event } from "@/lib/events";

export function EventCarousel({ events }: { events: Event[] }) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="w-full">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem
            key={event._id}
            className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="h-full gap-0 rounded-2xl bg-[#20211d] py-0 text-[#f4f4ec] ring-white/10 transition-colors hover:ring-white/25">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#262722]">
                {/* Thumbnails are arbitrary URLs, so next/image has no fixed allow-list. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                <Badge
                  variant="secondary"
                  className="absolute top-3 left-3 h-6 rounded-full bg-[#1a1b18]/85 px-3 text-[11px] font-semibold tracking-wide text-[#e9e9df] backdrop-blur-sm"
                >
                  {event.eventType}
                </Badge>
              </div>

              <CardHeader className="px-4 pt-4">
                <CardTitle className="line-clamp-2 font-heading text-xl leading-snug text-[#f5f4ec]">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-2 px-4 pt-2">
                <p className="flex items-center gap-2 text-sm text-[#d7d8cf]">
                  <CalendarDays className="size-4 shrink-0 text-[#c8d9b5]" />
                  {formatEventDate(event.eventDate)}
                </p>

                <p className="flex items-center gap-2 text-sm text-[#a4a59c]">
                  <MapPin className="size-4 shrink-0 text-[#c8d9b5]" />
                  <span className="line-clamp-1">{event.location}</span>
                </p>

                <p className="mt-1 line-clamp-3 text-sm leading-6 text-[#a4a59c]">
                  {event.description}
                </p>
              </CardContent>

              <CardFooter className="mt-auto border-white/10 bg-transparent px-4 py-4">
                <Button
                  render={<Link href={`/manage-events/${event._id}/edit`} />}
                  className="h-10 w-full rounded-full bg-[#c8d9b5] text-sm font-semibold text-[#1b2415] hover:bg-[#d7e4c7]"
                >
                  <Pencil />
                  Edit event
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden border-white/15 bg-[#1a1b18] text-[#f4f4ec] hover:bg-[#262722] hover:text-[#f4f4ec] sm:inline-flex" />
      <CarouselNext className="hidden border-white/15 bg-[#1a1b18] text-[#f4f4ec] hover:bg-[#262722] hover:text-[#f4f4ec] sm:inline-flex" />
    </Carousel>
  );
}
