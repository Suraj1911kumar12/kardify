import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import FullSearchBar from '../../component/FullSearchBar';
import {Color} from '../../styles/Color';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import {SCREEN_HEIGHT} from '../../styles/Size';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {addWishList, getWhishList} from '../../redux/slice/wishlist';

const {width} = Dimensions.get('screen');

const ProductListforFilter = props => {
  const auth = UseAuth();

  const selector = useSelector(state => state);

  const dispatch = useDispatch();
  const param = props.route.params;

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({}); // state to track loading of each image
  const [isWish, setisWish] = useState([]);

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${param}`);

      if (response.data.code === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    setisWish(selector?.wishList?.data);
  }, [isWish?.length, dispatch, selector?.wishList?.data]);

  const addWishListProduct = async id => {
    const cred = {
      token: auth.token,
      id: id,
    };

    try {
      // Dispatch addWishList and wait for it to complete
      await dispatch(addWishList(cred)).unwrap();

      // Dispatch getWhishList and wait for it to complete
      await dispatch(getWhishList(auth.token)).unwrap();

      // Optionally handle success here, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Optionally handle the error here, e.g., show an error message
    }
  };
  const removeFromWishList = useCallback(
    async id => {
      try {
        const res = await axios.post(
          `/remove-from-wishlist`,
          {product_id: id},
          {headers: {Authorization: auth.token}},
        );
        if (res?.data?.code === 200) {
          dispatch(getWhishList(auth.token)); // Refresh wishlist
          showMessage({
            message: res?.data?.message || 'Removed from wishlist',
            type: 'success',
          });
        } else {
          showMessage({
            message: res?.data?.message || 'Error removing from wishlist',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        showMessage({
          message: 'An error occurred while removing from wishlist.',
          type: 'danger',
        });
      }
    },
    [auth.token, dispatch],
  );

  const handleImageLoadStart = id => {
    setImageLoading(prevState => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleImageLoadEnd = id => {
    setImageLoading(prevState => ({
      ...prevState,
      [id]: false,
    }));
  };

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonTextSmall} />
    </View>
  );
  const renderFooter = () => <View style={{height: 20}} />;

  const renderItem = ({item, index}) => {
    // console.log(isWish, 'isWish');

    // Check if the item is in the wishlist
    const isInWishlist =
      Array.isArray(isWish) &&
      isWish?.some(wishItem => wishItem?.product_id === item.id);
    const isLastItem = index === products.length - 1;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.productdetails, {
            id: item?.id,
          })
        }
        style={styles.card}>
        {imageLoading[item?.id] && renderSkeletonLoader()}
        <Image
          source={{uri: apis.baseImgUrl + item?.images[0]?.image_url}}
          style={[styles.image]}
          resizeMode="cover"
          // onLoadStart={() => handleImageLoadStart(item?.id)}
          // onLoadEnd={() => handleImageLoadEnd(item?.id)}
        />
        {!imageLoading[item?.id] && (
          <View style={{gap: 6, padding: 6}}>
            <Text
              style={{color: Color.white}}
              numberOfLines={1} // Limits the text to one line and adds an ellipsis if it's too long
              ellipsizeMode="tail" // Adds ellipsis at the end if the text overflows
            >
              {item?.product_name}
            </Text>
            <Text style={{color: Color.white}}>
              <Icon name="star" size={20} color={Color.yellow} /> 4.9
            </Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: Color.white}}>
                ₹
                {item?.discount
                  ? item?.discount_type === 'amount'
                    ? item?.default_price - item?.discount
                    : item?.default_price -
                      (item?.default_price * item?.discount) / 100
                  : item?.default_price}
              </Text>
              <Text
                style={{
                  color: Color.grey,
                  opacity: 0.5,
                  textDecorationLine: 'line-through',
                }}>
                ₹{item?.default_price}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (!auth.token) {
              navigation.navigate(ScreenNames.LoginViaProtect);
            } else {
              if (isInWishlist) {
                removeFromWishList(item?.id);
              } else {
                addWishListProduct(item?.id);
              }
            }
          }}
          style={{
            position: 'absolute',
            top: 5,
            left: 5,
            padding: 6,
          }}>
          <Icon
            name={isInWishlist ? 'heart' : 'heart-outlined'}
            size={20}
            color={isInWishlist ? Color.yellow : Color.yellow}
          />
        </TouchableOpacity>
        {item?.discount && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: Color.yellow,
              borderRadius: 10,
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 8,
                color: Color.white,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              {item?.discount
                ? item?.discount_type === 'amount'
                  ? '₹ ' + item?.discount + ' off'
                  : item?.discount + '% off '
                : ''}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderNoData = () => {
    return <Text>No Data</Text>;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{flex: 1}}>
        <Cmnhdr2 backIcon title="Product Page" />
        <FullSearchBar />

        <ScrollView
          showsVerticalScrollIndicator={false} // Disable vertical scrollbar
          showsHorizontalScrollIndicator={false} // Disable horizontal scrollbar
          style={{paddingBottom: 10}}>
          {loading ? (
            <FlatList
              data={Array(6).fill({})}
              renderItem={renderSkeletonLoader}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
            />
          ) : products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              numColumns={2}
              contentContainerStyle={styles.contentContainer}
              ListFooterComponent={renderFooter} // Adds extra space at the bottom/ Add some spacing at the bottom
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 2,
                height: SCREEN_HEIGHT - 150,
              }}>
              <Text style={{color: Color.white, fontSize: 20}}>
                No Products
              </Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProductListforFilter;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
    margin: 4,
    paddingBottom: 4,
    // alignItems: 'center',
    gap: 8,
    position: 'relative',
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  skeletonContainer: {
    flex: 1,
    backgroundColor: Color.grey,
    borderRadius: 10,
    margin: 4,
    paddingBottom: 4,
    alignItems: 'center',
    gap: 8,
  },
  skeletonImage: {
    width: '100%',
    height: 100,
    backgroundColor: Color.darkGrey,
    borderRadius: 10,
  },
  skeletonText: {
    width: '80%',
    height: 20,
    backgroundColor: Color.darkGrey,
    borderRadius: 5,
  },
  skeletonTextSmall: {
    width: '50%',
    height: 15,
    backgroundColor: Color.darkGrey,
    borderRadius: 5,
  },
  contentContainer: {
    padding: 10,
    gap: 2,
    marginBottom: 50,
  },
  footer: {
    width: 20, // Adjust height as needed
  },
});
