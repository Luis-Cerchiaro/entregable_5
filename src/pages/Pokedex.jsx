import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";

const Pokedex = () => {
  //? Here are all pokemons
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    //? When pokemonName is an empty string, the logic test is true and therefore doesnt modify the array with names
    pokemon.name.includes(pokemonName)
  );

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const stringToSearch = event.target.pokemonName.value.toLowerCase().trim();
    setPokemonName(stringToSearch);
  };

  const handleChangeType = (event) => {
    setCurrentType(event.target.value);
  };

  //? Brings all the individual pokemons
  useEffect(() => {
    if (currentType == "")
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
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

  return (
    <main>
      <section>
        <p>
          <span>Welcome {trainerName}, </span>
          here you can find your favorite Pokemon
        </p>
        <form onSubmit={handleSubmitForm}>
          <div>
            <input name="pokemonName" type="text" />
            <button>Search</button>
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
      <PokemonList pokemons={pokemonsByName} />
    </main>
  );
};
export default Pokedex;
