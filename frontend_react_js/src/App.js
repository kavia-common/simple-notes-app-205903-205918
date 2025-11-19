import React, { useState } from "react";
import { NotesProvider, useNotes } from "./NotesContext";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App entrypoint for Ocean Notes.
 */
function OceanNotesApp() {
  const { notes, getNote, addNote, updateNote } = useNotes();
  const [editorState, setEditorState] = useState({ open: false, mode: "new", noteId: null });

  // Open modal to create a note
  function handleNewNote() {
    setEditorState({ open: true, mode: "new", noteId: null });
  }
  // Open modal to edit a note
  function handleEditNote(noteId) {
    setEditorState({ open: true, mode: "edit", noteId });
  }
  // Close modal
  function handleCloseEditor() {
    setEditorState({ ...editorState, open: false });
  }
  // Save from modal
  function handleSaveNote(noteData) {
    if (editorState.mode === "edit" && noteData.id) {
      updateNote(noteData.id, noteData);
    } else {
      addNote(noteData);
    }
    setEditorState({ ...editorState, open: false });
  }
  // The editor gets the full note object if editing, else null for new
  const editingNote = editorState.mode === "edit" ? getNote(editorState.noteId) : null;

  return (
    <div className="App ocean-theme-bg">
      <Header />
      <main>
        <NotesList onEdit={handleEditNote} onNew={handleNewNote} />
        <NoteEditor
          open={editorState.open}
          mode={editorState.mode}
          note={editingNote}
          onSave={handleSaveNote}
          onClose={handleCloseEditor}
        />
      </main>
      <footer style={{ color: "#8ca3d9", textAlign: "center", marginTop: "3rem", fontSize: "1rem", background: "none" }}>
        <span>
          Ocean Notes • Local demo • {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </footer>
    </div>
  );
}

/**
 * Top-level wrapper for context provider.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <NotesProvider>
      <OceanNotesApp />
    </NotesProvider>
  );
}

export default App;
