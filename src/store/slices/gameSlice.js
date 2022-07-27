import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  platforms: [],
  gameId: null,
  game: null,
  screeshots: [],
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGames: (state, { payload }) => {
      state.games.push(...payload.games);
    },
    updateGames: (state, { payload }) => {
      state.games = payload.games;
    },
    setPlatforms: (state, { payload }) => {
      state.platforms = payload.platforms;
    },
    setGameId: (state, { payload }) => {
      state.gameId = payload.gameId;
    },
    setGame: (state, { payload }) => {
      state.game = payload.game;
    },
    setScreenshots: (state, { payload }) => {
      state.screenshots = payload.screenshots;
    },
  },
});

export const { addGames, updateGames, setPlatforms, setGameId, setGame, setScreenshots } = gamesSlice.actions;

export default gamesSlice.reducer;
