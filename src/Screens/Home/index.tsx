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
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useQuery} from 'react-query';

import {Primary, Highlight, Neutral} from '@/Assets/Colors'; // Commented out as it's causing an error
import FlightCard from '@/Components/FlightCard';

// padd navigation props
export interface HomeScreenProps {
  navigation: any;
}

const fetchFlights = async () => {
  const response = await fetch('https://api.npoint.io/4829d4ab0e96bfab50e7');
  return response.json();
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // safe area insets
  const insets = useSafeAreaInsets();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const handleSearch = () => {
    Keyboard.dismiss();
    console.log(from, to, departureTime);
  };

  const [salutation, setSalutation] = useState('morning');

  const {data, isLoading, error} = useQuery('posts', fetchFlights);

  const [flights, setFlights] = useState(data?.data?.result || []);

  useEffect(() => {
    setFlights(data?.data?.result);
  }, [data]);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 12) {
      setSalutation('morning');
    } else if (hours >= 12 && hours < 17) {
      setSalutation('afternoon');
    } else {
      setSalutation('evening s');
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
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            gap: 20,
          }}>
          <ParagraphText
            style={{
              textAlign: 'left',
            }}>
            👋 Good {salutation}
          </ParagraphText>

          <View style={styles.inputContainer}>
            <TitleText
              style={{
                textAlign: 'left',
              }}>
              Search Flights ✈️
            </TitleText>
            <TextInput
              placeholder="From"
              style={styles.input}
              value={from}
              onChangeText={setFrom}
              enterKeyHint="next"
            />
            <TextInput
              placeholder="To"
              style={styles.input}
              value={to}
              onChangeText={setTo}
              enterKeyHint="next"
            />
            <TextInput
              placeholder="Departure Time"
              style={styles.input}
              value={departureTime}
              enterKeyHint="search"
              onChangeText={setDepartureTime}
            />
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search Flights</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderStyle: 'dotted',
            borderWidth: 1,
            borderRadius: 1,
            borderColor: '#ddd',
          }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <SubTitleText>Upcoming Flights</SubTitleText>
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <LabelText>See All</LabelText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={flights.slice(0, 3)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={_renderFlightCard}
          keyExtractor={(_, index) => index.toString()}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').width}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const _renderFlightCard = (flight: any) => {
  return <FlightCard flight={flight} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    backgroundColor: Neutral.Gray,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Neutral.White,
    padding: 20,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    width: '100%',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
