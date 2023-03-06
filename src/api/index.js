import axios from "axios";

export const getPokemon = async () => {
  try {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    return data.results;
  } catch (error) {
    console.error("There was an error: ", error);
  }
};

export const getPokemonsDetails = (pokemon) => {
  return axios
    .get(pokemon.url)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};
