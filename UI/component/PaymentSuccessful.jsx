import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useEffect, useCallback, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenNames from '../constants/Screens';
import CustomButton from './CustomButton';
import {Color} from '../styles/Color';
import axios from '../../axios';
import {UseAuth} from '../context/AuthContext';
import {useSelector} from 'react-redux';
import crypto from 'crypto-js';

const PaymentSuccessful = ({route}) => {
  const secret = process.env.RAZOR_KEY_SECRET;
  const seletor = useSelector(state => state);
  const [orderData, setOrderData] = useState({});

  const generatePaymentSignature = (order_id, payment_id) => {
    const hash = crypto.HmacSHA256(`${order_id}|${payment_id}`, secret);
    return hash.toString(crypto.enc.Hex);
  };

  useEffect(() => {
    const data = route?.params?.allData;

    if (data && address) {
      setOrderData({
        address_id: address?.id,
        delivery_type_id: data?.shippingType === 'online' ? 2 : 1,
        payment_type: data?.paymentType === 'Online' ? 'online' : 'COD',
        payment_id: data?.data?.razorpay_payment_id,
        payment_order_id: data?.razorData?.id,
        payment_signature: generatePaymentSignature(
          data?.razorData?.id,
          data?.data?.razorpay_payment_id,
          process.env.RAZOR_KEY_SECRET,
        ),
        shipping_charge: 0,
        coupon_id: 0,
        total_product_amount: data?.total_amount,
        products: data?.products?.map(product => ({
          product_id: product?.product?.id,
          product_name: product?.product?.product_name,
          combination_id: product?.combination_id,
          quantity: product?.product?.quantity,
          unit_price: 0,
          total_price: product?.product?.default_price,
          category_id: product?.product?.category_id,
          sub_category_id: product?.product?.sub_category_id,
          super_sub_category_id: product?.product?.super_sub_category_id,
          product_type: product?.product?.product_type,
          car_brand_id: product?.product?.car_brand_id,
          car_model_id: product?.product?.car_model_id,
          description: product?.product?.product_desc,
          cgst: product?.product?.cgst,
          sgst: product?.product?.sgst,
          igst: product?.product?.igst,
          tax_rate: product?.product?.tax_rate,
          default_price: product?.product?.default_price,
          discount_type: product?.product?.discount_type,
          discount: product?.product?.discount,
        })),
        gst_total_amount: 0,
        total_amount: data.total_amount,
        total_discount_amount: 0,
      });
    }
  }, [route?.params?.allData]);

  const address = seletor?.MainAddressSlice?.addresses;

  const auth = UseAuth();
  const navigation = useNavigation();

  const placeOrder = async () => {
    if (orderData) {
      try {
        const response = await axios.post('/place-order', orderData, {
          headers: {Authorization: auth.token},
        });
        console.log('====================================');
        console.log(response?.data);
        console.log('====================================');

        if (response.data.status === 201) {
          console.log('====================================');
          console.log(response.data.message);
          console.log('====================================');
        } else {
          console.log('Failed to place order');
          console.log(response.data.message);
        }
      } catch (error) {
        console.log('error placing order: ' + error);

        console.log('Error placing order:', error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (orderData) {
      placeOrder();
    }
  }, [orderData]);

  const handleNavigation = screenName => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName}],
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleNavigation(ScreenNames.Home);
        return true; // Prevent the default back button action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/homeBg.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <Icon name="checkmark-circle" size={200} color={Color.yellow} />
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.description}>Thank you for your purchase.</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* <Button onPress={placeOrder} title="button" /> */}

          <CustomButton
            title="View Order"
            onPressButton={() => handleNavigation(ScreenNames.myorder)}
          />
          <CustomButton
            title="Continue Shopping"
            onPressButton={() => handleNavigation(ScreenNames.productsList)}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PaymentSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
});
