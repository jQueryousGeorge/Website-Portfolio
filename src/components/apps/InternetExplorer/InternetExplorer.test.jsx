import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InternetExplorer from './InternetExplorer';

describe('InternetExplorer security', () => {
    test('should block javascript: protocol(s)', () => {
        render(<InternetExplorer />);
        const input = screen.getAllByPlaceholderText('Type a web address...');
        const goButton = screen.getByText('Go');
    })
    
})