import React from "react";
import { motion } from "framer-motion";
import { MdCatchingPokemon } from "react-icons/md";

const Inventory = () => {
  const dummyInventory = [
    {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
    },
    {
      id: 2,
      name: "Charmander",
      type: "Fire",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
    },
    {
      id: 3,
      name: "Bulbasaur",
      type: "Grass",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    },
    {
      id: 4,
      name: "Squirtle",
      type: "Water",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
    },
  ];

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Pokémon Inventory
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyInventory.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            className="p-4 bg-white rounded-xl shadow-lg text-center text-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto"
            />
            <h2 className="text-xl font-semibold mt-2">{pokemon.name}</h2>
            <p className="text-sm text-gray-600">Type: {pokemon.type}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
