import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  UtensilsCrossed,
  Waves,
  Leaf,
  Dumbbell,
  Music,
  Check,
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

interface ExperienceDetailModalProps {
  experience: Experience | null;
  open: boolean;
  onClose: () => void;
}

const ExperienceDetailModal = ({ experience, open, onClose }: ExperienceDetailModalProps) => {
  if (!experience) return null;

  const Icon = iconMap[experience.icon] || Sparkles;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-secondary" />
            </div>
            {experience.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-foreground/80 font-body leading-relaxed">
            {experience.fullDescription}
          </p>

          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-3">What We Offer</h4>
            <div className="space-y-2">
              {experience.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <Button variant="gold" className="w-full" onClick={onClose}>
            Inquire About This Experience
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDetailModal;
