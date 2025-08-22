import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TrustedCompaniesBanner from "@/components/trusted-companies-banner";
import ServicesSection from "@/components/services-section";
import GallerySection from "@/components/gallery-section";
import BookingSection from "@/components/booking-section";
import CustomizationSection from "@/components/customization-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-sans bg-gray-50">
      <Navigation />
      <HeroSection />
      <TrustedCompaniesBanner />
      <ServicesSection />
      <GallerySection />
      <BookingSection />
      <CustomizationSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
