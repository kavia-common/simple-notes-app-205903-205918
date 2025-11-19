import React from "react";
import { useReminders } from "../../RemindersContext";

/**
 * PUBLIC_INTERFACE
 * ReminderList – shows reminders as cards, allows edit, delete, toggle complete.
 * Props:
 *   reminders: array
 *   onEdit: fn(reminder)
 */
export default function ReminderList({ reminders, onEdit }) {
  const { deleteReminder, toggleComplete } = useReminders();
  if (!reminders.length) return <div className="reminder-list-empty">No reminders.</div>;
  return (
    <ul className="reminder-list">
      {reminders.map(r => (
        <li
          key={r.id}
          className={"reminder-list-item" + (r.completed ? " reminder-list-done" : "")}
        >
          <button className="reminder-list-main" onClick={() => onEdit(r)}>
            <span className="reminder-list-title">{r.title}</span>
            {r.description && <span className="reminder-list-desc">{r.description}</span>}
            <span className="reminder-list-meta">
              {r.date}
              {r.time ? " " + r.time : ""}
              {r.completed ? <span className="reminder-list-complete-label">✓</span> : ""}
            </span>
          </button>
          <button
            className="reminder-list-complete"
            aria-label={r.completed ? "Mark as not done" : "Mark as done"}
            onClick={() => toggleComplete(r.id)}
            title={r.completed ? "Mark as not done" : "Mark as done"}
          >
            {r.completed ? "⏪" : "✅"}
          </button>
          <button
            className="reminder-list-delete"
            aria-label="Delete"
            title="Delete"
            onClick={() => window.confirm("Delete this reminder?") && deleteReminder(r.id)}
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}
