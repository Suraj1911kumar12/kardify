import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import ScreenNames from '../../constants/Screens';
import Icon from 'react-native-vector-icons/Entypo';
import FontIcon from 'react-native-vector-icons/FontAwesome';

const CustomizeSeatCover = props => { 
  const DATA = [
    {
      id: '1',
      seatcover: require('../../../assets/images/SeatCover/blackseatcover.png'),
      pricetxt: 'Price range :',
      amt: '₹ 1,439',
      designtxt: 'Design pattern :',
      flowerpattern: 'Flower Pattern',
      seattxt:
        'Auto Car Winner Wooden Car Seat Cover For Universal For Car Universal For Car  (NA, 4 Seater)',
    },
    {
      id: '2',
      seatcover: require('../../../assets/images/SeatCover/goldenseatcover.png'),
      pricetxt: 'Price range :',
      amt: '₹ 1,439',
      designtxt: 'Design pattern :',
      flowerpattern: 'Flower Pattern',
      seattxt:
        'Auto Car Winner Wooden Car Seat Cover For Universal For Car Universal For Car  (NA, 4 Seater)',
    },
    {
      id: '3',
      seatcover: require('../../../assets/images/SeatCover/whiteseatcover.png'),
      pricetxt: 'Price range :',
      amt: '₹ 1,439',
      designtxt: 'Design pattern :',
      flowerpattern: 'Flower Pattern',
      seattxt:
        'Auto Car Winner Wooden Car Seat Cover For Universal For Car Universal For Car  (NA, 4 Seater)',
    },
    {
      id: '4',
      seatcover: require('../../../assets/images/SeatCover/goldenseatcover.png'),
      pricetxt: 'Price range :',
      amt: '₹ 1,439',
      designtxt: 'Design pattern :',
      flowerpattern: 'Flower Pattern',
      seattxt:
        'Auto Car Winner Wooden Car Seat Cover For Universal For Car Universal For Car  (NA, 4 Seater)',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        
        <View
          style={{
            height: SCREEN_HEIGHT / 12,
            width: SCREEN_WIDTH / 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: '800'}}>
            Customized Seat Covers
          </Text>
        </View>
        <View style={styles.srchbdy}>
          <View style={styles.srch}>
            <View style={styles.srchicon}>
              <FontIcon name="search" style={{fontSize: 20}} />
            </View>
            <View style={styles.srchtxt}>
              <TextInput placeholder="Search" />
            </View>
          </View>
          <View style={styles.filtr}>
            <Icon name="sound-mix" style={{fontSize: 25}} />
          </View>
        </View>
        <ScrollView>
          <View style={styles.MainBdy}>
            <FlatList
              data={DATA}
              renderItem={({item}) => {
                return (
                  <View style={styles.crd}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(ScreenNames.productdetails)
                      }>
                      <View style={styles.img}>
                        <Image source={item.seatcover} />
                      </View>
                    </TouchableOpacity>
                    <View style={styles.cmntxt}>
                      <View style={styles.txt}>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontWeight: '500',
                            fontSize: SCREEN_HEIGHT / 60,
                          }}>
                          {item.seattxt}
                        </Text>
                      </View>
                      <View style={styles.pricetxt}>
                        <Text style={{color: '#B1B1B1', fontWeight: '500'}}>
                          {item.pricetxt}
                        </Text>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontWeight: '500',
                            marginLeft: 10,
                          }}>
                          {item.amt}
                        </Text>
                      </View>
                      <View style={styles.pricetxt}>
                        <Text style={{color: '#B1B1B1', fontWeight: '500'}}>
                          {item.designtxt}
                        </Text>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontWeight: '500',
                            fontSize: SCREEN_HEIGHT / 65,
                            marginLeft: 10,
                          }}>
                          {item.flowerpattern}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CustomizeSeatCover;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  srchbdy: {
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_WIDTH / 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  srch: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.35,
    backgroundColor: '#1F2328',
    flexDirection: 'row',
    borderRadius: 5,
  },
  filtr: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 8,
    backgroundColor: '#1F2328',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  srchicon: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 7,
    //backgroundColor:"cyan",
    alignItems: 'center',
    justifyContent: 'center',
  },
  srchtxt: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.7,
    //backgroundColor:"blue",
    justifyContent: 'center',
  },
  crd: {
    height: SCREEN_HEIGHT / 5.5,
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: '#1B1E22',
    // backgroundColor:"red",
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    // marginVertical:SCREEN_HEIGHT/95
    marginTop: 10,
  },
  img: {
    height: SCREEN_HEIGHT / 6.5,
    width: SCREEN_WIDTH / 2.6,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cmntxt: {
    height: SCREEN_HEIGHT / 6.5,
    width: SCREEN_WIDTH / 2,
    //backgroundColor:"pink",
    flexDirection: 'column',
  },
  txt: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 2,
    //backgroundColor:'yellow',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txts: {
    height: SCREEN_HEIGHT / 22,
    width: SCREEN_WIDTH / 2,
    //backgroundColor:"cyan",
    justifyContent: 'space-around',
  },
  pricetxt: {
    height: SCREEN_HEIGHT / 30,
    width: SCREEN_WIDTH / 2,
    // backgroundColor:'pink',
    flexDirection: 'row',
    alignItems: 'center',
  },
  MainBdy: {
    height: SCREEN_HEIGHT / 1,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"green"
  },
});
