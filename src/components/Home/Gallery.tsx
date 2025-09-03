import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sample image data for the gallery (replace with your actual product images)
const galleryItems = [
  {
    src: "https://i.pinimg.com/736x/72/40/e2/7240e2ecff57df5b46de726f3b27244b.jpg",
    alt: "E-book cover design",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Digital course materials",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://www.shutterstock.com/image-photo/book-open-pages-close-up-600nw-2562942291.jpg",
    alt: "Collection of e-books",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Reading on a tablet",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small_2x/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg",
    alt: "Colorful book spines",
    span: "col-span-2 row-span-1",
  },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate the header
    gsap.fromTo(
      section.querySelector(".section-header"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Animate gallery items
    const galleryItems = galleryRef.current?.querySelectorAll(".gallery-item");
    if (galleryItems) {
      gsap.fromTo(
        galleryItems,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Explore Our Digital Universe
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            A glimpse into the vast library of high-quality digital assets
            waiting for you.
          </p>
        </div>

        <div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`gallery-item ${item.span} overflow-hidden rounded-xl group`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;