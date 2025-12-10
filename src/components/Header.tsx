import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? "#hero" : "/", label: "Beranda", isAnchor: isHomePage },
    { href: isHomePage ? "#about" : "/#about", label: "Tentang", isAnchor: isHomePage },
    { href: isHomePage ? "#visi-misi" : "/#visi-misi", label: "Visi & Misi", isAnchor: isHomePage },
    { href: isHomePage ? "#values" : "/#values", label: "Nilai", isAnchor: isHomePage },
    { href: "/news", label: "Berita", isAnchor: false },
    { href: "/contact", label: "Karir", isAnchor: false },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span
            className={cn(
              "font-heading font-bold text-lg transition-colors duration-300",
              isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
            )}
          >
            PT. MMS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors duration-300 hover:text-primary",
                  isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
                )}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-medium transition-colors duration-300 hover:text-primary",
                  isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground",
                  location.pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <Link
          to="/"
          className={cn(
            "hidden md:inline-flex px-6 py-2 rounded-full font-semibold transition-all duration-300",
            isScrolled || !isHomePage
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/30"
          )}
        >
          Halaman Utama
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"} />
          ) : (
            <Menu className={isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-foreground font-medium py-2 hover:text-primary transition-colors",
                    location.pathname === link.href && "text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
