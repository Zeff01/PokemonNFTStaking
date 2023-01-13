import { ethers } from "ethers";
import ABI from "../NFTStaker/NFTStaker.json";

const ethNFTStaker = () => {
  if (typeof window.ethereum !== "undefined") {
    const eth = window.ethereum;
    const provider = new ethers.providers.Web3Provider(eth);

    const CONTRACT_ADDRESS = "0xc66eEBcC0B8C38C85E0B700a3B8c03B1FeF00689";

    const ethNFTStaker = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI.abi,
      provider.getSigner()
    );
    return ethNFTStaker;
  } else {
    // No window.ethereum found, no metamask.
    // redirect to link
    // window.location.href = `https://metamask.io/`;
    return;
  }
};

export default ethNFTStaker;
