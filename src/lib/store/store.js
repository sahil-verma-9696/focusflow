import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/slice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      global: globalReducer,
    },
  });
};
