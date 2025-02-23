import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/slice"; 
import sharedReducer from "./features/shared/slice"; // Import shared slice
import alertReducer from "./features/alert/slice"
import hackathonReducer from "./features/hackathons/slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    shared: sharedReducer, // Register shared slice
    alert: alertReducer,
    hackathons: hackathonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store); 
