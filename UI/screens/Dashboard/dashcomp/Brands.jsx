import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import {Color} from '../../../styles/Color';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../constants/Screens';

const width = Dimensions.get('screen').width;

const Brands = () => {
  const navigation = useNavigation();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/fetch-product-brands-customer');
      if (response.status === 200) {
        setBrands(response?.data?.brandNames);
      }
    } catch (error) {
      console.error('Error while fetching brands:', error);
    }
  };

  const renderBrandItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenNames.productsList, `brand_id=${item?.id}`)
      }
      style={styles.subBrandView}>
      <View style={styles.innerShow}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: apis.baseImgUrl + item?.image_url}}
            style={styles.brandImage}
            resizeMode="contain"
          />
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.brandText}>
          {item?.brand_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.BrandMainView}>
      <Text style={styles.brandTitle}>Brands</Text>
      {brands.length > 0 ? (
        <FlatList
          data={brands}
          renderItem={renderBrandItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.noBrandsText}>No brands available</Text>
      )}
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  BrandMainView: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
  },
  subBrandView: {
    height: 75,
    marginHorizontal: 8,
    width: width / 4,
    textAlign: 'center',
  },
  innerShow: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    height: 55,
    justifyContent: 'center',
    padding: 5,
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandText: {
    textAlign: 'center',
    color: Color.white,
    marginTop: 5,
  },
  noBrandsText: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 16,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});
