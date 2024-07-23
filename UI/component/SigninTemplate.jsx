import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('screen');

const SigninTemplate = ({children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default SigninTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
