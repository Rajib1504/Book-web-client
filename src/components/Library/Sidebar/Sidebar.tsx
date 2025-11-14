import React from "react";
import {
  Home,
  Flame,
  Bookmark,
  GraduationCap,
  RectangleHorizontal,
  Image,
  LogOut,
  // PanelLeft,  <-- Removed
  // PanelRight, <-- Removed
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
// import { Button } from "../../ui/button"; <-- No longer needed
import { cn } from "../../../lib/utils";

interface SidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
  // toggleSidebar prop type removed
}

const Sidebar: React.FC<SidebarProps> = ({
  onLinkClick,
  isCollapsed = false,
  // toggleSidebar removed from destructuring
}) => {
  const location = useLocation();
  const { logout } = useAuth();

  const masterLibraryItems = [
    { icon: Home, label: "Home", link: "/library" },
    { icon: Flame, label: "Popular", link: "/library/popular" },
    { icon: Bookmark, label: "Saved", link: "/library/saved" },
    { icon: User, label: "Account", link: "/library/account" },
  ];

  const resourcesItems = [
    {
      icon: GraduationCap,
      label: "Digital Product University",
      link: "/library/digital-products",
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

  const SidebarItem = ({
    icon: Icon,
    label,
    badge,
    link,
    onLinkClick,
    isCollapsed,
  }: {
    icon: React.ElementType;
    label: string;
    badge?: string;
    link: string;
    onLinkClick?: () => void;
    isCollapsed: boolean;
  }) => {
    const isActive = location.pathname === link;
    return (
      <Link
        to={link}
        onClick={onLinkClick}
        className={cn(
          "flex items-center gap-3 px-4 py-2 cursor-pointer group transition-colors rounded-lg mx-2",
          isActive
            ? "bg-red-600/50 text-white"
            : "text-gray-300 hover:bg-gray-700",
          isCollapsed && "justify-center"
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 transition-colors flex-shrink-0",
            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
          )}
        />
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isActive ? "text-white" : "text-gray-300",
            isCollapsed && "lg:hidden"
          )}
        >
          {label}
        </span>
        {badge && !isCollapsed && (
          <span className="ml-auto bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-md font-semibold">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionHeader = ({
    title,
    isCollapsed,
  }: {
    title: string;
    isCollapsed: boolean;
  }) => (
    <div className={cn("px-4 py-2 mt-4", isCollapsed && "px-2 text-center")}>
      <h3
        className={cn(
          "text-gray-500 text-xs font-semibold uppercase tracking-wider",
          isCollapsed && "lg:hidden"
        )}
      >
        {title}
      </h3>
    </div>
  );

  return (
    <div
      className={cn(
        "bg-slate-800 h-full flex flex-col border-r border-gray-300 transition-all duration-300",
        isCollapsed ? "lg:w-20" : "lg:w-full"
      )}
    >
      <div className="flex-grow flex flex-col overflow-auto">
        {/* Header */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-[17px] border-b border-gray-300 flex-shrink-0",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 bg-red-600/50 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1
            className={cn(
              "text-white text-xl font-bold",
              isCollapsed && "lg:hidden"
            )}
          >
            E-Book
          </h1>
          {/* Desktop Toggle Button Removed */}
        </div>

        {/* Navigation Sections */}
        <div className="flex-grow overflow-y-auto py-4 sidebar-scroll">
          <div className="mb-4">
            <SectionHeader title="Master Library" isCollapsed={isCollapsed} />
            <div className="mt-2 space-y-1">
              {masterLibraryItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  onLinkClick={onLinkClick}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <SectionHeader title="Resources" isCollapsed={isCollapsed} />
            <div className="mt-2 space-y-1">
              {resourcesItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  onLinkClick={onLinkClick}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-200 flex-shrink-0">
        <div
          onClick={() => {
            logout();
            onLinkClick?.(); // Close sheet on mobile if open
          }}
          className={cn(
            "flex items-center gap-3 px-4 py-2 cursor-pointer group transition-colors rounded-lg mx-2 text-red-400 hover:bg-gray-700",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span
            className={cn("text-sm font-medium", isCollapsed && "lg:hidden")}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
