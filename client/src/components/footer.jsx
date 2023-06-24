import React from "react";
import {BsTwitter} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"
const Footer = ()=>{
    return(
       

<footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-around">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/RonexLemon" className="hover:underline">Ronex</a>. All Rights Reserved.
    </span>
    <div className="text-sm">
    <a href="https://github.com/RonexLemon" target="_blank" className="hover:underline"> <h6>github</h6><BsGithub/></a>
    

    </div>
    <div className="text-sm">
     <a href="https://twitter.com/ronexondimu" target="_blank" className="hover:underline"><h6>follow</h6><BsTwitter/></a>
    

    </div>
   
    </div>
</footer>

    )
}
export default Footer;