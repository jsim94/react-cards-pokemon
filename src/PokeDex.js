import { v4 as uuid } from "uuid";
import React from "react";
import { useAxios } from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const formatter = (data) => {
    return {
      id: uuid(),
      front: data.sprites.front_default,
      back: data.sprites.back_default,
      name: data.name,
      stats: data.stats.map((stat) => ({
        value: stat.base_stat,
        name: stat.stat.name,
      })),
    };
  };

  const [pokemon, addPokemon, removeCards] = useAxios({
    url: `https://pokeapi.co/api/v2/pokemon/`,
    keyName: "pokemon",
    formatter,
  });

  const handleAdd = (name) => {
    addPokemon([name]);
  };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={handleAdd} remove={removeCards} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((cardData) => {
          console.log(cardData);
          return (
            <PokemonCard
              key={cardData.id}
              front={cardData.front}
              back={cardData.back}
              name={cardData.name}
              stats={cardData.stats.map((stat) => ({
                value: stat.value,
                name: stat.name,
              }))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PokeDex;
