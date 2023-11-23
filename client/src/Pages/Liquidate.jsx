import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import LiquidateDashBoardCard from "../components/liquidateDashBoard";
import LiquidateDashBoardCardMarket from "../components/LiquidateDashBoardMarket";

const Liquidate = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-[#2C2C2C]">
           <NavBar/>
           <LiquidateDashBoardCardMarket/>

           
          

        </div>

    )
}
export default Liquidate;