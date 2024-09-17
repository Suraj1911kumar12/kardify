import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import TabStackNavigator from '../../Routes/Navigation/BottomTabNavigation';
import {setMainAddress} from '../../redux/slice/MainAddressSlice';
import {useDispatch} from 'react-redux';
import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';

const DrawerHome = props => {
  const dispatch = useDispatch();
  const auth = UseAuth();
  useEffect(() => {
    const getAddress = async () => {
      try {
        const resp = await axios.get('/get-all-addresses', {
          headers: {
            Authorization: auth.token,
          },
        });
        if (resp.data.code === 200) {
          dispatch(setMainAddress(resp.data.addresses[0]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);
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
