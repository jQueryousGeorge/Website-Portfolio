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

---

## Changelog

### 2026-02-22 — Security Audit + InternetExplorer Navigation Fixes

#### Security hardening

| File | Change |
|---|---|
| `src/components/apps/SolitaireInfo/SolitaireInfo.jsx` | `rel="noreferrer"` → `rel="noopener noreferrer"` on Microsoft Store link |
| `src/components/apps/MinesweeperInfo/MinesweeperInfo.jsx` | Same `rel` fix |
| `src/components/portfolio_sections/Contact.jsx` | FormSpree endpoint URL read from `process.env.REACT_APP_FORMSPREE_ENDPOINT` instead of hardcoded |
| `.env.local` *(new, gitignored)* | Stores `REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/xyzapnrj` |
| `public/index.html` | Added `Content-Security-Policy` meta tag: `default-src 'self'`, `frame-src https:`, `connect-src 'self' https://formspree.io`, `object-src 'none'`, `base-uri 'self'` |

#### InternetExplorer navigation fixes (`src/components/apps/InternetExplorer/InternetExplorer.jsx`)

- **Refresh** — replaced fragile direct DOM mutation of `iframeRef.current.src` with a `reloadKey` state counter; incrementing it changes the iframe `key`, guaranteeing a React remount.
- **Home** — when `url` was already `HOME_URL`, clicking Home was a no-op (React skipped the state update). Now increments `reloadKey` to force a remount in that case.
- **Back/Forward skipping entries** — added `inFrameNavDepth` state (incremented by `onLoad` for every in-frame navigation after the initial React-triggered load) and `isInitialIframeLoad` ref (reset to `true` before every React-triggered load so the first `onLoad` isn't miscounted). `canGoBack` now includes `inFrameNavDepth > 0`. When back is pressed and `inFrameNavDepth > 0`, the current React URL is reloaded (stepping back to where the iframe started) instead of jumping to the previous React history entry.
- **Removed all `console.log` debug statements** that were left in production code.
- **`onLoad` handler** — added try/catch to attempt reading `contentWindow.location.href`; updates the URL bar for same-origin navigations, silently no-ops for cross-origin (browser security limit — cannot be worked around client-side).
