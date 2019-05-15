import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
  });
  it('renders buttons', () => {
    const {getByText} = render(<Dashboard />);
    getByText(new RegExp(`Strike`, 'i'));
    getByText(new RegExp(`Ball`, 'i'));
    getByText(new RegExp(`Foul`, 'i'));
    getByText(new RegExp(`Hit`, 'i'));
  });
  it('runs callbacks', () => {
    let target;
    const cb = name => () => (target = name);
    const {getByText} = render(<Dashboard strike={cb('Strike')}
                                          ball={cb('Ball')}
                                          foul={cb('Foul')}
                                          hit={cb('Hit')}/>);
    const buttons = ['Strike', 'Ball', 'Foul', 'Hit'].map(name => getByText(new RegExp(name, 'i')));
    buttons.forEach(button => {
      fireEvent.click(button);
      expect(target).toBe(button.textContent);
    });
  });
});
