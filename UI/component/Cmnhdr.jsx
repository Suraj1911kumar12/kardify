import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {UseAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';

import EnIcon from 'react-native-vector-icons/Entypo';

const Cmnhdr = props => {
  const {backIcon, title} = props;
  const auth = UseAuth();

  return (
    <View style={styles.header}>
      {backIcon ? (
        <View style={styles.firstView}>
          <View style={{gap: 2}}>
            <Text style={{fontSize: 18}}>Welcome Suraj</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
              }}>
              <EnIcon name="location-pin" style={{fontSize: 15}} />
              <Text>Kormangala ,Bangalore</Text>
              <MiIcon name="arrow-drop-down" style={{fontSize: 15}} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.firstView}></View>
      )}

      {title ? (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 24
            
          }}>{title}</Text>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.thirdView}>
        <TouchableOpacity
          // onPress={props.notification}
          style={styles.circleView}>
          <Icon name="heart" style={{fontSize: 20}} />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={props.notification}
          style={styles.circleView}>
          <Icon name="bell-ring-outline" style={{fontSize: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cmnhdr;

const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  circleView: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#1C1F22',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
    flex: 1,
  },
  secondView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1,
  },
  logo: {
    height: 47,
    width: 59,
  },
  img: {
    height: 19,
    width: 19,
  },
});
