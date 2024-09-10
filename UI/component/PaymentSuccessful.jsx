import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useEffect, useCallback} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
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

  const auth = UseAuth();
  const navigation = useNavigation();

  const generatePaymentSignature = (order_id, payment_id) => {
    const hash = crypto.HmacSHA256(`${order_id}|${payment_id}`, secret);
    return hash.toString(crypto.enc.Hex);
  };

  const placeOrder = async () => {
    const formatProductData = products => {
      return products.map(item => {
        const product = item.product;
        return {
          product_id: item.product_id,
          product_name: product.product_name,
          combination_id: item.combination_id || 0,
          combination_name: '', // If there's a specific combination name, map it here
          unit_price: product.default_price,
          quantity: item.quantity,
          total_price: item.quantity * product.default_price,
          category_id: product.category_id,
          sub_category_id: product.sub_category_id,
          super_sub_category_id: product.super_sub_category_id,
          product_type: product.product_type,
          car_brand_id: product.car_brand_id || 0,
          car_model_id: product.car_model_id || 0,
          description: product.product_desc,
          cgst: 0, // Set appropriate CGST value
          sgst: 0, // Set appropriate SGST value
          igst: 0, // Set appropriate IGST value
          tax_rate: product.tax_rate,
          default_price: product.default_price,
          discount_type: product.discount_type,
          discount: product.discount,
        };
      });
    };
    const formattedProducts = formatProductData(products);
    const orderData = {
      address_id: route.params.allData.address.id || 0,
      delivery_type_id: seletor.shipping.shippingType === 'self pickup' ? 1 : 2,
      payment_type: seletor.payment.payemntType || 'COD',
      payment_id: route.params.allData.data.razorpay_payment_id || '',
      payment_order_id: route.params.allData.razorData.id || '',
      payment_signature: generatePaymentSignature(
        route.params?.allData?.order_id,
        route.params.allData.data.razorpay_payment_id,
      ),
      shipping_charge: '' || 0,
      total_product_amount: route.params.allData.total_amount || 0,
      coupon_id: null,
      products: formatProductData(route.params.allData.products) || [],

      gst_total_amount: route.params.allData.razorData.amount_due || 0,
      total_amount: route.params.allData.total_amount || 0,
      total_discount_amount: 0, // Add if applicable
    };
    console.log('====================================');
    console.log(orderData, ',,,.......');
    console.log('====================================');
    try {
      const response = await axios.post('/place-order', orderData, {
        headers: {Authorization: auth.token},
      });
      console.log('====================================');
      console.log(response?.data);
      console.log('====================================');

      if (response.status === 200) {
        console.log('====================================');
        console.log(response.data.message);
        console.log('====================================');
        console.log('Order placed successfully');
        // Navigate to the order success screen
        // navigation.navigate(ScreenNames.orderSuccess);
      } else {
        console.log('Failed to place order');
        console.log(response.data.message);
      }
    } catch (error) {
      console.log('error: ' + error);

      console.error('Error placing order:', error.response.data.message);
    }
  };

  // const placeOrder = async () => {
  //   try {
  //     const orderData = {
  //       // Extract the order data from route.params
  //       // (same as your existing implementation)
  //     };

  //     const response = await axios.post('/place-order', orderData, {
  //       headers: {Authorization: auth.token},
  //     });

  //     if (response.status === 200) {
  //       console.log('Order placed successfully');
  //       // You can trigger any other success actions here
  //     } else {
  //       console.log('Failed to place order');
  //     }
  //   } catch (error) {
  //     console.error('Error placing order:', error.response.data.message);
  //   }
  // };

  useEffect(() => {
    placeOrder();
  }, []);

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
