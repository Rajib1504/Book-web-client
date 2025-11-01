import React from "react";
import Sidebar from "./../../components/Library/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";

const Layout = () => {
  return (
    <div className="grid grid-cols-12 bg-white">
      {/* --- ১. ডেস্কটপ সাইডবার --- */}
      {/* এটি শুধুমাত্র 'md' (768px) বা তার বড় স্ক্রিনে দেখা যাবে */}
      <div className="hidden md:block md:col-span-2 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* --- ২. মূল কন্টেন্ট এলাকা --- */}
      {/* এটি মোবাইলে পুরো ১২ কলাম এবং ডেস্কটপে ১০ কলাম জায়গা নেবে */}
      <div className="col-span-12 md:col-span-10 h-screen overflow-auto">
        
        {/* --- ৩. মোবাইল হেডার (Hamburger Menu) --- */}
        {/* এটি শুধুমাত্র 'md' (768px) এর ছোট স্ক্রিনে দেখা যাবে */}
        <div className="md:hidden p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          
          {/* লাইব্রেরি টাইটেল (মোবাইল) */}
          <h1 className="text-black text-xl font-bold">E-Book Library</h1>

          {/* Hamburger বাটন, যা Sheet খোলে */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px] border-r border-gray-800">
              {/* স্লাইড-আউট মেনুর ভেতরে আমরা তোমার Sidebar কম্পোনেন্টটিকেই আবার ব্যবহার করছি */}
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* --- ৪. পেজের বাকি কন্টেন্ট --- */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;