import ABI from '../NFTPokemon/Pokemon.json'

export const CONTARCT_ADDRESS ="0x22f5F7D692FACF26bd53bBE6B56fe90b678B97Da";


const NFTPokemon =  (web3) =>  new web3.eth.Contract(ABI.abi, CONTARCT_ADDRESS);


export default NFTPokemon;