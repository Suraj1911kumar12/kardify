import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import ScreenNames from '../../constants/Screens';
import DrawerHome from '../../screens/drawer/DrawerHome';
import SideMenuBar from '../../component/SideMenuBar';

const Drawer = createDrawerNavigator();
const {height, width} = Dimensions.get('window');

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideMenuBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'rgba(255, 255, 255, 1)',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: height / 45,
          color: 'rgba(46, 46, 46, 1)',
        },
      }}>
      <Drawer.Screen name={ScreenNames.drawerHome} component={DrawerHome} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
