import React, { useEffect, useState } from "react";
// Imports for Link, Mail, Book, etc., are no longer needed here as they are in ProductCard
import ProductCard, { type Product } from "./ProductCard"; // Import the new card and type
import { Skeleton } from "../../ui/skeleton"; // Import Skeleton for loading

// Define the type for our product (now imported from ProductCard)
// interface Product { ... } // No longer needed

// Icon mapping object (no longer needed)
// const iconMap: { ... } // No longer needed

const Popular = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- MOCK DATA FOR FILTERS (to populate card) ---
  const allCategories = [
    "Ebook",
    "Email Template",
    "Marketing",
    "Design",
    "Productivity",
  ];
  const allTags = [
    "digital marketing",
    "content marketing",
    "personal development",
    "lead generation",
    "startups",
    "productivity",
    "mindset",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/books.json");
        let data: Product[] = await response.json();

        // Add mock data for filtering/display
        data = data.map((item, index) => ({
          ...item,
          category: allCategories[index % allCategories.length],
          tags: [
            allTags[index % allTags.length],
            allTags[(index + 1) % allTags.length],
          ],
          subtitle: item.title.split(" ").slice(0, 10).join(" ") + "...", // Add mock subtitle
        }));

        setProducts(data); // Using all products as "popular"
      } catch (error) {
        console.error("Failed to fetch popular products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Placeholder function for the save button
  const handleSave = (id: string) => {
    console.log("Save product clicked:", id);
    // In a real app, you'd add this to a "saved" list in your context or API
  };

  // --- LOADING SKELETON ---
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto">
      {/* Title and Subtitle */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-black">Popular Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover our most trending digital products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Popular;
