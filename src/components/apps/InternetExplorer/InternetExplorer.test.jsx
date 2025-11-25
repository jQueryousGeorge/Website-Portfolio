import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InternetExplorer from './InternetExplorer';

/**
 * Security tests for InternetExplorer component.
 * Ensures unsafe protocols are blocked and only valid URLs are allowed.
 */
describe('InternetExplorer security', () => {
    /**
     * Blocks 'javascript:' protocol to prevent XSS.
     * Should redirect to HOME_URL if attempted.
     */
    test('should block javascript: protocol(s)', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');

        fireEvent.change(input, { target: { value: 'javascript:alert("XSS")' } });
        fireEvent.click(goButton);

        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toContain('google.com/webhp?igu=1');
        expect(iframe.src).not.toContain('javascript:');
    });

    /**
     * Blocks 'data:' protocol to prevent injection of arbitrary data.
     * Should redirect to HOME_URL if attempted.
     */
    test('should block data: protocol(s)', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');

        fireEvent.change(input, { target: { value: 'data:text/html, <h1>XSS</h1>' } });
        fireEvent.click(goButton);

        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toContain('google.com');
        expect(iframe.src).not.toContain('data:');
    });

    /**
     * Blocks 'vbscript:' protocol to prevent legacy script injection.
     * Should redirect to HOME_URL if attempted.
     */
    test('blocks vbscript: protocol', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');
        
        fireEvent.change(input, { target: { value: 'vbscript:msgbox("XSS")' } });
        fireEvent.click(goButton);
        
        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toContain('google.com');
    });

    /**
     * Blocks 'file:' protocol to prevent local file access.
     * Should redirect to HOME_URL if attempted.
     */
    test('blocks file: protocol', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');
        
        fireEvent.change(input, { target: { value: 'file:///etc/passwd' } });
        fireEvent.click(goButton);
        
        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toContain('google.com');
    });

    /**
     * Allows navigation to legitimate URLs.
     * Should display the requested site in the iframe.
     */
    test('allows legitimate URLs', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');
        
        fireEvent.change(input, { target: { value: 'https://example.com' } });
        fireEvent.click(goButton);
        
        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toBe('https://example.com/');
    });
    
});

/**
 * Unit tests for the formatUrl utility.
 * Ensures unsafe protocols are blocked and valid URLs are formatted correctly.
 */
describe('formatUrl function', () => {
  const HOME_URL = "https://www.google.com/webhp?igu=1";
  
  // Utility function to sanitize and format URLs for navigation.
  const formatUrl = (input) => {
    const trimmedInput = input.trim();

    if (/^(javascript|data|vbscript|file):/i.test(trimmedInput)) {
      return HOME_URL;
    }
    
    if (!trimmedInput) return HOME_URL;
    if (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://')) {
      return trimmedInput;
    }
    if (trimmedInput.includes('.') && !trimmedInput.includes(' ')) {
      return `https://${trimmedInput}`;
    }
    return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmedInput)}`;
  };

  test.each([
    // Block unsafe protocols
    ['javascript:alert("XSS")', HOME_URL, 'blocks javascript protocol'],
    ['JAVASCRIPT:alert("XSS")', HOME_URL, 'blocks uppercase javascript'],
    ['data:text/html,<h1>XSS</h1>', HOME_URL, 'blocks data protocol'],
    ['vbscript:msgbox("XSS")', HOME_URL, 'blocks vbscript protocol'],
    ['file:///etc/passwd', HOME_URL, 'blocks file protocol'],
    // Allow and format valid URLs
    ['https://example.com', 'https://example.com', 'allows valid https URL'],
    ['example.com', 'https://example.com', 'formats domain without protocol'],
    ['https://example.com/update', 'https://example.com/update', 'allows URL with "data" substring'],
  ])(
    'formatUrl("%s") should return "%s" (%s)',
    (input, expected, description) => {
      expect(formatUrl(input)).toBe(expected);
    }
  );
});