# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Dev server at localhost:3000
npm run build          # Production build
npm test               # Run tests in watch mode
npm run test:coverage  # Run tests once with coverage report
```

To run a single test file:
```bash
npm test -- --testPathPattern="Window.test"
```

## Architecture

This is a **React 19 portfolio website styled as a Windows 95 desktop**. Built with Create React App (react-scripts), SCSS for styling, and no Vite/Tailwind.

### State Management

All window state lives in `src/App.jsx` and flows down via props:
- `openWindows` — array of currently open window objects
- `activeWindowId` — the focused window
- `highestZIndex` — tracks z-index stacking order

Key handlers passed as callbacks: `handleOpenWindow`, `handleCloseWindow`, `handleWindowFocus`, `handleMinimizeWindow`.

### Component Hierarchy

```
App.jsx  (global state)
├── Desktop.jsx
│   ├── DesktopIcon.jsx  (renders icons from config)
│   └── Window.jsx       (draggable/resizable shell)
│       └── [content component per windowId]
└── Taskbar.jsx
    ├── StartButton / StartMenu
    ├── Window buttons (one per open window)
    └── SystemTray
```

### Adding a New App/Window

Desktop icons and available windows are driven by `src/config/desktopIcons.js`. Each entry defines `id`, `label`, `image`, `windowId`, `contentType`, and `contentComponent`. To add a new app: create the component, add an entry to this config, and the Desktop/Window plumbing handles the rest.

### Styling

Uses Windows 95 aesthetic via custom SCSS:
- `src/styles/variables.scss` — color palette (teal desktop `#008080`, navy title bar `#000080`, gray `#c0c0c0`)
- `src/styles/windows95.scss` — reusable mixins: `win95-border-outset`, `win95-border-inset`, `win95-button`
- Font stack targets MS Sans Serif; `image-rendering: crisp-edges` throughout for pixel-perfect icons

### Path Aliases

Configured in both `jsonconfig.json` and `jest.config.js`:
- `@components/` → `src/components/`
- `@utils/` → `src/utils/`
- `@config/` → `src/config/`

### Notable Implementation Details

- **Window limit:** `src/utils/windowLimit.js` caps concurrent windows at `MAX_WINDOWS = 20`
- **InternetExplorer app:** blocks `javascript:`, `data:`, `vbscript:`, `file:` protocols; iframes use `sandbox="allow-scripts allow-same-origin allow-forms"` and `referrerPolicy="no-referrer"`
- **Contact form:** uses FormSpree for submission; includes a honeypot `company` field for bot detection and client-side validation before submission
