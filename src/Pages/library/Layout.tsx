import React from "react";
import Sidebar from "./../../components/Library/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 h-screen ">
        <Sidebar />
      </div>
      <div className="col-span-10 h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
