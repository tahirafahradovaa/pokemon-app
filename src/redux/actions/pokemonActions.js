import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getPokemon = createAction("pokemon/getPokemon");
export const pokemonData = createAsyncThunk("pokemon/pokemonData", async () => {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"
  );
  const data = res.data;
  return data;
});
