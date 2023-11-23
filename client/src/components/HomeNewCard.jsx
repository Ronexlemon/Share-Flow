import React from "react";
import blockImage from "../assets/block2.png"
import landing from "../assets/landing.svg"

export function HomeNewCard() {
  return (
    <>
      <div className="h-full w-full bg-[#2C2C2C]">
        <div className="w-full h-full mt-40 mt flex-col items-center justify-center">
          <div className="flex justify-evenly items-center ">
            <div className="h-full ">
            <img src={landing} className="h-60" alt="not found" />
            </div>
            
            <div className="flex-col justify-start items-center text-[#FFFFFF] ">
            <h1 className="text-4xl  mb-6">Borrow,  Lend and Earn with
<br/> PeerPal </h1>
<h1>Guaranteed Liquidity for blockchain users  </h1>
            </div>

           
          
            
          </div>
          <div className="flex justify-end items-center mr-40  mb-10">
            <img src={blockImage} className="h-32"  alt="not found "/>
          </div>
          
         
        </div>
      </div>
    </>
  );
}
