import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />);
    expect(screen.getByText('My Contacts')).toBeInTheDocument();
  });
});


