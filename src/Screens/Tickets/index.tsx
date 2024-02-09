import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TicketsScreen: React.FC = () => {
  // get the data from the async storage
  const [tickets, setTickets] = useState([]);

  return (
    <View>
      <Text>Tickets</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TicketsScreen;
