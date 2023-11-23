import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import  {useContractWrite,useContractRead} from "wagmi"
import {ethers} from "ethers"
import { LendingYieldContract } from "../ContractAddress/Address";
import LendingAbi from "../Abis/LendingV2.json"
import IERC20 from "../Abis/IERC20.json"

const RequestCardPool = () => {
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
  const fantom = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";//celo
  const FantomPricefeed = "0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946" //celoPriceFeed
  const link = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1" //link"0x32E08557B14FaD8908025619797221281D439071"; //cusd /link
  const linkPriceFeed = "0x642Abc0c069dC5041dEA5bFC155D38D844779274" //link"0x9E4e3D77b0302e93dA68633Ad370E3e8C9D84eea" //cusd//linkPriceFeed
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
  

  const [selectedOptionCollateral, setSelectedOptionCollateral] = useState('cUSD'); // Initialize the state with an empty string

  const handleOptionChangeCollateral = (event) => {
    setSelectedOptionCollateral(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionToken, setSelectedOptionToken] = useState('CELO'); // Initialize the state with an empty string

  const handleOptionChangeToken = (event) => {
    setSelectedOptionToken(event.target.value); // Update the state with the selected option value
  };
  const [selectedOptionInterest, setSelectedOptionInterest] = useState('CELO'); // Initialize the state with an empty string

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
    <div className=" min-h-full h-screen w-full bg-[#2C2C2C] relative  items-center mt-20">
       <div className="flex justify-end items-end mr-40">
          <button className="text-white  rounded-sm"  onClick={handleCreateRequest}>
          <i className=" text-blue-700" >create Loan Request</i>
          </button>
        </div>
     
       

       

        
          {requests?.map((element, index) => (
            <div
              key={element._poolId}
              className="ml-32 mb-4 w-3/4 p-6 border bg-[#FFFFFF] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex   justify-between items-center mr-10">
          <div className="flex flex-col items-center gap-2">
            <h2>Loan</h2>
            <p  className="text-green-500 "><span className="mr-2">{Number(element.tokenAmountToBorrow)/10**18}</span>Matic  </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-black">Duration</h2>
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
            <p className="text-red-300 "><span className="mr-2">{Number(element.collateralAmount)/10**18}</span> cUSD </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2>
              Status
            </h2>
            <p className="">{!element.lended? <h2 className="text-green-600">Requested</h2>:<h2 className="text-red-600">Lended</h2>}</p>
          </div>
        </div>
                  
              
             
              
              <div className="flex justify-end items-center ">
              <button onClick={()=>{handleLending(element._poolId,element.tokenAmountToBorrow)}} className="border text-[#FFFFFF] bg-[#0D46D7] w-20  rounded-md">Lend</button>
              </div>
              
            </div>
          
              
            
          ))}
        
     

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute bg-white w-1/2 p-6 border border-gray-400 rounded-lg shadow">
        <div className="text-sm  flex flex-col gap-2 ">
          <div className="grid grid-cols-3 gap-2 items-center">
            <span>Loan</span>
            <select value={selectedOptionToken} onChange={handleOptionChangeToken}>
        <option value="CELO">CELO</option>
        <option value="USDC">USDC</option>
      </select>
            <input placeholder="amount" className="border border-gray-400 text-center w-28" type="text" onChange={(e)=>{setTokenAmount( ethers.parseEther(e.target.value))}}/>
          </div>
         

          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="">Collateral</span>
            <select value={selectedOptionCollateral} onChange={handleOptionChangeCollateral}>
        <option value="cUSD">cUSD</option>
        <option value="USDC">USDC</option>
      </select>
            <input placeholder="Amount"  className="border border-gray-400  text-center w-28" type="text" onChange={(e)=>{setCollateralAmount(ethers.parseEther(e.target.value))}}/>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <span>Interest</span>
            <select value={selectedOptionInterest} onChange={handleOptionChangeInterest}>
        <option value="CELO">CELO</option>
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

export default RequestCardPool;
