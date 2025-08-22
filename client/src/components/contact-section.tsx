import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    phone: "",
    eventType: "",
    message: ""
  });

  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const createInquiryMutation = useMutation({
    mutationFn: async (inquiryData: any) => {
      const response = await apiRequest("POST", "/api/inquiries", inquiryData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        eventType: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiryMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-navy text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="fade-in">
            <h2 className="font-display text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl mb-8 text-blue-100">
              Ready to create unforgettable memories? Let's discuss your event and create the perfect photobooth experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="text-gold mr-4" size={20} />
                <span>+61 400 000 000</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-gold mr-4" size={20} />
                <span>hello@photoboothboutique.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-gold mr-4" size={20} />
                <span>Sydney, Melbourne, Brisbane & Major Cities</span>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <Instagram size={32} />
              </a>
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <Facebook size={32} />
              </a>
              <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                <SiTiktok size={32} />
              </a>
            </div>
          </div>

          <div className="fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-gold focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-gold focus:border-gold"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-gold focus:border-gold"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-gold focus:border-gold"
                  required
                />
              </div>
              <div>
                <Label>Event Type</Label>
                <Select onValueChange={(value) => updateFormData('eventType', value)} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-gold focus:border-gold">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="party">Private Party</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  rows={4} 
                  placeholder="Tell us about your event..." 
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:ring-gold focus:border-gold"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gold text-navy hover:bg-yellow-400 transition-colors font-semibold"
                disabled={createInquiryMutation.isPending}
              >
                {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
