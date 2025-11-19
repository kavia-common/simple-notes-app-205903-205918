# Ocean Notes – Simple Notes App (React, Ocean Professional Theme)

A modern, lightweight React notes app to create, edit, and delete notes, styled with the Ocean Professional theme.

---

## Features

- 📝 Create, edit, and delete notes
- 🔍 Inline search and filter
- 💾 Notes persist across reloads (localStorage)
- 🎨 Clean, responsive, and accessible UI with Ocean Professional colors
- ⚡️ Minimal dependencies, runs standalone (no backend required)
- 🌞 Modern UI: gradient backgrounds, cards, ARIA roles, keyboard accessible

---

## Getting Started

#### 1. Install Dependencies

```bash
cd frontend_react_js
npm install
```

#### 2. Run the App

```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000).

#### 3. Build for Production

```bash
npm run build
```

---

## Using Ocean Notes

- **Add a Note**: Click "+ New Note". Enter a title and content, then save.
- **Edit**: Click on a note card to edit in a modal.
- **Delete**: Use the 🗑 button (confirmation required).
- **Search**: Use the search bar above the list.

All notes are private to your browser/device, stored in localStorage.

---

## Theme & Styling

- **Ocean Professional theme:**  
  - Primary: #2563EB (Blue)
  - Secondary: #F59E0B (Amber)
  - Error: #EF4444 (Red)
  - Background: #f9fafb, Surface: #fff, Text: #111827  
- **Styling** via CSS Modules for each component (`src/components/`) and `src/App.css` for theme variables.

---

## Environment Variables

For **future backend support**, the app reads these (not required for local/offline use):

- `REACT_APP_API_BASE`  
- `REACT_APP_BACKEND_URL`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_WS_URL`
- `REACT_APP_NODE_ENV`
- `REACT_APP_PORT`
- (See `.env.example` for structure if needed.)

Just create a `.env` in this folder if you want to override these.

---

## Accessibility

- Modal is keyboard accessible and ARIA-labelled.
- Focus styles are present.
- Responsive for mobile and desktop.

---

## Learn More

- [React documentation](https://reactjs.org/)
- [Create React App guide](https://create-react-app.dev/docs/getting-started/)
