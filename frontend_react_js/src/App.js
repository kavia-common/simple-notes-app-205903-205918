import React, { useState } from "react";
import { NotesProvider, useNotes } from "./NotesContext";
import { RemindersProvider } from "./RemindersContext";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import CalendarPage from "./pages/CalendarPage";
import RemindersPage from "./pages/RemindersPage";
import CalculatorPage from "./pages/CalculatorPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/**
 * Main Notes Page for /notes route (keeps existing Notes logic).
 */
function NotesPage() {
  const { notes, getNote, addNote, updateNote } = useNotes();
  const [editorState, setEditorState] = useState({ open: false, mode: "new", noteId: null });

  function handleNewNote() {
    setEditorState({ open: true, mode: "new", noteId: null });
  }
  function handleEditNote(noteId) {
    setEditorState({ open: true, mode: "edit", noteId });
  }
  function handleCloseEditor() {
    setEditorState({ ...editorState, open: false });
  }
  function handleSaveNote(noteData) {
    if (editorState.mode === "edit" && noteData.id) {
      updateNote(noteData.id, noteData);
    } else {
      addNote(noteData);
    }
    setEditorState({ ...editorState, open: false });
  }
  const editingNote = editorState.mode === "edit" ? getNote(editorState.noteId) : null;

  return (
    <div>
      <NotesList onEdit={handleEditNote} onNew={handleNewNote} />
      <NoteEditor
        open={editorState.open}
        mode={editorState.mode}
        note={editingNote}
        onSave={handleSaveNote}
        onClose={handleCloseEditor}
      />
      <footer style={{ color: "#8ca3d9", textAlign: "center", marginTop: "3rem", fontSize: "1rem", background: "none" }}>
        <span>
          Ocean Notes • Local demo • {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App - Top-level wrapper for context providers and router.
 */
function App() {
  return (
    <NotesProvider>
      <RemindersProvider>
        <Router>
          <div className="App ocean-theme-bg">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Navigate replace to="/notes" />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/reminders" element={<RemindersPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </RemindersProvider>
    </NotesProvider>
  );
}

export default App;
