import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ScreenNames from '../../constants/Screens';
import MainHome from '../../screens/Dashboard/MainHome';
import Stories from '../../screens/Dashboard/Stories';
import More from '../../screens/Dashboard/More';
import MainCarts from '../../screens/Dashboard/MainCarts';

const TabStack = createBottomTabNavigator();

const TabStackNavigator = () => {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#989898',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
        },

        tabBarStyle: {
          backgroundColor: '#000000',
          width: '100%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}>
      <TabStack.Screen
        name={ScreenNames.dashHome}
        component={MainHome}
        style={{justifyContent: 'center'}}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <AntDesign
                name="home"
                style={{
                  fontSize: size,
                  color: focused ? '#ffffff' : '#989898',
                }}
              />
            );
          },
        }}
      />
      <TabStack.Screen
        name={ScreenNames.addstories}
        component={Stories}
        options={{
          title: 'Stories',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                <MaterialIcons
                  name="add-circle-outline"
                  style={{
                    fontSize: size,
                    color: focused ? '#ffffff' : '#989898',
                  }}
                />
              </>
            );
          },
        }}
      />
      <TabStack.Screen
        name={ScreenNames.carts}
        component={MainCarts}
        options={{
          title: 'Cart',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <AntDesign
                name="shoppingcart"
                style={{fontSize: size, color: focused ? '#ffffff' : '#989898'}}
              />
            );
          },
        }}
      />
      <TabStack.Screen
        name={ScreenNames.more}
        component={More}
        options={{
          title: 'My Account',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <AntDesign
                name="user"
                style={{fontSize: size, color: focused ? '#ffffff' : '#989898'}}
              />
            );
          },
        }}
      />
    </TabStack.Navigator>
  );
};

export default TabStackNavigator;
