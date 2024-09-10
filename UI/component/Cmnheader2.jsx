import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import axios from '../../axios';
import {UseAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../styles/Color';
import ScreenNames from '../constants/Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apis} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';

const Cmnhdr2 = props => {
  const navigation = useNavigation();
  const {backIcon, title, cart} = props;
  const auth = UseAuth();
  const [addedLength, setAddedLength] = useState(0);
  const getCartApi = apis.getCart;
  const dispatch = useDispatch();
  const seletor = useSelector(state => state);

  const fetchCartData = async () => {
    if (auth.token) {
      try {
        const res = await axios.get(getCartApi, {
          headers: {
            Authorization: auth.token,
          },
        });
        if (res?.data?.code === 200) {
          setAddedLength(res?.data?.cartItems?.length);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = await AsyncStorage.getItem('cart');
        const cart = data ? JSON.parse(data) : [];
        setAddedLength(cart.length || 0);
      } catch (error) {
        console.error('Failed to retrieve cart data:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartData();
    // Set up the interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchCartData();
    }, 5000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [auth.token]);

  return (
    <View style={styles.header}>
      {backIcon ? (
        <View style={styles.firstView}>
          <Pressable
            onPress={() =>
              navigation.goBack() || navigation.navigate(ScreenNames.Home)
            }>
            <MiIcon
              name="keyboard-arrow-left"
              style={{fontSize: 30, color: Color.white}}
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.firstView}></View>
      )}

      {title ? (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: Color.white}}>
            {title}
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.thirdView}>
        {cart ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.carts)}
            style={styles.circleView}>
            <Icon name="cart" style={{fontSize: 20, color: Color.grey}} />
            {addedLength > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                }}>
                <Text style={{color: Color.white}}>{addedLength}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.circleView}>
            <Icon
              name="bell-ring-outline"
              style={{fontSize: 20, color: Color.grey}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Cmnhdr2;

const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  circleView: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#1C1F22',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
    flex: 1,
  },
  secondView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1,
  },
});
