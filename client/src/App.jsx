import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import DashBoard from './Pages/Dashboard'
import Liquidate from './Pages/Liquidate'
import HomePage from './Pages/Home'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { fantomTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const { chains, publicClient } = configureChains(
  [fantomTestnet],
  [
    // alchemyProvider({ apiKey: "ronex" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WagmiConfig modalSize="compact" theme={darkTheme({
      accentColor: "#7b3fe4"
    })}  config={wagmiConfig} coolMode>
    <RainbowKitProvider chains={chains}>
    
   <Router>
      <Routes>
      <Route element={<HomePage/>} path='/'/>
        <Route element={<HomePage/>} path='/home'/>
        <Route element={<LandingPage/>} path='/market'/>
        <Route element={<DashBoard/>} path='/repay'/>
        <Route element={<Liquidate/>} path='/liquidate'/>
      </Routes>
    </Router>
   
    </RainbowKitProvider>
    </WagmiConfig>

   
    </>
  )
}

export default App
