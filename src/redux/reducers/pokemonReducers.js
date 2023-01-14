import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { getPokemon, pokemonData } from "../actions/pokemonActions";

const initialState = {
  pokemon: [],
};

export const pokemonReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPokemon, (state, action) => {
    state.pokemon.push(action.payload);
  });
});
