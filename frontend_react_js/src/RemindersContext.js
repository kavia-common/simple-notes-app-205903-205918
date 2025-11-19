import React, { createContext, useContext, useEffect, useReducer } from "react";

// Reminder shape: {id, title, description, date (YYYY-MM-DD), time, completed, createdAt}

/**
 * Reminders reducer handles reminder CRUD and state logic.
 */
function remindersReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [
        { ...action.payload, id: Math.random().toString(36).slice(2), completed: false, createdAt: Date.now() },
        ...state,
      ];
    case "UPDATE":
      return state.map(r => (r.id === action.payload.id ? { ...r, ...action.payload } : r));
    case "DELETE":
      return state.filter(r => r.id !== action.payload);
    case "TOGGLE_COMPLETE":
      return state.map(r => r.id === action.payload ? { ...r, completed: !r.completed } : r);
    default:
      return state;
  }
}

const RemindersContext = createContext();

const STORAGE_KEY = "reminders";

/**
 * PUBLIC_INTERFACE
 * Provider for reminders state.
 */
export function RemindersProvider({ children }) {
  const [reminders, dispatch] = useReducer(remindersReducer, []);

  // Load from localStorage
  useEffect(() => {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        dispatch({ type: "LOAD", payload: JSON.parse(data) });
      } catch {
        dispatch({ type: "LOAD", payload: [] });
      }
    }
  }, []);

  // Persist on change
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  // PUBLIC_INTERFACE
  const addReminder = (reminder) => {
    dispatch({ type: "ADD", payload: reminder });
  };

  // PUBLIC_INTERFACE
  const updateReminder = (reminder) => {
    dispatch({ type: "UPDATE", payload: reminder });
  };

  // PUBLIC_INTERFACE
  const deleteReminder = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  // Reminders sorted by date/time
  const sortedReminders = [...reminders].sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.time || "00:00"}`);
    const bDate = new Date(`${b.date}T${b.time || "00:00"}`);
    return aDate - bDate;
  });

  return (
    <RemindersContext.Provider
      value={{
        reminders: sortedReminders,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleComplete
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useReminders() {
  return useContext(RemindersContext);
}
