import { createSlice } from "@reduxjs/toolkit";

const labelSlice = createSlice({
  name: "labels",
  initialState: [
    { id: 1, name: "all" },
    { id: 2, name: "backlog" },
    { id: 3, name: "in progress" },
    { id: 4, name: "in review" },
    { id: 5, name: "ready" },
  ],
  reducers: {
    addLabel: (state, action) => {
      state.push(action.payload);
    },
    removeLabel: (state, action) => {
      return state.filter((label) => label.id !== action.payload);
    },
    renameLabel: (state, action) => {
      const { id, newName } = action.payload;
      return state.map((label) =>
        label.id === id ? { ...label, name: newName || label.name } : label
      );
    },

    deleteLabel: (state, action) => {
      return state.filter((label) => label.id !== action.payload);
    },
  },
});

export const { addLabel, removeLabel, renameLabel, deleteLabel } =
  labelSlice.actions;
export default labelSlice.reducer;
