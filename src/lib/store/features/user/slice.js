import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  workspaceId: null, // ✅ Make sure this exists
  token:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.workspaceId = action.payload.workspaceId; // ✅ Store workspaceId properly
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;