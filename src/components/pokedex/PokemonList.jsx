import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_250px)] justify-center gap-6 max-w-800px] mx-auto py-10">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
      ))}
    </section>
  );
};
export default PokemonList;
