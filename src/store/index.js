import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});