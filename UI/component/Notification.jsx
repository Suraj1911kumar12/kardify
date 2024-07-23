import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import Cmnhdr from './Cmnhdr';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../styles/Size';

const Notification = props => {
  const DATA = [
    {
      id: '1',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '5 Min ago',
      tday: 'Today',
    },
    {
      id: '2',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '2 Hours ago',
      // tday:'Today',
    },
    {
      id: '3',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '2 Hours ago',
      //tday:'Today',
    },
    {
      id: '4',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
      yestrday: 'Yesterday',
    },
  ];
  const DATA1 = [
    {
      id: '1',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
      tday: 'Yesterday',
    },
    {
      id: '2',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },

    {
      id: '3',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },
    {
      id: '4',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },
  ];
  const DATA2 = [
    {
      id: '1',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
      tday: '22 December 2021o',
    },
    {
      id: '2',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },

    {
      id: '3',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },
    {
      id: '4',
      purchage: 'Heading',
      txt: 'Lorem Ipsum is simply dummy text',
      txt1: 'of the printing',
      time: '1 Day ago',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <StatusBar
          backgroundColor="#131417"
          barStyle="light-content"
          hidden={false}
        />
        <Cmnhdr
          backIcon
          title="Kardify"
          onPress={() => props.navigation.goBack()}
        />

        <ScrollView>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return (
                <View style={styles.crd}>
                  <Text style={{color: '#ffffff'}}>{item.tday}</Text>

                  <View style={styles.purchageBdy}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: SCREEN_HEIGHT / 50,
                        fontWeight: '500',
                      }}>
                      {item.purchage}
                    </Text>
                    <Text
                      style={{color: '#ffffff', fontSize: SCREEN_HEIGHT / 60}}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.TXTBdy}>
                    <Text
                      style={{fontSize: SCREEN_HEIGHT / 55, color: '#ADADAD'}}>
                      {item.txt}
                      {'\n'}
                      <Text
                        style={{
                          fontSize: SCREEN_HEIGHT / 55,
                          color: '#ADADAD',
                        }}>
                        {item.txt1}
                      </Text>
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              height: SCREEN_HEIGHT / 50,
              width: SCREEN_WIDTH / 1,
            }}></View>
          <FlatList
            data={DATA1}
            renderItem={({item}) => {
              return (
                <View style={styles.crd}>
                  <Text style={{color: '#ffffff'}}>{item.tday}</Text>

                  <View style={styles.purchageBdy}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: SCREEN_HEIGHT / 50,
                        fontWeight: '500',
                      }}>
                      {item.purchage}
                    </Text>
                    <Text
                      style={{color: '#ffffff', fontSize: SCREEN_HEIGHT / 60}}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.TXTBdy}>
                    <Text
                      style={{fontSize: SCREEN_HEIGHT / 55, color: '#ADADAD'}}>
                      {item.txt}
                      {'\n'}
                      <Text
                        style={{
                          fontSize: SCREEN_HEIGHT / 55,
                          color: '#ADADAD',
                        }}>
                        {item.txt1}
                      </Text>
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              height: SCREEN_HEIGHT / 50,
              width: SCREEN_WIDTH / 1,
            }}></View>
          <FlatList
            data={DATA2}
            renderItem={({item}) => {
              return (
                <View style={styles.crd}>
                  <Text style={{color: '#ffffff'}}>{item.tday}</Text>

                  <View style={styles.purchageBdy}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: SCREEN_HEIGHT / 50,
                        fontWeight: '500',
                      }}>
                      {item.purchage}
                    </Text>
                    <Text
                      style={{color: '#ffffff', fontSize: SCREEN_HEIGHT / 60}}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.TXTBdy}>
                    <Text
                      style={{fontSize: SCREEN_HEIGHT / 55, color: '#ADADAD'}}>
                      {item.txt}
                      {'\n'}
                      <Text
                        style={{
                          fontSize: SCREEN_HEIGHT / 55,
                          color: '#ADADAD',
                        }}>
                        {item.txt1}
                      </Text>
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  crd: {
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"green",
    alignSelf: 'center',
    // justifyContent:'center',
    // alignItems:"center",
    flexDirection: 'column',
    // marginVertical:SCREEN_HEIGHT/80,
    borderBottomWidth: 1,
    borderColor: '#E9E9E9',
    marginTop: 5,
  },
  tdytxt: {
    height: SCREEN_HEIGHT / 30,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:'red',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    //justifyContent:"center"
  },
  purchageBdy: {
    height: SCREEN_HEIGHT / 25,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"yellow",
    flexDirection: 'row',
    // alignItems:'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TXTBdy: {
    height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 1.1,
    // background
  },
});
