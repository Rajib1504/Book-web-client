import { useEffect, useState } from "react";
import { ChevronsUpDown, Search, X } from "lucide-react";
import HeadingGenerator from "../../../utils/HeadingGenerator";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import ProductCard, { type Product } from "./ProductCard"; // Import the new card and type
import { Skeleton } from "../../ui/skeleton"; // Import Skeleton for loading

const LibraryHome = () => {
  // --- MOCK DATA FOR FILTERS (replace with API data if available) ---
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

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Using /books.json as seen in Popular.tsx and Saved.tsx
        // I'll add mock category/tags to match the filtering
        const response = await fetch("/books.json");
        let data: Product[] = await response.json();

        // Add mock data for filtering
        data = data.map((item, index) => ({
          ...item,
          category: allCategories[index % allCategories.length],
          tags: [
            allTags[index % allTags.length],
            allTags[(index + 1) % allTags.length],
          ],
          subtitle: item.title.split(" ").slice(0, 10).join(" ") + "...", // Add mock subtitle
        }));

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let result = products;

    // Filter by Search Term
    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Category
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by Tag
    if (selectedTag) {
      result = result.filter((product) => product.tags?.includes(selectedTag));
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedTag, products]);

  // --- HANDLERS ---
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTag;

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
    <div className="px-4 md:px-8 ">
      {/* --- FILTER & SEARCH SECTION --- */}
      <section className="sticky top-0 bg-white z-20 py-6 mb-4 border-b border-gray-200">
        <HeadingGenerator
          heading="Resource Library"
          subtitle="Browse our collection of entrepreneurial resources, tools, and templates"
        />
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search all products..."
            className="h-12 pl-10 rounded-lg bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-between"
              >
                {selectedCategory || "Filter by category"}
                <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full sm:w-[240px]">
              {allCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onSelect={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tag Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-between"
              >
                {selectedTag || "Filter by tag"}
                <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full sm:w-[240px]">
              {allTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onSelect={() => setSelectedTag(tag)}
                >
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <h4 className="text-sm font-medium text-gray-600">
              Active Filters:
            </h4>
            {searchTerm && (
              <Badge variant="secondary" className="pl-2">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="pl-2">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTag && (
              <Badge variant="secondary" className="pl-2">
                {selectedTag}
                <button onClick={() => setSelectedTag(null)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-500 hover:text-red-600"
            >
              Clear All
            </Button>
          </div>
        )}
      </section>

      {/* --- PRODUCTS GRID --- */}
      <section>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-black">
                  No Products Found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search term.
                </p>
                <Button variant="link" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default LibraryHome;
