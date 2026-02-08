import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomPremium from "@/assets/room-premium.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomFamily from "@/assets/room-family.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

export interface Room {
  id: string;
  name: string;
  price: number;
  size: string;
  guests: number;
  image: string;
  description: string;
  facilities: string[];
  highlights: string[];
}

export interface Experience {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}

export const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    price: 5500,
    size: "350 sq ft",
    guests: 2,
    image: roomDeluxe,
    description: "Experience refined comfort in our Deluxe Room, adorned with traditional Tamil Nadu décor and modern luxury amenities. Perfect for couples seeking an intimate retreat in the heart of Coimbatore.",
    facilities: ["King-size Bed", "Wi-Fi", "Smart TV", "Mini Bar", "Room Service", "Rain Shower", "Air Conditioning", "Safe Deposit Box"],
    highlights: ["City view", "Handcrafted Tamil artwork", "Premium bath amenities"],
  },
  {
    id: "premium-deluxe",
    name: "Premium Deluxe Room",
    price: 7500,
    size: "450 sq ft",
    guests: 2,
    image: roomPremium,
    description: "Elevate your stay in our Premium Deluxe Room featuring a private balcony with stunning views of the Western Ghats. Inspired by Coimbatore's rich textile heritage, every detail speaks of luxury.",
    facilities: ["King-size Bed", "Private Balcony", "Wi-Fi", "55\" Smart TV", "Mini Bar", "Bathtub & Rain Shower", "Lounge Seating", "Nespresso Machine"],
    highlights: ["Mountain view balcony", "Silk-inspired interiors", "Butler service"],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    price: 12000,
    size: "650 sq ft",
    guests: 3,
    image: roomExecutive,
    description: "Our Executive Suite offers a separate living area with panoramic views. Designed for discerning travelers, it blends contemporary elegance with the grandeur of Tamil Nadu's palatial traditions.",
    facilities: ["King-size Bed", "Separate Living Area", "Work Desk", "Wi-Fi", "65\" Smart TV", "Full Bar", "Jacuzzi Bathtub", "Walk-in Closet"],
    highlights: ["Panoramic city view", "Dedicated concierge", "Complimentary spa session"],
  },
  {
    id: "family-suite",
    name: "Family Suite",
    price: 15000,
    size: "900 sq ft",
    guests: 4,
    image: roomFamily,
    description: "Perfect for families, this expansive suite features interconnected rooms with child-friendly amenities. Enjoy the warmth of Tamil hospitality with space for everyone to relax and create memories.",
    facilities: ["King + Twin Beds", "Living & Dining Area", "Kids' Corner", "Wi-Fi", "Two Smart TVs", "Kitchenette", "Double Bathroom", "Balcony"],
    highlights: ["Family activity packages", "Child-safe amenities", "Garden view"],
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    price: 25000,
    size: "1400 sq ft",
    guests: 4,
    image: roomPresidential,
    description: "The crown jewel of Dora Paradise, our Presidential Suite is a testament to opulence. With hand-laid marble floors, crystal chandeliers, and bespoke furnishings inspired by Tamil Nadu's royal heritage.",
    facilities: ["Master Bedroom", "Grand Living Room", "Private Dining", "Study Room", "75\" Smart TV", "Premium Bar", "Marble Jacuzzi", "Walk-in Wardrobe"],
    highlights: ["360° panoramic views", "Private chef available", "Rolls-Royce airport transfer"],
  },
];

export const experiences: Experience[] = [
  {
    id: "spa",
    name: "Royal Spa & Wellness",
    icon: "Sparkles",
    shortDescription: "Traditional Tamil wellness treatments and Ayurvedic therapies",
    fullDescription: "Immerse yourself in centuries-old Tamil Nadu healing traditions at our Royal Spa. Our expert therapists combine ancient Siddha medicine with Ayurvedic practices, using locally sourced herbs and oils from the Nilgiri hills.",
    features: ["Siddha oil massages", "Ayurvedic body wraps", "Herbal steam therapy", "Couple's treatment rooms", "Meditation garden"],
  },
  {
    id: "dining",
    name: "Fine Dining",
    icon: "UtensilsCrossed",
    shortDescription: "South Indian cuisine with Coimbatore specialties",
    fullDescription: "Savour the finest flavours of Tamil Nadu at our signature restaurants. From traditional Kongunadu cuisine to contemporary interpretations of South Indian classics, every dish tells a story of Coimbatore's culinary heritage.",
    features: ["Kongunadu specialties", "Live cooking stations", "Vintage wine cellar", "Private dining rooms", "Rooftop bar"],
  },
  {
    id: "pool",
    name: "Infinity Pool",
    icon: "Waves",
    shortDescription: "Luxury pool experience with Tamil architectural elements",
    fullDescription: "Our temperature-controlled infinity pool overlooks the majestic Western Ghats, framed by traditional Tamil Nadu temple-inspired architecture. Relax in private cabanas while our attentive staff brings refreshments to your lounger.",
    features: ["Heated infinity pool", "Private cabanas", "Poolside dining", "Children's pool", "Sunset cocktail service"],
  },
  {
    id: "yoga",
    name: "Yoga Retreat",
    icon: "Leaf",
    shortDescription: "Traditional Tamil yoga and meditation practices",
    fullDescription: "Begin your day with sunrise yoga overlooking the Noyyal River valley. Our certified yoga masters guide you through traditional Tamil yoga practices rooted in Thirumoolar's Thirumanthiram, one of the oldest yoga texts.",
    features: ["Sunrise yoga sessions", "Pranayama workshops", "Meditation gardens", "Private yoga lessons", "Wellness consultations"],
  },
  {
    id: "fitness",
    name: "Fitness Centre",
    icon: "Dumbbell",
    shortDescription: "Modern fitness with traditional wellness approaches",
    fullDescription: "State-of-the-art fitness equipment meets traditional Indian wellness at our comprehensive fitness centre. Personal trainers blend modern exercise science with ancient Kalari martial arts techniques from South India.",
    features: ["Latest Technogym equipment", "Personal training", "Kalari sessions", "Steam & sauna", "Juice bar"],
  },
  {
    id: "cultural",
    name: "Cultural Experiences",
    icon: "Music",
    shortDescription: "Tamil Nadu cultural experiences and local traditions",
    fullDescription: "Discover the rich cultural tapestry of Coimbatore through curated experiences. From classical Bharatanatyam performances to hands-on Kanchipuram silk weaving workshops, immerse yourself in the living traditions of Tamil Nadu.",
    features: ["Bharatanatyam performances", "Temple architecture tours", "Silk weaving workshops", "Tamil cooking classes", "Classical music evenings"],
  },
];

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
