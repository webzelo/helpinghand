import { Banner } from "@/components/banner";
import { BoardFeatures } from "@/components/board-features";
import { FeatureSection } from "@/components/feature-section";
import { GallerySection } from "@/components/gallery-section";
import { NewsletterSection } from "@/components/newsletter-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      
      <main className="flex-1">
        <Banner />
        <BoardFeatures />
        <FeatureSection />
        <GallerySection />
        <NewsletterSection />
      </main>
    </div>
  );
}
