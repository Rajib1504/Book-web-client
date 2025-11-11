import React from "react";
import {
  Home,
  Flame,
  // Lightbulb,
  Bookmark,
  // Gift,
  GraduationCap,
  RectangleHorizontal,
  Image,
  // FileText,
  // Pencil,
  // Calculator,
  ChevronsUpDown,
  Download,
  Star,
  Briefcase,
  Users,
  Key,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider"; // AuthProvider ইম্পোর্ট করতে হবে
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface SidebarProps {
  onLinkClick?: () => void; // <-- এটি একটি ঐচ্ছিক (optional) ফাংশন
}
const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const location = useLocation();
  const { user, logout } = useAuth(); // AuthProvider থেকে user এবং logout ফাংশন নাও

  const masterLibraryItems = [
    { icon: Home, label: "Home", link: "/library" },
    { icon: Flame, label: "Popular", link: "/library/popular" },
    { icon: Bookmark, label: "Saved", link: "/library/saved" },
  ];

  const resourcesItems = [
    // {
    //   icon: Gift,
    //   label: "Special Deals",
    //   badge: "NEW",
    //   link: "/library/special-deals",
    // },
    {
      icon: GraduationCap,
      label: "Digital Product University",
      link: "/library/digital-product-university",
    },
    {
      icon: RectangleHorizontal,
      label: "Product Mockups",
      link: "/library/product-mockups",
    },
    {
      icon: Image,
      label: "Book Covers",
      badge: "NEW",
      link: "/library/book-cover-templates",
    },
  ];

  // const toolsItems = [
  //   { icon: FileText, label: "PDF Rebrander", link: "/library/pdf-rebrander" },
  //   {
  //     icon: Pencil,
  //     label: "Product Descriptions",
  //     link: "/library/product-descriptions",
  //   },
  //   { icon: Lightbulb, label: "Product Ideas", link: "/library/product-ideas" },
  //   {
  //     icon: FileText,
  //     label: "Book Title Generator",
  //     link: "/library/book-title-generator",
  //   },
  //   {
  //     icon: Calculator,
  //     label: "Revenue Calculator",
  //     link: "/library/revenue-calculator",
  //   },
  // ];

  const SidebarItem = ({
    icon: Icon,
    label,
    badge,
    link,
    onLinkClick,
  }: {
    icon: React.ElementType;
    label: string;
    badge?: string;
    link: string;
    onLinkClick?: () => void; // <-- টাইপ ডিফাইন করা
  }) => {
    const isActive = location.pathname === link;
    return (
      <Link
        to={link}
        onClick={onLinkClick} // <-- ৫. এখানে onClick ইভেন্ট যোগ করা
        className={`flex items-center justify-between px-4 py-2 cursor-pointer group transition-colors rounded-lg mx-2 ${
          isActive
            ? "bg-red-500/80 text-white"
            : "text-gray-300 hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon
            className={`w-5 h-5 transition-colors ${
              isActive ? "text-white" : "text-gray-400 group-hover:text-white"
            }`}
          />
          <span
            className={`text-sm font-medium transition-colors ${
              isActive ? "text-white" : "text-gray-300"
            }`}
          >
            {label}
          </span>
        </div>
        {badge && (
          <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-md font-semibold">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-4 py-2 mt-4">
      <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="bg-black h-full flex flex-col border-r border-gray-800">
      <div className="flex-grow flex flex-col overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-800 flex-shrink-0">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="text-white text-xl font-bold">E-Book</h1>
        </div>

        {/* Navigation Sections */}
        <div className="flex-grow overflow-y-auto py-4 sidebar-scroll">
          <div className="mb-4">
            <SectionHeader title="Master Library" />
            <div className="mt-2 space-y-1">
              {masterLibraryItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <SectionHeader title="Resources" />
            <div className="mt-2 space-y-1">
              {resourcesItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </div>
          {/* <div>
            <SectionHeader title="Tools" />
            <div className="mt-2 space-y-1">
              {toolsItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className="p-2 border-t border-gray-800 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors w-full text-left cursor-pointer">
              <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0">
                {user ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="flex-grow overflow-hidden">
                <h1 className="text-white text-sm font-bold truncate">
                  {user ? user.name : "akshay patel"}
                </h1>
                <p className="text-gray-400 text-xs truncate">
                  {user ? user.email : "akshaypatel@gmail.com"}
                </p>
              </div>
              <section className="text-white">
                <ChevronsUpDown />
              </section>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[240px] mb-2"
            side="top"
            align="start"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {user?.name || "Akshay Patel"}
                </p>
                <p className="text-xs leading-none text-gray-400">
                  {user?.email || "akshaypatel@gmail.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Downloads</span>
              <span className="ml-auto text-xs text-gray-400">Unlimited</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              <span>Updates until</span>
              <span className="ml-auto text-xs text-gray-400">Lifetime</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link to={'/library/account'}>Account</Link>
              <span className="ml-auto text-xs text-gray-400">Lifetime</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Become an affiliate</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Get a free gift</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Key className="mr-2 h-4 w-4" />
              <span>Your License</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className="text-red-400 focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
