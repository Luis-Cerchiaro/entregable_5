import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>{type.type.name}</div>
  ));

  const pokemonAbilities = pokemonInfo?.abilities.map((ability) => (
    <div>{ability.ability.name}</div>
  ));

  const pokemonMoves = pokemonInfo?.moves.map((move) => (
    <div className=" bg-gray-500 text-white p-2 m-2 rounded-lg max-w-fit ">
      {move.move.name}
    </div>
  ));

  return (
    <div className="p-1">
      <div className="bg-[url('/header.svg')] bg-cover bg-center h-[140px] overflow-hidden">
        <img
          className="w-[400px] p-2"
          src="./pokedexTitle.svg"
          alt=""
        />
      </div>
      <main className="py-10 px-2 text-center capitalize max-w-[500px] mx-auto">
        <article className="">
          <header>
            <img
              src={pokemonInfo?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </header>
        </article>
        <h3>#{pokemonInfo?.id}</h3>
        <h2>{pokemonInfo?.name}</h2>
        <h3>Weight</h3>
        <span>{pokemonInfo?.weight}</span>
        <h3>Height</h3>
        <span>{pokemonInfo?.height}</span>
        <section>
          <h3>Type</h3>
          <div key={pokemonTypes}>{pokemonTypes}</div>
          <h3>Abilities</h3>
          <div > {pokemonAbilities} </div>
        </section>
        <section>
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
                    className="bg-yellow-400 rounded-md h-full"
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-start">Moves</h3>
          <div className=" grid-cols-4">{pokemonMoves}</div>
        </section>
      </main>
    </div>
  );
};
export default PokemonDetail;
