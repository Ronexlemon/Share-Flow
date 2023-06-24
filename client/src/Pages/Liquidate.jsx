import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import LiquidateDashBoardCard from "../components/liquidateDashBoard";

const Liquidate = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-black">
           <NavBar/>
           <LiquidateDashBoardCard/>

           
          

        </div>

    )
}
export default Liquidate;