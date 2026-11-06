import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    src: "/images/gallery-planting.jpg",
    alt: "Hands holding a young seedling above fresh soil",
    title: "Plantation drive",
    place: "Mirpur",
    className: "col-span-2 row-span-2",
    sizes: "(max-width: 1024px) 100vw, 580px",
  },
  {
    src: "/images/gallery-community.jpg",
    alt: "A group of friends sitting together by the water",
    title: "Sunday crew",
    place: "Dhanmondi",
    className: "",
    sizes: "(max-width: 1024px) 50vw, 280px",
  },
  {
    src: "/images/gallery-volunteer.jpg",
    alt: "A volunteer in a pink shirt preparing for an event",
    title: "Volunteer call",
    place: "Banani",
    className: "row-span-2",
    sizes: "(max-width: 1024px) 50vw, 280px",
  },
  {
    src: "/images/gallery-donation.jpg",
    alt: "Volunteers packing boxes of donations",
    title: "Donation table",
    place: "Mohammadpur",
    className: "",
    sizes: "(max-width: 1024px) 50vw, 280px",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:pb-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f0875c]">
              From the board
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,3vw,2.6rem)] leading-none tracking-[-0.01em] text-[#f5f4ec]">
              The work, as it happens.
            </h2>
            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#a4a59c]">
              A few frames from the crews, tables, and Saturday mornings that
              made it onto the board.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d7d8cf] transition-colors hover:text-white"
          >
            See all events
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className={`group relative overflow-hidden rounded-2xl ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-sm font-semibold text-white">
                  {photo.title}
                </p>
                <p className="mt-0.5 text-[11px] text-white/65">
                  {photo.place}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
