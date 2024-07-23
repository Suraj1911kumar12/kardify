import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabStackNavigator from '../../Routes/Navigation/BottomTabNavigation';
import Cmnhdr from '../../component/Cmnhdr';
import ScreenNames from '../../constants/Screens';

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
        {/* <Cmnhdr
          backIcon
          title="Kardify"
          onPress={() => props.navigation.openDrawer()}
          notification={() =>
            props.navigation.navigate(ScreenNames.notification)
          }
        /> */}
        <TabStackNavigator />
      </ImageBackground>
    </View>
  );
};

export default DrawerHome;

const styles = StyleSheet.create({});
