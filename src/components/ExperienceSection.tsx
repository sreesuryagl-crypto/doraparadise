import { useState } from "react";
import { motion } from "framer-motion";
import { experiences, Experience } from "@/data/hotelData";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceDetailModal from "@/components/ExperienceDetailModal";

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (exp: Experience) => {
    setSelectedExp(exp);
    setModalOpen(true);
  };

  return (
    <section id="experience" className="section-padding bg-hotel-dark">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-hotel-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
            Discover
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-hotel-cream mt-3 mb-4">
            The Dora Experience
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="text-hotel-cream/60 font-body max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the rich cultural tapestry of Tamil Nadu through our curated
            collection of experiences, each designed to rejuvenate body, mind, and soul.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      <ExperienceDetailModal
        experience={selectedExp}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default ExperienceSection;
