import { useEffect, useRef } from "react";

export default function GallerySection() {
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
    <section id="gallery" className="py-20 bg-gray-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            Event Gallery
          </h2>
          <p className="text-xl text-gray-600">
            See our photobooths in action at unforgettable events
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="fade-in col-span-2 row-span-2">
            <img 
              src="https://pixabay.com/get/g42d44a2e91610f00da6d8e2dfd8a335ec7b706f31a303542c33b357a5e88c30f3c87a5760cb9e4d91c206f8513990cf7e937b27b4a603964a4487d8acbac0e73_1280.jpg" 
              alt="Wedding photobooth fun" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
              alt="Corporate photobooth event" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in">
            <img 
              src="https://pixabay.com/get/gcbecbdd54b18ba07bc4adc078cf777204e8cec4033b11897482f3d6aaa5ef17de61aa8b1ceac5cff0b986996204eef7f5e62e2a845b294fdf11753279d3cfbe1_1280.jpg" 
              alt="Party photobooth celebration" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
              alt="Elegant floral photobooth backdrop" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
              alt="Team building photobooth activity" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
              alt="Birthday party photobooth fun" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
          <div className="fade-in col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
              alt="Wedding reception photobooth" 
              className="w-full h-48 object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
