import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RootPage;
