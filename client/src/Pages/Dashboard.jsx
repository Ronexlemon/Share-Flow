import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import DashBoardCard from "../components/rePaydashboardCard";
import RepayDashBoardCardMarket from "../components/RepayDashboardMarket";

const DashBoard = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-[#2C2C2C] relative">
            <div className="">
            <NavBar/>
            </div>
            <div className="">
            <RepayDashBoardCardMarket/>
            </div>
           
           

           
          

        </div>

    )
}
export default DashBoard;