import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apis} from '../../../utils/api';
import {Color} from '../../../styles/Color';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../constants/Screens';

const width = Dimensions.get('screen').width;
const Brands = () => {
  const navigation = useNavigation();
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}>
        {brands &&
          brands?.map((ele, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    ScreenNames.productsList,
                    `brand_id=${ele?.id}`,
                  )
                }
                key={i}
                style={styles.subBrandView}>
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
                    style={{textAlign: 'center', color: Color.white}}>
                    {ele?.brand_name}
                  </Text>
                </View>
              </TouchableOpacity>
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
