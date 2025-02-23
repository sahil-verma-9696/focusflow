import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (workspaceId, username) => {
  if (!workspaceId || !username) return console.error("❌ Missing workspaceId or username");

  socket = io("http://localhost:5000", {
    query: { workspaceId, username },
  });

  socket.on("connect", () => {
    console.log(`✅ Connected to workspace: ${workspaceId} as ${username}`);
  });

  socket.on("updateUsers", (users) => {
    console.log("👥 Users in workspace:", users);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from workspace");
  });

  return socket;
};

export const getSocket = () => socket;
