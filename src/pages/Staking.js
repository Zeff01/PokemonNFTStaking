import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PulseLoader from "react-spinners/PulseLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import useFunction from "../hooks/useFunction";
import usePokemon from "../hooks/usePokemon";
import { useWeb3React } from "@web3-react/core";
import {
  MdCatchingPokemon,
  MdGeneratingTokens,
  MdOutlineGeneratingTokens,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { FaEthereum, FaMoneyBillWaveAlt } from "react-icons/fa";
import { GiWarPick, GiStrikingArrows, GiToken } from "react-icons/gi";

import Account from "../components/Account";

const Staking = () => {
  const [tokenArray, setTokenArray] = useState();
  const [stakedPokemon, setStakedPokemon] = useState([]);
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [stakeValue, setStakeValue] = useState("");
  const [unStakeValue, setUnStakeValue] = useState("");
  const [ethaccount, setEthAccount] = useState();

  const { active, library, account, chainId, connector, activate, deactivate } =
    useWeb3React();

  const {
    getContractAddress,
    viewRewards,
    zviewRewards,
    getStakedTokens,
    zgetStakedTokens,
    stake,
    unStake,
    zcontractAddress,
    claimRewards,
    clearRewards,
    stakers,
    zstakersInfo,
  } = useFunction();
  const {
    currentSupply,
    zcurrentSupply,
    balanceOf,
    zbalanceOf,
    safeMint,
    tokenURI,
    ztokenUri,
    approve,
    getOwnedTokens,
    zgetOwnedTokens,
  } = usePokemon();

  useEffect(() => {
    //   NFTSTAKER FUNCTION
    currentSupply();

    //   POKEMON FUNCTION
    getOwnedTokens();
    if (account) {
      console.log("Account connected");
      //   NFTSTAKER FUNCTION
      viewRewards(account);
      getStakedTokens(account);
      getContractAddress();
      stakers(account);

      //   POKEMON FUNCTION
      balanceOf(account);

      // API FUNCTION
      getAllPokemons();
      getOwnedPokemons();
    } else {
      console.log("NO ACCOUNT CONNECTED", account);
    }
  }, [account, zgetStakedTokens.length, zgetOwnedTokens.length, zviewRewards]);

  const transactionSuccess = () =>
    toast.success("Transaction completed.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const transactionError = () =>
    toast.error("An error occurred while loading the transaction", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const getAllPokemons = async () => {
    let tokenArr = await Promise.all(
      zgetStakedTokens.map(async (token) => {
        var tokenUri = tokenURI(account, token.tokenId).then((data) => {
          return data;
        });
        return tokenUri;
      })
    );
    setTokenArray(tokenArr);

    var pokemonArr = [];
    await Promise.all(
      tokenArr.map(async (api) => {
        const res = await axios.get(api);
        pokemonArr.push(res.data);
        pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
      })
    );
    setStakedPokemon(pokemonArr);
  };

  const getOwnedPokemons = async () => {
    let tokenArr = await Promise.all(
      zgetOwnedTokens.map(async (token) => {
        var tokenUri = tokenURI(account, token).then((data) => {
          return data;
        });
        return tokenUri;
      })
    );
    setTokenArray(tokenArr);

    var pokemonArr = [];
    await Promise.all(
      tokenArr.map(async (api) => {
        const res = await axios.get(api);
        pokemonArr.push(res.data);
        pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
      })
    );
    setOwnedPokemon(pokemonArr);
  };

  const handleStake = (tokenId) => {
    approve(zcontractAddress, tokenId).then((data) => {
      setIsLoading(true);
      data.wait().then((res) => {
        setIsLoading(false);
        if (res.blockHash && res.blockNumber) {
          stake(tokenId).then((data) => {
            setIsLoading(true);
            data.wait().then((res) => {
              setIsLoading(false);
              if (res.blockHash && res.blockNumber) {
                getStakedTokens(account);
              }
            });
          });
        }
      });
    });
  };

  const handleUnstake = (tokenId) => {
    unStake(account, tokenId);
  };

  const handleMint = () => {
    safeMint().then((data) => {
      setIsLoading(true);
      data
        .wait()
        .then((res) => {
          if (res.blockHash && res.blockNumber) {
            transactionSuccess();
            setIsLoading(false);
            getOwnedTokens(account);
          }
        })
        .catch((err) => transactionError());
    });
  };

  return (
    <div className="p-4 h-full w-full stakingBackground bg-no-repeat bg-cover min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      {isLoading && (
        <div className="bg-[#dba031] fixed top-5 right-5 p-4 w-[300px] flex rounded-md justify-between items-center shadow-black shadow-sm">
          <h1 className="font-bold text-white">Loading Transaction</h1>
          <PulseLoader color="#e7cc33" size={15} />
        </div>
      )}

      <div>
        <div className="inputContainer flex flex-row justify-between gradiantBackground2 text-[#fff]">
          <div className=" flex flex-col">
            <div>
              <h2>Owned Token:&nbsp;{zbalanceOf ? zbalanceOf : 0}</h2>
            </div>
            <div>
              <h2>
                Staked Token:&nbsp;
                {zgetStakedTokens ? zgetStakedTokens.length : 0}
              </h2>
            </div>
            <div>
              <h2>
                Current Supply:&nbsp;{zcurrentSupply ? zcurrentSupply : 0}
              </h2>
            </div>
          </div>

          <div>
            <Account fontColor={"white"} />
          </div>
        </div>

        <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div className="inputContainer gradiantBackground">
            <div className="w-full ">
              <div className="inputLabel inputBorder text-xl h-[60px] flex justify-between">
                Rewards
                <FaMoneyBillWaveAlt className="w-[40px] h-[40px] text-[#ecff3e] " />
              </div>
            </div>

            <div className="flex w-full justify-between items-center p-5 px-2 flex-col">
              <div className="shadowCircle bg-[#780f0f] rounded-full w-[200px] h-[200px] flex flex-col justify-center items-center text-white font-bold inputLabel p-2 ">
                <h1 className="font-bold text-[#a6d7ff]">
                  {zviewRewards ? zviewRewards : 0}
                </h1>
                <h1 className="flex justify-center items-center text-[#37b6ec]">
                  ETH
                  <FaEthereum className="w-[20px] h-[20px] text-[#37b6ec] " />
                </h1>
              </div>
              <div className="mt-6 flex w-full ">
                <button
                  type="button"
                  className="text-white paginationButton "
                  onClick={() => claimRewards(account)}
                >
                  Claim rewards
                </button>
                <button
                  type="button"
                  className="text-white paginationButton "
                  onClick={() => clearRewards(account)}
                >
                  Clear Rewards
                </button>
              </div>
            </div>
          </div>

          <div className="inputContainer gradiantBackground ">
            <div className="inputLabel inputBorder text-xl h-[60px] flex items-center justify-between">
              Stakers Info
              <MdOutlineDocumentScanner className="w-[40px] h-[40px] text-[#eaa53f] " />
            </div>
            <div>
              <ul className="inputLabel p-2 my-2 text-xl">
                <li className="flex items-center tableBorder text-sm">
                  <GiStrikingArrows className="w-[20px] h-[20px] mr-2 text-[#fe6310]" />{" "}
                  <span className="text-sm">Tokens Staked:&nbsp;</span>
                  <span className="text-[#ffef3b]">
                    {zstakersInfo.amountStaked}
                  </span>
                </li>
                <li className="flex items-center tableBorder text-sm">
                  <GiStrikingArrows className="w-[20px] h-[20px] mr-2 text-[#fe6310]" />{" "}
                  Block Number:&nbsp;{" "}
                  <span className="text-[#ffef3b]">
                    {zstakersInfo.blockNumber}
                  </span>{" "}
                </li>
                <li className="flex items-center tableBorder text-sm">
                  <GiStrikingArrows className="w-[20px] h-[20px] mr-2 text-[#fe6310]" />{" "}
                  Duration of Stake:&nbsp;
                  <span className="text-[#ffef3b]">
                    {zstakersInfo.durationOfStake}
                  </span>
                </li>
                <li className="flex items-center tableBorder text-sm">
                  <GiStrikingArrows className="w-[20px] h-[20px] mr-2 text-[#fe6310]" />{" "}
                  Unclaimed Rewards:&nbsp;
                  <span className="text-[#ffef3b]  text-sm">
                    {zstakersInfo.unclaimedRewards}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="inputContainer gradiantBackground ">
            <div className="inputLabel inputBorder text-xl h-[60px] flex items-center justify-between">
              Mint a Token
              <GiToken className="w-[40px] h-[40px] text-[#f2378e] " />
            </div>
            <div className="flex justify-center items-center h-full w-full">
              <ul className="inputLabel p-2 my-2 flex flex-col justify-center items-end ">
                <GiWarPick
                  type="button"
                  className="text-[#a3a3a3] w-[150px] h-[150px] rounded-xl cursor-pointer hover:text-[#fff] mining-pickaxe "
                  onClick={() => handleMint()}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="85px"
                  height="59.7px"
                  viewBox="0 0 55.021 50.5"
                >
                  <g className="mining-chunks">
                    <rect
                      x="51.194"
                      y="42.911"
                      transform="matrix(0.6192 0.7852 -0.7852 0.6192 55.779 -23.5726)"
                      fill="#0c1e3e"
                      width="2"
                      height="5.624"
                    />
                    <rect
                      x="38.069"
                      y="42.851"
                      transform="matrix(0.6159 -0.7878 0.7878 0.6159 -20.6488 48.1631)"
                      fill="#0c1e3e"
                      width="1.999"
                      height="4.813"
                    />
                    <rect
                      x="51.559"
                      y="38.354"
                      transform="matrix(0.8088 0.5881 -0.5881 0.8088 33.9183 -23.1469)"
                      fill="#0c1e3e"
                      width="1.999"
                      height="4.475"
                    />
                    <rect
                      x="44.374"
                      y="42.912"
                      transform="matrix(0.7287 -0.6848 0.6848 0.7287 -19.0036 43.4761)"
                      fill="#0c1e3e"
                      width="2.001"
                      height="5.624"
                    />
                  </g>
                </svg>
              </ul>
            </div>
          </div>

          {/* ////////2ndrow */}

          <div className="inputContainer gradiantBackground">
            <h2 className="inputLabel inputBorder flex items-center justify-between">
              STAKE YOUR POKEMONS! &nbsp;
              <MdCatchingPokemon className="w-[40px] h-[40px] text-[#e54b4b] " />
            </h2>
            <div className="flex w-full h-full justify-between p-2">
              <div className=" w-full p-4 flex flex-col justify-around ">
                <label className="inputLabel my-2 text-xl">Stake: &nbsp;</label>

                <div className="w-full  flex flex-col ">
                  <input
                    type="number"
                    id="stake"
                    name="stake"
                    value={stakeValue}
                    onChange={(e) => setStakeValue(e.target.value)}
                    className=" inputBox w-[100px] h-[30px] rounded-md text-center justify-center items-center m-2 ml-0"
                  />
                  <button
                    type="button"
                    className="text-white bg-[#7c0e33] hover:bg-[#ffffff] hover:text-[#7c0e33] hover:border-[#7c0e33] duration-300 shadow-xl w-[100px] h-[50px] m-2 ml-0 rounded-md"
                    onClick={() => handleStake(stakeValue)}
                  >
                    Stake
                  </button>
                </div>
              </div>

              <div className=" w-full p-4 flex flex-col justify-around">
                <label className="inputLabel my-2 text-xl">
                  UnStake: &nbsp;
                </label>
                <div className="w-full  flex flex-col">
                  <input
                    type="number"
                    id="unStake"
                    name="unStake"
                    value={unStakeValue}
                    onChange={(e) => setUnStakeValue(e.target.value)}
                    className=" inputBox w-[100px] h-[30px] rounded-md text-center justify-center items-center m-2 ml-0"
                  />
                  {/* {console.log(stakeValue)} */}
                  <button
                    type="button"
                    className="text-white bg-[#7c0e33] hover:bg-[#ffffff] hover:text-[#7c0e33] hover:border-[#7c0e33] duration-300 shadow-xl w-[100px] h-[50px] m-2 ml-0 rounded-md"
                    onClick={() => handleUnstake(unStakeValue)}
                  >
                    UnStake
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="inputContainer gradiantBackground">
            <div className="inputLabel inputBorder text-xl h-[60px] flex items-center justify-between">
              Your Staked Tokens
              <MdGeneratingTokens className="w-[40px] h-[40px] text-[#49f43a] " />
            </div>
            <div>
              <ul className="inputLabel p-2 my-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                {stakedPokemon.map((poke) => {
                  return (
                    <motion.div
                      className="flex flex-col justify-center items-center "
                      key={poke.id}
                      whileHover={{
                        scale: 1.3,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <h3 className="flex text-[8px] rounded-full text-[#35fb4ce3]">
                        Token #{poke.id}
                      </h3>

                      <li
                        className={`font-bold  text-sm md:text-xs ${poke.types[0].type.name} backgroundNone `}
                      >
                        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                      </li>
                      <img
                        src={poke.sprites.other.dream_world.front_default}
                        className="w-[50px] h-[50px]  animate-[wiggle_1s_ease-in-out_infinite] pictureShadow"
                      />
                    </motion.div>
                  );
                })}
              </ul>
              <div></div>
            </div>
          </div>

          <div className="inputContainer gradiantBackground">
            <div className="inputLabel inputBorder text-xl h-[60px] flex items-center justify-between">
              Owned Tokens
              <MdOutlineGeneratingTokens className="w-[40px] h-[40px] text-[#4ee9f1] " />
            </div>
            <div>
              <ul className="inputLabel p-2 my-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                {ownedPokemon.map((poke) => {
                  return (
                    <motion.div
                      className="flex flex-col justify-center items-center"
                      key={poke.id}
                      whileHover={{
                        scale: 1.3,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <h3 className="flex text-[8px] rounded-full text-[#35fb4ce3]">
                        Token #{poke.id}
                      </h3>
                      <li
                        className={`font-bold  text-sm md:text-xs ${poke.types[0].type.name} backgroundNone `}
                      >
                        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                      </li>
                      <img
                        src={poke.sprites.other.dream_world.front_default}
                        className="w-[50px] h-[50px]  animate-[wiggle_1s_ease-in-out_infinite] pictureShadow"
                      />
                    </motion.div>
                  );
                })}
              </ul>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
