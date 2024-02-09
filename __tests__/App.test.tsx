// App.test.tsx
import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

// just a simple test to check if the app renders correctly
describe('<App />', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
  });
});
