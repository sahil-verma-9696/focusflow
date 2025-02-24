import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  workspaceId: null, // ✅ Make sure this exists
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
    }
  },
});

export const { setUser,setWorkspaceId } = userSlice.actions;
export default userSlice.reducer;
