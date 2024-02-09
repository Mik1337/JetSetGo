// Import your necessary testing utilities and the component under test
import React from 'react';
import {render, act} from '@testing-library/react-native';
import FlightCard from '@/Components/FlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Result} from '@/Data/Interface';

interface FlightCardProps {
  index: number;
  item: Result;
}

describe('FlightCard', () => {
  it('renders the "Cancel" button', () => {
    const flightCardProps = {
      index: 0,
      item: {
        id: '50',
        fare: 4820,
        displayData: {
          source: {
            airport: {
              cityCode: 'BOM',
              cityName: 'Mumbai',
              terminal: '1',
              airportCode: 'BOM',
              airportName: 'Chhatrapati Shivaji International Airport',
              countryCode: 'IN',
              countryName: 'India',
            },
            depTime: '2023-03-31T09:30',
          },
          airlines: [
            {
              airlineCode: 'CD',
              airlineName: 'Air India',
              flightNumber: '4567',
            },
          ],
          stopInfo: '1 Stop',
          destination: {
            airport: {
              cityCode: 'MAA',
              cityName: 'Chennai',
              terminal: '4',
              airportCode: 'MAA',
              airportName: 'Chennai International Airport',
              countryCode: 'IN',
              countryName: 'India',
            },
            arrTime: '2023-03-31T12:35',
          },
          totalDuration: '3h 05m',
        },
      },
    } as FlightCardProps;

    const {getByText} = render(<FlightCard {...flightCardProps} />);

    // Check if the "Book" and "Cancel" buttons are present
    expect(getByText('Cancel')).toBeTruthy();
  });
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('FlightCard', () => {
  it('renders the "Book Now" button when the Flight Ticket can be booked', async () => {
    // Mock AsyncStorage to return data indicating the item is booked
    const flightCardProps = {
      index: 0,
      item: {
        id: '50',
        fare: 4820,
        displayData: {
          source: {
            airport: {
              cityCode: 'BOM',
              cityName: 'Mumbai',
              terminal: '1',
              airportCode: 'BOM',
              airportName: 'Chhatrapati Shivaji International Airport',
              countryCode: 'IN',
              countryName: 'India',
            },
            depTime: '2023-03-31T09:30',
          },
          airlines: [
            {
              airlineCode: 'CD',
              airlineName: 'Air India',
              flightNumber: '4567',
            },
          ],
          stopInfo: '1 Stop',
          destination: {
            airport: {
              cityCode: 'MAA',
              cityName: 'Chennai',
              terminal: '4',
              airportCode: 'MAA',
              airportName: 'Chennai International Airport',
              countryCode: 'IN',
              countryName: 'India',
            },
            arrTime: '2023-03-31T12:35',
          },
          totalDuration: '3h 05m',
        },
      },
    } as FlightCardProps;

    AsyncStorage.getItem = jest
      .fn()
      .mockImplementation(() => Promise.resolve(JSON.stringify([{id: '1'}])));

    const {findByText} = render(<FlightCard {...flightCardProps} />);

    // Wait for useEffect to run
    await act(async () => {});

    // Check if the "Book Now" button is present
    expect(await findByText('Book Now')).toBeTruthy();
  });
});
