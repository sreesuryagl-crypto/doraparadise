import { Crown } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Rooms & Suites", href: "#rooms" },
    { label: "Dora Experience", href: "#experience" },
    { label: "Special Offers", href: "#offers" },
    { label: "Contact Us", href: "#contact" },
  ],
  services: [
    { label: "Spa & Wellness", href: "#experience" },
    { label: "Fine Dining", href: "#experience" },
    { label: "Events & Meetings", href: "#contact" },
    { label: "Airport Transfer", href: "#contact" },
  ],
};

const HotelFooter = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-hotel-dark border-t border-hotel-gold/10">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-7 h-7 text-hotel-gold" />
              <span className="font-heading text-xl font-bold text-hotel-cream">
                Dora Paradise
              </span>
            </div>
            <p className="text-hotel-cream/60 font-body text-sm leading-relaxed max-w-sm mb-6">
              A sanctuary of Tamil Nadu luxury in the heart of Coimbatore. Where centuries-old
              traditions meet contemporary elegance, creating unforgettable experiences for every guest.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 border border-hotel-gold/20 rounded-full flex items-center justify-center text-hotel-cream/60 hover:text-hotel-gold hover:border-hotel-gold/50 transition-colors font-body text-xs"
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-hotel-gold mb-4 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-hotel-cream/60 hover:text-hotel-gold font-body text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-hotel-gold mb-4 tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-hotel-cream/60 hover:text-hotel-gold font-body text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-hotel-cream/40 font-body text-xs">
            © {new Date().getFullYear()} Dora Paradise Resort & Spa. All rights reserved.
          </p>
          <p className="text-hotel-cream/40 font-body text-xs">
            GST No: 33AABCD1234F1ZP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HotelFooter;
