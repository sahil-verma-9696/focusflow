import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/slice";
import sharedReducer from "./features/shared/slice"; // Import shared slice
import alertReducer from "./features/alert/slice";
import hackathonReducer from "./features/hackathons/slice";
import uiReducer from "./features/ui/slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    shared: sharedReducer, // Register shared slice
    alert: alertReducer,
    hackathons: hackathonReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
