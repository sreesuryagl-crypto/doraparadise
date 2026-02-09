import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Crown, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dora Experience", href: "#experience" },
  { label: "20% Off Luxury Offer", href: "#offers" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-hotel-dark/95 backdrop-blur-md shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#home")}
          className="flex items-center gap-2 group"
        >
          <Crown className="w-8 h-8 text-hotel-gold transition-transform duration-300 group-hover:scale-110" />
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg md:text-xl font-bold text-hotel-cream tracking-wide">
              Dora Paradise
            </span>
            <span className="text-[10px] md:text-xs text-hotel-gold-light tracking-[0.25em] uppercase font-body">
              Resort & Spa
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-2 text-sm font-body text-hotel-cream/80 hover:text-hotel-gold transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs text-hotel-gold-light font-body tracking-widest uppercase border border-hotel-gold/30 px-3 py-1 rounded-full">
            INR
          </span>
          {user && (
            <span className="text-xs text-hotel-cream/60 font-body truncate max-w-[140px]">
              {user.email}
            </span>
          )}
          <Button variant="gold" size="sm" onClick={() => scrollToSection("#rooms")}>
            Book Now
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut} className="text-hotel-cream/60 hover:text-hotel-gold">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-hotel-cream hover:text-hotel-gold">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-hotel-dark border-hotel-dark-lighter w-80">
            <div className="flex flex-col gap-2 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-3 text-hotel-cream/80 hover:text-hotel-gold hover:bg-hotel-dark-lighter rounded-md transition-colors font-body tracking-wide"
                >
                  {link.label}
                </button>
              ))}
              <div className="divider-gold my-4" />
              <Button variant="gold" className="mx-4" onClick={() => scrollToSection("#rooms")}>
                Book Now
              </Button>
              {user && (
                <Button variant="ghost" className="mx-4 text-hotel-cream/60 hover:text-hotel-gold" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
