import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Skeleton } from "../ui/skeleton";

interface RelatedProduct {
  id: string;
  title: string;
  subtitle: string;
  short_description: string;
  cover_image: string;
  category: string;
}
interface RelatedProductsProps {
  category?: string;
  currentBookId?: string;
}
const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  currentBookId,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category && !currentBookId) {
      return;
    }
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/books?category=${category}&type=related_books&limit=4`
        );

        // Backend returns { status: true, data: { items: [...] } }
        const books = data.data.items || [];

        // Filter out the current book if it's in the list
        setRelatedProducts(
          books.filter((b: any) => b._id !== currentBookId).slice(0, 4)
        );
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentBookId]);

  if (loading) {
    return (
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-6 text-black">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="w-full h-48 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-black">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/library/product/${product.id}`}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            {/* Product Image */}
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={product.cover_image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              {/* Title */}
              <h3 className="font-semibold text-black text-sm leading-tight line-clamp-2">
                {product.title}
              </h3>

              {/* Subtitle */}
              <p className="text-gray-600 text-xs leading-tight line-clamp-1">
                {product.subtitle}
              </p>

              {/* Description - Truncated to 2 lines */}
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                {product.short_description}
              </p>

              {/* Category Badge */}
              <div className="pt-2">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
