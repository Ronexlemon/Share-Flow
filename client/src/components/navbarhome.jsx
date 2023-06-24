import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBarHome = () => {
  const navigate = useNavigate();
  

  

  return (
    <nav className="h-10 w-full bg-zinc-400 flex justify-end items-center">
      <button className="animate-pulse text-indigo-700"></button>
      <div className="flex justify-around gap-8 items-center">
         <button onClick={()=>{navigate("/market")}} className="inline-flex justify-center bg-orange-400 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2  text-sm font-medium text-gray-700 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Launch</button>
        <div className="relative inline-block text-left">
           
         
        </div>
      
      </div>
    </nav>
  );
};

export default NavBarHome;
