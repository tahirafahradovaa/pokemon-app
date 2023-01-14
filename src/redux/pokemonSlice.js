import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonData } from "./actions/pokemonActions";
import { pokemonReducer } from "./reducers/pokemonReducers";
const initialState = {
  pokemon: [],
};
export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    newPage: (state, action) => {
      state.pokemon.push(action.payload);
    },
  },
  extraReducers: {
    [pokemonData.fulfilled]: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

export const pokReducer = pokemonSlice.reducer;

export const newPage =
  (page = 0) =>
  (dispatch) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}0&limit=20`)
      .then((res) => {
        dispatch(newPage(res.data));
      });
  };
