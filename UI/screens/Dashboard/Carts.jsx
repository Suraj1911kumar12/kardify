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
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import {Color} from '../../styles/Color';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import CustomButton from '../../component/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderStatusLine from '../../component/OrderSts';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, removeProduct} from '../../redux/slice/cartSlice';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import {SCREEN_HEIGHT} from '../../styles/Size';

const Carts = () => {
  const auth = UseAuth();

  const addedData = useSelector(state => state);
  const dispatch = useDispatch();
  const address = addedData?.address;

  const [priceData, setPriceData] = useState({
    totalPrice: 0,
    totalMrp: 0,
    discount: 0,
    tax: 0,
    finalPrice: 0,
  });
  // console.log(address,'address');

  const navigation = useNavigation();

  const getCartApi = apis.getCart;

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(getCartApi, {
        headers: {
          Authorization: auth.token,
        },
      });
      if (res?.data?.code === 200) {
        setCartData(res?.data?.cartItems);
        dispatch(addProduct(res?.data?.cartItems));

        setPriceData({
          totalPrice: res?.data?.totalPrice,
          totalMrp: res?.data?.totalNetPrice,
          discount: res?.data?.totalNetPrice - res?.data?.totalPrice,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  useEffect(() => {
    const fetchData = async () => {
      await getDataCart();
    };
    fetchData();
  }, [getDataCart]);
  const updateCartData = () => {
    getDataCart(); // Fetch updated cart data
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
        updateCartData();
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
        updateCartData();
      }
    } catch (error) {
      showMessage({
        message:
          error.response.data.message || 'Error while increasing quantity',
        type: 'danger',
      });
    }
  };

  const renderItem = data => {
    const item = data?.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => dispatch(removeProduct(item))}
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
              {item?.product?.default_price -
                (item?.product?.default_price * item?.product?.discount) / 100}
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
        </View>
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

  const PriceDetails = () => (
    <View style={styles.priceContainer}>
      <Text style={styles.priceText}>Price Details (3 items)</Text>
      <View style={styles.hr} />
      <View style={styles.priceData}>
        <View style={styles.pData}>
          <Text style={styles.text}>Total MRP</Text>
          <Text style={styles.text}>Discount on MRP </Text>
          <Text style={styles.text}>Coupon Discount</Text>
          <Text style={styles.text}>Shipping Fee </Text>
        </View>
        <View style={[styles.pData]}>
          <Text style={styles.text}>₹ {priceData?.totalMrp}</Text>
          <Text style={{color: Color.green}}> ₹ {priceData?.discount}</Text>
          <Text style={styles.text}>
            <TouchableOpacity style={styles.addressChange}>
              <Text style={styles.addressTextChange}>Apply Coupan</Text>
            </TouchableOpacity>
          </Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Cart" />
        <ScrollView style={{paddingBottom: 10, marginBottom: 60}}>
          <OrderStatusLine status="Address" />
          {address?.length > 0 && (
            <View style={styles.address}>
              <Text style={styles.addressText}>
                Deliver to :
                {`${address[0]?.area},${address[0]?.city},${address[0]?.landmark},${address[0]?.state},`}
              </Text>
              <TouchableOpacity style={styles.addressChange}>
                <Text style={styles.addressTextChange}>Change</Text>
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <LoadingSkeleton />
          ) : cartData.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>No cart data available</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toLocaleString()}
                numColumns={1} // Display 2 items per row
                contentContainerStyle={{
                  padding: 10,
                  gap: 2,
                  marginBottom: 50,
                }}
              />
              <PriceDetails />
              <CustomButton
                title="Proceed to checkout "
                onPressButton={() => navigation.navigate(ScreenNames.checkout)}
              />
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Carts;

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
});
