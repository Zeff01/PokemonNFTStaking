import { ethers } from 'ethers';
import ABI from '../NFTStaker/NFTStaker.json'


const eth = window.ethereum;
const provider = new ethers.providers.Web3Provider(eth);

export const CONTARCT_ADDRESS ="0x3E3a0dD0999715510E7BE3a03BB3Cf667d8DCE99";


const ethNFTStaker = new ethers.Contract(CONTARCT_ADDRESS, ABI.abi, provider.getSigner())



export default ethNFTStaker;