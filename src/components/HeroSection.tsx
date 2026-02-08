import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-resort.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="text-hotel-gold-light text-sm md:text-base tracking-[0.4em] uppercase font-body font-light">
              ✦ Welcome to Coimbatore's Finest ✦
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-hotel-cream leading-tight mb-6">
            Dora Paradise
            <span className="block text-gradient-gold mt-2">Resort & Spa</span>
          </h1>

          <p className="text-hotel-cream/90 text-lg md:text-xl font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the essence of Tamil Nadu luxury in the heart of Coimbatore.
            Where tradition meets modern elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" onClick={() => scrollTo("#rooms")}>
              Book Now
            </Button>
            <Button variant="hero-outline" size="xl" onClick={() => scrollTo("#rooms")}>
              View Rooms
            </Button>
          </div>
        </motion.div>

        {/* Floating Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-16"
        >
          <div className="bg-hotel-dark/60 backdrop-blur-md border border-hotel-gold/20 rounded-lg px-6 py-4 flex items-center gap-3 animate-float">
            <Shield className="w-5 h-5 text-hotel-gold flex-shrink-0" />
            <span className="text-hotel-cream text-sm font-body">Best Price Guarantee</span>
          </div>
          <div className="bg-hotel-dark/60 backdrop-blur-md border border-hotel-gold/20 rounded-lg px-6 py-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
            <Clock className="w-5 h-5 text-hotel-gold flex-shrink-0" />
            <span className="text-hotel-cream text-sm font-body">24/7 Concierge Service</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-hotel-gold/40 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-hotel-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
