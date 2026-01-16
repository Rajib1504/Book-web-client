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
import ProductCard, { type Product } from "./ProductCard";
import { Skeleton } from "../../ui/skeleton";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast"; // টোস্ট ইম্পোর্ট

const LibraryHome = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [tags, setTags] = useState<string[]>([]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch Categories and Tags
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Fetch Categories from dedicated API
        const categoryRes = await axiosInstance.get("/category/list");
        if (categoryRes.data.status) {
          setCategories(categoryRes.data.data || []);
        }

        // Fetch Tags from the new public tag list API
        const tagRes = await axiosInstance.get("/tags/list");
        if (tagRes.data.status) {
          // Map tag objects to names for the existing state
          const tagNames = (tagRes.data.data || []).map(
            (t: { name: string }) => t.name
          );
          setTags(tagNames);
        }
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };
    fetchMetadata();
  }, []);

  // --- DATA FETCHING FUNCTION ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};

      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTag) params.tags = selectedTag;

      const { data } = await axiosInstance.get("/books", { params });

      const items = Array.isArray(data.data)
        ? data.data
        : data.data?.items || [];
      const mappedProducts = items.map((book: any) => ({
        ...book,
        id: book._id,
        cover_image: book.cover_image || book.coverImage,
        shortDesc: book.short_description || book.shortDesc,
        longDesc: book.long_description || book.longDesc,
        icon: book.icon || "book",
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, selectedTag]);

  // --- SAVE API CONNECTION ---
  const handleSave = async (id: string) => {
    try {
      const { data } = await axiosInstance.post("/users/save-book", {
        bookId: id,
      });
      if (data.status) {
        // মেসেজ অনুযায়ী টোস্ট দেখানো
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save book");
    }
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-between"
              >
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name ||
                    "Filter by category"
                  : "Filter by category"}
                <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full sm:w-[240px]">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onSelect={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
              {tags.map((tag) => (
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

        {/* Active Filters */}
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
