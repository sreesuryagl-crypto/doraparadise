import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room, rooms, formatINR } from "@/data/hotelData";
import { CalendarDays, Users, CreditCard, CheckCircle, Percent } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BookingModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ room, open, onClose }: BookingModalProps) => {
  const { user } = useAuth();
  const { profile, refreshProfile } = useUserProfile();
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [selectedRoomId, setSelectedRoomId] = useState(room?.id || "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);

  // Pre-fill user details from profile
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  useEffect(() => {
    if (room) setSelectedRoomId(room.id);
  }, [room]);

  const activeRoom = rooms.find((r) => r.id === (selectedRoomId || room?.id)) || room;

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  // Loyalty discount: user gets 20% off on their 2nd booking (when total_bookings == 1, meaning they already have 1 booking)
  const isEligibleForDiscount = profile?.offer_eligible === true;
  const discountRate = isEligibleForDiscount ? 0.20 : 0;

  const baseAmount = (activeRoom?.price || 0) * nights;
  const discountAmount = baseAmount * discountRate;
  const afterDiscount = baseAmount - discountAmount;
  const gst = afterDiscount * 0.18;
  const totalAmount = afterDiscount + gst;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = async () => {
    if (!user || !activeRoom) return;
    setPaying(true);

    try {
      // 1. Insert booking record
      const { error: bookingError } = await supabase.from("bookings").insert({
        user_id: user.id,
        room_type: activeRoom.name,
        amount: totalAmount,
        gst_amount: gst,
        discount_applied: isEligibleForDiscount,
        check_in: checkIn,
        check_out: checkOut,
        guests: parseInt(guests),
        status: "confirmed",
      });

      if (bookingError) throw bookingError;

      // 2. Increment total_bookings and set offer_eligible
      const newTotalBookings = (profile?.total_bookings || 0) + 1;
      // User becomes eligible for 20% discount after their 1st booking (so discount applies on 2nd booking)
      const newOfferEligible = newTotalBookings >= 1;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          total_bookings: newTotalBookings,
          offer_eligible: newOfferEligible,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // If discount was used, reset offer_eligible so it's one-time use
      if (isEligibleForDiscount) {
        await supabase
          .from("profiles")
          .update({ offer_eligible: false })
          .eq("id", user.id);
      }

      await refreshProfile();
      setStep("success");
    } catch (error: any) {
      toast.error(error.message || "Booking failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setCheckIn("");
    setCheckOut("");
    setGuests("2");
    setPhone("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">
            {step === "form" && "Book Your Stay"}
            {step === "payment" && "Payment Details"}
            {step === "success" && "Booking Confirmed!"}
          </DialogTitle>
        </DialogHeader>

        {/* Loyalty discount banner */}
        {step === "form" && isEligibleForDiscount && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
              <Percent className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-body font-semibold text-foreground">
                🎉 20% Loyalty Discount Applied!
              </p>
              <p className="text-xs font-body text-muted-foreground">
                Congratulations! You've unlocked a 20% loyalty discount on this booking.
              </p>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmitBooking} className="space-y-5">
            {/* Room Selection */}
            <div className="space-y-2">
              <Label className="font-body text-sm">Room Type</Label>
              <Select
                value={selectedRoomId || room?.id || ""}
                onValueChange={setSelectedRoomId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} — {formatINR(r.price)}/night
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body text-sm flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Check-in
                </Label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Check-out
                </Label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                  min={checkIn || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="font-body text-sm flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Number of Guests
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Guest details */}
            <div className="space-y-2">
              <Label className="font-body text-sm">Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body text-sm">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Phone</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            {/* Booking summary */}
            <div className="bg-muted rounded-lg p-4 space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium text-foreground">{activeRoom?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{nights} Night{nights > 1 ? "s" : ""}</span>
                <span className="text-foreground">{formatINR(baseAmount)}</span>
              </div>
              {isEligibleForDiscount && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>🎉 Loyalty Discount (20%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{formatINR(gst)}</span>
              </div>
              <div className="divider-gold my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full" type="submit">
              Proceed to Payment
            </Button>
          </form>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-muted rounded-lg p-4 space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium text-foreground">{activeRoom?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dates</span>
                <span className="text-foreground">{checkIn} — {checkOut}</span>
              </div>
              {isEligibleForDiscount && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>🎉 20% Loyalty Discount</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">{formatINR(totalAmount)}</span>
              </div>
            </div>

            {/* Payment options */}
            <div className="space-y-3">
              <Label className="font-body text-sm font-semibold">Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-primary rounded-lg p-4 text-center font-body text-sm hover:bg-primary/5 transition-colors">
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
                  Card
                </button>
                <button className="border-2 border-border rounded-lg p-4 text-center font-body text-sm hover:border-primary hover:bg-primary/5 transition-colors">
                  <span className="text-lg font-bold block mb-0.5">UPI</span>
                  UPI Payment
                </button>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full" onClick={handlePayment} disabled={paying}>
              {paying ? "Processing..." : `Confirm Payment — ${formatINR(totalAmount)}`}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep("form")} disabled={paying}>
              Back to Booking
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Thank you, {name}! Your reservation at Dora Paradise Resort has been confirmed.
                A confirmation email has been sent to {email}.
              </p>
              {profile && profile.total_bookings === 1 && (
                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-3">
                  <p className="text-sm font-body font-semibold text-primary">
                    🎁 Great news! Your next booking will include a 20% loyalty discount!
                  </p>
                </div>
              )}
            </div>
            <div className="bg-muted rounded-lg p-4 text-left space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium text-foreground">{activeRoom?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span className="text-foreground">{checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span className="text-foreground">{checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span className="text-foreground">{guests}</span>
              </div>
              <div className="divider-gold my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total Paid</span>
                <span className="text-primary">{formatINR(totalAmount)}</span>
              </div>
            </div>
            <Button variant="gold" className="w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
