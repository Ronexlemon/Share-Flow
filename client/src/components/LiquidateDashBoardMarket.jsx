import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { LendingYieldContract } from "../ContractAddress/Address";
import { useContractWrite,useContractRead } from "wagmi";
import LendingAbi from "../Abis/LendingV2.json";
import { useWalletClient } from "wagmi";
import { useAccount } from "wagmi";
import ToastIT from "./Toast";
import { ToastContainer } from "react-toastify";
import ToastError from "./ToastError";

const LiquidateDashBoardCardMarket = () => {
  const [indexValue,setIndexValue] = useState();
  const [request, setRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  
  const { address, isConnecting, isDisconnected } = useAccount()
  //contract reads
  const {data:requests,isError} =  useContractRead({
    address:LendingYieldContract,
    abi: LendingAbi,
    functionName: "getAllDashBoard",
    args:[address]
    
   
    

  })
  //liquidate
  const {
        
    writeAsync: liquidate
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "liquidate",
    args: [indexValue],
    
  })
  const confirmLiquidation = async()=>{
    try{
 if(indexValue !== undefined){
  await liquidate();

 }
 else{
  console.log("the index value is undefined")
 }
      

    }catch(e){
      console.log("the liquidate error is",e);
    }
  }
  console.log("address",indexValue)
  
  
  const details = [
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 },
    { name: "Ronex", age: 4 }
  ];

  const handleCreateRequest = () => {
    setShowModal(true);
  };

  const handleSendRequest = async () => {
    try{
      await  confirmLiquidation();
      // Logic for sending the request
      setShowModal(false);
      ToastIT("Liquidating ...",true);
    }catch(error){
      ToastError("Wait for Duration to End!",false);
    }
    
  };

  const handleCancelRequest =  () => {
   
      
      
     
    

    setShowModal(false);
  };
  //return current time in seconds
  const currentTimeInSeconds = ()=>{
    const current_time_seconds = Math.floor(Date.now() / 1000);
    return current_time_seconds;
  }
  const convertSecondsToDHMS = (seconds) => {
    const secondsInDay = 24 * 60 * 60;
    const secondsInHour = 60 * 60;
    const secondsInMinute = 60;
  
    const days = Math.floor(seconds / secondsInDay);
    seconds %= secondsInDay;
  
    const hours = Math.floor(seconds / secondsInHour);
    seconds %= secondsInHour;
  
    const minutes = Math.floor(seconds / secondsInMinute);
    seconds %= secondsInMinute;
  
    return {
      days,
      hours,
      minutes,
      seconds
    };
  };
  const handleLiquidate = async (_index) => {
    setIndexValue(parseInt(_index));
    setShowModal(true);
  };
  console.log("the dashboard data is", indexValue);

  return (
    <div className=" min-h-full h-screen w-full bg-[#2C2C2C] relative  items-center mt-20 ">
      
      <ToastContainer/>

       
    

        
          {requests?.map((element, index) => (
             <div
             key={element._poolId}
             className="ml-32 mb-4 w-3/4 p-6 border bg-[#FFFFFF] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
           >
            <div className="flex justify-between items-center mb-2">
            {/* <p ><span className="text-slate-300">{(element.borrower).substring(0,8)}...{(element.borrower).substring(9,17)}</span> </p> */}
            <h2>Borrower Address</h2>
            <p ><span className="text-[#2C2C2C]">{element.borrower}</span> </p>
            </div>
            <div className="flex justify-between mr-20">
                <div>
                    <h2>Loan</h2>
                    <p className="text-green-400 "><span className="mr-2">{Number(element.tokenBorrowed)/10**18}</span>CELO </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h2>Collateral</h2>
                    <p className="text-red-400"><span className=" mr-2">{Number(element.collateral
)/10**18}</span> cUSD</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mr-20">
            <h2>Interest</h2> 
            <p className="text-green-400"><span className=" mr-2">{Number(element._profit
)/10**18}</span> CELO</p>
            </div>
             
              
             
              
            
              <div className="flex justify-end items-center ">
              <button onClick={()=>{handleLiquidate(element._poolId)}} className="border text-[#FFFFFF] bg-[#0D46D7] w-24  rounded-md">Liquidate</button>
              </div>
              
            </div>
          ))}
       
      

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute bg-gray-400 w-1/2 p-6 border border-gray-400 rounded-lg shadow">
       
      
          <div className="flex justify-around mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded " onClick={handleCancelRequest}>
              Decline
            </button>
            <button className="bg-gray-400 text-white py-2 px-4 rounded ml-2" onClick={handleSendRequest}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default LiquidateDashBoardCardMarket;
