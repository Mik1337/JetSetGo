// test to check if airlines are rendered correctly

// Import your necessary testing utilities and the component under test
import React from 'react';
import {render} from '@testing-library/react-native';
import AirlineFilter from '@/Components/AirlineFilter';

describe('AirlineFilter', () => {
  it('Renders Jet Spice', () => {
    const {getByText, getByTestId} = render(
      <AirlineFilter airlineCode="AB" airlineName="Jet Spice" />,
    );

    // Check if the airline name is present
    expect(getByText('Jet Spice')).toBeTruthy();
  });

  it('Renders Air India', () => {
    const {getByText, getByTestId} = render(
      <AirlineFilter airlineCode="CD" airlineName="Air India" />,
    );

    // Check if the airline name is present
    expect(getByText('Air India')).toBeTruthy();
  });
});
