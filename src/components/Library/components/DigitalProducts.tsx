import React from "react";
import HeadingGenerator from "../../../utils/HeadingGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Search,
  ShieldCheck,
  Edit,
  DollarSign,
  Rocket,
  Lightbulb,
  Sparkles,
  BookOpenCheck,
  ArrowRight,
  Book, // Icon for lessons
} from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../../ui/badge"; // Badge import for "Beginner"

// Define the steps
const successSteps = [
  {
    icon: Search,
    title: "Step 1: Find Your Product",
    description:
      "Browse our extensive library or use the search and filter tools to find the perfect product for your niche. Look for ebooks, templates, or guides that your audience will love.",
  },
  {
    icon: ShieldCheck,
    title: "Step 2: Understand Your Rights",
    description:
      "Every product comes with Private Label Rights (PLR). This means you have the freedom to edit, rebrand, and sell the product as your own. You keep 100% of the profits.",
  },
  {
    icon: Edit,
    title: "Step 3: Rebrand & Customize",
    description:
      "Make the product uniquely yours. Change the cover, edit the content, add your logo, and update the design. We provide templates (like Book Covers) to make this fast and easy.",
  },
  {
    icon: DollarSign,
    title: "Step 4: Launch & Profit",
    description:
      "You're ready to sell! List the rebranded product on your website, online store, or social media. It's your product now, so you set the price and start earning.",
  },
];

// --- NEW: Data for Guides (based on your image) ---
const guides = [
  {
    title: "How to use Master Library",
    lessons: 8,
    level: "Beginner",
    description:
      "A supportive, step-by-step guide to help you confidently navigate the Master Library and turn its ready-made resources into real business momentum.",
    image:
      "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg", // Placeholder statue image
  },
  {
    title: "Online Business Master Plan",
    lessons: 9,
    level: "Beginner",
    description:
      "A realistic, step-by-step guide to help you launch a profitable online business with clarity, confidence, and digital products that are ready to sell.",
    image:
      "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg", // Placeholder building image
  },
];

// Define pro tips
const proTips = [
  "Combine multiple PLR products into a new, high-value 'bundle'.",
  "Use an ebook as a 'lead magnet' to build your email list.",
  "Break down a large ebook into a series of blog posts or an email course.",
  "Update old products with new information to make them fresh and relevant.",
];

const DigitalProducts = () => {
  return (
    <div className="p-4 md:p-8 overflow-y-auto h-full bg-gray-50">
      <HeadingGenerator
        heading="Digital Product University"
        subtitle="Your step-by-step guide to building a digital product business."
      />

      {/* Welcome Card */}
      <Card className="mb-8 border shadow-sm bg-white">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="p-4 bg-red-100 rounded-full">
            <Rocket className="h-8 w-8 text-red-600" />
          </div>
          <div className="text-center md:text-left">
            <CardTitle className="text-2xl font-bold text-black">
              Welcome to Your New Business
            </CardTitle>
            <p className="text-gray-600 mt-1">
              This is your command center for turning our digital assets into
              your profitable products. Follow the steps below to get started.
            </p>
          </div>
        </CardHeader>
      </Card>

      <Separator className="my-8" />

      {/* 4-Step Guide */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Your 4-Step Success Path
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {successSteps.map((step) => (
            <Card
              key={step.title}
              className="border shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <div className="p-3 bg-red-50 rounded-full">
                  <step.icon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-black">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-700">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      {/* --- NEW: All Guides Section (from your image) --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-6">All Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Card
              key={guide.title}
              className="border shadow-sm bg-white flex flex-col overflow-hidden"
            >
              <CardContent className="p-6 pb-0 flex-grow">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-200 bg-red-50"
                  >
                    <Book className="h-4 w-4 mr-1.5" />
                    {guide.lessons} lessons
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-200 bg-gray-50"
                  >
                    {guide.level}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-6">{guide.description}</p>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-700">
                  Start Learning <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
              <div className="w-full h-64 mt-6">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Pro-Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 bg-zinc-900 rounded-2xl flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-yellow-400/10 rounded-full mb-4">
            <Lightbulb className="h-8 w-8 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Pro-Tips for Success
          </h3>
          <p className="text-zinc-400 mt-2">
            Go beyond the basics to maximize your results.
          </p>
        </div>

        <Card className="md:col-span-2 border shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black">
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {proTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Links */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Explore Your Toolkit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/library/book-cover-templates">
            <Card className="border shadow-sm bg-white p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-red-50 rounded-full">
                <BookOpenCheck className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black">
                  Book Cover Templates
                </h4>
                <p className="text-gray-600">
                  Browse pro-designed covers to rebrand your new ebook.
                </p>
              </div>
            </Card>
          </Link>
          <Link to="/library">
            <Card className="border shadow-sm bg-white p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-red-50 rounded-full">
                <Search className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black">
                  Start Browsing
                </h4>
                <p className="text-gray-600">
                  Go to the library and find your first product now.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DigitalProducts;
