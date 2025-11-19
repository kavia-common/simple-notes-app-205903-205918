import React, { useState } from "react";
import { useNotes } from "../NotesContext";
import "./NotesList.css";

/**
 * PUBLIC_INTERFACE
 * NotesList - Lists notes with title, snippet, date, and actions.
 * @param {object} props
 * @param {function(string): void} props.onEdit - triggers editing a note by id
 * @param {function(): void} props.onNew - triggers creating a new note
 */
function NotesList({ onEdit, onNew }) {
  const { notes, deleteNote } = useNotes();
  const [query, setQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = query.trim()
    ? notes.filter(
        n =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase())
      )
    : notes;

  return (
    <div className="noteslist-wrapper">
      <div className="noteslist-header">
        <button className="btn-primary" onClick={onNew}>
          + New Note
        </button>
        <input
          type="search"
          className="search-box"
          placeholder="Search notes…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <ul className="noteslist-list" aria-live="polite">
        {filtered.length === 0 && (
          <li className="noteslist-empty" aria-live="polite">
            {query.trim()
              ? "No notes match your search."
              : "No notes yet. Click + New Note to get started."}
          </li>
        )}
        {filtered.map(note => (
          <li key={note.id} className="noteslist-item" tabIndex="0" aria-label={note.title}>
            <button
              className="item-main"
              onClick={() => onEdit(note.id)}
              tabIndex={-1}
              aria-label={`Edit note: ${note.title}`}
            >
              <span className="item-title">{note.title || "Untitled"}</span>
              <span className="item-snippet">
                {note.content.replace(/[\r\n]+/g, " ").slice(0, 64)}
                {note.content.length > 64 ? "…" : ""}
              </span>
            </button>
            <span className="item-meta">{new Date(note.updatedAt).toLocaleString()}</span>
            <button
              className="item-delete"
              title="Delete"
              aria-label={`Delete note: ${note.title}`}
              onClick={() => setConfirmDelete(note.id)}
            >
              🗑
            </button>
            {confirmDelete === note.id && (
              <div className="item-delete-modal" role="dialog" aria-modal="true">
                <div>
                  <span>Delete <strong>{note.title || "this note"}</strong>?</span>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      deleteNote(note.id);
                      setConfirmDelete(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => setConfirmDelete(null)}
                    autoFocus
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
