import ABI from "../NFTPokemon/Pokemon.json";

export const CONTRACT_ADDRESS = "0x2b59174b1d25f9Ff9E84A2076a02af7815dD26c3";

const NFTPokemon = (web3) => new web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS);

export default NFTPokemon;

// IMPORTANT NOTE THIS IS WEB3 JS, I HAVE ANOTHER FILE USING ETHER JS WHICH I IMPLENTED FOR THE FUNCTIONS HOOKS
