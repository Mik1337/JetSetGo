import {Neutral, Primary} from '@/Assets/Colors';
import {TitleText} from '@/Typography';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

interface FlightCardProps {
  [key: string]: any;
}

const FlightCard: React.FC<any> = ({flight}) => {
  return (
    <View style={styles.bgContainer}>
      <View style={styles.container}>
        <TitleText>{flight.name}</TitleText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    backgroundColor: Neutral.Light,
    width: Dimensions.get('window').width,
  },
  container: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    backgroundColor: Neutral.White,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default FlightCard;
