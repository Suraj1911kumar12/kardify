import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../constants/Screens';

const CarFacility = props => {
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);

  const getOffers = useCallback(async () => {
    try {
      const res = await axios.get('/get-all-discounts-like-offer');
      if (res?.data?.code === 200) {
        setOffers(res.data.discounts);
      }
    } catch (error) {
      console.error('Error fetching offers:', error.message);
    }
  }, []);

  useEffect(() => {
    getOffers();
  }, [getOffers]);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.carair}
        onPress={() =>
          navigation.navigate(
            ScreenNames.productsList,
            `product_brand_id=${item?.id}`,
          )
        }>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: apis.baseImgUrl + item?.image}}
            style={styles.offerImage}
            resizeMode="cover"
            onError={() => setImgError(true)} // Optionally handle image errors
          />
        </View>
        <Text numberOfLines={1} style={styles.offerText}>
          {item.discount_name}
        </Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <View style={styles.carpropertiesbdy}>
      {offers.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={offers}
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.noOffersText}>No offers available</Text>
      )}
    </View>
  );
};

export default CarFacility;

const styles = StyleSheet.create({
  carpropertiesbdy: {
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 100,
  },
  carair: {
    margin: 2,
  },
  imageContainer: {
    height: 212,
    width: 180,
    borderRadius: 5,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerText: {
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,
  },
  flatList: {
    width: '100%',
    flex: 1,
  },
  contentContainer: {
    gap: 20,
  },
  noOffersText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
