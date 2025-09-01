import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import type { Book, PaginatedBooksResponse } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

gsap.registerPlugin(ScrollTrigger);

const FeaturedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const { data } = await axios.get<PaginatedBooksResponse>(
          "http://localhost:5000/api/books?limit=4&sortBy=-createdAt"
        );
        setBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedBooks();
  }, []);

  useEffect(() => {
    if (!loading && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".book-card"),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [loading]);

  return (
    <section ref={sectionRef} className="py-24 bg-[#111111] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured In Our Library
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            A curated collection of digital books to fuel your ambition and
            knowledge.
          </p>
        </div>
        {loading ? (
          <div className="text-center">Loading books...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {books.map((book) => (
              <Card
                key={book._id}
                className="book-card bg-[#1a1a1a] border-gray-800 rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <CardContent className="p-0">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-96 object-contain"
                  />
                </CardContent>
                <CardFooter className="p-5 flex flex-col items-start">
                  <h3 className="font-semibold text-lg text-white truncate w-full">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">by {book.author}</p>
                  <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 rounded-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
