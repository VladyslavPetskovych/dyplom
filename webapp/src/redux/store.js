// src/app/store.js

import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    chatId: null,
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
});

export const { setChatId } = userSlice.actions;

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
