import React, { useEffect, useRef, useState } from "react";
import "./NoteEditor.css";

/**
 * PUBLIC_INTERFACE
 * NoteEditor props:
 *   open: boolean
 *   mode: 'new'|'edit'
 *   note: { id, title, content, updatedAt } or null (for new)
 *   onSave: (noteData: { title, content }) => void
 *   onClose: () => void
 */
function NoteEditor({ open, mode, note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [error, setError] = useState(null);
  const dialogRef = useRef();

  // Focus management and close with Escape
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  // Reset on note open/close
  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setError(null);
  }, [note, open]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSave({ ...note, title: title.trim(), content });
  };

  // Close on overlay click
  const overlayClick = (e) => {
    if (e.target.classList.contains("noteeditor-modal")) onClose();
  };

  return (
    <div
      className={`noteeditor-modal${open ? " open" : ""}`}
      tabIndex={-1}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="noteeditor-title"
      onClick={overlayClick}
      onKeyDown={e => {
        if (e.key === "Escape") onClose();
      }}
      style={{ display: open ? "flex" : "none" }}
    >
      <form
        className="noteeditor-sheet"
        onSubmit={handleSave}
        aria-describedby="noteeditor-description"
      >
        <h2 id="noteeditor-title">{mode === "edit" ? "Edit Note" : "New Note"}</h2>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-group">
          <label htmlFor="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={8}
          />
        </div>
        <div className="noteeditor-actions">
          <button type="submit" className="btn-primary">
            {mode === "edit" ? "Save Changes" : "Add Note"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div id="noteeditor-description" className="sr-only">
          {mode === "edit"
            ? "Edit note title and content."
            : "Enter a title and content for your new note."}
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
