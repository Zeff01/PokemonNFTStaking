import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import api from "../api/api";
import Card from "../components/Card";
import Account from "../components/Account";
import Search from "../components/Search";

const PokeDex = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonSpecie, setPokemonSpecie] = useState([]);
  const [currentPage, setCurrentPage] = useState(api.POKEMON);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState();

  const { active, account, library, chainId, connector, activate, deactivate } =
    useWeb3React();

  const getAllPokemons = async () => {
    setLoading(true);
    const res = await axios
      .get(currentPage)
      .catch((err) => console.log("ERROR:", err));
    const data = res.data;
    setLoading(false);
    setNextPage(data.next);
    setPrevPage(data.previous);

    createPokemonObject(data.results);
    getPokemonSpecies(data.results);
  };

  const createPokemonObject = async (result) => {
    var pokemonArr = [];
    await Promise.all(
      result.map((pokemon) => {
        return axios.get(`${api.POKEMON + pokemon.name}`).then((result) => {
          pokemonArr.push(result.data);
        });
      })
    );
    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    setAllPokemons(pokemonArr);
  };

  const getPokemonSpecies = async (result) => {
    var specieArr = [];
    const promise = await Promise.all(
      result.map(async (pokemon) => {
        return new Promise(async (res, rej) => {
          await fetch(api.POKEMON_SPECIES + pokemon.name)
            .then((item) => {
              return item.json();
            })
            .then((data) => {
              res(data);
            });
        });
      })
    );

    promise.map((data) => {
      specieArr.push({
        id: data.id,
        name: data.name,
        description: data.flavor_text_entries[1].flavor_text,
      });
    });

    specieArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    setPokemonSpecie(specieArr);
  };

  useEffect(() => {
    getAllPokemons();
  }, [currentPage]);

  function goNextPage() {
    setCurrentPage(nextPage);
  }

  function goPrevPage() {
    setCurrentPage(prevPage);
  }

  if (loading) return "Loading...";

  return (
    <div className="w-full h-full backgroundDawn bg-no-repeat bg-cover ">
    <div  className="flex md:hidden p-2">
        <Account fontColor={"white"} />
        </div>
      <div className="flex p-4">
        <Search  />
        <div  className="hidden md:flex">
        <Account fontColor={"white"} />
        </div>
   
      </div>
      <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2 font-bold ">
        {allPokemons.map((pokemon, num) => {
          return (
            <div key={num}>
              <Card
                specie={
                  pokemonSpecie.length &&
                  pokemonSpecie.find((item) => item.name === pokemon.name)
                }
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                stats={pokemon.stats}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-10 ">
        <div className="flex w-60 justify-between ">
          {prevPage ? (
            <button
              type="button"
              className="text-white paginationButton"
              onClick={goPrevPage}
            >
              Prev Page
            </button>
          ) : (
            <button type="button" className="scale-0" onClick={goPrevPage}>
              Prev Page
            </button>
          )}
          <button
            type="button"
            className="text-white paginationButton justify-self-end"
            onClick={goNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokeDex;
