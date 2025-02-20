import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTasksFromSocket: (state, action) => {
      state.tasks = action.payload; // Sync tasks from the socket
    },
  },
});

export const { addTask, removeTask, updateTasksFromSocket } = taskSlice.actions;
export default taskSlice.reducer;
