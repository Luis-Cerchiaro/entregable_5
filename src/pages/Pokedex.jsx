import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  //? Here are all pokemons
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    //? When pokemonName is an empty string, the logic test is true and therefore doesnt modify the array with names
    pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const stringToSearch = event.target.pokemonName.value.toLowerCase().trim();
    //console.log(stringToSearch)
    setPokemonName(stringToSearch);
  };

  const handleChangeType = (event) => {
    setCurrentType(event.target.value);
  };

  const handlePreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  //? Brings all the individual pokemons
  useEffect(() => {
    if (currentType == "")
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
  }, [currentType]);

  //? Brings all the available types of pokemon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, [currentType]);

  //? Brings all the pokemons according to the selected type of pokemon
  useEffect(() => {
    axios;
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) =>
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
        )
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Listening if there is a change in the pokemon type category to set the currentPage to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType]);

  return (
    <main className="">
      <header className="bg-[url('/header.svg')] bg-cover bg-center h-[200px]">
        <img className="w-[400px] p-2" src="./pokedexTitle.svg" alt="" />
      </header>
      <section>
        <p className="text-lg">
          <span className="text-red-600 font-semibold">
            Welcome {trainerName},{" "}
          </span>
          here you can find your favorite Pokemon
        </p>
        <form
          onSubmit={handleSubmitForm}
          className="flex justify-center p-2 mt-2 mb-2"
        >
          <div className="flex justify-center p-2 mt-2 mb-2">
            <input
              className="shadow hover:shadow-lg px-2"
              name="pokemonName"
              placeholder="write the pokemon name"
              type="text"
            />
            <button className="bg-red-600 flex px-6 py-2 items-center text-white font-semibold">
              Search
            </button>
          </div>
          <select onChange={handleChangeType} className="capitalize">
            <option value="">All Pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}{" "}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* List of pokemons being rendered*/}
      <PokemonList pokemons={itemsInCurrentPage} />

      {/* Block to create the pagination*/}
      <ul className="flex justify-center gap-4 font-semibold flex-wrap">
        {currentPage !== 1 && (
          <li>
            <button
              className={"text-white px-4 py-2 rounded-sm bg-red-600"}
              onClick={handlePreviousPage}
            >
              {"<"}
            </button>
          </li>
        )}

        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`text-white px-4 py-2 rounded-sm ${
                currentPage === page ? "bg-red-600" : "text-black"
              } `}
            >
              {page}
            </button>{" "}
          </li>
        ))}
        {currentPage !== lastPage && (
          <li>
            <button
              onClick={handleNextPage}
              className={"text-white px-4 py-2 rounded-sm bg-red-600"}
            >
              {">"}
            </button>
          </li>
        )}
      </ul>
    </main>
  );
};
export default Pokedex;
