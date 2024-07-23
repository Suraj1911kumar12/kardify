import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

const AuthCommonHeader = props => {
  const {backIcon} = props;
  return (
    <View style={styles.header}>
      <View style={styles.IMG}>
        <TouchableOpacity onPress={props.onPress}>
          <Icon name="arrow-back" style={{fontSize: 25}} />
        </TouchableOpacity>
      </View>
      <View style={styles.cmnlogo}>
        <Image
          source={require('../../assets/images/Auth/kardifylogo.png')}
          resizeMode="contain"
          style={{height: height / 14, width: width / 6}}
        />
      </View>
    </View>
  );
};

export default AuthCommonHeader;

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
