import { ArrowDown, Leaf } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920')`,
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Leaf className="w-16 h-16 text-primary-foreground" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Leaf className="w-12 h-12 text-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground text-sm font-medium mb-6 border border-primary-foreground/20">
              Selamat Datang
            </span>
          </div>

          <h1 className="animate-fade-up animate-fade-up-delay-1 text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
            PT. Mitra Mutiara
            <span className="block text-secondary">Sejahtera</span>
          </h1>

          <p className="animate-fade-up animate-fade-up-delay-2 text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Perusahaan Agrobisnis Terkemuka dalam Industri Kelapa Sawit.
            Tumbuh Bersama Masyarakat untuk Masa Depan yang Berkelanjutan.
          </p>

          <div className="animate-fade-up animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#about" className="btn-gold inline-flex items-center justify-center gap-2">
              Tentang Kami
            </a>
            <a
              href="#visi-misi"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Visi & Misi
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <ArrowDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
