import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import {Color} from '../../styles/Color';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import CustomButton from '../../component/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderStatusLine from '../../component/OrderSts';
import {useNavigation} from '@react-navigation/native';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import {SCREEN_HEIGHT} from '../../styles/Size';
import {useDispatch} from 'react-redux';
import CouponAdd from '../checkout/CouponAdd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNames from '../../constants/Screens';
import BottomSheetModal from '../../component/BottomSheetModal';

const {height, width} = Dimensions.get('screen');

// import {Color} fro../../styles/Colorlor';
const MainCarts = () => {
  const auth = UseAuth();

  // console.log(auth.token);

  const getCartApi = apis.getCart;
  const navigation = useNavigation();
  const {token} = UseAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [priceData, setPriceData] = useState({
    totalPrice: 0,
    totalMrp: 0,
    discount: 0,
    tax: 0,
    finalPrice: 0,
  });
  const [totalData, setTotalData] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setSelectedCouponList] = useState([]);
  const getDataCart = async () => {
    if (auth.token) {
      try {
        const res = await axios.get(getCartApi, {
          headers: {
            Authorization: auth.token,
          },
        });
        if (res?.data?.code === 200) {
          setCartItems(res.data?.cartItems);
          setTotalData(res?.data?.cartItems?.length);
          setPriceData({
            totalPrice: res?.data?.totalPrice,
            totalMrp: res?.data?.totalNetPrice,
            discount: res?.data?.totalNetPrice - res?.data?.totalPrice,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const data = await AsyncStorage.getItem('cart');
        const cart = data ? JSON.parse(data) : [];
        setCartItems(cart);
      } catch (error) {
        console.error('Failed to retrieve cart data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  useEffect(() => {
    if (auth.token) {
      const getCoupon = async () => {
        try {
          const data = await axios.get('/get-coupons', {
            headers: {
              Authorization: auth.token,
            },
          });
          console.log('====================================');
          console.log('====================================');
          console.log(data.data);

          if (data.data.code === 200) {
            setSelectedCouponList(data.data.coupons);
          } else {
            console.error('Failed to retrieve coupon data:', error);
          }
        } catch (error) {
          console.error(
            'Failed to retrieve coupon data:',
            error.response.data.message,
          );
        }
      };
      getCoupon();
    }
  }, [auth.token]);

  // const handleProceedChecout = () => {

  useEffect(() => {
    getDataCart();
    // Set up the interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      getDataCart();
    }, 5000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [auth.token, totalData]);
  useEffect(() => {
    const localPriceData = () => {
      if (!auth.token) {
        let totalPrice = 0;
        let totalMrp = 0;
        let discount = 0;
        let tax = 0;
        let finalPrice = 0;
        cartItems.forEach(item => {
          totalMrp += item?.quantity * item?.default_price;

          discount +=
            item?.discount_type === 'amount'
              ? item?.discount * item?.quantity
              : (item?.default_price * item?.quantity * item?.discount) / 100;

          tax += item?.quantity * item?.tax;
          finalPrice += item?.quantity * item?.finalPrice;
          totalPrice +=
            item?.quantity * item?.default_price -
            (item?.discount_type === 'amount'
              ? item?.discount * item?.quantity
              : (item?.default_price * item?.quantity * item?.discount) / 100);
        });

        setPriceData({
          totalPrice,
          totalMrp,
          discount,
          tax,
          finalPrice,
        });
      }
    };

    if (!auth.token) {
      localPriceData();
    }
  }, [auth.token, cartItems]);

  const handleCouponSelect = coupon => {
    setSelectedCoupon(coupon);
  };
  const handleCoupunAdd = () => {
    setModalVisible(true);
  };

  const increseQuantity = async (id, combinationID) => {
    try {
      const res = await axios.post(
        `/cart-increament`,
        {
          product_id: id,
          combination_id: combinationID,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );
      if (res?.data?.code === 200) {
        showMessage({
          message: res?.data?.message || 'Quantity increased successfully',
          type: 'success',
        });
        getDataCart();
      }
    } catch (error) {
      showMessage({
        message:
          error.response.data.message || 'Error while increasing quantity',
        type: 'danger',
      });
    }
  };
  const decreseQuantity = async (id, combinationID) => {
    try {
      const res = await axios.post(
        `/cart-decreament`,
        {
          product_id: id,
          combination_id: combinationID,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );
      if (res?.data?.code === 200) {
        showMessage({
          message: res?.data?.message || 'Quantity increased successfully',
          type: 'success',
        });
        getDataCart();
      }
    } catch (error) {
      showMessage({
        message:
          error.response.data.message || 'Error while increasing quantity',
        type: 'danger',
      });
    }
  };
  const removeProduct = async (id, combinationID) => {
    try {
      const res = await axios.post(
        `/remove-from-cart`,
        {
          product_id: id,
          combination_id: combinationID,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );
      if (res?.data?.code === 200) {
        showMessage({
          message: res?.data?.message || 'Remove Product successfully',
          type: 'success',
        });
        getDataCart();
      }
    } catch (error) {
      showMessage({
        message:
          error.response.data.message || 'Error while increasing quantity',
        type: 'danger',
      });
    }
  };

  const PriceDetails = () => (
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>
        Price Details ({totalData > 0 && totalData} items)
      </Text>
      <View style={styles.hr} />
      <View style={styles.priceData}>
        <View style={styles.pData}>
          <Text style={styles.text}>Total MRP</Text>
          <Text style={styles.text}>Discount on MRP </Text>
          {token && <Text style={styles.text}>Coupon Discount</Text>}
          <Text style={styles.text}>Shipping Fee </Text>
        </View>
        <View style={[styles.pData]}>
          <Text style={styles.text}>₹ {priceData?.totalMrp}</Text>
          <Text style={{color: Color.green}}> ₹ {priceData?.discount}</Text>
          {token && (
            <Text style={styles.text}>
              <TouchableOpacity
                onPress={handleCoupunAdd}
                style={styles.addressChange}>
                {selectedCoupon ? (
                  <Text style={styles.addressTextChange}>{selectedCoupon}</Text>
                ) : (
                  <Text style={styles.addressTextChange}>Apply Coupan</Text>
                )}
              </TouchableOpacity>
            </Text>
          )}
          <Text style={{color: Color.green}}>Free </Text>
        </View>
      </View>
      <View style={styles.hr} />
      <View style={styles.priceData}>
        <View style={styles.pData}>
          <Text style={styles.text}>Total Price</Text>
        </View>
        <View style={styles.pData}>
          <Text style={styles.text}> ₹ {priceData?.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
  const LoadingSkeleton = () => {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.skeletonItem}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTextContainer}>
              <View style={styles.skeletonLine} />
              <View style={styles.skeletonLineShort} />
            </View>
          </View>
        ))}
      </View>
    );
  };
  const CustomBtn = ({id, combId, quantity}) => (
    <View style={styles.customBtnContainer}>
      <TouchableOpacity
        onPress={() => decreseQuantity(id, combId)}
        style={styles.btn}>
        <Text>-</Text>
      </TouchableOpacity>
      <View style={[styles.btn, {backgroundColor: Color.white}]}>
        <Text style={{color: Color.black}}>{quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => increseQuantity(id, combId)}
        style={styles.btn}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = data => {
    const item = data?.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => removeProduct(item?.product_id, item?.combination_id)}
          style={{position: 'absolute', top: 5, right: 5}}>
          <Icon name="close" size={20} color={Color.white} />
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
          <Text style={{color: Color.white}}> {item?.product?.rating}</Text>
          <CustomBtn
            id={item?.product_id}
            quantity={item?.quantity}
            combId={item?.combination_id}
          />
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
          </View>
          <View>
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleProceed = () => {
    if (isChecked && isChecked2) {
      // Proceed with the action
      console.log('All checkboxes are accepted');
      setIsModalVisible(false);
      navigation.navigate(ScreenNames.checkout);
    } else {
      alert('You must accept all terms and conditions to proceed.');
    }
  };
  const renderWithoutToken = data => {
    const item = data?.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={{position: 'absolute', top: 5, right: 5}}>
          <Text>
            <Icon name="close" size={20} color={Color.white} />
          </Text>
        </TouchableOpacity>

        <View style={styles.itemImageContainer}>
          <Image
            source={{uri: apis.baseImgUrl + item?.images[0]?.image_url}}
            style={styles.itemImage}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item?.product_name}</Text>
          {item?.rating && (
            <Text style={{color: Color.white}}> {item?.rating}</Text>
          )}
          <CustomBtn
            id={item?.product_id}
            quantity={item?.quantity}
            combId={item?.combination_id}
          />
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: Color.grey, fontSize: 20}}>
              ₹
              {item?.discount_type === 'amount'
                ? item?.default_price - item?.discount
                : item?.default_price -
                  (item?.default_price * item?.discount) / 100}
            </Text>
            {item?.discount && (
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  color: Color.grey,
                  fontSize: 13,
                }}>
                M.R.P : ₹ {item?.default_price}
              </Text>
            )}
          </View>
          <View>
            {item?.discount && (
              <Text
                style={{
                  fontSize: 12,
                  color: Color.grey,
                }}>
                {item?.discount_type === 'amount'
                  ? `( ₹${item?.discount} off )`
                  : `(${item?.discount}% off)`}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Cart" />
        <ScrollView style={{paddingBottom: 10, marginBottom: 60}}>
          <OrderStatusLine status="Cart" />
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {cartItems?.length > 0 ? (
                <>
                  <FlatList
                    data={cartItems}
                    renderItem={auth.token ? renderItem : renderWithoutToken}
                    keyExtractor={item => item?.id?.toLocaleString()}
                    numColumns={1} // Display 2 items per row
                    contentContainerStyle={{
                      padding: 10,
                      gap: 2,
                      marginBottom: 50,
                    }}
                  />
                  <PriceDetails />
                  <CustomButton
                    title="Proceed to Payment "
                    onPressButton={
                      () => {
                        setIsModalVisible(true);
                      }
                      // navigation.navigate(ScreenNames.checkout)
                    }
                  />
                </>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <Text style={{color: Color.white, fontSize: 20}}>
                    Your cart is empty
                  </Text>
                </View>
              )}
            </>
          )}
          <CouponAdd
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            coupons={coupons}
            onCouponSelect={handleCouponSelect}
          />
        </ScrollView>
        <BottomSheetModal
          modalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainCarts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    flex: 1,
    backgroundColor: Color.black,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  itemImage: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  addressText: {
    flex: 3,
    color: Color.white,
  },
  addressChange: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressTextChange: {
    color: Color.red,
    lineHeight: 22,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Color.lightBlack,
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
    position: 'relative',
    gap: 5,
    maxHeight: 344,
  },
  itemTitle: {
    color: Color.white,
    lineHeight: 16,
    fontWeight: '700',
    fontSize: 12,
  },
  itemImageContainer: {
    flex: 1,
    gap: 5,
  },
  itemTitleContainer: {
    flex: 2,
    gap: 4,
  },
  customBtnContainer: {
    flexDirection: 'row',
    width: 75,
    height: 25,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
  },
  btn: {
    width: 25,
    backgroundColor: Color.btnBlack,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    color: Color.white,
  },

  priceContainer: {
    marginHorizontal: 10,
    backgroundColor: Color.lightBlack,
    flex: 1,
    borderColor: Color.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 50,
    gap: 10,
  },
  priceText: {
    fontSize: 16,
    color: Color.white,
  },
  hr: {
    height: 1,
    backgroundColor: Color.black,
    width: '100%',
  },
  priceData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pData: {
    flex: 1,
    gap: 10,
    color: Color.white,
  },
  text: {
    color: Color.white,
  },
  skeletonContainer: {
    padding: 10,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Color.lightBlack,
    borderRadius: 10,
    padding: 10,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    backgroundColor: Color.grey,
    borderRadius: 10,
  },
  skeletonTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  skeletonLine: {
    width: '80%',
    height: 10,
    backgroundColor: Color.grey,
    borderRadius: 5,
    marginBottom: 5,
  },
  skeletonLineShort: {
    width: '60%',
    height: 10,
    backgroundColor: Color.grey,
    borderRadius: 5,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 2,
  },
  emptyCartText: {
    color: Color.white,
    fontSize: 18,
  },
  openModalButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 10,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  proceedButtonView: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  proceedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
