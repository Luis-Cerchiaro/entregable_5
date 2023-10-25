import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  bgByType,
  borderByType,
  colorByType,
  boxByType,
} from "../constants/pokemonColor";

const PokemonDetail = () => {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const { id } = useParams();

  const getPercent = (statValue) => {
    const MAX_VALUE = 255;
    const percent = ((statValue / MAX_VALUE) * 100).toFixed(1);
    return `${percent}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(({ data }) => setPokemonInfo(data))
      .catch((err) => console.log(err));
  }, []);

  const pokemonTypes = pokemonInfo?.types.map((type) => (
    <div className={`${boxByType[pokemonInfo?.types[1].type.name]}`}>
      {type.type.name}
    </div>
  ));

  const pokemonAbilities = pokemonInfo?.abilities.map((ability) => (
    <div className="bg-gray-100 text-gray-400 p-2 m-2 rounded-sm">{ability.ability.name}</div>
  ));

  return (
    <div>
      <div className="bg-[url('/header.svg')] bg-cover bg-center h-[200px]">
        <img className="w-[400px] p-2" src="./pokedexTitle.svg" alt="" />
      </div>
      <main
        className={`pt-32 pb-10 text-center capitalize max-w-[500px] mx-auto border-4 rounded-lg ${
          borderByType[pokemonInfo?.types[0].type.name]
        }`}
      >
        <article className="relative">
          <header className="absolute top-0 w-full -translate-y-[45%]">
            <img
              src={pokemonInfo?.sprites.other["official-artwork"].front_default}
              alt=""
              className="max-w-[300px] mx-auto block"
            />
          </header>
          <div
            className={`${bgByType[pokemonInfo?.types[0].type.name]} h-[130px]`}
          ></div>
        </article>
        <h3
          className={`${
            colorByType[pokemonInfo?.types[0].type.name]
          } text-center text-[43px] font-medium`}
        >
          #{pokemonInfo?.id}
        </h3>
        <h2
          className={`${
            colorByType[pokemonInfo?.types[0].type.name]
          } text-center text-[43px] font-medium`}
        >
          {pokemonInfo?.name}
        </h2>

        <div className="grid grid-cols-2 text-[#0F0F2D] text-[25px] font-medium text-center">
          <div>
            <h3>Weight</h3>
            <span>{pokemonInfo?.weight}</span>
          </div>
          <div>
            <h3>Height</h3>
            <span>{pokemonInfo?.height}</span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h3>Type</h3>
            <div className="grid grid-cols-2">{pokemonTypes}</div>
          </div>
          <div>
            <h3>Abilities</h3>
            <div className="grid grid-cols-2">{pokemonAbilities} </div>
          </div>
        </div>
        <section className="px-2">
          <h3 className="text-start">stats</h3>
          <ul className="grid gap-4">
            {pokemonInfo?.stats.map((stat) => (
              <li className="capitalize" key={stat.stat.name}>
                <div className="flex justify-between items-center">
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}/255</span>
                </div>
                <div className="bg-slate-200 rounded-md h-6 overflow-hidden">
                  <div
                    style={{ width: getPercent(stat.base_stat) }}
                    className="bg-yellow-500 rounded-md h-full"
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/*place for pokemon movements */}
      </main>
    </div>
  );
};
export default PokemonDetail;
