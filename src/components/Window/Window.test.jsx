import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Window from './Window';

/**
 * Unit tests for the Window component.
 * Verifies rendering, state, and user interactions.
 */
describe('Window component', () => {
  /**
   * Renders the window title and children.
   */
  test('renders title and children', () => {
    render(
      <Window title="Test Window">
        <div>Child Content</div>
      </Window>
    );
    expect(screen.getByText('Test Window')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  /**
   * Applies 'active' class when isActive is true.
   */
  test('applies active class when isActive is true', () => {
    const { container } = render(<Window title="Active" isActive={true} />);
    const win = container.querySelector('.window');
    expect(win).toHaveClass('active');
  });

  /**
   * Calls onClose when the Close button is clicked.
   */
  test('calls onClose when Close button clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<Window title="Closable" onClose={onClose} />);
    const closeBtn = screen.getByLabelText('Close');
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Calls onMinimize when the Minimize button is clicked.
   * Window hides when minimized.
   */
  test('calls onMinimize when Minimize button clicked', async () => {
    const user = userEvent.setup();
    const onMinimize = jest.fn();
    const { rerender, container } = render(
      <Window title="Minimizable" onMinimize={onMinimize} />
    );
    const minBtn = screen.getByLabelText('Minimize');
    await user.click(minBtn);
    expect(onMinimize).toHaveBeenCalledTimes(1);

    // Re-render with minimized state
    rerender(<Window title="Minimizable" isMinimized={true} />);
    const win = container.querySelector('.window');
    expect(win).toHaveStyle({ display: 'none' });
  });

  /**
   * Double-clicking the title bar toggles maximize and restore.
   */
  test('double-clicking title bar toggles maximize and restore', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Window title="Maximizable" width={400} height={300} />
    );
    const titleBar = container.querySelector('.title-bar');
    const win = container.querySelector('.window');

    // Maximize
    await user.dblClick(titleBar);
    expect(win).toHaveStyle({ 
      left: '0px', 
      top: '0px', 
      width: '100%', 
      height: 'calc(100% - 30px)' 
    });

    // Restore
    await user.dblClick(titleBar);
    expect(win).toHaveStyle({ width: '400px', height: '300px' });
  });

  /**
   * Dragging the title bar moves the window.
   * Also tests window focus on click.
   */
  test('dragging the title bar moves the window', async () => {
    const user = userEvent.setup();
    const onFocus = jest.fn();
    const { container } = render(
      <Window 
        title="Draggable" 
        onFocus={onFocus} 
        defaultPosition={{ x: 100, y: 100 }} 
        width={400} 
        height={300} 
      />
    );

    const win = container.querySelector('.window');
    const titleBar = container.querySelector('.title-bar');

    // Mock geometry
    Object.defineProperty(win, 'offsetWidth', { value: 400, configurable: true });
    Object.defineProperty(win, 'offsetHeight', { value: 300, configurable: true });
    Object.defineProperty(win, 'getBoundingClientRect', {
      value: () => ({
        left: 100,
        top: 100,
        right: 500,
        bottom: 400,
        width: 400,
        height: 300,
        x: 100,
        y: 100,
      }),
      configurable: true
    });

    // Focus via click
    await user.click(win);
    expect(onFocus).toHaveBeenCalledTimes(1);

    // Simulate drag
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.mouseDown(titleBar, { button: 0, clientX: 150, clientY: 150 });
    fireEvent.mouseMove(document, { clientX: 400, clientY: 300 });
    fireEvent.mouseUp(document);

    expect(win.style.left).toBe('350px');
    expect(win.style.top).toBe('250px');
  });
});