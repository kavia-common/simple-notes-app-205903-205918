import React, { useMemo, useState } from "react";
import { useReminders } from "../RemindersContext";
import ReminderForm from "../components/reminders/ReminderForm";
import ReminderList from "../components/reminders/ReminderList";
import "./RemindersPage.css";

function isToday(dateString) {
  const today = new Date().toISOString().slice(0,10);
  return dateString === today;
}
function isThisWeek(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const nowDay = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((nowDay + 6) % 7));
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  return date >= monday && date <= sunday;
}
function isOverdue(dateString, time) {
  const t = time ? `${dateString}T${time}` : dateString;
  return new Date(t) < new Date() && !isToday(dateString);
}

// PUBLIC_INTERFACE
export default function RemindersPage() {
  const { reminders } = useReminders();
  const [filter, setFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    switch (filter) {
      case "today": return reminders.filter(r => isToday(r.date));
      case "thisweek": return reminders.filter(r => isThisWeek(r.date));
      case "overdue": return reminders.filter(r => isOverdue(r.date, r.time) && !r.completed);
      default: return reminders;
    }
  }, [reminders, filter]);

  return (
    <div className="reminders-page ocean-theme-bg">
      <div className="reminders-toolbar">
        <button className="btn-primary" onClick={() => { setEditing(null); setFormOpen(true); }}>+ New Reminder</button>
        <div className="reminders-filters">
          <button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>All</button>
          <button className={filter==="today"?"active":""} onClick={()=>setFilter("today")}>Today</button>
          <button className={filter==="thisweek"?"active":""} onClick={()=>setFilter("thisweek")}>This Week</button>
          <button className={filter==="overdue"?"active":""} onClick={()=>setFilter("overdue")}>Overdue</button>
        </div>
      </div>
      <ReminderList reminders={filtered} onEdit={r=>{setEditing(r);setFormOpen(true);}} />
      {formOpen &&
        <ReminderForm
          editReminder={editing}
          closeForm={()=>{setFormOpen(false);setEditing(null);}}
        />
      }
    </div>
  );
}
