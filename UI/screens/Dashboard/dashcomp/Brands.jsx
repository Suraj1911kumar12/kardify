import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apis} from '../../../utils/api';

const width = Dimensions.get('screen').width;
const Brands = () => {
  const brandApi = apis.baseUrl + apis.brands;

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(brandApi);
      if (response.status === 200) {
        setBrands(response?.data?.brandName);
      }
    } catch (error) {
      console.error(error, 'error while fetching brand');
    }
  };

  // console.log(brands);

  const arr = [
    {id: 1, name: 'Exterior'},
    {id: 1, name: 'Interior'},
    {id: 1, name: 'AUDIO/VIDEO'},
    {id: 1, name: 'LIGHTS'},
    {id: 1, name: 'CAR CARE'},
    {id: 1, name: 'INSTALLATION'},
  ];
  return (
    <View style={styles.BrandMainView}>
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          lineHeight: 24,
          fontWeight: '500',
          marginVertical: 15,
          textAlign: 'center',
        }}>
        Brands
      </Text>
      <ScrollView horizontal={true}>
        {brands &&
          brands?.map((ele, i) => {
            return (
              <View key={i} style={styles.subBrandView}>
                <View style={styles.innerShow}>
                  <View
                    style={{
                      height: 55,
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      padding: 5,
                    }}>
                    <Image
                      source={{uri: apis.baseImgUrl + ele?.image_url}}
                      style={{width: '100%', height: 55, objectFit: 'contain'}}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{textAlign: 'center'}}>
                    {ele?.brand_name}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Brands;
const styles = StyleSheet.create({
  BrandMainView: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 'auto',
    flex: 1,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subBrandView: {
    height: 55,
    marginHorizontal: 2,
    width: width / 4,
    textAlign: 'center',
  },
  innerShow: {
    width: '100%',
    // borderColor: 'white',
    // borderWidth: 2,
  },
});
