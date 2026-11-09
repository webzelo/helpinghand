import { Banner } from "@/components/banner";
import { BoardFeatures } from "@/components/board-features";
import { FeatureSection } from "@/components/feature-section";
import { GallerySection } from "@/components/gallery-section";
import { NewsletterSection } from "@/components/newsletter-section";
import Featured from "@/components/featured";


export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#1a1b18] text-[#f4f4ec]">
      
      <main className="flex-1">
        <Banner />
        <Featured />
        <BoardFeatures />
        <FeatureSection />
        <GallerySection />
        <NewsletterSection />
      </main>
    </div>
  );
}
