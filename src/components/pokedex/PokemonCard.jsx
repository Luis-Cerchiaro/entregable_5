import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  const pokemonCharecteristics = pokemon?.types
    .map((type) => type.type.name)
    .join(" / ");

  return (
    <Link to={`/pokedex/${pokemon?.id}`} className=" capitalize">
      <header></header>
      <div>
        <div>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <h3> {pokemon?.name} </h3>
        <span>{pokemonCharecteristics}</span>
        <h5>type</h5>
        <ul>
          {/* add an slice before the map to control the quantity of stats rendered ex. pokemon?.stats.slice(0,4).map((stat) to display only 4 stats */}
          {pokemon?.stats.map((stat) => (
            <li key={stat.stat.name}>
              <h6>{stat.stat.name}</h6>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
export default PokemonCard;
