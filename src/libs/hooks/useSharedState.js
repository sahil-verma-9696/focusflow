"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSocket, sendSharedStateUpdate } from "@/utils/socket";
import {
  updateSharedState,
  replaceSharedState,
  mergeSharedState,
  removeSharedKey,
} from "@/libs/store/features/shared/slice";
import { v4 as uuidv4 } from "uuid";

export function useSharedState(key) {
  const socket = getSocket();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shared[key] || []);
  
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!socket) return;

    socket.on("sharedStateUpdate", ({ type, key: updatedKey, payload }) => {
      if (updatedKey !== key) return;

      if (type === "sync") {
        dispatch(replaceSharedState(payload));
      } else if (type === "merge") {
        dispatch(mergeSharedState({ key, payload }));
      } else if (type === "update") {
        dispatch(updateSharedState({ key, payload }));
      } else if (type === "delete") {
        dispatch(removeSharedKey({ key }));
      }
    });

    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch, key]);

  // Add an item (object-based)
  const addItem = () => {
    if (!newItem.title.trim() || !newItem.description.trim()) return;

    const newTask = { id: uuidv4(), ...newItem };

    dispatch(updateSharedState({ key, payload: [...items, newTask] }));
    sendSharedStateUpdate("merge", key, [newTask]);

    setNewItem({ title: "", description: "" });
  };

  // Update an item (object-based)
  const updateItem = (id, updatedFields) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...updatedFields } : item
    );

    dispatch(updateSharedState({ key, payload: updatedItems }));
    sendSharedStateUpdate("update", key, updatedItems);
  };

  // Delete an item
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    dispatch(updateSharedState({ key, payload: updatedItems }));
    sendSharedStateUpdate("update", key, updatedItems);
  };

  return { items, newItem, setNewItem, addItem, updateItem, deleteItem };
}
