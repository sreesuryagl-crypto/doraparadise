import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="section-padding bg-hotel-dark">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-hotel-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-hotel-cream mt-3 mb-4">
            Contact Us
          </h2>
          <div className="divider-gold w-24 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold text-hotel-gold mb-6">
                We'd Love to Hear From You
              </h3>
              <p className="text-hotel-cream/70 font-body leading-relaxed">
                Whether you're planning a romantic getaway, a family vacation, or a corporate retreat,
                our team is here to make your stay truly unforgettable.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-hotel-dark-lighter border border-hotel-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-hotel-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-hotel-gold mb-1">Address</h4>
                  <p className="text-hotel-cream font-body text-sm leading-relaxed">
                    Dora Paradise Resort, 105, Race Course Rd,<br />
                    Gopalapuram, Coimbatore, Tamil Nadu – 641018
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-hotel-dark-lighter border border-hotel-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-hotel-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-hotel-gold mb-1">Phone</h4>
                  <p className="text-hotel-cream font-body text-sm">
                    +91 89409 02418<br />
                    +91 94438 96463
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-hotel-dark-lighter border border-hotel-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-hotel-gold" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-hotel-gold mb-1">Email</h4>
                  <p className="text-hotel-cream font-body text-sm">
                    reservations@doraparadise.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-hotel-dark-lighter border border-hotel-gold/10 rounded-xl p-6 md:p-8 space-y-5">
              <div className="space-y-2">
                <Label className="font-body text-sm text-hotel-cream/80">Your Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                  className="bg-hotel-dark border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm text-hotel-cream/80">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-hotel-dark border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm text-hotel-cream/80">Message</Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  required
                  rows={5}
                  className="bg-hotel-dark border-hotel-gold/20 text-hotel-cream placeholder:text-hotel-cream/30 focus:border-hotel-gold resize-none"
                />
              </div>
              <Button variant="gold" size="lg" className="w-full" type="submit">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
