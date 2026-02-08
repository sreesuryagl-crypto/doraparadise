import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Maximize, Star, Check } from "lucide-react";
import { Room, formatINR } from "@/data/hotelData";

interface RoomDetailModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onBookNow: (room: Room) => void;
}

const RoomDetailModal = ({ room, open, onClose, onBookNow }: RoomDetailModalProps) => {
  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">{room.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden h-64">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
          </div>

          {/* Price & specs */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">
              <span className="font-heading text-2xl font-bold text-primary">{formatINR(room.price)}</span>
              <span className="text-muted-foreground text-sm font-body ml-1">/night</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground font-body">
              <Maximize className="w-4 h-4" />
              <span>{room.size}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground font-body">
              <Users className="w-4 h-4" />
              <span>Up to {room.guests} Guests</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground/80 font-body leading-relaxed">{room.description}</p>

          {/* Highlights */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" /> Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {room.highlights.map((h) => (
                <div key={h} className="bg-primary/5 border border-primary/20 rounded-md px-3 py-2 text-sm font-body text-foreground/80">
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Facilities</h4>
            <div className="grid grid-cols-2 gap-2">
              {room.facilities.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* GST note */}
          <p className="text-xs text-muted-foreground font-body">
            * All prices are exclusive of 18% GST. Taxes will be calculated at checkout.
          </p>

          <Button variant="gold" size="lg" className="w-full" onClick={() => onBookNow(room)}>
            Book {room.name} — {formatINR(room.price)}/night
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailModal;
