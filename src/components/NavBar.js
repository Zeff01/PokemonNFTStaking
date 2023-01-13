import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { injected } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { CgPokemon } from "react-icons/cg";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const { activate, deactivate, account } = useWeb3React();

  const connect = async () => {
    if (typeof window.ethereum == "undefined") {
      alert(
        "No Metamask installed. Please install metamask first as your browser extension. -Zeff"
      );
    }
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

      {/* MENU DESKTOP VIEW */}
      <ul className="hidden md:flex p-5 h-full">
        <li className="font-bold text-lg  border-2 rounded-full mr-2 hover:bg-[#f2f2f2] hover:text-customize-red background hover:border-black py-1 duration-300">
          <Link to="/">PokeDex</Link>
        </li>
        <li className="font-bold hover:border-b-2  mr-2">
          <Link to="/staking">Stake</Link>
        </li>
        <li className="font-bold hover:border-b-2  mr-2">Inventory</li>
        <li className="font-bold hover:border-b-2 ">Contact us</li>
      </ul>

      {/* WALLET CONNECT MOBILE VIEW */}
      <div className="flex md:hidden p-1">
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
              <button
                onClick={disconnect}
                className="w-[130px] h-[50px]connectButton border-2 rounded-md p-2 hover:bg-[rgb(187, 13, 83)] transition-all"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* //HAMBURGER  MOBILE VIEW*/}
      <div onClick={handleClick} className="md:hidden z-10 px-4 ">
        {!nav ? (
          <FaBars className="w-[30px] h-[30px]" />
        ) : (
          <FaTimes className="w-[30px] h-[30px]" />
        )}
      </div>

      {nav && (
        <div className="flex md:hidden p-5 h-full w-full absolute  bottom-0 z-50 bg-customize-redbackground  flex-col border-t border-black border">
          <div onClick={handleClick} className="md:hidden z-10 px-4flex-end flex justify-end mt-2 p-0 pr-0 mr-0">
            {!nav ? (
              <FaBars className="w-[30px] h-[30px]" />
            ) : (
              <FaTimes className="w-[30px] h-[30px]" />
            )}
          </div>
        <ul >
          <li
            onClick={handleClick}
            className="font-bold text-xl p-8  focus:scale-75 border-b "
          >
            <Link to="/" className="flex items-center">
              <CgPokemon className="w-12 h-12 mr-4 text-red-50" />
              PokeDex
            </Link>
          </li>
          <li
            onClick={handleClick}
            className="font-bold text-xl p-8  focus:scale-75 border-b "
          >
            <Link to="/staking" className="flex items-center">
              <CgPokemon className="w-12 h-12 mr-4 text-red-50" />
              Stake
            </Link>
          </li>
          <li
            onClick={handleClick}
            className="font-bold text-xl p-8  focus:scale-75 flex items-center border-b"
          >
            <CgPokemon className="w-12 h-12 mr-4 text-red-50" />
            Inventory
          </li>
          <li
            onClick={handleClick}
            className="font-bold text-xl p-8  focus:scale-75 flex items-center border-b"
          >
            <CgPokemon className="w-12 h-12 mr-4 text-red-50" />
            Contact us
          </li>
        </ul>
        </div>
      )}

      {/* WALLET CONNECT DESKTOP VIEW*/}
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
              <button
                onClick={disconnect}
                className="w-[130px] h-[50px]connectButton border-2 rounded-md p-2 hover:bg-[rgb(187, 13, 83)] transition-all"
              >
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
