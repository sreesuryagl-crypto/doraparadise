import { motion } from "framer-motion";
import {
  Sparkles,
  UtensilsCrossed,
  Waves,
  Leaf,
  Dumbbell,
  Music,
  type LucideIcon,
} from "lucide-react";
import { Experience } from "@/data/hotelData";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  UtensilsCrossed,
  Waves,
  Leaf,
  Dumbbell,
  Music,
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onClick: (experience: Experience) => void;
}

const ExperienceCard = ({ experience, index, onClick }: ExperienceCardProps) => {
  const Icon = iconMap[experience.icon] || Sparkles;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(experience)}
      className="group bg-hotel-dark-lighter border border-hotel-gold/10 rounded-xl p-6 text-left hover:border-hotel-gold/40 transition-all duration-500 hover:shadow-gold"
    >
      <div className="w-14 h-14 bg-gradient-gold rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-secondary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-hotel-cream mb-2">
        {experience.name}
      </h3>
      <p className="text-hotel-cream/60 font-body text-sm leading-relaxed">
        {experience.shortDescription}
      </p>
      <span className="inline-block mt-4 text-hotel-gold text-sm font-body font-medium group-hover:translate-x-1 transition-transform duration-300">
        Explore →
      </span>
    </motion.button>
  );
};

export default ExperienceCard;
