import { ethers } from "ethers";
import ABI from './Pokemon.json'

export const CONTARCT_ADDRESS ="0xDa5f84675670606aA3eC7383D0059979ED7f43b4";

const {ethereum} = window;
const provider = new ethers.providers.Web3Provider(ethereum)
const ethPokemon = new ethers.Contract(CONTARCT_ADDRESS, ABI.abi, provider.getSigner())

export default ethPokemon;