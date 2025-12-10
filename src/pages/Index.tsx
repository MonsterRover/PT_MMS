import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisiMisiSection from "@/components/VisiMisiSection";
import ValuesSection from "@/components/ValuesSection";
import NewsPreviewSection from "@/components/NewsPreviewSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PT. Mitra Muratara Sejahtera - Perusahaan Agrobisnis Kelapa Sawit";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <VisiMisiSection />
        <ValuesSection />
        <NewsPreviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
