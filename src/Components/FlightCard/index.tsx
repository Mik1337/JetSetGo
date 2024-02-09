import {Highlight, Misc, Neutral, Primary} from '@/Assets/Colors';
import {Result} from '@/Data/Interface';
import {LabelText, ParagraphText, SubTitleText, TitleText} from '@/Typography';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import AirlineFilter from '../AirlineFIlter';
import {removeBookingData, storeBookingData} from '@/Data/LocalStorage';
import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
interface FlightCardProps {
  index: number;
  item: Result;
}

const FlightCard: React.FC<FlightCardProps> = props => {
  const handleBookTicket = () => {
    storeBookingData(props.item);
    Alert.alert('Success', 'Ticket Booked Successfully');
  };

  const handleCancelTicker = () => {
    removeBookingData(props.item.id);
    Alert.alert('Success', 'Ticket Cancelled Successfully');
  };

  const [isBooked, setItBooked] = useState(false);

  useEffect(() => {
    const checkIfBooked = async () => {
      const data = await AsyncStorage.getItem('bookingData');
      if (data) {
        const parsedData = JSON.parse(data);
        const isBooked = parsedData.find(
          (item: Result) => item.id === props.item.id,
        );
        setItBooked(isBooked);
      }
    };

    checkIfBooked();
  }, [isBooked, props]);

  return (
    <View style={styles.bgContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <AirlineFilter
            airlineName={props.item.displayData.airlines[0].airlineName}
            airlineCode={props.item.displayData.airlines[0].airlineCode}
          />
          <SubTitleText>
            Flight #{props.item.displayData.airlines[0].flightNumber}
          </SubTitleText>
        </View>
        <View style={styles.row}>
          <View
            style={{
              gap: 4,
            }}>
            <TitleText
              style={{
                textAlign: 'left',
              }}>
              {props.item.displayData.source.airport.cityCode}
            </TitleText>
            <LabelText>
              {props.item.displayData.source.airport.cityName}
            </LabelText>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LabelText
              style={{
                fontWeight: 'bold',
              }}>
              {props.item.displayData.stopInfo}
            </LabelText>
            <LabelText>{props.item.displayData.totalDuration}</LabelText>
          </View>
          <View
            style={{
              gap: 4,
            }}>
            <TitleText
              style={{
                textAlign: 'left',
              }}>
              {props.item.displayData.destination.airport.cityCode}
            </TitleText>
            <LabelText>
              {props.item.displayData.destination.airport.cityName}
            </LabelText>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <LabelText>Departure Time</LabelText>
            <SubTitleText>
              {formatTime(props.item.displayData.source.depTime)}
            </SubTitleText>
            <View
              style={{
                paddingVertical: 10,
              }}
            />
            <LabelText>Terminal</LabelText>
            <SubTitleText>
              T{props.item.displayData.source.airport.terminal}
            </SubTitleText>
          </View>

          <View>
            <LabelText
              style={{
                textAlign: 'right',
              }}>
              Arrival Time
            </LabelText>
            <SubTitleText
              style={{
                textAlign: 'right',
              }}>
              {formatTime(props.item.displayData.destination.arrTime)}
            </SubTitleText>
            <View
              style={{
                paddingVertical: 10,
              }}
            />
            <LabelText
              style={{
                textAlign: 'right',
              }}>
              Terminal
            </LabelText>
            <SubTitleText
              style={{
                textAlign: 'right',
              }}>
              T{props.item.displayData.destination.airport.terminal}
            </SubTitleText>
          </View>
        </View>

        <View style={[styles.row, {alignItems: 'center'}]}>
          <View>
            <LabelText>Price</LabelText>
            <TitleText>₹{props.item.fare.toLocaleString()}</TitleText>
          </View>
          <TouchableOpacity
            onPress={isBooked ? handleCancelTicker : handleBookTicket}>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: isBooked ? Misc.Red : Highlight.Yellow,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isBooked ? Neutral.White : Neutral.DarkGray,
                  },
                ]}>
                {isBooked ? 'Cancel' : 'Book Now'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const formatTime = (time: string) => {
  const date = new Date(time);
  // 24 hour format
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const styles = StyleSheet.create({
  bgContainer: {
    backgroundColor: Neutral.Light,
    width: Dimensions.get('window').width,
    height: 400,
    padding: 16,
  },
  container: {
    width: Dimensions.get('window').width - 32,
    height: '100%',
    backgroundColor: Neutral.White,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    backgroundColor: Highlight.Yellow,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Neutral.DarkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlightCard;
