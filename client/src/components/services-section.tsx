import { useEffect, useRef } from "react";
import { Building, Heart, PartyPopper, Check } from "lucide-react";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            Premium Photobooth Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your events with our luxury photobooth experiences, featuring cutting-edge technology and elegant design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Corporate Events */}
          <div className="fade-in bg-cream rounded-xl p-8 text-center package-card">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Corporate photobooth event" 
              className="w-full h-48 object-cover rounded-lg mb-6" 
            />
            <Building className="text-4xl text-gold mb-4 mx-auto" />
            <h3 className="font-display text-2xl font-semibold text-navy mb-4">Corporate Events</h3>
            <p className="text-gray-600 mb-6">Professional photobooth experiences for corporate parties, product launches, and team building events.</p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Custom branded templates</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Professional attendant</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Instant social sharing</li>
            </ul>
          </div>

          {/* Weddings */}
          <div className="fade-in bg-cream rounded-xl p-8 text-center package-card">
            <img 
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Wedding photobooth setup" 
              className="w-full h-48 object-cover rounded-lg mb-6" 
            />
            <Heart className="text-4xl text-gold mb-4 mx-auto" />
            <h3 className="font-display text-2xl font-semibold text-navy mb-4">Wedding Celebrations</h3>
            <p className="text-gray-600 mb-6">Romantic and elegant photobooth setups that capture the magic of your special day.</p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Luxury backdrops & props</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Guest book creation</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Unlimited prints</li>
            </ul>
          </div>

          {/* Private Parties */}
          <div className="fade-in bg-cream rounded-xl p-8 text-center package-card">
            <img 
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Party photobooth with fun props" 
              className="w-full h-48 object-cover rounded-lg mb-6" 
            />
            <PartyPopper className="text-4xl text-gold mb-4 mx-auto" />
            <h3 className="font-display text-2xl font-semibold text-navy mb-4">Private Parties</h3>
            <p className="text-gray-600 mb-6">Fun and interactive photobooth experiences for birthdays, anniversaries, and celebrations.</p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Custom themed props</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />LED color customization</li>
              <li className="flex items-center"><Check className="text-gold mr-2 h-4 w-4" />Digital photo sharing</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
