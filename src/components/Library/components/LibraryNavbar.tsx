import React from "react";
import { Search, Bell, PanelLeft, PanelRight } from "lucide-react";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";

interface LibraryNavbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const LibraryNavbar: React.FC<LibraryNavbarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex py-4 items-center gap-4 border-b bg-white px-4 md:px-6">
      {/* Sidebar Toggle Button (Desktop) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="hidden lg:flex text-gray-600 hover:text-black"
      >
        {isCollapsed ? (
          <PanelRight className="h-5 w-5" />
        ) : (
          <PanelLeft className="h-5 w-5" />
        )}
      </Button>

      {/* Search Bar */}
      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-full md:w-1/3 lg:w-1/3 bg-gray-50 border-gray-200"
            />
          </div>
        </form>
      </div>

      {/* User Menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="sr-only">Toggle notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.name} // Assuming user object might have an image
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="bg-red-100 text-red-600">
                  {user ? user.name.charAt(0).toUpperCase() : "A"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || "User Name"}
                </p>
                <p className="text-xs leading-none text-gray-500">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/library/account">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Logout is handled in the sidebar, as requested */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default LibraryNavbar;