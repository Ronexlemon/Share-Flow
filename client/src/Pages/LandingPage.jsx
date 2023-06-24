import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import RequestCard from "../components/requestCard";

const LandingPage = ()=>{
    return(
        <div className="min-h-full h-screen w-full bg-black">
           <NavBar/>
           <RequestCard/>

           {/* <Footer/> */}
          

        </div>

    )
}
export default LandingPage;