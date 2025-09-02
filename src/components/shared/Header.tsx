import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Navigation from "./Navigation";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    // The main header container is no longer sticky
    <header className="sticky top-0 z-50 border-b border-gray-800 ">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex relative items-center justify-between h-20">
          {/* Logo - Just the text name */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-wider mix-blend-difference hover:mix-blend-normal transition-all duration-300">
              E-Book
            </span>
          </NavLink>
          <Navigation />
          {/* Auth buttons on the right (Get Started button removed) */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <div className="flex items-center justify-center h-full w-full border-blue-600 rounded-full text-white text-lg font-semibold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-black/98 text-white hover:bg-gray-900 border border-gray-700 hover:border-gray-600 px-6 py-2 rounded-lg transition-all duration-300"
              >
                <NavLink to="/login">Sign In</NavLink>
              </Button>
            )}
          </div>
        </div>
      </div>      
    </header>
  );
};

export default Header;
