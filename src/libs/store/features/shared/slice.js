const { createSlice } = require("@reduxjs/toolkit");

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    cards: [],
    tasks: [],
  },
  reducers: {
    updateSharedState: (state, action) => {
      const { key, payload } = action.payload;
      state[key] = payload;
    },

    mergeSharedState: (state, action) => {
      const { key, payload } = action.payload;

      if (!state[key]) {
        state[key] = Array.isArray(payload) ? payload : [payload]; // Ensure it's an array
      } else if (Array.isArray(state[key])) {
        state[key] = [...state[key], ...payload]; // ✅ Correctly merge arrays (cards)
      } else {
        console.error(`⚠️ Merge failed: ${key} is not a mergeable type`);
      }
    },

    removeSharedKey: (state, action) => {
      const { key } = action.payload;
      delete state[key];
    },

    replaceSharedState: (state, action) => {
      return action.payload; // ✅ Fully replace state
    },
  },
});

export const { removeSharedKey, replaceSharedState, updateSharedState, mergeSharedState } = sharedSlice.actions;
export default sharedSlice.reducer;
