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
import axios from 'axios';
import {apis} from '../../utils/api';
import CustomButton from '../../component/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderStatusLine from '../../component/OrderSts';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
import {useDispatch, useSelector} from 'react-redux';
import {removeProduct} from '../../redux/slice/cartSlice';

const Carts = () => {
  const addedData = useSelector(state => state);
  const dispatch = useDispatch();
  const address = addedData?.address;
  // console.log(address,'address');

  const navigation = useNavigation();

  const getCartApi = apis.baseUrl + apis.getCart;

  const [addBtn, setAddBtn] = useState(1);
  const [cartData, setCartData] = useState([]);

  const getDataCart = useCallback(async () => {
    try {
      const res = await axios.get(getCartApi);
      // console.log(res?.data?.carts);
      // setCartData(res?.data?.carts);
    } catch (error) {
      console.log(error, 'Error while getting carts values');
    }
  }, []);

  useEffect(() => {
    getDataCart();
    setCartData(addedData.item);
  }, [addedData.item, dispatch]);

  const dummyData = [
    {
      id: 1,
      title: 'Decorative Shark Fin Carbon Fiber Finish Antenna-3',
      rating: 4.3,
      price: 999,
      mrp: 2205,
      image: require('../../../assets/images/CarSection/carwheel.png'),
    },
    {
      id: 2,
      title: 'Decorative Shark Fin Carbon Fiber Finish Antenna-3',
      rating: 4.3,
      price: 999,
      mrp: 2205,
      image: require('../../../assets/images/CarSection/carwheel.png'),
    },
    {
      id: 3,
      title: 'Decorative Shark Fin Carbon Fiber Finish Antenna-3',
      rating: 4.3,
      price: 999,
      mrp: 2205,
      image: require('../../../assets/images/CarSection/carwheel.png'),
    },
  ];

  const renderItem = ({item}) => (
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
          resizeMode="cover"
        />
      </View>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>{item?.product_name}</Text>
        <Text style={{color: Color.white}}> {item.rating}</Text>
        <CustomBtn />
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            gap: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: Color.grey, fontSize: 20}}>₹ {item.price}</Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              color: Color.grey,
              fontSize: 13,
            }}>
            M.R.P : {item.mrp}.00
          </Text>
        </View>
      </View>
    </View>
  );
  const CustomBtn = () => (
    <View style={styles.customBtnContainer}>
      <TouchableOpacity style={styles.btn}>
        <Text>-</Text>
      </TouchableOpacity>
      <View style={[styles.btn, {backgroundColor: Color.white}]}>
        <Text style={{color: Color.black}}>{addBtn}</Text>
      </View>
      <TouchableOpacity style={styles.btn}>
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
          <Text style={styles.text}>₹ 8,000</Text>
          <Text style={styles.text}> ₹ 1,080</Text>
          <Text style={styles.text}>
            <TouchableOpacity style={styles.addressChange}>
              <Text style={styles.addressTextChange}>Apply Coupan</Text>
            </TouchableOpacity>
          </Text>
          <Text style={styles.text}>Free </Text>
        </View>
      </View>
      <View style={styles.hr} />
      <View style={styles.priceData}>
        <View style={styles.pData}>
          <Text style={styles.text}>Total MRP</Text>
        </View>
        <View style={styles.pData}>
          <Text style={styles.text}> ₹ 8,000</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Cart" />
        <ScrollView style={{paddingBottom: 10, marginBottom: 60}}>
          <OrderStatusLine status="Address" />
          {address ? (
            <View style={styles.address}>
              <Text style={styles.addressText}>
                Deliver to :
                {`${address[0]?.area},${address[0]?.city},${address[0]?.landmark},${address[0]?.state},`}
              </Text>
              <TouchableOpacity style={styles.addressChange}>
                <Text style={styles.addressTextChange}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.address}>
              <Text style={styles.addressText}>
                Deliver to : Shivani Patil, 585102 Plot no 92 corporation layout
              </Text>
              <TouchableOpacity style={styles.addressChange}>
                <Text style={styles.addressTextChange}>Change</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toLocaleString()}
            numColumns={1} // Display 2 items per row
            contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
          />
          <PriceDetails />
          <CustomButton
            title="Proceed to checkout "
            onPressButton={() => navigation.navigate(ScreenNames.checkout)}
          />
        </ScrollView>
        {/* <View> */}
        {/* </View> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Carts;

const styles = StyleSheet.create({
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
  },
  itemTitle: {
    flex: 1,
    color: Color.white,
    lineHeight: 16,
    fontSize: 12,
  },
  itemImageContainer: {
    flex: 1,
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
});
