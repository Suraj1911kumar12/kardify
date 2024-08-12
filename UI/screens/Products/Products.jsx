import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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

const {width} = Dimensions.get('screen');

const Products = props => {
  const param = props.route.params;
  console.log(param);

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({}); // state to track loading of each image

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get(`get-products-customer?${param}`);

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

  const renderItem = ({item}) => {
    return (
      <>
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
                  {item?.default_price -
                    (item?.default_price * item?.discount) / 100}
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
        </TouchableOpacity>
      </>
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
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
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
              <Text style={{color: Color.white, fontSize: 20}}>No data</Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
    margin: 4,
    paddingBottom: 4,
    // alignItems: 'center',
    gap: 8,
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
});
