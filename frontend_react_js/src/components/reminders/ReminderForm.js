import React, { useState, useEffect } from "react";
import { useReminders } from "../../RemindersContext";

/**
 * PUBLIC_INTERFACE
 * ReminderForm - create/update a reminder; if editReminder is set, editing, else adding.
 * Props:
 *   editReminder: reminder object (optional)
 *   initialDate: YYYY-MM-DD (optional, for calendar)
 *   afterSave: function to call after save (optional)
 *   closeForm: function to close sheet/modal
 */
export default function ReminderForm({ editReminder, initialDate, afterSave, closeForm }) {
  const { addReminder, updateReminder } = useReminders();
  const [title, setTitle] = useState(editReminder?.title || "");
  const [description, setDescription] = useState(editReminder?.description || "");
  const [date, setDate] = useState(editReminder?.date || initialDate || "");
  const [time, setTime] = useState(editReminder?.time || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(editReminder?.title || "");
    setDescription(editReminder?.description || "");
    setDate(editReminder?.date || initialDate || "");
    setTime(editReminder?.time || "");
  }, [editReminder, initialDate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    if (!date) return setError("Date is required.");
    if (editReminder) {
      updateReminder({ ...editReminder, title: title.trim(), description, date, time });
    } else {
      addReminder({ title: title.trim(), description, date, time });
    }
    if (afterSave) afterSave();
    if (closeForm) closeForm();
    setError("");
  }

  return (
    <div className="reminder-form-overlay" onClick={closeForm}>
      <form className="reminder-form-sheet" onClick={e=>e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{editReminder ? "Edit" : "Add"} Reminder</h2>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} maxLength={60} autoFocus required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={2} />
        </div>
        <div className="form-group-dbl">
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
          </div>
          <div>
            <label>Time <span style={{color:"#aaa",fontWeight:300,fontSize:"0.92em"}}>(optional)</span></label>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
        </div>
        <div className="reminder-form-actions">
          <button type="submit" className="btn-primary">{editReminder ? "Save" : "Add"}</button>
          <button type="button" className="btn" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
