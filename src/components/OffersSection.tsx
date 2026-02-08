import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Star, Percent } from "lucide-react";

const OffersSection = () => {
  const scrollToRooms = () => {
    document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="offers" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-body font-medium">
            Exclusive
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            20% Off Luxury Offer
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 shadow-gold relative overflow-hidden">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-2xl" />

            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto">
                <Percent className="w-10 h-10 text-secondary" />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Loyalty Rewards Program
              </h3>

              <p className="text-muted-foreground font-body leading-relaxed max-w-xl mx-auto">
                At Dora Paradise, we believe in rewarding our cherished guests. Complete your
                second booking and unlock an exclusive <span className="text-primary font-semibold">20% discount</span> on
                your stay — our way of saying thank you for choosing us.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <div className="bg-muted rounded-xl p-5 text-center">
                  <Gift className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="font-heading text-lg font-semibold text-foreground block">Book Twice</span>
                  <span className="text-muted-foreground text-xs font-body">Complete 2 bookings</span>
                </div>
                <div className="bg-muted rounded-xl p-5 text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="font-heading text-lg font-semibold text-foreground block">Unlock 20%</span>
                  <span className="text-muted-foreground text-xs font-body">Automatic discount</span>
                </div>
                <div className="bg-muted rounded-xl p-5 text-center">
                  <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
                  <span className="font-heading text-lg font-semibold text-foreground block">Save Big</span>
                  <span className="text-muted-foreground text-xs font-body">On every future stay</span>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-body text-foreground/80 italic">
                  "Congratulations! You've unlocked a 20% loyalty discount on your second booking."
                </p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  — Message displayed to eligible guests
                </p>
              </div>

              <Button variant="gold" size="xl" onClick={scrollToRooms}>
                Book Now & Start Earning
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
