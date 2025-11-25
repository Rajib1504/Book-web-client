import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { User, LogOut, Settings, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "../ui/sheet";
import Navigation from "./Navigation";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Pricing", path: "/pricing" },
  { title: "Services", path: "/services" },
  { title: "Resources", path: "/resources" },
  { title: "About", path: "/about" },
];

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const data = user;
  // console.log(data);
  const location = useLocation();

  return (
    // The main header container is no longer sticky
    <header className="sticky backdrop-blur-sm  top-0 z-50 border-b border-gray-800 ">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex relative items-center justify-between h-20">
          {/* Logo - Just the text name */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-wider mix-blend-difference hover:mix-blend-normal transition-all duration-300">
              E-Book
            </span>
          </NavLink>
          <div className="hidden md:block">
            <Navigation />
          </div>
          <section className="flex items-center gap-2">
            {/* mobile 🍔  */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-gray-800"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-black text-white border-gray-800 w-full h-fit p-2"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white text-xl font-bold">
                      E-books
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4  justify-center items-center">
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <SheetClose asChild key={link.title}>
                          <NavLink
                            key={link.title}
                            to={link.path}
                            className={`nav-link  relative px-4 py-2 text-sm font-medium transition-all duration-300 w-full text-left rounded-full group ${
                              isActive
                                ? "text-white"
                                : "text-gray-300 hover:text-white hover:bg-neutral-800/50"
                            }`}
                          >
                            <span className="relative z-10">{link.title}</span>

                            {/* Active Indicator - Red Underline */}
                            {isActive && (
                              <div className="absolute bottom-0 h-0.5 bg-red-500 rounded-full animate-pulse"></div>
                            )}

                            {/* Hover Effect */}
                            {!isActive && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            )}

                            {/* Active Background Glow */}
                            {isActive && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 "></div>
                            )}
                          </NavLink>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
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
                        {data?.name?.charAt(0).toLocaleUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {data?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {data?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link to={"/library/account"}>Profile</Link>
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
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
