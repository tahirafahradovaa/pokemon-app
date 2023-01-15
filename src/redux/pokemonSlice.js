import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { paginate, pokemonData } from "./actions/pokemonActions";
const initialState = {
  pokemon: [],
};

export const newPage = (url) => (dispatch) => {
  axios.get(url).then((res) => {
    dispatch(paginate(res.data));
  });
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    paginate: (state, action) => {
      console.log(action.payload);
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
