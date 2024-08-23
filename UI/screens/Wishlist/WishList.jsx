import React, {useEffect, useState, useCallback} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Cmnhdr2 from '../../component/Cmnheader2';
import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from '../../styles/Color';
import {apis} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';

const WishList = () => {
  const navigation = useNavigation();
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const auth = UseAuth();

  const getWishList = async () => {
    try {
      const res = await axios.get('/get-all-wishlists', {
        headers: {
          Authorization: auth.token,
        },
      });
      if (res?.data?.code === 200) {
        setWishList(res?.data?.data);
        // showMessage({
        //   message: res?.data?.message || 'Wishlist fetched successfully.',
        //   type: 'success',
        // });
      } else {
        showMessage({
          message: res?.data?.message || 'No wishlist found.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.log('Error fetching wishlist:', error);
      showMessage({
        message: 'Error fetching wishlist.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWishList();
  }, [auth.token]);

  const removeFromWishList = useCallback(
    async id => {
      try {
        const res = await axios.post(
          `/remove-from-wishlist`,
          {product_id: id},
          {headers: {Authorization: auth.token}},
        );
        if (res?.data?.code === 200) {
          setWishList(prevWishlist =>
            prevWishlist.filter(item => item.id !== id),
          );
          getWishList();
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
    [auth.token],
  );

  const handleImageLoadStart = id => {
    setImageLoading(prev => ({...prev, [id]: true}));
  };

  const handleImageLoadEnd = id => {
    setImageLoading(prev => ({...prev, [id]: false}));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={`View details for ${item?.product?.product_name}`}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: item?.product?.id,
          })
        }
        style={styles.card}>
        <Image
          //   source={{
          //     uri: `${apis.baseImgUrl}${item?.product?.images[0]?.image_url}`,
          //   }}
          source={require('../../../assets/images/profile/profileimg.png')}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => handleImageLoadStart(item?.product?.id)}
          onLoadEnd={() => handleImageLoadEnd(item?.product?.id)}
        />
        {imageLoading[item?.product?.id] && (
          <ActivityIndicator
            style={styles.imageLoader}
            size="small"
            color={Color.white}
          />
        )}
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
              {item?.product?.default_price -
                (item?.product?.default_price * item?.product?.discount) / 100}
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

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonTextSmall} />
    </View>
  );

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
          {loading ? (
            <FlatList
              data={Array(6).fill({})}
              renderItem={renderSkeletonLoader}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
            />
          ) : wishlist.length > 0 ? (
            <FlatList
              data={wishlist}
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
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
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
});
