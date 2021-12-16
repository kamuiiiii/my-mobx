import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('mobx react works', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('store.a').textContent).toBe('1');
    getByTestId('increase').click();
    expect(getByTestId('store.a').textContent).toBe('2');
  })
})