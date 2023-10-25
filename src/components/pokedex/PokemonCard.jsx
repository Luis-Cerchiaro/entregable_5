import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType, colorByType } from "../../constants/pokemonColor";

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
    <Link to={`/pokedex/${pokemon?.id}`} className={`capitalize border-4 rounded-lg ${borderByType[pokemon?.types[0].type.name]} text-center`}>
      <header className={`${bgByType[pokemon?.types[0].type.name]} h-[140px]`}></header>
      <div className="relative pt-14">
        <div className="absolute top-0 w-full -translate-y-2/3">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
            className="max-w-[180px] mx-auto block"
          />
        </div>
        <h3 className={`${colorByType[pokemon?.types[0].type.name]} text-center text-[25px] font-medium`}>{pokemon?.name}</h3>
        <span className="text-[#4F4F4F] text-center text-[14px] font-normal">{pokemonCharecteristics}</span>
        <h5 className="text-[#9F9F9F] text-center text-[12px] font-normal">type</h5>
        <hr className="stroke-[0.5px] stroke-[#E5E5E5]" />
        <ul className="grid grid-cols-2">
          {/* add an slice before the map to control the quantity of stats rendered ex. pokemon?.stats.slice(0,4).map((stat) to display only 4 stats */}
          {pokemon?.stats.map((stat) => (
            <li key={stat.stat.name}>
              <h6 className="text-[#9F9F9F] text-center text-[12px] font-normal">{stat.stat.name}</h6>
              <span className={`${colorByType[pokemon?.types[0].type.name]} text-center text-[16px] font-medium`}>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
export default PokemonCard;
