import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {Color} from '../styles/Color';
const {height, width} = Dimensions.get('window');

const LoginHeader = props => {
  const {backIcon} = props;
  return (
    <View style={styles.header}>
      <View style={styles.IMG}></View>
      <View style={styles.cmnlogo}>
        <View
          style={{
            backgroundColor: Color.black,
            padding: 15,
            height: 60,
            width: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Image
            source={require('../../assets/images/Auth/kardifylogo.png')}
            resizeMode="contain"
            style={{height: height / 22, width: width / 6}}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  header: {
    height: height / 10,
    width: width,
    flexDirection: 'row',
    // backgroundColor:"cyan",
    alignItems: 'center',
  },
  IMG: {
    height: height / 14,
    width: width / 4,
    //backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
    //alignItems:'flex-start'
  },
  cmnlogo: {
    height: height / 10,
    width: width / 2,
    //backgroundColor:'green',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
