import {LabelText} from '@/Typography';
import {Image, StyleSheet, Text, View} from 'react-native';

// since the api is only returning these two airlines, I'm hardcoding them.
interface AirlineFilterProps {
  airlineCode: 'AB' | 'CD';
  airlineName: string;
}

const AirlineFilter: React.FC<AirlineFilterProps> = props => {
  return (
    <View style={style.container}>
      <Image
        source={
          props.airlineCode === 'AB'
            ? require('../../Assets/Illustrations/spicejet.png')
            : require('../../Assets/Illustrations/airindia.png')
        }
        style={style.image}
      />
      <LabelText
        style={{
          fontWeight: 'bold',
        }}>
        {props.airlineName}
      </LabelText>
    </View>
  );
};

const style = StyleSheet.create({
  container: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  image: {width: 24, height: 24},
});

export default AirlineFilter;
