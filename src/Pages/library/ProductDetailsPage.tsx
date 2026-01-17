import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  Bookmark,
  Download,
  Book,
  FileText,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Play,
  X,
} from "lucide-react";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Skeleton } from "../../components/ui/skeleton";
import { axiosInstance } from "../../lib/axios"; // ১. Axios ইম্পোর্ট
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  // const { user, updateUser } = useAuth(); // Get user and updateUser from Auth
  const [product, setProduct] = useState<any | null>(null); // Using any for simplicity with complex joined data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const pdfSectionRef = useRef<HTMLDivElement>(null);

  // Generate multiple product images using the same URL (Demo logic maintained)
  // Generate multiple product images using the same URL (Demo logic maintained)
  const productImages = [
    product?.coverImage,
    product?.coverImage,
    product?.coverImage,
    product?.coverImage,
  ].filter(Boolean) as string[];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // ২. রিয়েল API কল (/books/:id)
        const { data } = await axiosInstance.get(`/books/${id}`);

        if (data.status) {
          const rawProduct = data.data;
          setProduct({
            ...rawProduct,
            id: rawProduct._id,
            coverImage: rawProduct.cover_image || rawProduct.coverImage,
            shortDesc: rawProduct.short_description || rawProduct.shortDesc,
            longDesc: rawProduct.long_description || rawProduct.longDesc,
            subtitle: rawProduct.subtitle || rawProduct.tagline,
          });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSaveProduct = async () => {
    if (!product) return;
    try {
      const { data } = await axiosInstance.post("/users/save-book", {
        bookId: product.id,
      });
      console.log(data);
      if (data.status) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save product");
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-8 space-y-8">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-[500px] w-full rounded-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
              </div>
            </div>
            {/* Right Column Skeleton */}
            <div className="lg:col-span-4">
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            {error || "Product not found"}
          </h2>
          <Button asChild>
            <NavLink to="/library" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Library
            </NavLink>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <NavLink
            to="/library"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Library</span>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Product Images and Content */}
          <div className="lg:col-span-8">
            {/* Header */}
            <div className="mb-8">
              {/* Category Badge */}
              <Badge
                variant="outline"
                className="mb-4 text-red-600 border-red-200 bg-red-50 font-semibold"
              >
                {product.categories?.[0]?.name || product.category}
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight text-gray-900">
                {product.title}
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-600 font-normal mb-6">
                {product.subtitle}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags?.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-100 text-gray-700 border-gray-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-full">
                  <Book className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pages</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {product.stats?.pages || 0}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-full">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Words</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {product.stats?.words || "N/A"}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-full">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Size</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {product.stats?.size || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Product Image */}
            <div className="mb-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
                {productImages.length > 1 && (
                  <>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? productImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm text-gray-900 hover:bg-white transition-all shadow-md"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === productImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm text-gray-900 hover:bg-white transition-all shadow-md"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
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
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-red-500 ring-2 ring-red-500/30"
                        : "border-gray-300 opacity-60 hover:opacity-100 hover:border-gray-500"
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

            {/* Description Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 prose">
                {product.longDesc}
              </p>

              <Separator className="my-6" />

              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Key Points:
              </h3>
              <ul className="space-y-3">
                {product.keyPoints?.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-semibold">
                        {item.title}
                      </span>
                      <span className="text-gray-700 text-sm">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapters Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Chapters</h2>
                <Badge variant="secondary" className="bg-red-50 text-red-600">
                  {product.chapters?.length || 0} Lessons
                </Badge>
              </div>
              <div className="space-y-3">
                {product.chapters && product.chapters.length > 0 ? (
                  product.chapters.map((chapter: any, index: number) => (
                    <div
                      key={chapter._id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all"
                    >
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-1">
                            {chapter.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {chapter.duration || "00:00"}
                            </span>
                            <span className="flex items-center gap-1 capitalized">
                              <FileText className="h-3 w-3" />
                              {chapter.mediaType || "PDF"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {chapter.pdfPath && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            onClick={() => {
                              setSelectedPdfUrl(chapter.pdfPath);
                              setTimeout(() => {
                                pdfSectionRef.current?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }, 100);
                            }}
                          >
                            <FileText className="h-4 w-4 mr-1.5" />
                            View PDF
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white text-xs px-4"
                        >
                          <Play className="h-4 w-4 mr-1.5 fill-current" />
                          Play
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      No chapters available for this book.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Preview Grid */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Content Preview
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-red-400 transition-colors cursor-pointer group relative"
                  >
                    <img
                      src={product.coverImage}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-semibold">
                        Page {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline PDF Preview Section */}
            {selectedPdfUrl && (
              <div
                ref={pdfSectionRef}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mt-8 scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-red-600" />
                    Chapter PDF Preview
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPdfUrl(null)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="h-5 w-5 mr-1" />
                    Close Preview
                  </Button>
                </div>
                <div className="w-full h-[800px] rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
                  <iframe
                    src={`${selectedPdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-none"
                    title="PDF Preview"
                  />
                </div>
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm text-red-700 font-medium text-center">
                    Note: This is a preview of the chapter contents.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Actions and Details */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Action Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
                <div className="p-6 space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-base"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Product
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base cursor-pointer"
                    onClick={handleSaveProduct}
                  >
                    <Bookmark className="h-5 w-5 mr-2" />
                    Save Product
                  </Button>
                </div>

                <Separator />

                {/* This product contains */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    This product contains
                  </h3>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insights Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    Insights
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {product.insights?.map((item: any, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-semibold">
                            {item.title}
                          </span>
                          <span className="text-gray-700 text-xs">
                            {item.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Author Card / Follow Section */}
              {product.createdBy && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-red-50 border-2 border-red-100 flex items-center justify-center">
                      {product.createdBy.profilePic ? (
                        <img
                          src={
                            product.createdBy.profilePic.startsWith("http")
                              ? product.createdBy.profilePic
                              : `http://localhost:8080${product.createdBy.profilePic}`
                          }
                          alt={product.createdBy.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-red-600 font-bold text-lg">
                          {product.createdBy.fullName?.[0] || "A"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 font-medium">
                        Author
                      </p>
                      <h4 className="text-base font-bold text-gray-900 truncate">
                        {product.createdBy.fullName || product.author}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {/* File Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">File type</span>
                      <span className="font-semibold text-gray-700">
                        {product.file_details?.type || "ZIP"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">File size</span>
                      <span className="font-semibold text-gray-700">
                        {product.file_details?.size || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date added</span>
                      <span className="font-semibold text-gray-700">
                        {product.file_details?.date_added || "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Separator className="my-12" />
        {/* ৩. রিলেটেড প্রোডাক্টের জন্য ক্যাটাগরি ও আইডি পাস করা হলো */}
        {/* (তবে RelatedProducts কম্পোনেন্টটি এখনো আপডেট করতে হবে) */}
        <RelatedProducts
          categoryId={product.categories?.[0]?._id}
          currentBookId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
