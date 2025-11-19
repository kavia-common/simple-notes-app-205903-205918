import React, { useMemo, useState } from "react";
import "./CalendarPage.css";
import { useReminders } from "../RemindersContext";
import ReminderForm from "../components/reminders/ReminderForm";

// Helper: get array of all days in visible month grid
function getMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  const days = [];
  // Leading days for week start
  let startDay = firstOfMonth.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1; // Mon-Sun
  for (let i = 0; i < startDay; i++) days.push(null);
  // Month days
  for (let d = 1; d <= lastOfMonth.getDate(); d++) days.push(new Date(year, month, d));
  // Trailing days
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

// PUBLIC_INTERFACE
export default function CalendarPage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [modalDay, setModalDay] = useState(null);

  const { reminders } = useReminders();

  const monthDays = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const remindersByDay = useMemo(() => {
    // YYYY-MM-DD -> [reminders]
    const map = {};
    reminders.forEach(r => {
      map[r.date] = map[r.date] ? [...map[r.date], r] : [r];
    });
    return map;
  }, [reminders]);

  const todayKey = now.toISOString().slice(0,10);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString(undefined, { month: "long", year: "numeric"});

  return (
    <div className="calendar-page ocean-theme-bg">
      <div className="calendar-toolbar">
        <button onClick={() => {if (viewMonth===0){ setViewYear(y=>y-1); setViewMonth(11);}else{setViewMonth(m=>m-1);}}} aria-label="Previous month">&#8592;</button>
        <span className="calendar-title">{monthLabel}</span>
        <button onClick={() => {if (viewMonth===11){ setViewYear(y=>y+1); setViewMonth(0);} else { setViewMonth(m=>m+1);} }} aria-label="Next month">&#8594;</button>
      </div>
      <div className="calendar-grid">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
          <div className="calendar-cell calendar-header" key={day}>{day}</div>
        ))}
        {monthDays.map((date, idx) => date ? (
          <button
            key={date.toISOString()}
            className={
              "calendar-cell calendar-day" +
              (date.toISOString().slice(0,10) === todayKey ? " calendar-today" : "") +
              (modalDay && date.toISOString().slice(0,10) === modalDay ? " calendar-active" : "")
            }
            onClick={() => setModalDay(date.toISOString().slice(0,10))}
            aria-label={`Open day ${date.getDate()}`}
          >
            <span>{date.getDate()}</span>
            {remindersByDay[date.toISOString().slice(0,10)] ?
              <span className={"calendar-dot"+(remindersByDay[date.toISOString().slice(0,10)].some(r=>r.completed)?" calendar-dot-complete":"")}></span> : null}
          </button>
        ) : (
          <div className="calendar-cell calendar-blank" key={`b${idx}`}></div>
        ))}
      </div>
      {modalDay && (
        <ReminderDayModal
          day={modalDay}
          reminders={reminders.filter(r => r.date === modalDay)}
          close={() => setModalDay(null)}
        />
      )}
    </div>
  );
}

function ReminderDayModal({ day, reminders, close }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="calendar-modal-overlay" onClick={close}>
      <div className="calendar-modal" onClick={e=>e.stopPropagation()}>
        <header>
          <h2>Reminders for {day}</h2>
          <button className="calendar-modal-close" onClick={close} aria-label="Close">×</button>
        </header>
        <div>
          {reminders.length === 0 ? (
            <div className="calendar-empty">No reminders for this day.</div>
          ) : (
            <ul className="calendar-reminder-list">
              {reminders.map(r => (
                <li key={r.id} className={r.completed ? "calendar-reminder-done" : ""}>
                  <span>{r.title}</span>
                  {r.time && <span className="calendar-reminder-time">{r.time}</span>}
                  {r.completed && <span className="calendar-reminder-complete-label">✓ Done</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="calendar-modal-add-btn" onClick={()=>setEditing(true)}>+ Add Reminder</button>
        {editing && (
          <ReminderForm
            initialDate={day}
            closeForm={()=>setEditing(false)}
            afterSave={close}
          />
        )}
      </div>
    </div>
  );
}
