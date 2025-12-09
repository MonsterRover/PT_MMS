import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VisiMisiSection from "@/components/VisiMisiSection";
import ValuesSection from "@/components/ValuesSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PT. Mitra Mutiara Sejahtera - Perusahaan Agrobisnis Kelapa Sawit";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <VisiMisiSection />
        <ValuesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
