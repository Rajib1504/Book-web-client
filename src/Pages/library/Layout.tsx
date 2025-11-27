import Sidebar from "./../../components/Library/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import LibraryNavbar from "../../components/Library/components/LibraryNavbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsible sidebar

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="grid grid-cols-12 bg-white min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block sticky top-0 h-screen transition-all duration-300 ${
          isCollapsed ? "lg:col-span-1" : "lg:col-span-2"
        }`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onLinkClick={() => setIsSheetOpen(false)}
          // toggleSidebar prop removed from here
        />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <div className="lg:hidden col-span-12">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
              <h1 className="text-black text-xl font-bold">E-Book</h1>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-[260px] border-r border-gray-800"
          >
            <Sidebar onLinkClick={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content Area */}
      <div
        className={`col-span-12 ${
          isCollapsed ? "lg:col-span-11" : "lg:col-span-10"
        } transition-all duration-300 flex flex-col h-screen`}
      >
        {/* New Library Navbar (sticky) */}
        <LibraryNavbar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Scrollable Outlet */}
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;