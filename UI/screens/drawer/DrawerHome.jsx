import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabStackNavigator from '../../Routes/Navigation/BottomTabNavigation';

const DrawerHome = props => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <StatusBar
          backgroundColor="#131417"
          barStyle="light-content"
          hidden={false}
        />

        <TabStackNavigator />
      </ImageBackground>
    </View>
  );
};

export default DrawerHome;

const styles = StyleSheet.create({});
