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

  return (
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
    </main>
  );
};
export default PokemonDetail;
