// Centralized window limit logic for easier testing and reuse

export const MAX_WINDOWS = 20;

// Returns true if opening the requested window is allowed.
// Allows focusing an existing window even when at the limit.
export function canOpenWindow(openWindows, windowId, max = MAX_WINDOWS) {
    if (!openWindows) return true;
    if (openWindows[windowId]) return true;
    return Object.keys(openWindows).length < max;
}


