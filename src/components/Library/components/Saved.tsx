import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Book, Download, Bookmark } from "lucide-react";


// Define the type for our product
interface Product {
  id: string;
  title: string;
  cover_image: string;
  icon: string;
}

// Icon mapping object
const iconMap: { [key: string]: React.ElementType } = {
  mail: Mail,
  book: Book,
  default: Book,
};

const Saved = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/books.json");
        const data: Product[] = await response.json();
        setProducts(data); // Using all products as "popular" for this example
      } catch (error) {
        console.error("Failed to fetch popular products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Title and Subtitle */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-black">Saved Products</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your collection of bookmarked digital products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const IconComponent = iconMap[product.icon] || iconMap.default;
            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-64 bg-black p-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      <IconComponent className="h-5 w-5 text-black" />
                    </div>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                      <Bookmark className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  <Link to={`/library/product/${product.id}`}>
                    <img
                      src={product.cover_image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain  transition-transform duration-300"
                    />
                  </Link>
                </div>
                {/* Info Section */}
                <div className="p-3">
                  <h3 className="font-bold text-lg text-black truncate mb-4">
                    {product.title}
                  </h3>
                          <div className="grid grid-cols-6 gap-3">
                    <Link
                      to={`/library/product/${product.id}`}
                      className="col-span-5 text-center flex items-center justify-center font-semibold border rounded-lg hover:bg-gray-100 hover:text-black"
                    >
                      Open
                    </Link>
                    <button className="text-gray-400 col-span-1 border-2 flex items-center justify-center hover:text-black hover:bg-gray-100 transition-colors p-2 rounded-lg">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Saved;