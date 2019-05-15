import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Display from './Display';

describe('<Display />', () => {
  it('renders without crashing', () => {
    render(<Display />);
  });
  it('renders balls and strikes', () => {
    const strikes = 2, balls = 3;
    const { getByText } = render(<Display strikes={strikes} balls={balls} />);
    getByText(new RegExp(`Strikes: ${strikes}`, 'i'));
    getByText(new RegExp(`Balls: ${balls}`, 'i'));
  });
});
