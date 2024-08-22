import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import {AirbnbRating} from 'react-native-ratings';
import {Color} from '../../../styles/Color';

const Testimonials = () => {
  const [imgError, setImgError] = useState({});
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials();
  }, []);

  const getTestimonials = async () => {
    try {
      const res = await axios.get('/fetch-all-testimonials-customers');
      if (res.status === 200) {
        setTestimonials(res.data.testimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleImageError = useCallback(id => {
    setImgError(prevState => ({...prevState, [id]: true}));
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.cmnbdy}>
        <Image
          source={
            imgError[item.id]
              ? require('../../../../assets/images/icon.png')
              : {uri: apis.baseImgUrl + item?.profile_img}
          }
          resizeMode="cover"
          style={styles.profileImage}
          onError={() => handleImageError(item.id)}
        />

        <View style={styles.cmntxt}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        <AirbnbRating
          defaultRating={item?.rating}
          count={5}
          size={20}
          showRating={false}
          isDisabled={true}
        />

        <Text style={styles.customerName}>{item?.customer?.fullname}</Text>
      </View>
    ),
    [imgError, handleImageError],
  );

  return (
    <FlatList
      data={testimonials}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
      decelerationRate="fast"
    />
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  cmnbdy: {
    height: SCREEN_HEIGHT / 4,
    width: SCREEN_WIDTH / 1.25,
    marginBottom: 1,
    backgroundColor: '#1C1F22',
    marginLeft: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    padding: 10,
  },
  profileImage: {
    marginTop: 10,
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_HEIGHT / 10,
    borderRadius: SCREEN_HEIGHT / 20,
  },
  cmntxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 1.4,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 12,
    textAlign: 'center',
    color: Color.white,
  },
  customerName: {
    color: Color.white,
    marginTop: 5,
  },
});
