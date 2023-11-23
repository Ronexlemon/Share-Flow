import React from "react";

import Footer from "../components/footer";
import RequestCard from "../components/requestCard";
import NavBarHome from "../components/navbarhome";
import HomeCard from "../components/homeCard";
import { HomeNewCard } from "../components/HomeNewCard";

const HomePage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-[#2C2C2C] fixed">
           <NavBarHome/>
           {/* <HomeCard/> */}
           <div className="w-full h-full">
           <HomeNewCard/>

           </div>
          

           {/* <Footer/> */}
          

        </div>

    )
}
export default HomePage;