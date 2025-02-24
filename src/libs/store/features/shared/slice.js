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
        state[key] = Array.isArray(payload) ? payload : [payload];
      } else if (Array.isArray(state[key])) {
        // ✅ Ensure uniqueness by filtering out duplicates
        const existingIds = new Set(state[key].map((item) => item.id));
        const newItems = payload.filter((item) => !existingIds.has(item.id));
    
        state[key] = [...state[key], ...newItems]; // ✅ Only adds new unique items
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
