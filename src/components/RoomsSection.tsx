import { useState } from "react";
import { motion } from "framer-motion";
import { rooms, Room } from "@/data/hotelData";
import RoomCard from "@/components/RoomCard";
import RoomDetailModal from "@/components/RoomDetailModal";
import BookingModal from "@/components/BookingModal";

const RoomsSection = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setDetailOpen(true);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setDetailOpen(false);
    setBookingOpen(true);
  };

  return (
    <section id="rooms" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase font-body font-medium">
            Accommodation
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Rooms & Suites
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Each room at Dora Paradise is a sanctuary of comfort, designed with the elegance
            of Tamil Nadu's royal heritage and the finest modern amenities.
          </p>
        </motion.div>

        {/* Room cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <RoomDetailModal
        room={selectedRoom}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onBookNow={handleBookNow}
      />
      <BookingModal
        room={selectedRoom}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
};

export default RoomsSection;
