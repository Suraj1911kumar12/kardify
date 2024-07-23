import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {apis} from '../../../utils/api';
const CarFacility = props => {
  const getDataApi = apis.baseUrl + apis.offers;

  const [offers, setOffers] = useState([]);

  const getOffers = useCallback(async () => {
    try {
      const res = await axios.get(getDataApi);
      setOffers(res.data.discounts);
    } catch (error) {
      console.error('This is error', error.message);
    }
  }, []);

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <View style={styles.carpropertiesbdy}>
      <FlatList
        horizontal
        data={offers}
        style={{width: '100%', flex: 1}}
        contentContainerStyle={{gap: 20}}
        renderItem={({item}) => (
          <View style={styles.carair}>
            <View style={{height: 212, width: 180}}>
              <Image
                source={{uri: apis.baseImgUrl + item?.image}}
                style={{width: '100%', height: '100%', borderRadius: 5}}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                color: '#ffffff',
                marginTop: 10,
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 13,
              }}>
              {item.discount_name}
            </Text>
          </View>
        )}
      />
      {/* <View style={{flex: 1}} /> */}
    </View>
  );
};

export default CarFacility;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  carpropertiesbdy: {
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17181A',
    flexDirection: 'row',
  },
  carair: {
    margin: 2,
    // marginRight: 50,
  },
});
