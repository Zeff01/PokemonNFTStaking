import ABI from '../NFTStaker/NFTStaker.json'

export const CONTARCT_ADDRESS ="0xF10E5e11145e3b7a39cA0BB0E4bc1a93D5C9E409";


const NFTStaker =  (web3) =>  new web3.eth.Contract(ABI.abi, CONTARCT_ADDRESS);

export default NFTStaker;