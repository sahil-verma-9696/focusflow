import { io } from "socket.io-client";
import { store } from "@/libs/store/store"; // Import Redux store
import {
  updateSharedState,
  mergeSharedState,
  removeSharedKey,
  replaceSharedState,
} from "@/libs/store/features/shared/slice";

let socket = null;

export const connectSocket = (workspaceId, username) => {
  console.log("🔌 Connecting to workspace:", workspaceId, username);

  if (!workspaceId || !username)
    return console.error("❌ Missing workspaceId or username");

  socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
    query: { workspaceId, username },
  });

  socket.on("connect", () => {
    console.log(`✅ Connected to workspace: ${workspaceId} as ${username}`);
  });

  socket.on("updateUsers", (users) => {
    console.log("👥 Users in workspace:", users);
  });

  // Handle shared state updates
  socket.on("sharedStateUpdate", ({ type, key, payload }) => {
    console.log(`🔄 Shared state update: ${type}`, { key, payload });

    switch (type) {
      case "sync":
        store.dispatch(replaceSharedState(payload));
        break;

      case "merge":
        store.dispatch(mergeSharedState({ key, payload }));
        break;

      case "update":
        store.dispatch(updateSharedState({ key, payload }));
        break;

      case "delete":
        store.dispatch(removeSharedKey({ key }));
        break;

      case "replace":
        store.dispatch(replaceSharedState(payload));
        break;

      case "reset":
        store.dispatch(replaceSharedState({})); // Reset everything
        break;

      default:
        console.warn(`⚠️ Unknown update type: ${type}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from workspace");
  });

  return socket;
};

export const getSocket = () => socket;

// Generic function to send updates
export const sendSharedStateUpdate = (type, key, payload) => {
  if (socket) {
    socket.emit("sharedStateUpdate", { type, key, payload });
  } else {
    console.error("❌ Socket not connected");
  }
};
