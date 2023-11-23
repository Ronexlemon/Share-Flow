import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownOption = (option) => {
    // Handle the selected option here
    if(option == "Pay"){
        navigate("/repay");
    }
    else if(option =="Liquidate"){
        navigate("/liquidate");

    }
    console.log(option);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="h-10 w-full bg-[#2C2C2C] flex justify-around items-center ">
      <button onClick={()=>{navigate("/home")}} className="animate-pulse text-[#FFFFFF]">Home</button>
      <div className="flex justify-around gap-8 items-center">
         <button onClick={()=>{navigate("/market")}} className="inline-flex justify-center w-full rounded-md  text-[#FFFFFF] shadow-sm px-4 py-2 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Market</button>
        <div className="relative inline-block text-left">
           
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center w-full rounded-md  text-[#FFFFFF] shadow-sm px-4 py-2 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="dashboard-dropdown"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Dashboard
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </button>
          {showDropdown && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-400 ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dashboard-dropdown"
            >
              <div className="py-1 " role="none">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleDropdownOption("Pay")}
                >
                  RePay
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleDropdownOption("Liquidate")}
                >
                  Liquidate
                </button>
              </div>
            </div>
          )}
        </div>
        {/* <button  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Connect</button> */}
        
        <ConnectButton label="Connect" chainStatus="icon"  showBalance={{
    smallScreen: false,
    largeScreen: false,
  }}  />
      </div>
    </nav>
  );
};

export default NavBar;
