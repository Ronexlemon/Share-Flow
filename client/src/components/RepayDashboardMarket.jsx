import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { LendingYieldContract } from "../ContractAddress/Address";
import LendingAbi from "../Abis/LendingV2.json"
import {useContractWrite,useContractRead} from "wagmi"
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const RepayDashBoardCardMarket = () => {
  const {address,isConnected} = useAccount()
  const [request, setRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [indexValue,setIndex] = useState();
  const [amount,setAmount] = useState();
//  //contract reads
  const {data:requests,isError} =  useContractRead({
    address:LendingYieldContract,
    abi: LendingAbi,
    functionName: "getMyRequest",
    args:[address]
    
   
    

  })
  //repay
  const {
        
    writeAsync: repayBack
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "repay",
    args: [indexValue],
    value: amount,
    
  })
  const confirmRepayment = async()=>{
    try{
 if(indexValue !== undefined && amount !== undefined ){
  await repayBack();

 }
 else{
  console.log("the index value is undefined")
 }
      

    }catch(e){
      console.log("the repay error is",e);
    }
  }
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

  const handleRepay = (_index,_amount,_interest) => {
    const totalAmount = (_amount + _interest)/10**18;
    setIndex(_index);
    setAmount(ethers.parseEther(totalAmount.toString()));
    setShowModal(true);
  };

  const handleSendRequest = async () => {
    // Logic for sending the request
    await confirmRepayment()
    
    setShowModal(false);
  };

  const handleCancelRequest = () => {
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
  console.log("the amount plus inters is",amount);

  return (
    <div className=" min-h-full h-screen w-full bg-[#2C2C2C] relative  items-center mt-20 ">
      
       

        {/* <div className="text-white  flex justify-evenly">
          <p className="pl-0">Loan</p>
          <p>Collateral</p>
          <p>Interest</p>
          <p className="text-red-500 animate-pulse  ">Deadline</p>
          <p>Status</p>
          <p></p>
        </div> */}

        
          {requests?.map((element, index) => (
            <div
              key={index}
              className="ml-32 mb-4 w-3/4 p-6 border bg-[#FFFFFF] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {/* address userRequest;
        address lender;
        uint timestart;
        uint duration;
        uint tokenAmountToBorrow;
        uint collateralAmount;
        uint interest;
        address tokenAddressToBorrow;
        address tokenAddressForCollateral;
        bool lended; */}
        <div className="flex   justify-between items-center mr-10">
          <div className="flex flex-col items-center gap-2">
            <h2>Loan</h2>
            <p  className="text-green-500 "><span className="mr-2">{Number(element.tokenAmountToBorrow)/10**18}</span>Matic  </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-red-400">Deadline</h2>
            <p className="pl-10"> {convertSecondsToDHMS( Number(element.duration   )-currentTimeInSeconds()).days } days: {convertSecondsToDHMS( Number(element.duration   )-currentTimeInSeconds()).hours } hours</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2>Interest</h2>
            <p className="text-green-500"><span className=" mr-2">{Number(element.interest
)/10**18}</span> Matic</p>
          </div>
        </div>
        <div className="flex justify-between mr-20">
          <div className="flex flex-col  items-center gap-2">
            <h2>
              Collateral
            </h2>
            <p className="text-red-300 "><span className="mr-2">{Number(element.collateralAmount)/10**18}</span> Link </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2>
              Status
            </h2>
            <p className="">{!element.lended? <h2 className="text-green-600">Requested</h2>:<h2 className="text-red-600">Lended</h2>}</p>
          </div>
        </div>
              
              
              
              
              
              
              <div className="flex justify-end items-center ">
              <button onClick={()=>{handleRepay(index,Number(element.collateralAmount ),Number(element.interest ))}}  className="border text-[#FFFFFF] bg-[#0D46D7] w-20  rounded-md">Repay</button>
              </div>
              
            </div>
          ))}
        
      

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center   z-10">
        <div className="absolute bg-gray-400 w-1/2 p-6 border border-gray-800 rounded-lg shadow">
       
      
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

export default RepayDashBoardCardMarket;
