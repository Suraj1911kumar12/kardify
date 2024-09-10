import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import RazorpayCheckout from 'react-native-razorpay';

import Icon from 'react-native-vector-icons/Entypo';
import {Color} from '../../styles/Color';
import CustomButton from '../../component/CustomButton'; // Assuming you have this component
import {UseAuth} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import SkeletonLoader from '../../component/SkeletonLoader';
import {showMessage} from 'react-native-flash-message';
import AddressModal from './AddressChange';
import ShippingTypeModal from './ShippingTypeModal';
import {SCREEN_HEIGHT} from '../../styles/Size';
import PaymentTypeModal from './PaymentTypeModal';

const CheckoutPage = () => {
  const getCartApi = apis.getCart;
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const auth = UseAuth();
  const {token} = auth;

  const [selectedAddress, setSelectedAddress] = useState({
    add1: '',
    add2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });
  const [razorData, setRazordata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [removed, setRemoved] = useState(false);
  const [total_paid_amount, setTotalAmount] = useState('');
  const [selectedShippingType, setSelectedShippingType] = useState('Standard');
  const [selectedPaymentType, setSelectedPaymentType] = useState('Online');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePayemnt, setIsModalVisiblePayment] = useState(false);
  // const shippingOptions = ['Self Pickup', 'Online'];
  const [shippingOptions, setShippingOptions] = useState([]);
  const paymentOptions = ['COD', 'Online'];

  const [address, setAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const getshippingType = async () => {
      try {
        const response = await axios.get('/get-delivery-types');
        if (response.data.code === 200) {
          setShippingOptions(response.data.delivery_types);
        }
      } catch (error) {
        console.error('Failed to fetch shipping types:', error);
      }
    };
    getshippingType();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/fetch-customer-details', {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.code === 200) {
          setSelectedAddress({
            add1:
              response.data?.customer_data?.customer_addresses[0]?.add1 || '',
            add2:
              response.data?.customer_data?.customer_addresses[0]?.add2 || '',
            city:
              response.data?.customer_data?.customer_addresses[0]?.city || '',
            state:
              response.data?.customer_data?.customer_addresses[0]?.state || '',
            country:
              response.data?.customer_data?.customer_addresses[0]?.country ||
              '',
            pincode:
              response.data?.customer_data?.customer_addresses[0]?.pincode ||
              '',
          });
          setAddress(response.data?.customer_data?.customer_addresses);
          // console.log('====================================');
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (token) {
      const getCart = async () => {
        try {
          const response = await axios.get(getCartApi, {
            headers: {
              Authorization: token,
            },
          });
          if (response.data.code === 200) {
            setCartItems(response.data.cartItems);
            setTotalAmount(response?.data?.totalPrice);
          } else {
            showMessage({
              message: 'Error',
              description: response.data.message,
              type: 'error',
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getCart();
    } else {
      navigation.navigate(ScreenNames.LoginViaProtect);
    }
  }, [removed, token]);

  const handleAddressSave = newAddress => {
    setSelectedAddress({
      add1: newAddress.add1,
      add2: newAddress.add2,
      city: newAddress.city,
      state: newAddress.state,
      country: newAddress.country,
      pincode: newAddress.pincode,
    });
  };
  const handleShippingChnage = newShipping => {
    setSelectedShippingType(newShipping);
  };
  const handlePaymentChange = newPayemnt => {
    setSelectedPaymentType(newPayemnt);
  };

  const handleRemove = async (product_id, combination_id) => {
    try {
      const response = await axios.post(
        '/remove-from-cart',
        {
          product_id: product_id,
          combination_id: combination_id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.code === 200) {
        showMessage({
          message: response.data.message || 'Item removed from cart',
          type: 'success',
        });
        setRemoved(true);
      } else {
        showMessage({
          message: 'Error',
          description: response.data.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'Error',
        description: 'Failed to remove item from cart',
        type: 'error',
      });
    }
  };

  const handleProceed = async () => {
    // navigation.navigate(ScreenNames.PaymentSuccessful);
    if (total_paid_amount) {
      try {
        const res = await axios.post(
          '/create-razorpay-orderId',
          {
            amount: total_paid_amount * 100,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        if (res?.data?.code === 200) {
          console.log('====================================');
          console.log(res.data.data, 'w22');
          console.log('====================================');
          setRazordata(res.data.data);

          const {id, amount, currency} = res.data.data;
          const paidAmount = amount * 100;

          var options = {
            description: 'Purchase Description',
            image: 'https://kardify.in/images/logo.png',
            currency: currency,
            key: process.env.RAZORPAY_KEY_ID,
            amount: amount,
            name: 'Kardify',

            theme: {color: '#528FF0'},
          };
          if (razorData) {
            RazorpayCheckout.open(options)
              .then(data => {
                console.log('====================================');
                console.log(razorData, 'razordata');
                console.log(res.data.data, 'razordata new data');
                console.log('====================================');
                // handle success
                const allData = {
                  products: cartItems,
                  data: data,
                  address: selectedAddress,
                  shippingType: selectedShippingType,
                  paymentType: selectedPaymentType,
                  total_amount: total_paid_amount,
                  order_id: id,
                  razorData: razorData,
                };

                navigation.navigate(ScreenNames.PaymentSuccessful, {allData});
                console.log('Payment Successful:', data);
                showMessage({
                  message: 'Payment Successful',
                  description: 'Your order has been placed successfully',
                  type: 'success',
                });
              })
              .catch(error => {
                // handle failure
                console.error('Payment Failed:', error?.description.reason); // Log the detailed error
                showMessage({
                  message: 'Payment Failed',
                  description:
                    error?.description.reason ||
                    'An error occurred while processing payment',
                  type: 'danger',
                });
              });
          }
        }
      } catch (error) {
        console.error(error);
        showMessage({
          message: 'Payment Failed',
          description: 'An error occurred while processing payment',
          type: 'danger',
        });
      }
    }
  };

  const handleAddressChange = () => {
    navigation.navigate(ScreenNames.addressChange);
  };

  const handleShippingTypeChange = () => {
    setIsModalVisible(true);
  };
  const handlePaymentTypeChange = () => {
    setIsModalVisiblePayment(true);
  };

  const renderItem = data => {
    const item = data?.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => handleRemove(item?.product?.id, item?.combination_id)}
          style={{position: 'absolute', top: 5, right: 5}}>
          <CloseIcon name="close" size={20} color={Color.white} />
        </TouchableOpacity>

        <View style={styles.itemImageContainer}>
          <Image
            source={{uri: apis.baseImgUrl + item?.images[0]?.image_url}}
            style={styles.itemImage}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item?.product?.product_name}</Text>
          <Text style={{color: Color.white}}>{item?.product?.rating}</Text>

          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: Color.grey, fontSize: 20}}>
              ₹
              {item?.product?.discount_type === 'amount'
                ? item?.product?.default_price - item?.product?.discount
                : item?.product?.default_price -
                  (item?.product?.default_price * item?.product?.discount) /
                    100}
            </Text>
            {item?.product?.discount && (
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  color: Color.grey,
                  fontSize: 13,
                }}>
                M.R.P : ₹ {item?.product?.default_price}
              </Text>
            )}
            {item?.product?.discount && (
              <Text
                style={{
                  fontSize: 12,
                  color: Color.grey,
                }}>
                {item?.product?.discount_type === 'amount'
                  ? `( ₹${item?.product?.discount} off )`
                  : `(${item?.product?.discount}% off)`}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (!auth.token) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          height: SCREEN_HEIGHT,
        }}>
        <ImageBackground
          source={require('../../../assets/images/homeBg.png')}
          resizeMode="stretch"
          style={styles.background}>
          <Cmnhdr2 backIcon title="Wishlist" />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: Color.white, fontSize: 20, fontWeight: 'bold'}}>
              Please Login
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginVertical: 10,
            }}>
            <CustomButton
              title="Login"
              onPressButton={() =>
                navigation.navigate(ScreenNames.LoginViaProtect)
              }
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Checkout Page" />
        {/* <FullSearchBar /> */}
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* Shipping Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <View style={styles.addressContainer}>
              <Icon name="location-pin" size={20} color={Color.white} />
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{selectedAddress.add1}</Text>

                <Text style={styles.addressText}>
                  {selectedAddress.fullName}, {selectedAddress.buildingName},{' '}
                  {selectedAddress.landmark}, {selectedAddress.area},{' '}
                  {selectedAddress.city}, {selectedAddress.state},{' '}
                  {selectedAddress.pincode}, {selectedAddress.country}
                </Text>
              </View>
              <TouchableOpacity onPress={handleAddressChange}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Shipping Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Type</Text>
            <View style={styles.shippingTypeContainer}>
              <Text style={styles.shippingTypeText}>
                {selectedShippingType}
              </Text>
              <TouchableOpacity onPress={handleShippingTypeChange}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Payment Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Type</Text>
            <View style={styles.shippingTypeContainer}>
              <Text style={styles.shippingTypeText}>{selectedPaymentType}</Text>
              <TouchableOpacity onPress={handlePaymentTypeChange}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Order List Section */}
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={item => item.id.toLocaleString()}
              numColumns={1} // Display 2 items per row
              contentContainerStyle={{
                padding: 10,
                gap: 2,
                marginBottom: 50,
              }}
            />
          )}
        </ScrollView>
        {/* Checkout Button */}
        <View style={styles.checkoutButtonContainer}>
          {!isLoading && (
            <CustomButton
              title="Proceed to Payment"
              onPressButton={() => {
                handleProceed();
              }}
            />
          )}
        </View>
        <AddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddressChange={handleAddressSave}
          addresses={address}
        />
        <ShippingTypeModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          shippingOptions={shippingOptions}
          onShippingChange={handleShippingChnage}
        />
        <PaymentTypeModal
          visible={isModalVisiblePayemnt}
          onClose={() => setIsModalVisiblePayment(false)}
          shippingOptions={paymentOptions}
          onShippingChange={handlePaymentChange}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CheckoutPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkGrey, // Background color for the page
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey,
    backgroundColor: Color.lightGrey, // Background for each section
    marginBottom: 10, // Space between sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.darkGrey, // Address container background
    padding: 10,
    borderRadius: 8, // Rounded corners
  },
  addressDetails: {
    flex: 1,
    marginLeft: 10,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  addressText: {
    fontSize: 14,
    color: Color.grey,
  },
  changeText: {
    color: Color.red,
    fontWeight: 'bold',
    fontSize: 14,
  },
  shippingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Color.darkGrey, // Background for shipping type container
    borderRadius: 8, // Rounded corners
  },
  shippingTypeText: {
    fontSize: 16,
    color: Color.white,
  },
  orderList: {
    marginTop: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.darkGrey, // Order item background
    borderRadius: 8, // Rounded corners
    marginBottom: 10, // Space between order items
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Color.lightGrey,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  itemImageContainer: {
    width: 80, // Fixed width for image container
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 5,
  },
  checkoutButtonContainer: {
    padding: 20,
    backgroundColor: Color.darkGrey, // Background color for checkout button section
  },
  background: {
    height: '100%',
  },
});
