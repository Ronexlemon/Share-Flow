import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { LendingYieldContract } from "../ContractAddress/Address";
import { useContractWrite,useContractRead } from "wagmi";
import LendingAbi from "../Abis/LendingV2.json";
import { useWalletClient } from "wagmi";
import { useAccount } from "wagmi";

const LiquidateDashBoardCard = () => {
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
    await  confirmLiquidation();
    // Logic for sending the request
    setShowModal(false);
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
    <div className="inset-0 flex justify-center mt-10 h-3/4">
      <div className="w-3/4 p-6 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id="open-btn">
      {/* address borrower;
    address lender;
    
    uint tokenBorrowed;
    uint collateral;
    address collateralAddressToken;
    address tokenBorrowedAddress;
    uint _profit; */}

        <div className="text-white flex justify-around">
          <p>Borrower</p>
          <p>Loan</p>
          <p>Collateral</p>
          <p>Interest</p>
          
         
          <p></p>
        </div>
    

        <div className="text-white text-sm h-96 overflow-y-scroll">
          {requests?.map((element, index) => (
             <div
             key={index}
             className="bg-gray-700  grid grid-cols-5 pl-6 gap-0 mt-4 rounded h-10 items-center"
           >
             <p ><span className="text-slate-300">{(element.borrower).substring(0,8)}...{(element.borrower).substring(9,17)}</span> </p>
              <p className="pl-10"><span className="text-blue-300">MATIC</span>: {Number(element.tokenBorrowed)/10**18}</p>
              <p className="pl-10"><span className="text-green-300">LINK</span> :{Number(element.collateral
)/10**18}</p>
              <p className="pl-10"><span className="text-green-300">MATIC</span> :{Number(element._profit
)/10**18}</p>
            
              
              <button onClick={()=>{handleLiquidate(index)}} className="border border-green-100 w-20 rounded">LIQUIDATE</button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute bg-white w-1/2 p-6 border border-gray-400 rounded-lg shadow">
       
      
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

export default LiquidateDashBoardCard;
