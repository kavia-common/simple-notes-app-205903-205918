import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Note type: { id: string, title: string, content: string, updatedAt: number }

const NotesContext = createContext();

/**
 * PUBLIC_INTERFACE
 * useNotes - custom hook for accessing notes state and actions.
 */
export function useNotes() {
  return useContext(NotesContext);
}

/**
 * PUBLIC_INTERFACE
 * NotesProvider - provides notes state and actions to children.
 */
export function NotesProvider({ children }) {
  const STORAGE_KEY = "notes_app_v1";
  const [notes, setNotes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setNotes(JSON.parse(raw));
      } catch (e) {
        setNotes([]);
      }
    }
  }, []);

  // Persist to localStorage on notes update
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // PUBLIC_INTERFACE
  const addNote = (note) => {
    setNotes((prev) => [
      { ...note, id: Math.random().toString(36).slice(2), updatedAt: Date.now() }, // Random id; swap for uuid if needed
      ...prev,
    ]);
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, values) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...values, updatedAt: Date.now() }
          : n
      )
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const getNote = useCallback((id) => notes.find((n) => n.id === id), [notes]);

  // PUBLIC_INTERFACE
  const value = { notes, addNote, updateNote, deleteNote, getNote };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
