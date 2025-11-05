import Sidebar from "./../../components/Library/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { useState } from "react";

const Layout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="grid grid-cols-12 bg-white">
      <div className="hidden lg:block lg:col-span-2 h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="col-span-12 lg:col-span-10 h-screen overflow-auto">
        <div className="lg:hidden p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <h1 className="text-black text-xl font-bold">E-Book</h1>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-[260px] border-r border-gray-800"
            >
              <Sidebar onLinkClick={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
