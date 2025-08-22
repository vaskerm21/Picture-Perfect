import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check } from "lucide-react";

interface PackageData {
  type: "2-hour" | "3-hour" | "4-hour";
  price: number;
  name: string;
  features: string[];
  popular?: boolean;
}

const packages: PackageData[] = [
  {
    type: "2-hour",
    price: 350,
    name: "2 Hour Package",
    features: [
      "Unlimited Digital Pictures",
      "Custom Digital Layouts", 
      "Professional Attendant",
      "Free Travel (within service area)",
      "MMS & Email Sharing"
    ]
  },
  {
    type: "3-hour", 
    price: 425,
    name: "3 Hour Package",
    popular: true,
    features: [
      "All 2-Hour features",
      "Extended photo session",
      "Premium prop selection", 
      "Custom backdrop options",
      "USB with all photos"
    ]
  },
  {
    type: "4-hour",
    price: 550, 
    name: "4 Hour Package",
    features: [
      "All 3-Hour features",
      "Video guest book",
      "Photo book creation",
      "Custom neon signage", 
      "Social media integration"
    ]
  }
];

// Generate upcoming dates for the date picker
const generateUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate(),
      fullDate: date.toISOString().split('T')[0]
    });
  }
  return dates;
};

// Available time slots
const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
];

