import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../component/CustomButton';
import ScreenNames from '../constants/Screens';

const Spl = props => {
  const arr = [
    {
      id: 1,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/onboarding/main.png')}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        resizeMode="stretch">
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* <View
            style={{
              backgroundColor: Color.light,
              opacity: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              
            }}>
            <Text style={{color: 'white', fontSize: 20}}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque
              pharetra vulputate. Consectetur sit nibh ut in vitae. Quis
            </Text>
          </View> */}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
          <CustomButton
            onPressButton={() =>
              props.navigation.navigate(ScreenNames.LoginScreen)
            }
            title="Continue"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Spl;

const styles = StyleSheet.create({});
