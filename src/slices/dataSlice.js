import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonsDetails } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  pokemons: [],
  pokemonsFiltered: [],
};

export const fetchPokemonsWithDetails = createAsyncThunk(
  "data/fetchPokemonsWithDetails",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon();
    const pokemonDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonsDetails(pokemon))
    );
    dispatch(setPokemons(pokemonDetailed));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
      state.pokemonsFiltered = action.payload;
    },
    setFavorite: (state, action) => {
      // encontramos el indice del pokemon que viene del payload como pokemonId
      const pokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );
      // en caso de encontrar el index, vamos a cambiar el statado favorite
      if (pokemonIndex >= 0) {
        // guardamos el valor de favorite del pokemon encontrado
        const isFavorite = state.pokemons[pokemonIndex].favorite;
        // modificamos el valor de favorito en pokemos y pokemosFiltered
        state.pokemons[pokemonIndex].favorite = !isFavorite;
        state.pokemonsFiltered[pokemonIndex].favorite = !isFavorite;
      }
    },
    setFilter: (state, action) => {
      const pokemonsFiltered = state.pokemons.filter((pokemon) =>
        pokemon.name.includes(action.payload)
      );
      state.pokemonsFiltered = pokemonsFiltered;
    },
  },
});

export const { setFavorite, setPokemons, setFilter } = dataSlice.actions;

export default dataSlice.reducer;
