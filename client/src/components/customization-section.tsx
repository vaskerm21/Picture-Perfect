import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const photoTemplates = [
  {
    id: "elegant-wedding",
    name: "Elegant Wedding",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    id: "modern-corporate", 
    name: "Modern Corporate",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    id: "fun-party",
    name: "Fun Party", 
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  }
];

const ledColors = [
  { color: "bg-red-500", name: "red" },
  { color: "bg-blue-500", name: "blue" },
  { color: "bg-green-500", name: "green" },
  { color: "bg-purple-500", name: "purple" },
  { color: "bg-yellow-400", name: "yellow" },
  { color: "bg-pink-500", name: "pink" }
];

const backdrops = [
  {
    id: "silk-flower",
    name: "Silk Flower Wall",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "wooden-rustic",
    name: "Wooden Rustic", 
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "shimmer-wall",
    name: "Shimmer Wall",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "copper-frame",
    name: "Copper Frame",
    image: "https://pixabay.com/get/g484055aed312999bdaffc21336970a1bdc40ed6dcfe8cdb6dc1cd318eaedbca9cda3c9e44118d2d008b2045f00eeecdfb63b68a07d2d66e47ec8e027ad5daa6d_1280.jpg"
  }
];

const addOns = [
  { id: "video-guestbook", name: "Video Guestbook", description: "Interactive video messages from guests", price: 150 },
  { id: "custom-neon", name: "Custom Neon Signs", description: "Personalized LED neon signage", price: 200 },
  { id: "photo-book", name: "Photo Book", description: "Hardcover coffee table photo book", price: 100 }
];

export default function CustomizationSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("elegant-wedding");
  const [selectedLedColor, setSelectedLedColor] = useState<string>("blue");
  const [selectedBackdrop, setSelectedBackdrop] = useState<string>("silk-flower");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalAddOnPrice, setTotalAddOnPrice] = useState(0);

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

  useEffect(() => {
    const total = selectedAddOns.reduce((sum, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    setTotalAddOnPrice(total);
  }, [selectedAddOns]);

  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <section id="customize" className="py-20 bg-gray-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            Customize Your Experience
          </h2>
          <p className="text-xl text-gray-600">
            Personalize every detail of your photobooth experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customization Options */}
          <div className="space-y-8">
            {/* Photo Templates */}
            <div className="fade-in">
              <h3 className="font-display text-2xl font-semibold text-navy mb-4">Photo Templates</h3>
              <div className="grid grid-cols-3 gap-4">
                {photoTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`customization-option border-2 rounded-lg p-2 cursor-pointer transition-colors ${
                      selectedTemplate === template.id ? 'selected border-gold bg-gold/10' : 'border-gray-300 hover:border-gold'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="w-full h-24 object-cover rounded" 
                    />
                    <p className="text-sm text-center mt-2">{template.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LED Lighting */}
            <div className="fade-in">
              <h3 className="font-display text-2xl font-semibold text-navy mb-4">LED Lighting Colors</h3>
              <div className="flex space-x-4">
                {ledColors.map((led) => (
                  <div 
                    key={led.name}
                    className={`w-12 h-12 rounded-full cursor-pointer border-4 transition-colors ${led.color} ${
                      selectedLedColor === led.name ? 'border-gold' : 'border-gray-300 hover:border-gold'
                    }`}
                    onClick={() => setSelectedLedColor(led.name)}
                  />
                ))}
              </div>
            </div>

            {/* Backdrops */}
            <div className="fade-in">
              <h3 className="font-display text-2xl font-semibold text-navy mb-4">Backdrop Selection</h3>
              <div className="grid grid-cols-2 gap-4">
                {backdrops.map((backdrop) => (
                  <div 
                    key={backdrop.id}
                    className={`customization-option border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedBackdrop === backdrop.id ? 'selected border-gold bg-gold/10' : 'border-gray-300 hover:border-gold'
                    }`}
                    onClick={() => setSelectedBackdrop(backdrop.id)}
                  >
                    <img 
                      src={backdrop.image} 
                      alt={backdrop.name} 
                      className="w-full h-32 object-cover rounded mb-2" 
                    />
                    <p className="text-center font-medium">{backdrop.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="fade-in">
              <h3 className="font-display text-2xl font-semibold text-navy mb-4">Add-on Services</h3>
              <div className="space-y-3">
                {addOns.map((addon) => (
                  <div 
                    key={addon.id}
                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-gold transition-colors"
                    onClick={() => handleAddOnToggle(addon.id)}
                  >
                    <Checkbox 
                      checked={selectedAddOns.includes(addon.id)}
                      onChange={() => handleAddOnToggle(addon.id)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-medium">{addon.name}</span>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                    <span className="ml-auto font-semibold text-gold">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="fade-in">
            <Card className="bg-white sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-semibold text-navy mb-4 text-center">Live Preview</h3>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
                    alt="Photobooth preview" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-medium">Your Custom Photobooth</p>
                    <p className="text-sm opacity-90">Preview updates as you select options</p>
                  </div>
                  {/* LED Color Indicator */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full ${ledColors.find(c => c.name === selectedLedColor)?.color} border-2 border-white`} />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Selected Package:</span>
                    <span className="font-semibold">3 Hour - $425</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add-ons:</span>
                    <span className="font-semibold">${totalAddOnPrice}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-gold">${425 + totalAddOnPrice}</span>
                  </div>
                  
                  {/* Selected Options Summary */}
                  <div className="mt-4 pt-4 border-t text-sm">
                    <p><strong>Template:</strong> {photoTemplates.find(t => t.id === selectedTemplate)?.name}</p>
                    <p><strong>LED Color:</strong> {selectedLedColor}</p>
                    <p><strong>Backdrop:</strong> {backdrops.find(b => b.id === selectedBackdrop)?.name}</p>
                    {selectedAddOns.length > 0 && (
                      <p><strong>Add-ons:</strong> {selectedAddOns.map(id => addOns.find(a => a.id === id)?.name).join(', ')}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
