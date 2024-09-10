import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../../../axios';
import Swiper from 'react-native-swiper';
import {apis} from '../../utils/api';
import {Color} from '../../styles/Color';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getBanners = async () => {
      try {
        const resp = await axios.get('/get-banners-customer');
        if (resp.status) {
          setBanners(resp.data.banners);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    getBanners();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {banners.map((banner, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                ScreenNames.productsList,
                `category_id=${banner?.category_id}&subcategory_id=${banner?.sub_category_id}`,
              )
            }
            key={index}
            style={styles.slide}>
            <Image
              source={{uri: apis.baseImgUrl + banner?.app_image_url}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    height: 200,
  },
  wrapper: {
    borderWidth: 2,
    borderColor: 'red',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Color.yellow,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    zIndex: 5,
  },
});
