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

const fetchFlights = async () => {
  const response = await fetch('https://api.npoint.io/4829d4ab0e96bfab50e7');
  return response.json();
};

// padd navigation props
export interface HomeScreenProps {
  navigation: any;
}

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
        <ParagraphText
          style={{
            textAlign: 'left',
          }}>
          Good {salutation}
        </ParagraphText>

        <TitleText
          style={{
            textAlign: 'left',
          }}>
          Search Flights ✈️
        </TitleText>
        <View style={styles.inputContainer}>
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
          }}>
          <SubTitleText>Upcoming Flights</SubTitleText>
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <LabelText>See All</LabelText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={[]}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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
  inputContainer: {
    flex: 1,
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
    backgroundColor: '#007bff',
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
