"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSocket, sendSharedStateUpdate } from "@/utils/socket";
import {
  updateSharedState,
  replaceSharedState,
  mergeSharedState,
} from "@/libs/store/features/shared/slice";
import { v4 as uuidv4 } from "uuid";

export default function CardsComponent() {
  const socket = getSocket();
  const dispatch = useDispatch();

  // 🔄 Ensure `cards` exists in state and is always an array
  const cards = useSelector((state) => state.shared.cards || []);

  const [newCardContent, setNewCardContent] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("sharedStateUpdate", ({ type, key, payload }) => {
      if (key === "cards") {
        if (type === "sync") {
          dispatch(replaceSharedState(payload));
        } else if (type === "merge") {
          const uniqueCards = payload.filter(
            (newCard) =>
              !cards.some((existingCard) => existingCard.id === newCard.id)
          );
          if (uniqueCards.length > 0) {
            dispatch(
              updateSharedState({ key, payload: [...cards, ...uniqueCards] })
            );
          }
        } else {
          dispatch(updateSharedState({ key, payload }));
        }
      }
    });

    return () => {
      socket.off("sharedStateUpdate");
    };
  }, [socket, dispatch, cards]);

  // ✅ Add a new card and sync with others
  const handleAddCard = () => {
    if (!newCardContent.trim()) return;

    const newCard = { id: uuidv4(), content: newCardContent };

    // Check if the card already exists
    if (cards.some((card) => card.id === newCard.id)) return;

    dispatch(updateSharedState({ key: "cards", payload: [...cards, newCard] }));
    socket.emit("sharedStateUpdate", {
      type: "merge",
      key: "cards",
      payload: [newCard],
    });

    setNewCardContent("");
  };

  // ✅ Update a card and sync with others
  const handleUpdateCard = (id, newContent) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, content: newContent } : card
    );

    dispatch(updateSharedState({ key: "cards", payload: updatedCards }));
    sendSharedStateUpdate("update", "cards", updatedCards); // Broadcast update
  };

  // ✅ Delete a card and sync with others
  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);

    dispatch(updateSharedState({ key: "cards", payload: updatedCards }));
    sendSharedStateUpdate("update", "cards", updatedCards); // Broadcast deletion
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-3">📌 Cards</h2>

      <div className="space-y-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-2 border rounded flex justify-between"
          >
            <input
              type="text"
              value={card.content}
              onChange={(e) => handleUpdateCard(card.id, e.target.value)}
              className="border p-1 rounded w-full mr-2"
            />
            <button
              onClick={() => handleDeleteCard(card.id)}
              className="text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
          placeholder="Enter card content..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCard}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        >
          ➕ Add Card
        </button>
      </div>
    </div>
  );
}
