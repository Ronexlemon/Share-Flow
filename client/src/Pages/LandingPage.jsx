import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import RequestCard from "../components/requestCard";
import RequestCardPool from "../components/RequestCardPool";

const LandingPage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-[#2C2C2C] relative">
           <NavBar/>
           <RequestCardPool/>

           {/* <Footer/> */}
          

        </div>

    )
}
export default LandingPage;