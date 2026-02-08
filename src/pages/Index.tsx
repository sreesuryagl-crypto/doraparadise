import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RoomsSection from "@/components/RoomsSection";
import ExperienceSection from "@/components/ExperienceSection";
import OffersSection from "@/components/OffersSection";
import ContactSection from "@/components/ContactSection";
import HotelFooter from "@/components/HotelFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <RoomsSection />
      <ExperienceSection />
      <OffersSection />
      <ContactSection />
      <HotelFooter />
    </div>
  );
};

export default Index;
