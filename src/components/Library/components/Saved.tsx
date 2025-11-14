import React, { useEffect, useState } from "react";
// Removed old imports like Link, Mail, Book, etc.
import ProductCard, { type Product } from "./ProductCard"; // Import the new card and type
import { Skeleton } from "../../ui/skeleton"; // Import Skeleton for loading

// --- MOCK DATA FOR FILTERS (to populate card) ---
// These are needed for the ProductCard to display all its info
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

const Saved = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/books.json");
        let data: Product[] = await response.json();

        // Add mock data for display
        // In a real app, this data would come with the "saved" product object
        data = data.map((item, index) => ({
          ...item,
          icon: ["book", "mail", "book"][index % 3], // Add a mock icon
          category: allCategories[index % allCategories.length],
          tags: [
            allTags[index % allTags.length],
            allTags[(index + 1) % allTags.length],
          ],
          subtitle: item.title.split(" ").slice(0, 10).join(" ") + "...", // Add mock subtitle
        }));

        setProducts(data); // Using all products as "saved" for this example
      } catch (error) {
        console.error("Failed to fetch saved products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Placeholder function for the save button
  // On this page, it would likely be an "unsave" action
  const handleSave = (id: string) => {
    console.log("Save/Unsave product clicked:", id);
    // In a real app, you'd remove this from the "saved" list
    // For now, we'll just show the full list
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
        <h1 className="text-4xl font-bold text-black">Saved Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your collection of bookmarked digital products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSave={handleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-black">
            No Saved Products
          </h3>
          <p className="text-gray-500 mt-2">
            You haven't saved any products yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Saved;