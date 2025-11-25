import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render function that includes common providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 */
export function renderWithUser(ui, options = {}) {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, options),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';