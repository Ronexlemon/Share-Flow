import React from "react";

import Footer from "../components/footer";
import RequestCard from "../components/requestCard";
import NavBarHome from "../components/navbarhome";
import HomeCard from "../components/homeCard";

const HomePage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-black">
           <NavBarHome/>
           <HomeCard/>

           {/* <Footer/> */}
          

        </div>

    )
}
export default HomePage;