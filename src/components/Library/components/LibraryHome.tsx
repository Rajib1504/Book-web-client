
import React, { useState, useEffect } from 'react';
import { Download, ArrowRight } from 'lucide-react';

const LibraryHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      title: "Phishing Exposed",
      subtitle: "Ebook designed to help your customers spot phishing attacks early, avoid costly mistakes, and stay safe while using email and the internet.",
      downloadText: "Download",
      learnMoreText: "Learn More",
      bookImage: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
    },
    {
      title: "Digital Marketing Mastery",
      subtitle: "Complete guide to modern digital marketing strategies, social media optimization, and conversion rate improvement techniques.",
      downloadText: "Download",
      learnMoreText: "Learn More",
      bookImage: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
    },
    {
      title: "E-commerce Success",
      subtitle: "Step-by-step blueprint for building and scaling profitable online stores with proven strategies and real-world examples.",
      downloadText: "Download",
      learnMoreText: "Learn More",
      bookImage: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
    },
    {
      title: "Startup Funding Guide",
      subtitle: "Comprehensive resource covering all aspects of startup funding, from bootstrapping to venture capital and everything in between.",
      downloadText: "Download",
      learnMoreText: "Learn More",
      bookImage: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
    },
    {
      title: "Content Creation Pro",
      subtitle: "Professional content creation strategies for social media, blogs, and marketing campaigns that drive engagement and conversions.",
      downloadText: "Download",
      learnMoreText: "Learn More",
      bookImage: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
    }
  ];

  // Auto-change carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentData = carouselData[currentSlide];

  return (
    <div className="p-8 overflow-y-auto h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Resource Library</h1>
        <p className="text-gray-600 text-lg">
          Browse our collection of entrepreneurial resources, tools, and templates
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        <div className="bg-black rounded-2xl p-8 min-h-[30vw] flex items-center">
          <div className="flex-1 flex items-center justify-between">
            {/* Left Side - Content */}
            <div className="flex-1 pr-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {currentData.title}
              </h2>
              <p className="text-white text-lg mb-6 leading-relaxed">
                {currentData.subtitle}
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <Download className="w-5 h-5" />
                  {currentData.downloadText}
                </button>
                <button className="border-2 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  {currentData.learnMoreText}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Book Image */}
            <div className="flex-1 flex justify-center">
              <div className="">
                <img 
                  src={currentData.bookImage} 
                  alt={currentData.title}
                  className="w-full h-[450px] rounded-lg shadow-lg shadow-gray-500 object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvb2sgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide 
                  ? 'bg-red-500' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default LibraryHome;