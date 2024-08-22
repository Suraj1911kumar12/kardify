import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import ScreenNames from '../../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../../styles/Color';

const TopSellingCategories = () => {
  const navigation = useNavigation();
  const [topProduct, setTopProduct] = useState([]);

  const getTopProductApi = useCallback(async () => {
    try {
      const response = await axios.get('/fetch-top-selling-products');
      if (response.status === 200) {
        setTopProduct(response?.data?.products);
      }
    } catch (error) {
      console.error('Error on Top Product', error);
    }
  }, []);

  useEffect(() => {
    getTopProductApi();
  }, [getTopProductApi]);

  const renderTopProduct = ({item}) => (
    <View style={styles.productContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.productdetails, {id: item.id})
        }
        style={styles.boxView}>
        <Image
          source={{uri: apis.baseImgUrl + item?.images[0]?.image_url}}
          style={styles.productImage}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.valText}>
          {item?.product_name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.catHeader}>
        <Text style={styles.catText}>Top Selling Products</Text>
      </View>

      {topProduct.length > 0 ? (
        <FlatList
          data={topProduct}
          renderItem={renderTopProduct}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.noProductsText}>
          No top-selling products available at the moment.
        </Text>
      )}
    </View>
  );
};

export default TopSellingCategories;

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  catText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: 'white',
  },
  catHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productContainer: {
    marginBottom: 20,
    marginRight: 20,
    paddingVertical: 10,
  },
  boxView: {
    flex: 1,
    height: 85,
    width: 87,
    borderRadius: 30,
    backgroundColor: '#1C1F22',
    elevation: 1,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  valText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  noProductsText: {
    fontSize: 12,
    color: Color.white,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});
