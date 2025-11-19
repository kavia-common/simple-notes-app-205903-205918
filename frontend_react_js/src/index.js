import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Header.css';
import './components/NotesList.css';
import './components/NoteEditor.css';
import './components/reminders/ReminderForm.css';
import './pages/CalendarPage.css';
import './pages/RemindersPage.css';
import './pages/CalculatorPage.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
