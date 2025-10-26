import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Window from './Window';

describe('Window component', () => {
  test('renders title and children', () => {
    render(
      <Window title="Test Window">
        <div>Child Content</div>
      </Window>
    );

    expect(screen.getByText('Test Window')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('applies active class when isActive is true', () => {
    const { container } = render(<Window title="Active" isActive={true} />);
    const win = container.querySelector('.window');
    expect(win).toHaveClass('active');
  });

  test('calls onClose when Close button clicked', () => {
    const onClose = jest.fn();
    render(<Window title="Closable" onClose={onClose} />);
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onMinimize when Minimize button clicked and hides when isMinimized', () => {
    const onMinimize = jest.fn();
    const { rerender, container } = render(
      <Window title="Minimizable" onMinimize={onMinimize} />
    );
    const minBtn = screen.getByLabelText('Minimize');
    fireEvent.click(minBtn);
    expect(onMinimize).toHaveBeenCalledTimes(1);

    // Re-render with minimized state to assert style
    rerender(<Window title="Minimizable" isMinimized={true} />);
    const win = container.querySelector('.window');
    expect(win).toHaveStyle({ display: 'none' });
  });

  test('double-clicking title bar toggles maximize and restore', () => {
    const { container } = render(<Window title="Maximizable" width={400} height={300} />);
    const titleBar = container.querySelector('.title-bar');
    const win = container.querySelector('.window');

    // Maximize
    fireEvent.doubleClick(titleBar);
    expect(win).toHaveStyle({ left: '0px', top: '0px', width: '100%', height: 'calc(100% - 30px)' });

    // Restore
    fireEvent.doubleClick(titleBar);
    expect(win).toHaveStyle({ width: '400px', height: '300px' });
  });

  test('dragging the title bar moves the window and calls onFocus on click', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <Window title="Draggable" onFocus={onFocus} defaultPosition={{ x: 100, y: 100 }} width={400} height={300} />
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
        toJSON: () => {}
      }),
      configurable: true
    });

    // Focus via click
    fireEvent.click(win);
    expect(onFocus).toHaveBeenCalledTimes(1);

    // Start drag with left mouse button at 150,150 (offset 50,50 from rect)
    fireEvent.mouseDown(titleBar, { button: 0, clientX: 150, clientY: 150 });
    // Move to 400,300 => expected left/top ~ (350,250)
    fireEvent.mouseMove(document, { clientX: 400, clientY: 300 });
    fireEvent.mouseUp(document);

    expect(win.style.left).toBe('350px');
    expect(win.style.top).toBe('250px');
  });
});