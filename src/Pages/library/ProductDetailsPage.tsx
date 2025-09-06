import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
//   ArrowLeft,
  Bookmark,
  Download,
  Book,
  FileText,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

// Define the type for our product data
interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  short_description: string;
  cover_image: string;
  stats: {
    pages: number;
    words: string;
    size: string;
  };
  long_description: string;
  whats_inside: string[];
  usage_rights: string[];
  file_details: {
    type: string;
    size: string;
    date_added: string;
  };
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate multiple product images using the same URL
  const productImages = [
    product?.cover_image,
    product?.cover_image,
    product?.cover_image,
    product?.cover_image,
  ].filter(Boolean);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const products: Product[] = await response.json();
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (err:any) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <NavLink
            to="/library"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"
          >
            {/* <ArrowLeft className="h-4 w-4" /> */}
            <span>← Back to Library</span>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Product Images and Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-black">
                {product.title}
                <span className="block text-gray-600 text-2xl sm:text-3xl lg:text-4xl font-normal">
                  {product.subtitle}
                </span>
              </h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.short_description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Pages {product.stats.pages}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Words {product.stats.words}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Size {product.stats.size}</span>
              </div>
            </div>

            {/* Main Product Image */}
            <div className="mb-8">
              <div className="relative">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-lg shadow-2xl"
                />
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? productImages.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === productImages.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex 
                        ? 'border-black' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-black">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.long_description}
              </p>
              
              <h3 className="text-xl font-bold mb-4 text-black">What's Inside:</h3>
              <ul className="space-y-3">
                {product.whats_inside.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Preview Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-black">Content Preview</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: 15 }, (_, index) => (
                  <div
                    key={index}
                    className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    <img
                      src={product.cover_image}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions and Details */}
          <div className="top-8 h-fit">
            {/* Small Product Preview */}
            <div className="mb-6">
              <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                <img
                  src={product.cover_image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-lg">
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-gray-300 hover:bg-gray-50 rounded-lg font-semibold transition-colors text-black">
                  <Bookmark className="h-5 w-5" />
                  Save Product
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors text-white">
                  <Download className="h-5 w-5" />
                  Download Product
                </button>
              </div>

              {/* This product contains */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold mb-3 text-black">This product contains</h3>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{product.category}</span>
                </div>
              </div>

              {/* Usage Rights */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold mb-4 text-black">You are free to:</h3>
                <ul className="space-y-3 text-sm">
                  {product.usage_rights.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* File Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold mb-4 text-black">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">File type</span>
                    <span className="font-semibold text-gray-700">{product.file_details.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">File size</span>
                    <span className="font-semibold text-gray-700">{product.file_details.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date added</span>
                    <span className="font-semibold text-gray-700">{product.file_details.date_added}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts />
    </div>
  );
};

export default ProductDetailsPage;