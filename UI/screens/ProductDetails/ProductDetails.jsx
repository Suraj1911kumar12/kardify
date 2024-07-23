import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import {SCREEN_HEIGHT, SCREEN_WIDTH, DEVICE_HEIGHT} from '../../styles/Size';
import {Color} from '../../styles/Color';
import axios from 'axios';
import {apis} from '../../utils/api';
import RenderHTmlValue from '../../component/RenderHTmlValue';
import RenderHTML from 'react-native-render-html';
import CustomButton from '../../component/CustomButton';

const ProductDetails = ({route, navigation}) => {
  const {id} = route.params;
  const {width} = useWindowDimensions();

  const [productDetail, setProductDetail] = useState([]);

  const productApi = apis.baseUrl + `/get-products-customer?product_id=${id}`;

  const getProductDetails = useCallback(async () => {
    try {
      const res = await axios.get(productApi);
      console.log('wow', res.data);
      setProductDetail(res?.data?.products);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProductDetails();
  }, []);

  const renderItemDetails = ({item}) => (
    <View style={{flex: 1, minHeight: SCREEN_HEIGHT, padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 200,
        }}>
        {item?.images?.map(image => (
          <Image
            style={{borderRadius: 10, width: '100%'}}
            source={{uri: apis.baseImgUrl + image.image_url}}
          />
        ))}
      </View>
      <View style={{flex: 1, gap: 10, marginVertical: 20}}>
        <View>
          <Text style={{fontWeight: 'bold'}}>Description : </Text>
          <Text style={{paddingHorizontal: 15, paddingVertical: 5}}>
            <RenderHTML
              contentWidth={width}
              // source={() => source(item?.product_desc)}
              source={{
                html: `${item?.product_desc}`,
              }}
            />
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>Specification: : </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 30,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: 'transparent', borderColor: Color.yellow},
          ]}>
          <Text style={[styles.text]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.text]}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Cmnhdr2 backIcon title="Product Details" />
        <View style={styles.detailContainer}>
          <View style={styles.innerContainer}>
            <FlatList data={productDetail} renderItem={renderItemDetails} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  detailContainer: {
    margin: 10,
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    borderRadius: 10,
  },
  configData: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Color.white,
    fontSize: SCREEN_HEIGHT / 45,
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  button: {
    width: SCREEN_WIDTH / 1.35,
    flex: 1,
    height: SCREEN_HEIGHT / 18,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#424750',
    backgroundColor: Color.yellow,
  },
});
