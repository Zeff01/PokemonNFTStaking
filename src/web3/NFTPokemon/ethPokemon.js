import { ethers } from "ethers";
import ABI from "./Pokemon.json";

const ethPokemon = () => {
  const CONTRACT_ADDRESS = "0x2b59174b1d25f9Ff9E84A2076a02af7815dD26c3";

  if (typeof window.ethereum == "undefined") {
    // No window.ethereum found, no metamask.
    // redirect to link
    // window.location.href = `https://metamask.io/`;
    console.log("No metamask installed. Intstall metamask first.");
  }

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const ethPokemon = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI.abi,
    provider.getSigner()
  );

  return ethPokemon;
};

export default ethPokemon;
