import { Building2, Users, TreePine, Award } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: Building2, value: "2025", label: "Tahun Berdiri" },
    { icon: Users, value: "500+", label: "Karyawan" },
    { icon: TreePine, value: "1000+", label: "Hektar Lahan" },
    { icon: Award, value: "ISO", label: "Tersertifikasi" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800"
                alt="Perkebunan Kelapa Sawit"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <TreePine className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-muted-foreground text-sm">Komitmen Berkelanjutan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Tentang Kami
            </span>

            <h2 className="section-title text-foreground">
              PT. Mitra Mutiara
              <span className="text-gradient block">Sejahtera</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              PT. Mitra Mutiara Sejahtera adalah perusahaan agrobisnis yang bergerak 
              dalam industri kelapa sawit. Kami berkomitmen untuk mengembangkan 
              potensi daerah dan menciptakan pertumbuhan berkelanjutan bersama masyarakat.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dengan lokasi strategis di Terusan, Karang Jaya, Musi Rawas Utara, 
              kami terus berkembang menjadi mitra pilihan dalam industri kelapa sawit 
              dengan mengutamakan kualitas dan keberlanjutan.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-muted/50 p-4 rounded-xl text-center card-hover"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
