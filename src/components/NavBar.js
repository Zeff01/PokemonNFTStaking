import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { injected } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const { activate, deactivate, account } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log("error", error);
    }

    localStorage.setItem("isWalletConnected", true);
  };

  const disconnect = async () => {
    await deactivate();
    localStorage.setItem("isWalletConnected", false);
  };

  const connectWalletOnPageLoad = async () => {
    if (localStorage?.getItem("isWalletConnected") === "true") {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    }
  };

  useEffect(() => {
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="w-full flex flex-row justify-between text-white bg-customize-redbackground items-center">
      <div>
        <div className="  hover:border-[#e9b13a] border-4 border-customize-redbackground duration-300 hover:animate-spin cursor-pointer rounded-full  p-2">
          <img
            src={require("../assets/pokeballcircle.png")}
            className="w-[70px] h-[70px]  "
          />
        </div>
      </div>

      {/* MENU */}
      <ul className="hidden md:flex p-5 h-full">
        <li className="font-bold text-lg  border-2 rounded-full mr-2 hover:bg-[#f2f2f2] hover:text-customize-redbackground hover:border-black py-1 duration-300">
          <Link to="/">PokeDex</Link>
        </li>
        <li className="font-bold hover:border-b-2  mr-2">
          <Link to="/staking">Stake</Link>
        </li>
        <li className="font-bold hover:border-b-2  mr-2">Inventory</li>
        <li className="font-bold hover:border-b-2 ">Contact us</li>
      </ul>

      {/* //HAMBURGER */}
      <div onClick={handleClick} className="md:hidden z-10 px-4 ">
        {!nav ? (
          <FaBars className="w-[30px] h-[30px]" />
        ) : (
          <FaTimes className="w-[30px] h-[30px]" />
        )}
      </div>

      {/* WALLET CONNECT */}
      <div className="hidden md:flex p-1">
        <div className="flex flex-col">
          <div className="flex">
            {!account ? (
              <button
                onClick={connect}
                className="w-[130px] h-[50px] text-sm connectButton"
              >
                Connect to Metamask
              </button>
            ) : (
              <button onClick={disconnect} className="w-[130px] h-[50px]connectButton border-2 rounded-md p-2 hover:bg-[rgb(187, 13, 83)] transition-all">
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
