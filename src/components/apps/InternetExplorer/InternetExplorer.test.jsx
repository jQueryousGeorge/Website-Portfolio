import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InternetExplorer from './InternetExplorer';

describe('InternetExplorer security', () => {
    test('should block javascript: protocol(s)', () => {
        render(<InternetExplorer />);
        const input = screen.getByPlaceholderText('Type a web address');
        const goButton = screen.getByText('Go');

        // Test 1: put in a javascipt script as a URL
        fireEvent.change(input, { target: { value: 'javascript:alert("XSS")' } });
        fireEvent.click(goButton);

        // Test 1 should redirect the GET request to `HOME_URL` (google.com/webhp?igu=1)
        const iframe = screen.getByTitle('Internet Explorer');
        expect(iframe.src).toContain('google.com/webhp?igu=1');
        expect(iframe.src).not.toContain('javascript:');
    });
    
});