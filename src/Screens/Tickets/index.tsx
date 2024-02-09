import {Highlight, Neutral} from '@/Assets/Colors';
import FlightCard from '@/Components/FlightCard';
import {Result} from '@/Data/Interface';
import {getBookingData} from '@/Data/LocalStorage';
import {TitleText, SubTitleText} from '@/Typography';
import {useEffect, useState} from 'react';
import {Image, Platform, RefreshControl, StyleSheet, View} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TicketScreen: React.FC = () => {
  // safe area insets
  const insets = useSafeAreaInsets();

  const [refresh, setRefresh] = useState(false);
  const [tickets, setTickets] = useState<Result[]>([]);

  useEffect(() => {
    getBookingData()
      .then((data: Result[]) => {
        setTickets(data);
      })
      .catch((e: any) => {
        console.log('Error getting data', e);
      })
      .finally(() => {
        setRefresh(false);
      });
  }, [refresh]);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: Platform.OS === 'ios' ? insets.top * 1.5 : 25},
      ]}>
      <TitleText
        style={{
          textAlign: 'left',
          marginLeft: 20,
        }}>
        Your Tickets 🎫
      </TitleText>

      {!tickets || tickets?.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(prev => !prev)}
            />
          }
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../Assets/Illustrations/notickets.png')}
            style={{
              width: 350,
              height: 350,
              resizeMode: 'contain',
            }}
          />
          <SubTitleText>You haven't booked any tickets</SubTitleText>
        </ScrollView>
      ) : (
        <FlatList
          data={tickets}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(prev => !prev)}
            />
          }
          renderItem={_renderTicket}
          keyExtractor={(item, index) => index.toString()}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={400}
        />
      )}
    </View>
  );
};

const _renderTicket = (flight: any) => {
  return <FlightCard {...flight} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Neutral.White,
    padding: 20,
    borderRadius: 10,

    gap: 10,

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
    backgroundColor: Neutral.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    color: Neutral.DarkGray,
    width: '45%',
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

export default TicketScreen;
