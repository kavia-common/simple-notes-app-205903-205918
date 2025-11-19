import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Header - Main application header bar with navigation.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <svg width="34" height="34" viewBox="0 0 32 32" className="header-logo" aria-hidden="true">
          <circle cx="16" cy="16" r="15" fill="#2563EB" />
          <rect x="8" y="11" width="16" height="11" rx="2" fill="#F59E0B" opacity="0.95"/>
          <rect x="12" y="14" width="8" height="2" fill="#FFF"/>
          <rect x="12" y="17" width="8" height="2" fill="#FFF" opacity="0.65"/>
        </svg>
        <span>Simple Notes</span>
      </div>
      <nav className="header-nav" aria-label="Page navigation">
        <NavLink to="/notes" className={({isActive}) => isActive ? "header-nav-link active" : "header-nav-link"}>Notes</NavLink>
        <NavLink to="/calendar" className={({isActive}) => isActive ? "header-nav-link active" : "header-nav-link"}>Calendar</NavLink>
        <NavLink to="/reminders" className={({isActive}) => isActive ? "header-nav-link active" : "header-nav-link"}>Reminders</NavLink>
        <NavLink to="/calculator" className={({isActive}) => isActive ? "header-nav-link active" : "header-nav-link"}>Calculator</NavLink>
      </nav>
    </header>
  );
}

export default Header;
