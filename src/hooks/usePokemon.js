import useWeb3Action from "./useWeb3Action";
import web3 from "../web3/web3";
import NFTPokemon from "../web3/NFTPokemon/Pokemon";
import ethPokemon from "../web3/NFTPokemon/ethPokemon";
import { useState } from "react";


export default function usePokemon(account) {

  let ethPokemonNFT = ethPokemon()

  const [zcurrentSupply, setzCurrentSupply] = useState();
  const [zbalanceOf, setzBalanceOf] = useState();
  const [ztokenUri, setzTokenUri] = useState();
  const [zgetOwnedTokens, setzGetOwnedTokens] = useState([]);

  const {
    clear,
    error,
    isLoading,
    response,
    transact,
    call,
    transactionDone,
    transactionHash,
  } = useWeb3Action(web3, NFTPokemon);

  async function currentSupply() {
    const balance = await ethPokemonNFT
      .currentSupply()
      .then((data) => data.toNumber());

    setzCurrentSupply(balance);
  }

  async function safeMint() {
    const safeMint = await ethPokemonNFT.safeMint();

    return safeMint;

  }

  async function approve( contractAddress, tokenId) {
    const approve = await ethPokemonNFT.approve(contractAddress, tokenId)

    return approve

  }


  async function ownerOf(tokenId) {
    transact(account, { name: "ownerOf" }, [tokenId]);
  }

  async function balanceOf(account) {
    setzBalanceOf(await call(account, { name: "balanceOf" }, [account]));
  }


  async function tokenURI(account, tokenId) {
    const tokenUri = await call(account, { name: "tokenURI" }, [tokenId]);
    setzTokenUri(tokenUri);

    return tokenUri;
  }

  async function getOwnedTokens() {
    const tokenUri = await ethPokemonNFT.getTokens()
    setzGetOwnedTokens(tokenUri);

    return tokenUri
  }

  

  // async function getOwnedTokens(account) {
  //   const tokenUri = await call(account, { name: "getTokens" }, []);
  //   setzGetOwnedTokens(tokenUri);

  //   return tokenUri;
  // }

  return {
    currentSupply,
    zcurrentSupply,
    ownerOf,
    balanceOf,
    zbalanceOf,
    approve,
    safeMint,
    tokenURI,
    ztokenUri,
    approve,
    transactionDone,
    transactionHash,
    isLoading,
    getOwnedTokens,
    zgetOwnedTokens,
  };
}
