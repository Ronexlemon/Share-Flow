import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import  {useContractWrite,useContractRead} from "wagmi"
import {ethers} from "ethers"
import { LendingYieldContract } from "../ContractAddress/Address";
import LendingAbi from "../Abis/LendingV2.json"
import IERC20 from "../Abis/IERC20.json"

const RequestCard = () => {
  const details = [{loan:1,collateralAmount:2,tokenAmountToBorrow:2000,duration:234566,lended:false}]
  const [request, setRequest] = useState(false);
  const [hidebutton,setHide] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [indexValue,setIndexValue] = useState();
  const [loanamount,setLoanAmount] = useState();
  const [showLendingModal, setShowLendingModal] = useState(false);
  const [duration,setDuration]= useState();
  const [tokenAmount,setTokenAmount] = useState();
  const [collateralAmount,setCollateralAmount] = useState();
  const [interestAmount,setInterestAmount] = useState();
  const fantom = "0xf7017d9089e6a35351a6fb0ed709333e533cbe3c";
  const FantomPricefeed = "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D"
  const link = "0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F";
  const linkPriceFeed = "0x6d5689Ad4C1806D1BA0c70Ab95ebe0Da6B204fC5"
  const usdcPriceFeed = "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0"
  //
  //approve fantom to loan out
  const {
        
    writeAsync: approveloan
    
  } = useContractWrite({
    address:link,//its usdc
    abi:IERC20,
    functionName: "approve",
    args: [LendingYieldContract,loanamount]
  })
  const approveLoan = async()=>{
    try{

      await approveloan();

    }catch(e){
      console.log("the approve error is",e);
    }
  }
  //confirm loan
  const {
        
    writeAsync: confirmLoan
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "lend",
    args: [indexValue],
    value: loanamount
  })
  const confirmLending = async()=>{
    try{

      await confirmLoan();

    }catch(e){
      console.log("the lend error is",e);
    }
  }


  const {
        
    writeAsync: approveCollateral
    
  } = useContractWrite({
    address:link,
    abi:IERC20,
    functionName: "approve",
    args: [LendingYieldContract,collateralAmount]
  })
  const approve = async()=>{
    try{

      await approveCollateral();

    }catch(e){
      console.log("the approve error is col",e);
    }
  }
  
  const {
        
    writeAsync: add
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "allowToken",
    args: [fantom,FantomPricefeed]
  })
  const {
        
    writeAsync: addCollateral
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "allowCollateralToken",
    args: [link,linkPriceFeed]
  })
  const allowToken = async()=>{
    try{
      await add();

    }catch(e){
      console.log("the error is",e);
    }
  }
  //create request
  const {
        
    writeAsync: createRequest
    
  } = useContractWrite({
    address:LendingYieldContract,
    abi:LendingAbi,
    functionName: "createRequest",
    args: [duration,tokenAmount,collateralAmount,fantom,link,interestAmount],
   
  })
  const createRequests = async()=>{
    try{
     
      await createRequest();

    }catch(e){
      console.log("the error is",e);
    }
  }
  const allowCollatateral = async()=>{
    try{
      await addCollateral();

    }catch(e){
      console.log("the error is",e);
    }
  }
  //convert to seconds
  const convertToSeconds = (timeValue) => {
    const selectedTime = new Date(timeValue); // Create a Date object from the selected time
    const currentTime = new Date(); // Create a Date object for the current time
  
    const differenceInSeconds = Math.floor((selectedTime - currentTime) / 1000); // Calculate the difference in seconds
  
    return differenceInSeconds;
  };
  const handleDurationChange = (event) => {
    const timeValue = event.target.value;
    const seconds = convertToSeconds(timeValue);
  
    setDuration(parseInt(seconds)); // Convert the duration to an integer and update the state
  };  
  

  const [selectedOptionCollateral, setSelectedOptionCollateral] = useState('LINK'); // Initialize the state with an empty string

  const handleOptionChangeCollateral = (event) => {
    setSelectedOptionCollateral(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionToken, setSelectedOptionToken] = useState('FTM'); // Initialize the state with an empty string

  const handleOptionChangeToken = (event) => {
    setSelectedOptionToken(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionInterest, setSelectedOptionInterest] = useState('FTM'); // Initialize the state with an empty string

  const handleOptionChangeInterest = (event) => {
    setSelectedOptionInterest(event.target.value); // Update the state with the selected option value
  };
 
  console.log("amount",collateralAmount);
  console.log("tamount",loanamount);
  console.log("index value",indexValue);
 

  const handleCreateRequest = () => {
    setShowModal(true);
  };
  const handleLending = (_index,_amount) => {
    setIndexValue(_index)
    setLoanAmount(_amount);
    setShowLendingModal(true);
  };
  const handleLendingCancel =()=>{
    setShowLendingModal(false);
  }
  const handleLendApprove =async ()=>{
    await approveLoan();
    setTimeout(() => {
      setHide(false);
    }, 5000);

  }
  const handleLendSend =async()=>{
   await  confirmLending();
    setShowLendingModal(false);
  }
  const handleApproveRequest = async()=>{
await approve();
setTimeout(() => {
  setHide(false);
}, 5000);
  }

  const handleSendRequest =async () => {
    // Logic for sending the request
    await createRequests();
    

    setShowModal(false);
  };

  const handleCancelRequest = () => {
    setShowModal(false);
  };
  //contract reads
  const {data:requests,isError} =  useContractRead({
    address:LendingYieldContract,
    abi: LendingAbi,
    functionName: "getAllRequest"
  })
  
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
  // 
  console.log("data is", requests);

  return (
    <div className="inset-0 flex justify-center mt-10 h-3/4">
      <div className="w-3/4 p-6 border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id="open-btn">
        <div className="flex justify-end items-end">
          <button className="text-white  rounded-sm"  onClick={handleCreateRequest}>
          <i className="animate-ping text-orange-200" >create Request</i>
          </button>
        </div>

        <div className="text-white grid grid-cols-5 gap-1">
          <p>Loan</p>
          <p>Collateral</p>
          <p>Interest</p>
          <p>Term</p>
          <p className="">Status</p>
          <p></p>
          
        </div>

        <div className="text-white text-sm h-96 overflow-y-scroll w-full">
          {requests?.map((element, index) => (
            <div
              key={index}
              className="bg-gray-700  grid grid-cols-6 pl-10 gap-0 mt-4 rounded h-10 items-center"
            >
              <p ><span className="text-green-300">FTM</span>: {Number(element.tokenAmountToBorrow)/10**18} </p>
              <p className="pl-10"><span className="text-blue-300">LINK</span>: {Number(element.collateralAmount)/10**18}</p>
              <p className="pl-10"><span className="text-blue-300">FTM</span> :{Number(element.interest
)/10**18}</p>
              <p className="pl-10"> {convertSecondsToDHMS( Number(element.duration   )-currentTimeInSeconds()).days } days: {convertSecondsToDHMS( Number(element.duration   )-currentTimeInSeconds()).hours } hours</p>
              <p className="pl-12">{!element.lended? <h2 className="text-green-400">Requested</h2>:<h2 className="text-red-400">Lended</h2>}</p>
              {console.log("the lended is",element.lended)}
              <button onClick={()=>{handleLending(index,element.tokenAmountToBorrow)}}  className="border border-green-100 w-14 rounded ml-10">Lend</button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute bg-white w-1/2 p-6 border border-gray-400 rounded-lg shadow">
        <div className="text-sm  flex flex-col gap-2 ">
          <div className="grid grid-cols-3 gap-2 items-center">
            <span>Loan</span>
            <select value={selectedOptionToken} onChange={handleOptionChangeToken}>
        <option value="FTM">FTM</option>
        <option value="USDC">USDC</option>
      </select>
            <input placeholder="amount" className="border border-gray-400 text-center w-28" type="text" onChange={(e)=>{setTokenAmount( ethers.parseEther(e.target.value))}}/>
          </div>
         

          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="">Collateral</span>
            <select value={selectedOptionCollateral} onChange={handleOptionChangeCollateral}>
        <option value="LINK">LINK</option>
        <option value="USDC">USDC</option>
      </select>
            <input placeholder="Amount"  className="border border-gray-400  text-center w-28" type="text" onChange={(e)=>{setCollateralAmount(ethers.parseEther(e.target.value))}}/>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <span>Interest</span>
            <select value={selectedOptionInterest} onChange={handleOptionChangeInterest}>
        <option value="FTM">FTM</option>
        <option value="USDC">USDC</option>
      </select>
            <input placeholder="amount" className="border border-gray-400 text-center w-28" type="text"  onChange={(e)=>{setInterestAmount(ethers.parseEther(e.target.value))}}/>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span>Time Period</span>
            <input className="border border-gray-400 w-28" type="date" onChange={handleDurationChange} />

          </div>
          </div>
      
          <div className="flex justify-around mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded " onClick={handleCancelRequest}>
              Decline
            </button>
            {hidebutton?<button className="bg-gray-400 text-white py-2 px-4 rounded ml-2" onClick={handleApproveRequest}>
              Approve
            </button> :<button className="bg-gray-400 text-white py-2 px-4 rounded ml-2" onClick={handleSendRequest}>
              Confirm
            </button>}
            
            
          </div>
        </div>
      </div>
      
      )}
      {/* lending */}
      {showLendingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute bg-white w-1/2 p-6 border border-gray-400 rounded-lg shadow">
       
      
          <div className="flex justify-around mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded " onClick={handleLendingCancel}>
              Decline
            </button>
            <button className="bg-gray-400 text-white py-2 px-4 rounded ml-2" onClick={handleLendSend}>
              Lend
            </button>
            
            
          </div>
        </div>
      </div>
      
      )}

    </div>
  );
};

export default RequestCard;
