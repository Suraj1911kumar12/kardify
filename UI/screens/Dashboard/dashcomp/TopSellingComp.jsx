import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {apis} from '../../../utils/api';
import ScreenNames from '../../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
const TopSellingCategories = props => {
  const navigation = useNavigation();

  const topProductApi = apis.baseUrl + apis.topProduct;

  const [topProduct, setTopProduct] = useState([]);

  const getTopProductApi = useCallback(async () => {
    try {
      const response = await axios.get(topProductApi);
      if (response.status === 200) {
        setTopProduct(response?.data?.products);
      }
    } catch (error) {
      console.log(error, 'Error on Top Product');
    }
  }, []);

  useEffect(() => {
    getTopProductApi();
  }, []);

  return (
    <View style={{width: '95%', alignSelf: 'center', marginBottom: 20}}>
      <View style={styles.catHeader}>
        <Text style={styles.catText}>Top Selling Products</Text>
      </View>

      <ScrollView horizontal={true}>
        {topProduct &&
          topProduct?.map((ele, i) => {
            return (
              <View
                key={i}
                style={{
                  marginBottom: 20,
                  marginRight: 20,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ScreenNames.productdetails, {
                      id: ele.id,
                    })
                  }
                  style={styles.boxView}>
                  <Image
                    source={{uri: apis.baseImgUrl + ele?.images[0]?.image_url}}
                    style={{height: '100%', width: '100%', borderRadius: 30}}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.valText}>
                    {ele?.product_name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default TopSellingCategories;
const styles = StyleSheet.create({
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
  boxView: {
    flex: 1,
    height: 85,
    width: 87,
    borderRadius: 30,
    backgroundColor: '#1C1F22',
    elevation: 1,
  },
  valText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  viewAllBtn: {
    alignSelf: 'center',
    borderRadius: 20,
    height: 42,
    width: 161,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
