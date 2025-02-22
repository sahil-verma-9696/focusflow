import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedTask, modifiedAt: new Date().toISOString() };
      }
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
