import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UseAuth} from '../context/AuthContext';
import {getProduct} from '../redux/slice/cartSlice';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigation from '../Routes/Navigation/DrawerNavigation';
import {View} from 'react-native';

const Home = () => {
  const dispatch = useDispatch();
  const auth = UseAuth();
  const cartItems = useSelector(state => state.cart);

  const fetchCart = async () => {
    try {
      if (auth.token) {
        const {data} = await axios.get('/get-carts', {
          headers: {Authorization: auth.token},
        });

        if (data.code === 200) {
          console.log('Fetched cart items:', data.cartItems.length);
          dispatch(getProduct(data.cartItems)); // Update the store with fetched items
        }
      } else {
        const cartData = await AsyncStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
        dispatch(getProduct(cart)); // Update the store with local storage items
      }
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCart();
    }, 5000);
    // Fetch cart data every 5 seconds to keep it updated
  }, [auth.token]);

  return (
    <View style={{flex: 1}}>
      <DrawerNavigation />
    </View>
  );
};

export default Home;
