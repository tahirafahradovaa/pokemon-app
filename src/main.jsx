import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { pokReducer } from "./redux/pokemonSlice";
import { pokemonReducer } from "./redux/reducers/pokemonReducers";
const store = configureStore({
  reducer: {
    pokemonReducer: pokemonReducer,
    pokReducer: pokReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
