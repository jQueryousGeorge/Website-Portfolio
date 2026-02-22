# Website-Portfolio Project Summary

## What this project is
`Website-Portfolio` is a React single-page portfolio website styled and structured like a classic Windows 95 desktop environment.  
Instead of standard webpage navigation, visitors interact with desktop icons, a Start menu, taskbar buttons, and movable windows to explore portfolio content.

## What it does
- Renders a desktop UI with clickable/double-clickable icons.
- Opens portfolio sections (`About Me`, `Projects`, `Contact`) inside draggable/resizable-style windows.
- Provides a Windows 95-style `Start` menu with nested menus and app launch entries.
- Includes mini app experiences:
  - `Internet Explorer` window with URL formatting, simple nav history, and protocol blocking for unsafe schemes (`javascript:`, `data:`, `vbscript:`, `file:`).
  - `Notepad`, `Calculator`, `Windows Explorer`, `Run`, and info windows for games.
- Manages multiple open windows with active state, z-index ordering, minimize/restore, close behavior, and an open-window safety limit (`MAX_WINDOWS = 20`).
- Includes a contact form with client-side validation, honeypot anti-bot field, and Formspree POST submission.

## Tech stack
- React 19 + React DOM 19
- Create React App (`react-scripts` 5)
- SCSS (`sass`) for styling
- Jest + React Testing Library for unit/security-focused tests

## How the app is organized
The app is driven by a desktop metaphor:
- `App.jsx` owns global window state.
- `Desktop` renders desktop icons and open windows.
- `Taskbar` renders Start button/menu, pinned shortcuts, running-window buttons, and system tray.
- Window content is provided by portfolio section components and app components configured through icon/start-menu metadata.

## Project structure
```text
Website-Portfolio/
|-- public/
|   |-- index.html
|   |-- manifest.json
|   `-- robots.txt
|
|-- src/
|   |-- App.jsx
|   |-- index.jsx
|   |-- index.css
|   |-- setupTests.jsx
|   |-- test-utils.jsx
|   |
|   |-- assets/
|   |   `-- icons/                      # Win95/app/social icons
|   |
|   |-- config/
|   |   `-- desktopIcons.js             # Desktop icon + window metadata
|   |
|   |-- utils/
|   |   |-- windowLimit.js              # Window cap logic
|   |   `-- windowLimit.test.js
|   |
|   |-- components/
|   |   |-- Desktop/
|   |   |   |-- Desktop.jsx
|   |   |   |-- Desktop.scss
|   |   |   `-- components/DesktopIcon/
|   |   |
|   |   |-- Window/
|   |   |   |-- Window.jsx
|   |   |   |-- Window.scss
|   |   |   `-- Window.test.jsx
|   |   |
|   |   |-- Taskbar/
|   |   |   |-- Taskbar.jsx
|   |   |   |-- Taskbar.scss
|   |   |   `-- components/
|   |   |       |-- StartButton/
|   |   |       |-- StartMenu/
|   |   |       `-- SystemTray/
|   |   |
|   |   |-- apps/
|   |   |   |-- AppsFolder/
|   |   |   |-- Calculator/
|   |   |   |-- InternetExplorer/
|   |   |   |-- Notepad/
|   |   |   |-- Run/
|   |   |   |-- WindowsExplorer/
|   |   |   |-- SolitaireInfo/
|   |   |   `-- MinesweeperInfo/
|   |   |
|   |   `-- portfolio_sections/
|   |       |-- AboutMe.jsx
|   |       |-- Projects.jsx
|   |       `-- Contact.jsx
|   |
|   `-- styles/
|       |-- variables.scss
|       `-- windows95.scss
|
|-- __mocks__/
|   `-- fileMock.js
|
|-- jest.config.js
|-- babel.config.js
|-- package.json
|-- package-lock.json
|-- README.md
`-- jsonconfig.json
```

## Run and test
- Install dependencies: `npm i`
- Start local dev server: `npm start`
- Run tests: `npm test`
- Run coverage once: `npm run test:coverage`
- Build production bundle: `npm run build`

## Current status notes
- Core Windows-95 UX framework is implemented and functional.
- Some portfolio content is still placeholder text and sample links, so this is best described as a themed portfolio framework with working interaction patterns and extensible app/window infrastructure.
- Need to review the entire project for any security issues. Have implemented contact form anti-bot features, max_window protection, but these are only few. Need to review the entire project IN-DEPTH.
