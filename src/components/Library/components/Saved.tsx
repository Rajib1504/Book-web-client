import React, { useEffect, useState } from "react";
import ProductCard, { type Product } from "./ProductCard";
import { Skeleton } from "../../ui/skeleton";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";

const Saved = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      setLoading(true);
      try {
        // আসল Saved Books API কল
        const { data } = await axiosInstance.get("/users/saved-books");

        if (data.success) {
          // ডাটা ম্যাপিং
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedProducts = data.data.map((id: any) => ({
            ...id, // কারণ populate করা হয়েছে, তাই পুরো অবজেক্ট আসবে
            id: id._id,
            icon: id.icon || "book",
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch saved products:", error);
        toast.error("Failed to load saved items");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProducts();
  }, []);

  // --- REMOVE/UNSAVE API CONNECTION ---
  const handleSave = async (id: string) => {
    // অপটিমিস্টিক আপডেট: আগেই লিস্ট থেকে সরিয়ে দিচ্ছি
    const previousProducts = [...products];
    setProducts(products.filter(p => p.id !== id));

    try {
      const { data } = await axiosInstance.post("/users/save-book", { bookId: id });
      if (data.success) {
        toast.success("Removed from saved list");
      } else {
        // ফেইল হলে আবার আগের অবস্থায়
        setProducts(previousProducts);
      }
    } catch (error) {
      console.error("Unsave failed:", error);
      setProducts(previousProducts);
      toast.error("Failed to update");
    }
  };

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
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-black">Saved Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your collection of bookmarked digital products
        </p>
      </div>

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