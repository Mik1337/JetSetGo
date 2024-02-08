/**
 * Interface for the data received from the API
 * I've kept the data types a little generic as I don't want to overfit for the data I'm receiving
 */

export interface Airport {
  cityCode: string;
  cityName: string;
  terminal: string;
  airportCode: string;
  airportName: string;
  countryCode: string;
  countryName: string;
}

export interface Airline {
  airlineCode: 'AB' | 'CD';
  airlineName: string;
  flightNumber: string;
}

export interface Source {
  airport: Airport;
  depTime: string;
}

export interface Destination {
  airport: Airport;
  arrTime: string;
}

export interface DisplayData {
  source: Source;
  airlines: Airline[];
  stopInfo: string;
  destination: Destination;
  totalDuration: string;
}

export interface Result {
  id: string;
  fare: number;
  displayData: DisplayData;
}

export interface Data {
  result: Result[];
}

export interface ResultObject {
  data: Data;
}
