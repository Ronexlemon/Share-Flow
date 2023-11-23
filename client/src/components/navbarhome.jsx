import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBarHome = () => {
  const navigate = useNavigate();
  

  

  return (
    <nav className="h-10 w-full  flex justify-end items-center bg-[#2C2C2C]">
      <button className="animate-pulse text-indigo-700"></button>
      <div className="flex justify-around gap-8 items-center w-40 mt-4">
         <button onClick={()=>{navigate("/market")}} className="inline-flex justify-center bg-[#0D46D7] w-full rounded-md border  shadow-sm px-4 py-2  text-sm font-medium text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Get Started</button>
        <div className="relative inline-block text-left">
           
         
        </div>
      
      </div>
    </nav>
  );
};

export default NavBarHome;
