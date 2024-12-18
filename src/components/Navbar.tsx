import React from "react";

const Navbar: React.FC = () => (
    <div className="flex items-center justify-between p-4 bg-primary text-white">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <button className="md:hidden p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  );
  
export default Navbar;