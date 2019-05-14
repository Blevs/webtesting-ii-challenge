import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
  it('renders Display', () => {
    const strikes = 2, balls = 3;
    const {getByText} = render(<App count={{strikes, balls}}/>);
    getByText(new RegExp(`Strikes: ${strikes}`, 'i'));
    getByText(new RegExp(`Balls: ${balls}`, 'i'));
  });
  it('renders dashboard', () => {
    const {getByText} = render(<App />);
    getByText(new RegExp(`^Strike$`, 'i'));
    getByText(new RegExp(`^Ball$`, 'i'));
    getByText(new RegExp(`^Foul$`, 'i'));
    getByText(new RegExp(`^Hit$`, 'i'));
  });
  it('handles count', () => {
    const {getByText} = render(<App />);
    const strike = getByText(new RegExp(`^Strike$`, 'i'));
    const ball = getByText(new RegExp(`^Ball$`, 'i'));
    const foul = getByText(new RegExp(`^Foul$`, 'i'));
    const hit = getByText(new RegExp(`^Hit$`, 'i'));
    // two strikes, three balls, full count
    fireEvent.click(strike);
    fireEvent.click(strike);
    fireEvent.click(ball);
    fireEvent.click(ball);
    fireEvent.click(ball);
    getByText(new RegExp(`Strikes: 2`, 'i'));
    getByText(new RegExp(`Balls: 3`, 'i'));
    // foul maintains count
    fireEvent.click(foul);
    getByText(new RegExp(`Strikes: 2`, 'i'));
    // strikeout
    fireEvent.click(strike);
    getByText(new RegExp(`Strikes: 0`, 'i'));
    getByText(new RegExp(`Balls: 0`, 'i'));
    // foul to one and two strikes
    fireEvent.click(foul);
    getByText(new RegExp(`Strikes: 1`, 'i'));
    fireEvent.click(foul);
    getByText(new RegExp(`Strikes: 2`, 'i'));
    // walk
    fireEvent.click(ball);
    fireEvent.click(ball);
    fireEvent.click(ball);
    fireEvent.click(ball);
    getByText(new RegExp(`Strikes: 0`, 'i'));
    getByText(new RegExp(`Balls: 0`, 'i'));
    // hit resets count
    fireEvent.click(strike);
    fireEvent.click(strike);
    fireEvent.click(ball);
    fireEvent.click(hit);
    getByText(new RegExp(`Strikes: 0`, 'i'));
    getByText(new RegExp(`Balls: 0`, 'i'));
  });
});
