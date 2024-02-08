import {Neutral, Primary} from '@/Assets/Colors';
import {Result} from '@/Data/Interface';
import {LabelText, SubTitleText, TitleText} from '@/Typography';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import AirlineFilter from '../AirlineFIlter';

interface FlightCardProps {
  index: number;
  item: Result;
}

const FlightCard: React.FC<FlightCardProps> = props => {
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
              padding: 16,
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
              gap: 4,
              padding: 16,
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
              padding: 16,
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
            <SubTitleText>
              T{props.item.displayData.source.airport.terminal}
            </SubTitleText>
          </View>

          <View>
            <LabelText>Arrival Time</LabelText>
            <SubTitleText>
              {formatTime(props.item.displayData.destination.arrTime)}
            </SubTitleText>
            <SubTitleText>
              T{props.item.displayData.destination.airport.terminal}
            </SubTitleText>
          </View>
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
});

export default FlightCard;
