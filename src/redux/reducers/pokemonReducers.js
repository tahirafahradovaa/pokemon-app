import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { paginate, pokemonData } from "../actions/pokemonActions";

const initialState = {
  pokemon: [],
};

export const pokemonReducer = createReducer(initialState, (builder) => {
  builder.addCase(paginate, (state, action) => {
    state.pokemon = action.payload;
  });
});
