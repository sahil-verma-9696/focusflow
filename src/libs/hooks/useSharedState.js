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
  const [newItemContent, setNewItemContent] = useState("");

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
      }else if (type === "delete") {
        dispatch(removeSharedKey({ key }));
      }
    });

    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch, key]);

  // Add an item
  const addItem = () => {
    if (!newItemContent.trim()) return;

    const newItem = { id: uuidv4(), content: newItemContent };
    if (items.some((item) => item.id === newItem.id)) return;

    dispatch(updateSharedState({ key, payload: [...items, newItem] }));
    sendSharedStateUpdate("merge", key, [newItem]);

    setNewItemContent("");
  };

  // Update an item
  const updateItem = (id, newContent) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, content: newContent } : item
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

  return { items, newItemContent, setNewItemContent, addItem, updateItem, deleteItem };
}
