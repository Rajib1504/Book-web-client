import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Library", path: "/library" },
  { title: "Pricing", path: "/pricing" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-lg ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink
            to="/"
            className="text-2xl font-bold text-white tracking-wider"
          >
            E-Book
          </NavLink>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                {link.title}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <div className="flex items-center justify-center bg-gray-700 h-full w-full rounded-full text-white text-lg font-semibold">
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
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-gray-800 hover:text-white"
                >
                  <NavLink to="/login">Sign In</NavLink>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <NavLink to="/register">Get Started</NavLink>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
