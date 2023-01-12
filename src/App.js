import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PokeDex from "./pages/PokeDex.js";
import Staking from "./pages/Staking";

function App() {
  function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  }

  

  return (
    <Web3ReactProvider getLibrary={getLibrary} className="bg-black">
      <BrowserRouter>
        <NavBar />
        <div className="App w-full h-full ">
          <Routes>
            <Route path="/" element={<PokeDex />} />
            <Route path="/staking" element={<Staking />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