export default function BookingSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageData>(packages[1]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    venueAddress: "",
    numberOfGuests: "",
    paymentMethod: ""
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Successful!",
        description: "Your photobooth booking has been confirmed. We'll contact you soon with payment details.",
      });
      // Reset form
      setCurrentStep(1);
      setSelectedDate("");
      setSelectedTime("");
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        eventDate: "",
        eventTime: "",
        eventType: "",
        venueAddress: "",
        numberOfGuests: "",
        paymentMethod: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
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

  // Sync selected date and time with form data
  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, eventDate: selectedDate }));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      setFormData(prev => ({ ...prev, eventTime: selectedTime }));
    }
  }, [selectedTime]);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const depositAmount = Math.round(selectedPackage.price * 0.3);
    
    const bookingData = {
      ...formData,
      packageType: selectedPackage.type,
      packagePrice: selectedPackage.price,
      totalPrice: selectedPackage.price,
      depositAmount,
      selectedCustomizations: {},
      addOns: {},
      paymentStatus: "pending",
      bookingStatus: "pending"
    };

    createBookingMutation.mutate(bookingData);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            Book Your Experience
          </h2>
          <p className="text-xl text-gray-600">
            Choose your package and customize your photobooth experience
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  step <= currentStep ? 'bg-gold text-navy' : 'bg-gray-300 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && <div className="w-16 h-1 bg-gray-300 mx-2" />}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 text-sm text-gray-600">
            <span className={currentStep === 1 ? 'font-medium text-navy' : ''}>Package</span>
            <span className={currentStep === 2 ? 'font-medium text-navy' : ''}>Date & Time</span>
            <span className={currentStep === 3 ? 'font-medium text-navy' : ''}>Booking Details</span>
          </div>
        </div>

        {/* Step 1: Package Selection */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card 
                key={pkg.type}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPackage.type === pkg.type ? 'border-gold bg-gradient-to-br from-gold/10 to-transparent' : 'border-gray-200'
                } ${pkg.popular ? 'relative' : ''}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-display text-2xl font-semibold text-navy mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-gold mb-4">${pkg.price}</div>
                    <ul className="text-left space-y-2 text-gray-600 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="text-gold mr-2 h-4 w-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-gold text-navy hover:bg-yellow-600 transition-colors"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        nextStep();
                      }}
                    >
                      Select Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Event Details */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-cream">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-semibold text-navy mb-6 text-center">Date and Time</h3>
                <div className="space-y-8">
                  
                  {/* Date Selection */}
                  <div>
                    <p className="text-center text-lg text-gray-600 mb-6">
                      {selectedDate ? 
                        new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 
                        'Select your event date'
                      }
                    </p>
                    <div className="flex overflow-x-auto gap-3 pb-2">
                      {generateUpcomingDates().map((dateItem, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(dateItem.fullDate)}
                          className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:border-primary ${
                            selectedDate === dateItem.fullDate
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="text-sm text-gray-600">{dateItem.dayName}</span>
                          <span className="text-xl font-semibold">{dateItem.dayNumber}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Choose a time:</h4>
                    <p className="text-gray-600 mb-6">The event should take about {selectedPackage.type.split('-')[0]} hours.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(time)}
                          className={`p-4 rounded-lg border-2 text-center transition-all hover:border-primary ${
                            selectedTime === time
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Event Type</Label>
                    <Select onValueChange={(value) => updateFormData('eventType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="venueAddress" className="text-sm font-medium text-gray-700 mb-2">Venue Address</Label>
                    <Input 
                      id="venueAddress"
                      placeholder="Enter event venue address" 
                      value={formData.venueAddress}
                      onChange={(e) => updateFormData('venueAddress', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">Number of Guests</Label>
                    <Select onValueChange={(value) => updateFormData('numberOfGuests', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25-50">25-50</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100-200">100-200</SelectItem>
                        <SelectItem value="200+">200+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Continue Button */}
                  <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={previousStep}>
                      Previous
                    </Button>
                    <Button 
                      className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
                      onClick={nextStep}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Booking Details & Payment */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-cream">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-semibold text-navy mb-6 text-center">Booking Details</h3>
                
                <div className="space-y-8">
                  {/* Event Details */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Event Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Event Type</Label>
                        <Select onValueChange={(value) => updateFormData('eventType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2">Number of Guests</Label>
                        <Select onValueChange={(value) => updateFormData('numberOfGuests', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25-50">25-50</SelectItem>
                            <SelectItem value="50-100">50-100</SelectItem>
                            <SelectItem value="100-200">100-200</SelectItem>
                            <SelectItem value="200+">200+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="venueAddress" className="text-sm font-medium text-gray-700 mb-2">Venue Address</Label>
                      <Input 
                        id="venueAddress"
                        placeholder="Enter event venue address" 
                        value={formData.venueAddress}
                        onChange={(e) => updateFormData('venueAddress', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Contact & Payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
                      <div className="space-y-4">
                        <Input 
                          placeholder="Full Name" 
                          value={formData.customerName}
                          onChange={(e) => updateFormData('customerName', e.target.value)}
                        />
                        <Input 
                          type="email" 
                          placeholder="Email Address" 
                          value={formData.customerEmail}
                          onChange={(e) => updateFormData('customerEmail', e.target.value)}
                        />
                        <Input 
                          type="tel" 
                          placeholder="Phone Number" 
                          value={formData.customerPhone}
                          onChange={(e) => updateFormData('customerPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Payment Method</h4>
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={(value) => updateFormData('paymentMethod', value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <label htmlFor="paypal" className="ml-3 flex items-center cursor-pointer">
                          <span className="text-blue-600 mr-2">💳</span>
                          PayPal
                        </label>
                      </div>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                        <RadioGroupItem value="venmo" id="venmo" />
                        <label htmlFor="venmo" className="ml-3 flex items-center cursor-pointer">
                          <span className="text-blue-500 mr-2">💰</span>
                          Venmo
                        </label>
                      </div>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                        <RadioGroupItem value="cashapp" id="cashapp" />
                        <label htmlFor="cashapp" className="ml-3 flex items-center cursor-pointer">
                          <span className="text-green-500 mr-2">💵</span>
                          CashApp
                        </label>
                      </div>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg">
                        <RadioGroupItem value="applepay" id="applepay" />
                        <label htmlFor="applepay" className="ml-3 flex items-center cursor-pointer">
                          <span className="text-black mr-2">🍎</span>
                          Apple Pay
                        </label>
                      </div>
                    </RadioGroup>
                    </div>
                  </div>
                </div>
                
                <Card className="mt-8 bg-white">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Booking Summary</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span>{selectedPackage.name}</span>
                      <span className="font-semibold">${selectedPackage.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>Deposit (30%)</span>
                      <span>${Math.round(selectedPackage.price * 0.3)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total Due Today</span>
                        <span>${Math.round(selectedPackage.price * 0.3)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Remaining balance due 2 months before event</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={previousStep}>
                    Previous
                  </Button>
                  <Button 
                    className="bg-gold text-navy hover:bg-yellow-600 font-semibold"
                    onClick={handleSubmit}
                    disabled={createBookingMutation.isPending}
                  >
                    {createBookingMutation.isPending ? "Processing..." : "Secure Booking"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
