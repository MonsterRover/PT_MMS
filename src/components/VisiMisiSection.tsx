import { Eye, Target, CheckCircle2 } from "lucide-react";

const VisiMisiSection = () => {
  const misiItems = [
    "Menciptakan Pertumbuhan Berkelanjutan Dalam Industri Kelapa Sawit.",
    "Mengembangkan Potensi Daerah Dalam Semangat Kemitraan.",
    "Mengembangkan Sumber Daya Manusia Sehingga Memiliki Kemampuan, Kompetensi Dan Emosional Yang Handal.",
    "Memberi Nilai Tambah Bagi Semua Pemangku Kepentingan.",
  ];

  return (
    <section id="visi-misi" className="py-20 dark-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary text-sm font-medium mb-4">
            Visi & Misi
          </span>
          <h2 className="section-title text-primary-foreground">
            Arah & Tujuan Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Komitmen kami untuk menjadi perusahaan agrobisnis terkemuka yang memberikan dampak positif bagi masyarakat dan lingkungan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visi Card */}
          <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-2xl p-8 card-hover">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
                  Visi
                </h3>
                <div className="w-20 h-1 bg-secondary rounded-full" />
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Menjadi Perusahaan Agrobisnis Terkemuka Berkat Kepeloporan Dan Sumber 
              Daya Manusia Yang Menonjol Yang Akan Menjadi Mitra Pilihan Dalam 
              Industri Kelapa Sawit Sehingga Dapat Tumbuh Bersama Masyarakat.
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-2xl p-8 card-hover">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
                  Misi
                </h3>
                <div className="w-20 h-1 bg-primary rounded-full" />
              </div>
            </div>

            <ul className="space-y-4">
              {misiItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiSection;
