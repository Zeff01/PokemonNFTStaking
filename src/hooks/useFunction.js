import { useState, useEffect } from "react";
import { ethers } from "ethers";

import useWeb3Action from "./useWeb3Action";
import web3 from "../web3/web3";
import NFTStaker from "../web3/NFTStaker/NFTStaker";
import ethNFTStaker from "../web3/NFTStaker/ethNFTStaker";

export default function useFunction(account) {
  let ethNFT = ethNFTStaker();

  const [zcontractAddress, setzContractAddress] = useState("");
  const [zviewRewards, setzViewRewards] = useState();
  const [zgetStakedTokens, setzGetStakedTokens] = useState([]);
  const [zstakersInfo, setzStakerInfo] = useState([]);

  const {
    clear,
    error,
    isLoading,
    response,
    transact,
    call,
    transactionDone,
    transactionHash,
  } = useWeb3Action(web3, NFTStaker);

  //CALL FUNCTIONS
  async function getContractAddress() {
    setzContractAddress(await ethNFT.getContractAddress());
  }

  async function getAddressBalance() {
    await ethNFT.getAddressBalance();
  }

  //ONLY OWNER FUNCTIONS

  // SETLOCTIMEPERIOD
  async function setLockTimePeriod(time) {
    await transact(account, { name: "setLockTimePeriod" }, [time]);
  }

  async function lockPeriod() {
    await call(account, { name: lockPeriod }, []);
  }

  async function stake(tokenId) {
    const stake = await ethNFT.stake(tokenId);

    return stake;
  }

  async function unStake(tokenId) {
    const unStake = await ethNFT.unStake(tokenId);

    return unStake;
  }
  async function claimRewards() {
    await ethNFT.claimRewards();
  }

  async function clearRewards() {
    await ethNFT.clearRewards();
  }

  async function viewRewards(account) {
    let rewards = await ethNFT.viewRewards(account);
    let numberConversion = rewards.toNumber();

    rewards.toNumber();
    if (numberConversion > 0) {
      numberConversion = ethers.utils.formatEther(numberConversion);
    }

    setzViewRewards(numberConversion);
  }

  async function getStakedTokens(account) {
    const stakedTokens = await ethNFT.getStakedTokens(account);

    setzGetStakedTokens(stakedTokens);
    return stakedTokens;
  }

  async function stakers(account) {
    setzStakerInfo(await call(account, { name: "stakers" }, [account]));
  }

  return {
    getContractAddress,
    zcontractAddress,
    getAddressBalance,
    setLockTimePeriod,
    lockPeriod,
    stake,
    unStake,
    claimRewards,
    viewRewards,
    zviewRewards,
    getStakedTokens,
    zgetStakedTokens,
    stakers,
    zstakersInfo,
    clearRewards,
  };
}
