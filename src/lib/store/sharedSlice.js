import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    cards: [],
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action) => {
      state.cards = state.cards.map((card) =>
        card.id === action.payload.id ? { ...card, content: action.payload.content } : card
      );
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

export const { setCards, addCard, updateCard, deleteCard } = sharedSlice.actions;
export default sharedSlice.reducer;
