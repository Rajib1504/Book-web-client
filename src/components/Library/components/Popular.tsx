import { useEffect, useState } from "react";
import ProductCard, { type Product } from "./ProductCard";
import { Skeleton } from "../../ui/skeleton";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";

const Popular = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/books");

        if (data.success) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedProducts = data.data.map((book: any) => ({
            ...book,
            id: book._id,
            icon: book.icon || "book",
          }));

          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch popular products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- SAVE API CONNECTION ---
  const handleSave = async (id: string) => {
    try {
      const { data } = await axiosInstance.post("/users/save-book", { bookId: id });
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save book");
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
        <h1 className="text-4xl font-bold text-black">Popular Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover our most trending digital products
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {products.length > 0 ? (
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
                No Popular Products Found
              </h3>
              <p className="text-gray-500 mt-2">
                Check back later for new additions.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Popular;