import { User, Shield, Heart, Zap, Target } from "lucide-react";

const ValuesSection = () => {
  const values = [
    {
      letter: "M",
      title: "Man",
      description: "Sumber daya manusia adalah aset utama perusahaan",
      icon: User,
      color: "bg-primary",
    },
    {
      letter: "I",
      title: "Integritas",
      description: "Kejujuran dan konsistensi dalam setiap tindakan",
      icon: Shield,
      color: "bg-secondary",
    },
    {
      letter: "T",
      title: "Trust",
      description: "Kepercayaan sebagai fondasi hubungan bisnis",
      icon: Heart,
      color: "bg-accent",
    },
    {
      letter: "R",
      title: "Responsiveness",
      description: "Tanggap dan adaptif terhadap perubahan",
      icon: Zap,
      color: "bg-primary",
    },
    {
      letter: "A",
      title: "Ambitions",
      description: "Semangat untuk terus berkembang dan berinovasi",
      icon: Target,
      color: "bg-secondary",
    },
  ];

  return (
    <section id="values" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Nilai-Nilai Kami
          </span>
          <h2 className="section-title text-foreground">
            <span className="text-gradient">MITRA</span> Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lima nilai utama yang menjadi pedoman kami dalam menjalankan bisnis dan membangun hubungan dengan stakeholder.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 text-center card-hover"
            >
              <div
                className={`w-20 h-20 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-3xl font-heading font-bold text-primary-foreground">
                  {value.letter}
                </span>
              </div>

              <value.icon className="w-8 h-8 text-primary mx-auto mb-3 opacity-60" />

              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {value.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">
            Bergabung Bersama Kami
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Jadilah bagian dari perjalanan kami dalam membangun industri kelapa sawit yang berkelanjutan.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all duration-300"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
