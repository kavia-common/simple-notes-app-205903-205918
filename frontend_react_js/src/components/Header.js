import React from "react";
import "./Header.css";

/**
 * PUBLIC_INTERFACE
 * Header - Main application header bar.
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
        <span>Ocean Notes</span>
      </div>
      <span className="header-right">Your simple, secure notes</span>
    </header>
  );
}

export default Header;
