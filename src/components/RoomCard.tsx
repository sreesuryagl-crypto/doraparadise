import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Maximize } from "lucide-react";
import { Room, formatINR } from "@/data/hotelData";

interface RoomCardProps {
  room: Room;
  index: number;
  onViewDetails: (room: Room) => void;
  onBookNow: (room: Room) => void;
}

const RoomCard = ({ room, index, onViewDetails, onBookNow }: RoomCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full font-body text-sm font-semibold">
          {formatINR(room.price)}
          <span className="text-xs font-normal opacity-80"> /night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{room.name}</h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-body">
            <Maximize className="w-4 h-4" />
            <span>{room.size}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-body">
            <Users className="w-4 h-4" />
            <span>{room.guests} Guests</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5 line-clamp-2">
          {room.description}
        </p>

        {/* Facilities preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.facilities.slice(0, 4).map((f) => (
            <span
              key={f}
              className="text-xs font-body px-2.5 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {f}
            </span>
          ))}
          {room.facilities.length > 4 && (
            <span className="text-xs font-body px-2.5 py-1 bg-muted rounded-full text-primary font-medium">
              +{room.facilities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="gold-outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(room)}
          >
            View Details
          </Button>
          <Button
            variant="gold"
            size="sm"
            className="flex-1"
            onClick={() => onBookNow(room)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
