import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "hack1",
    name: "Code Sprint 2025",
    description: "A 24-hour hackathon focused on AI and ML innovations.",
    date: "2025-02-28",
    link: "https://codesprint2025.com",
  },
  {
    id: "hack2",
    name: "Web Dev Clash",
    description: "Compete to build the best full-stack web application in 48 hours!",
    date: "2025-06-15",
    link: "https://webdevclash.com",
  },
  {
    id: "hack3",
    name: "Cyber Security Challenge",
    description: "A hacking competition to test your cybersecurity skills.",
    date: "2025-07-20",
    link: "https://cyberchallenge.com",
  },
  {
    id: "hack4",
    name: "Game Jam X",
    description: "Create an innovative game from scratch in just 72 hours.",
    date: "2025-08-05",
    link: "https://gamejamx.com",
  },
  {
    id: "hack5",
    name: "Blockchain Innovators",
    description: "A hackathon focused on decentralized apps and blockchain tech.",
    date: "2025-09-12",
    link: "https://blockchaininnovators.com",
  },
];

const hackathonSlice = createSlice({
  name: "hackathons",
  initialState,
  reducers: {
    addHackathon: (state, action) => {
      state.push(action.payload);
    },
    updateHackathon: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.findIndex((hack) => hack.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
      }
    },
    deleteHackathon: (state, action) => {
      return state.filter((hack) => hack.id !== action.payload);
    },
    setHackathons: (state, action) => {
      return action.payload;
    },
  },
});

export const { addHackathon, updateHackathon, deleteHackathon, setHackathons } =
  hackathonSlice.actions;
export default hackathonSlice.reducer;
