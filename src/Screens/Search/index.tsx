import {TitleText, ParagraphText, SubTitleText, LabelText} from '@/Typography';
import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useQuery} from 'react-query';

import * as DataInterface from '@/Data/Interface';
import {Highlight, Neutral} from '@/Assets/Colors';

import DatePicker from 'react-native-date-picker';
import AirlineFilter from '@/Components/AirlineFIlter';
import {CityCodes} from '@/Data/Constants';

const fetchFlights = async () => {
  const response = await fetch('https://api.npoint.io/4829d4ab0e96bfab50e7');
  return response.json();
};

// padd navigation props
export interface HomeScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // safe area insets
  const insets = useSafeAreaInsets();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [openDepartureDatePicker, setOpenDepartureDatePicker] = useState(false);
  const [departureTime, setDepartureTime] = useState(new Date());

  const [openArrivalDatePicker, setOpenArrivalDatePicker] = useState(false);
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [airlines, setAirles] = useState('');

  const handleSearch = () => {
    Keyboard.dismiss();
    navigation.navigate('Results', {
      from: CityCodes[from.toLocaleLowerCase()] || from,
      to: CityCodes[to.toLocaleLowerCase()] || to,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      minPrice: minPrice,
      maxPrice: maxPrice,
      airlines: airlines,
    });
  };

  const [salutation, setSalutation] = useState('morning');

  const {data, isLoading, error} = useQuery('posts', fetchFlights);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 12) {
      setSalutation('morning ☀️');
    } else if (hours >= 12 && hours < 17) {
      setSalutation('afternoon');
    } else {
      setSalutation('evening');
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          gap: 20,
        }}>
        <TitleText
          style={{
            textAlign: 'left',
          }}>
          Search Flights ✈️
        </TitleText>
        <View style={styles.inputContainer}>
          <>
            <DatePicker
              modal
              open={openDepartureDatePicker}
              date={departureTime}
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
              date={arrivalTime}
              onConfirm={date => {
                setOpenArrivalDatePicker(false);
                setArrivalTime(date);
              }}
              onCancel={() => {
                setOpenArrivalDatePicker(false);
              }}
            />
          </>

          <View>
            <ParagraphText>Journey Details</ParagraphText>
            <View style={styles.row}>
              <TextInput
                placeholder="Where from"
                style={styles.input}
                value={from}
                onChangeText={setFrom}
                enterKeyHint="next"
                placeholderTextColor={Neutral.LightGray}
              />
              <TextInput
                placeholder="Where to"
                style={styles.input}
                value={to}
                onChangeText={setTo}
                enterKeyHint="next"
                placeholderTextColor={Neutral.LightGray}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                placeholder="Departure Time"
                style={styles.input}
                value={departureTime.toLocaleTimeString('en-US', {
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
                placeholder="Arrival Time"
                style={styles.input}
                value={arrivalTime.toLocaleTimeString('en-US', {
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
            <ParagraphText>Price Details</ParagraphText>
            <View style={styles.row}>
              <TextInput
                placeholder="₹ Min Price"
                style={styles.input}
                value={minPrice}
                enterKeyHint="search"
                inputMode="numeric"
                onChangeText={setMinPrice}
                placeholderTextColor={Neutral.LightGray}
              />
              <TextInput
                placeholder="₹ Max Price"
                style={styles.input}
                value={maxPrice}
                enterKeyHint="search"
                inputMode="numeric"
                onChangeText={setMaxPrice}
                placeholderTextColor={Neutral.LightGray}
              />
            </View>
          </View>

          <View>
            <ParagraphText>Airline of Choice</ParagraphText>
            <View style={styles.row}>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor:
                    airlines === 'AB' ? Highlight.Yellow : 'transparent',
                  padding: 15,
                  width: '45%',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setAirles('AB');
                }}>
                <AirlineFilter airlineCode="AB" airlineName="Jet Spice" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor:
                    airlines === 'CD' ? Highlight.Yellow : 'transparent',
                  padding: 15,
                  width: '45%',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setAirles('CD');
                }}>
                <AirlineFilter airlineCode="CD" airlineName="Air India" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              handleSearch();
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Search Flights</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderStyle: 'dotted',
            borderWidth: 1,
            borderRadius: 1,
            borderColor: '#ddd',
          }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    padding: 20,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    gap: 20,
  },
  input: {
    backgroundColor: Neutral.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    color: Neutral.DarkGray,
    width: '50%',
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: Highlight.Yellow,
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

export default SearchScreen;
