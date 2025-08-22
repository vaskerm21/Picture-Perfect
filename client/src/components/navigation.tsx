import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="font-display text-2xl font-bold text-navy">Photobooth Boutique</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-charcoal hover:text-navy transition-colors">Services</a>
            <a href="#gallery" className="text-charcoal hover:text-navy transition-colors">Gallery</a>
            <a href="#booking" className="text-charcoal hover:text-navy transition-colors">Booking</a>
            <a href="#customize" className="text-charcoal hover:text-navy transition-colors">Customize</a>
            <a href="#contact" className="text-charcoal hover:text-navy transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:block">
            <Button 
              className="bg-gold text-navy hover:bg-yellow-600 transition-colors"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-charcoal hover:text-navy transition-colors" onClick={() => setIsOpen(false)}>Services</a>
              <a href="#gallery" className="text-charcoal hover:text-navy transition-colors" onClick={() => setIsOpen(false)}>Gallery</a>
              <a href="#booking" className="text-charcoal hover:text-navy transition-colors" onClick={() => setIsOpen(false)}>Booking</a>
              <a href="#customize" className="text-charcoal hover:text-navy transition-colors" onClick={() => setIsOpen(false)}>Customize</a>
              <a href="#contact" className="text-charcoal hover:text-navy transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
              <Button 
                className="bg-gold text-navy hover:bg-yellow-600 transition-colors w-fit"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
