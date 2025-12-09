import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Leaf } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="footer-dark pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-primary-foreground">
                  PT. Mitra Mutiara Sejahtera
                </h3>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Perusahaan agrobisnis yang berkomitmen untuk mengembangkan industri 
              kelapa sawit secara berkelanjutan dan memberikan nilai tambah bagi 
              masyarakat.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-primary-foreground mb-6">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "#hero" },
                { label: "Tentang Kami", href: "#about" },
                { label: "Visi & Misi", href: "#visi-misi" },
                { label: "Nilai-Nilai", href: "#values" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg text-primary-foreground mb-6">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Terusan, Karang Jaya,<br />Musi Rawas Utara
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  mitramuratarasejahtera@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2025 <span className="text-primary font-semibold">PT. Mitra Mutiara Sejahtera</span>. All rights reserved.
            </p>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
