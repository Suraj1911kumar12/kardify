// import { View, Text, Button } from 'react-native'
import React from 'react';
import {UseAuth} from '../context/AuthContext';
import DrawerNavigation from '../Routes/Navigation/DrawerNavigation';
import {View} from 'react-native';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <DrawerNavigation />
    </View>
  );
};

export default Home;
