import React from "react";
import { Link } from "react-router-dom";
import { Mail, Book, Download, Bookmark, Eye } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

// Define the type for our product
export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  cover_image: string;
  icon: string;
  category?: string;
  tags?: string[];
}

// Icon mapping object
const iconMap: { [key: string]: React.ElementType } = {
  mail: Mail,
  book: Book,
  default: Book,
};

interface ProductCardProps {
  product: Product;
  onSave?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSave }) => {
  const IconComponent = iconMap[product.icon] || iconMap.default;

  return (
    <div className="bg-white border h-full border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-black p-4">
        {/* Header Icons */}
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10">
            <IconComponent className="h-5 w-5 text-black" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 bg-white/20 cursor-pointer backdrop-blur-sm rounded-full text-white hover:bg-white/40 z-10"
            onClick={() => onSave?.(product.id)}
          >
            <Bookmark className="h-5 w-5 " />
          </Button>
        </div>

        {/* Product Image */}
        <Link
          to={`/library/product/${product.id}`}
          className="absolute inset-0"
        >
          <img
            src={product.cover_image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category Badge */}
        {product.category && (
          <Badge
            variant="outline"
            className="mb-2 text-red-600 border-red-200 bg-red-50 w-fit"
          >
            {product.category}
          </Badge>
        )}

        {/* Title */}
        <h3
          className="font-bold text-lg text-black truncate"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 line-clamp-2 h-[40px] mb-4">
          {product.subtitle || "A valuable digital resource."}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-6 gap-3 mt-auto pt-4 border-t border-gray-100">
          <Button
            asChild
            variant="outline"
            className="col-span-4 text-center flex items-center justify-center font-semibold hover:bg-gray-100 hover:text-black"
          >
            <Link to={`/library/product/${product.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            className="text-gray-500 col-span-2 flex items-center justify-center hover:text-black hover:bg-gray-100 transition-colors"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
