import { Instagram, Facebook, Phone, Mail, Clock } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Photobooth Boutique</h3>
            <p className="text-gray-300 mb-4">Creating unforgettable moments with premium photobooth experiences across Australia.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <SiTiktok size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">Wedding Photobooths</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Corporate Events</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Private Parties</a></li>
              <li><a href="#customize" className="hover:text-white transition-colors">Custom Experiences</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Coverage Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Sydney & Surrounds</li>
              <li>Melbourne & Victoria</li>
              <li>Brisbane & Gold Coast</li>
              <li>Adelaide & South Australia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Phone className="text-gold mr-2" size={16} />
                +61 400 000 000
              </p>
              <p className="flex items-center">
                <Mail className="text-gold mr-2" size={16} />
                hello@photoboothboutique.com
              </p>
              <p className="flex items-center">
                <Clock className="text-gold mr-2" size={16} />
                Mon-Sun: 9AM-9PM
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Photobooth Boutique. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
