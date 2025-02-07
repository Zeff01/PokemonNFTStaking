import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { active, account } = useWeb3React();

  const getAllPokemons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(currentPage);
      const data = res.data;
      setNextPage(data.next);
      setPrevPage(data.previous);
      createPokemonObject(data.results);
      getPokemonSpecies(data.results);
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPokemonObject = async (result) => {
    const pokemonArr = await Promise.all(
      result.map(async (pokemon) => {
        const res = await axios.get(`${api.POKEMON}${pokemon.name}`);
        return res.data;
      })
    );
    setAllPokemons(pokemonArr.sort((a, b) => a.id - b.id));
  };

  const getPokemonSpecies = async (result) => {
    const specieArr = await Promise.all(
      result.map(async (pokemon) => {
        const res = await fetch(`${api.POKEMON_SPECIES}${pokemon.name}`);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          description:
            data.flavor_text_entries?.[1]?.flavor_text ||
            "No description available.",
        };
      })
    );
    setPokemonSpecie(specieArr.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getAllPokemons();
  }, [currentPage]);

  const goNextPage = () => setCurrentPage(nextPage);
  const goPrevPage = () => setCurrentPage(prevPage);

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-red-800 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen backgroundDawn bg-no-repeat bg-cover text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold tracking-wide">PokeDex</h1>
        <div className="flex items-center space-x-4">
          <Search onSearch={setSearchQuery} />
          <Account fontColor="white" />
        </div>
      </header>

      {active ? (
        <p className="text-center text-lg mb-4">Welcome, {account}</p>
      ) : (
        <p className="text-center text-lg mb-4">
          Please connect your wallet to explore PokeDex features.
        </p>
      )}

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            specie={pokemonSpecie.find((item) => item.name === pokemon.name)}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            stats={pokemon.stats}
          />
        ))}
      </main>

      <footer className="flex justify-center mt-10 space-x-4">
        {prevPage && (
          <button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={goPrevPage}
          >
            Prev Page
          </button>
        )}
        {nextPage && (
          <button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={goNextPage}
          >
            Next Page
          </button>
        )}
      </footer>
    </div>
  );
};

export default PokeDex;
