import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/slice";
import taskReducer from "./features/tasks/slice"
import labelReducer from "./features/labels/slice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      global: globalReducer,
      tasks: taskReducer,
      labels: labelReducer,
    },
  });
};
