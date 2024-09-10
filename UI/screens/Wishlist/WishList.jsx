import React, {useEffect, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Cmnhdr2 from '../../component/Cmnheader2';
import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from '../../styles/Color';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getWhishList} from '../../redux/slice/wishlist';
import {SCREEN_HEIGHT} from '../../styles/Size';
import ScreenNames from '../../constants/Screens';
import CustomButton from '../../component/CustomButton';
import {apis} from '../../utils/api';

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.wishList);
  const auth = UseAuth();
  // console.log('====================================');
  // console.log(auth.token);
  // console.log('====================================');

  useEffect(() => {
    if (!auth.token) {
      navigation.navigate(ScreenNames.LoginViaProtect);
      showMessage({
        message: 'Please log in to access this screen.',
        type: 'danger',
      });
    } else {
      dispatch(getWhishList(auth.token));
    }
  }, [auth.token, dispatch, navigation]);

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
    // Handling image load start can be kept or removed as per your need
  };

  const handleImageLoadEnd = id => {
    // Handling image load end can be kept or removed as per your need
  };
  const renderItem = ({item, index}) => {
    const isLastItem = index === selector.data.length - 1;

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={`View details for ${item?.product?.product_name}`}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: item?.product?.id,
          })
        }
        style={[
          styles.card,
          isLastItem && styles.lastCard, // Optional style if needed
          selector.data.length === 1 && styles.fullWidthCard, // Add a style for single item
        ]}>
        <Image
          source={{uri: apis.baseImgUrl + item?.product?.images[0]?.image_url}}
          style={[styles.image]}
          resizeMode="cover"
          // onLoadStart={() => handleImageLoadStart(item?.id)}
          // onLoadEnd={() => handleImageLoadEnd(item?.id)}
        />
        {/* <Image
          source={require('../../../assets/images/profile/profileimg.png')}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => handleImageLoadStart(item?.product?.id)}
          onLoadEnd={() => handleImageLoadEnd(item?.product?.id)}
        /> */}

        <View style={{gap: 6, padding: 6}}>
          <Text style={{color: 'white'}} numberOfLines={1} ellipsizeMode="tail">
            {item?.product?.product_name}
          </Text>
          <Text style={{color: 'white'}}>
            <Icon name="star" size={20} color="yellow" /> 4.9
          </Text>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{color: 'white'}}>
              ₹
              {item?.product?.discount_type === 'amount'
                ? item?.product?.default_price - item?.product?.discount
                : item?.product?.default_price -
                  (item?.product?.default_price * item?.product?.discount) /
                    100}
            </Text>
            <Text
              style={{
                color: 'grey',
                opacity: 0.5,
                textDecorationLine: 'line-through',
              }}>
              ₹{item?.product?.default_price}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={`Remove ${item?.product?.product_name} from wishlist`}
          onPress={() => removeFromWishList(item?.product_id)}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            padding: 6,
          }}>
          <Icon name="heart" size={20} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // const renderItem = ({item, index}) => {
  //   const isLastItem = index === selector.data.length - 1;

  //   return (
  //     <TouchableOpacity
  //       accessible={true}
  //       accessibilityLabel={`View details for ${item?.product?.product_name}`}
  //       onPress={() =>
  //         navigation.navigate('ProductDetails', {
  //           id: item?.product?.id,
  //         })
  //       }
  //       style={[styles.card, isLastItem && styles.lastCard]}>
  //       <Image
  //         source={require('../../../assets/images/profile/profileimg.png')}
  //         style={styles.image}
  //         resizeMode="cover"
  //         onLoadStart={() => handleImageLoadStart(item?.product?.id)}
  //         onLoadEnd={() => handleImageLoadEnd(item?.product?.id)}
  //       />

  //       <View style={{gap: 6, padding: 6}}>
  //         <Text style={{color: 'white'}} numberOfLines={1} ellipsizeMode="tail">
  //           {item?.product?.product_name}
  //         </Text>
  //         <Text style={{color: 'white'}}>
  //           <Icon name="star" size={20} color="yellow" /> 4.9
  //         </Text>
  //         <View style={{flexDirection: 'row', gap: 5}}>
  //           <Text style={{color: 'white'}}>
  //             ₹
  //             {item?.product?.discount_type === 'amount'
  //               ? item?.product?.default_price - item?.product?.discount
  //               : item?.product?.default_price -
  //                 (item?.product?.default_price * item?.product?.discount) /
  //                   100}
  //           </Text>
  //           <Text
  //             style={{
  //               color: 'grey',
  //               opacity: 0.5,
  //               textDecorationLine: 'line-through',
  //             }}>
  //             ₹{item?.product?.default_price}
  //           </Text>
  //         </View>
  //       </View>
  //       <TouchableOpacity
  //         accessible={true}
  //         accessibilityLabel={`Remove ${item?.product?.product_name} from wishlist`}
  //         onPress={() => removeFromWishList(item?.product_id)}
  //         style={{
  //           position: 'absolute',
  //           top: 5,
  //           right: 5,
  //           padding: 6,
  //         }}>
  //         <Icon name="heart" size={20} color="red" />
  //       </TouchableOpacity>
  //     </TouchableOpacity>
  //   );
  // };

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonTextSmall} />
    </View>
  );

  if (!auth.token) {
    return (
      <SafeAreaView style={styles.container}>
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
              No Product
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
        style={styles.background}>
        <Cmnhdr2 backIcon title="Wishlist" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{paddingBottom: 10}}>
          {selector?.loading ? (
            <FlatList
              data={Array(6).fill({})}
              renderItem={renderSkeletonLoader}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
            />
          ) : selector?.data?.length > 0 ? (
            <FlatList
              data={selector.data}
              renderItem={renderItem}
              keyExtractor={item => item?.product?.id?.toString()}
              numColumns={2}
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: SCREEN_HEIGHT - 150,
              }}>
              <Text style={{color: Color.white, fontSize: 20}}>No Items</Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WishList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
  },
  card: {
    flex: 1,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
    margin: 4,
    paddingBottom: 4,
    gap: 8,
    position: 'relative',
    // Default width for items
    maxWidth: '48%', // Adjust this if needed
  },
  singleItem: {
    // Style for single item
    maxWidth: '100%',
    marginHorizontal: 0, // Adjust as needed
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageLoader: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
  lastCard: {
    marginBottom: 20,
  },
  skeletonContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
  },
  skeletonImage: {
    height: 150,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  skeletonText: {
    height: 20,
    marginTop: 8,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  skeletonTextSmall: {
    height: 14,
    marginTop: 6,
    backgroundColor: '#444',
    borderRadius: 10,
    width: '50%',
  },
});
