import {TitleText, SubTitleText, LabelText} from '@/Typography';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useQuery} from 'react-query';

import {Neutral} from '@/Assets/Colors';

import {Airline, Result} from '@/Data/Interface';

import BottomSheet from '@gorhom/bottom-sheet';

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import DatePicker from 'react-native-date-picker';

const fetchFlights = async () => {
  const response = await fetch('https://api.npoint.io/4829d4ab0e96bfab50e7');
  return response.json();
};

import {CityCodes} from '@/Data/Constants';
import BottomSheetFilterModal from '@/Components/BottomSheetModal';
import AirlineFilter from '@/Components/AirlineFIlter';
import FlightCard from '@/Components/FlightCard';

interface RouteParams {
  from?: string;
  to?: string;
  departureTime?: Date;
  arrivalTime?: Date;
  minPrice?: number;
  maxPrice?: number;
  airlines?: string;
}

export interface ResultScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, string>;
}

const ResultScreen: React.FC<ResultScreenProps> = ({navigation, route}) => {
  const params = route.params as RouteParams;

  const {data, isLoading, error, refetch} = useQuery('posts', fetchFlights);

  const [source, setSource] = useState(params.from || '');
  const [departureTime, setDepartureTime] = useState(
    params.departureTime || new Date(),
  );
  const [openDepartureDatePicker, setOpenDepartureDatePicker] = useState(false);

  const [destination, setDestination] = useState(params.to || null);
  const [arrivalTime, setArrivalTime] = useState(params.arrivalTime || null);
  const [openArrivalDatePicker, setOpenArrivalDatePicker] = useState(false);

  const [minPrice, setMinPrice] = useState(
    params?.minPrice?.toString() || null,
  );
  const [maxPrice, setMaxPrice] = useState(
    params?.maxPrice?.toString() || null,
  );

  const [airlineFilter, setAirlineFilter] = useState(params?.airlines);

  const [openFilter, setOpenFilter] = useState(false);

  const [flights, setFlights] = useState<Result[]>(data?.data?.result || []);

  const [airlines, setAirles] = useState<Airline[]>([]);

  const searchResult = useCallback(() => {
    // const flightsResults: Result[] = data?.data?.result.filter(
    //   (item: Result) => {
    //     return (
    //       item.displayData.source.airport.cityCode === source &&
    //       item.displayData.destination.airport.cityCode === destination
    //     );
    //   },
    // );
    // Array of filter functions
    const filters: any[] = [];

    // Add source filter if source is defined
    if (source) {
      filters.push(
        (item: Result) => item.displayData.source.airport.cityCode === source,
      );
    }

    // Add destination filter if destination is defined
    if (destination) {
      filters.push(
        (item: Result) =>
          item.displayData.destination.airport.cityCode === destination,
      );
    }

    // Add minPrice filter if minPrice is defined
    if (minPrice) {
      filters.push((item: Result) => item.fare >= +minPrice);
    }

    // Add maxPrice filter if maxPrice is defined
    if (maxPrice) {
      filters.push((item: Result) => item.fare <= +maxPrice);
    }

    // Add airlines filter if selectedAirline is defined
    if (airlineFilter) {
      filters.push((item: Result) =>
        item.displayData.airlines.some(
          airline => airline.airlineCode === airlineFilter,
        ),
      );
    }

    // Apply all filters
    const flightsResults: Result[] = data?.data?.result.filter((item: Result) =>
      filters.every(filter => filter(item)),
    );

    setFlights(flightsResults);

    const airlinesData = Object.values(
      flightsResults
        .map((item: Result) => item.displayData.airlines[0])
        .reduce((unique, airline) => {
          return {
            ...unique,
            [airline.airlineCode]: airline,
          };
        }, {}),
    );

    setAirles(airlinesData as Airline[]);
  }, [data, source, destination, minPrice, maxPrice, airlineFilter]);

  useEffect(() => {
    searchResult();
  }, [searchResult]);

  const handleFilterPress = () => {
    setOpenFilter(prev => !prev);
    bottomSheetRef.current?.expand();
  };

  // BottomSheet Ref for Filter screen
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <LabelText>{flights?.length} results</LabelText>
            <TouchableOpacity onPress={handleFilterPress}>
              <LabelText>
                Filter <Icon name="filter-list" size={24} color={'black'} />
              </LabelText>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="From"
              style={styles.input}
              value={source}
              onChangeText={setSource}
              onBlur={() => {
                setSource(CityCodes[source.toLocaleLowerCase()] || source);
              }}
              enterKeyHint="next"
            />
            <Pressable
              onPress={() => {
                const temp = source;
                setSource(destination as string);
                setDestination(temp);
              }}>
              <LabelText>
                <Icon name="swap-horiz" size={24} color={'black'} />
              </LabelText>
            </Pressable>
            <TextInput
              placeholder="To"
              style={styles.input}
              value={destination as string}
              onBlur={() => {
                setDestination(
                  CityCodes[destination.toLocaleLowerCase()] || destination,
                );
              }}
              onChangeText={setDestination}
              enterKeyHint="search"
            />
          </View>
        </View>

        <View style={{paddingTop: 20, paddingBottom: 100}}>
          {flights.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Illustrations/noflights.png')}
                style={{
                  width: 500,
                  height: 500,
                  resizeMode: 'contain',
                }}
              />
              <SubTitleText>No flights found</SubTitleText>
            </View>
          ) : (
            <FlatList
              data={flights}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => refetch()}
                />
              }
              renderItem={_renderFlightCard}
              keyExtractor={(item, index) => index.toString()}
              snapToAlignment="start"
              decelerationRate={'fast'}
              snapToInterval={400}
            />
          )}
        </View>
        <>
          <DatePicker
            modal
            open={openDepartureDatePicker}
            date={departureTime || new Date()}
            onConfirm={date => {
              setOpenDepartureDatePicker(false);
              setDepartureTime(date);
            }}
            onCancel={() => {
              setOpenDepartureDatePicker(false);
            }}
          />

          <DatePicker
            modal
            open={openArrivalDatePicker}
            date={arrivalTime || new Date()}
            onConfirm={date => {
              setOpenArrivalDatePicker(false);
              setArrivalTime(date);
            }}
            onCancel={() => {
              setOpenArrivalDatePicker(false);
            }}
          />
        </>
        <BottomSheetFilterModal ref={bottomSheetRef}>
          <View style={{flex: 1, padding: 24, backgroundColor: 'white'}}>
            <View style={{flex: 1, alignItems: 'flex-start', gap: 20}}>
              <TitleText>
                Filter <Icon name="filter-list" size={24} color={'black'} />
              </TitleText>
              <View>
                <SubTitleText>Price</SubTitleText>
                <View style={styles.row}>
                  <TextInput
                    placeholder="₹ Min Price"
                    style={styles.modalInput}
                    value={minPrice as string}
                    enterKeyHint="search"
                    inputMode="numeric"
                    onChangeText={setMinPrice}
                    placeholderTextColor={Neutral.LightGray}
                  />
                  <TextInput
                    placeholder="₹ Max Price"
                    style={styles.modalInput}
                    value={maxPrice as string}
                    enterKeyHint="search"
                    inputMode="numeric"
                    onChangeText={setMaxPrice}
                    placeholderTextColor={Neutral.LightGray}
                  />
                </View>
              </View>

              <View>
                <SubTitleText>Timings</SubTitleText>
                <View style={styles.row}>
                  <TextInput
                    editable={false}
                    placeholder="Departure Time"
                    style={styles.modalInput}
                    value={departureTime?.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    enterKeyHint="search"
                    onPressIn={() => {
                      setOpenDepartureDatePicker(true);
                    }}
                    placeholderTextColor={Neutral.LightGray}
                  />
                  <TextInput
                    editable={false}
                    placeholder="Arrival Time"
                    style={styles.modalInput}
                    value={arrivalTime?.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    onPressIn={() => {
                      setOpenArrivalDatePicker(true);
                    }}
                    enterKeyHint="search"
                    placeholderTextColor={Neutral.LightGray}
                  />
                </View>
              </View>
              <View>
                <SubTitleText>Filter by Airlines</SubTitleText>
                <LabelText>
                  only showing flights available in this route
                </LabelText>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 20,
                  }}>
                  {airlines.map(airline => (
                    <TouchableOpacity
                      style={[
                        {
                          marginTop: 15,
                          padding: 15,
                          width: '50%',
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: 'lightgray',
                        },
                        airlineFilter === airline.airlineCode
                          ? {backgroundColor: 'lightgray'}
                          : {},
                      ]}
                      onPress={() => {
                        if (airlineFilter === airline.airlineCode) {
                          setAirlineFilter('');
                          return;
                        }
                        setAirlineFilter(airline.airlineCode);
                      }}>
                      <AirlineFilter
                        airlineName={airline.airlineName}
                        airlineCode={airline.airlineCode}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </BottomSheetFilterModal>
      </View>
    </KeyboardAvoidingView>
  );
};

const _renderFlightCard = (flight: any) => {
  return <FlightCard {...flight} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    height: '100%',
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  modalInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    width: '45%',
    borderColor: '#ddd',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    width: '50%',
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: Neutral.DarkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
