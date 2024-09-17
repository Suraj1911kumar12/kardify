import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Swiper from 'react-native-swiper';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import {AirbnbRating} from 'react-native-ratings';
import {Color} from '../../../styles/Color';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';

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
  const testimonials2 = [
    {
      id: 1,
      customer_id: 1,
      rating: 4.5,
      heading: 'Testimony',
      description: 'This is my Testimony',
      status: 1,
      createdAt: '2024-04-01T10:21:02.000Z',
      updatedAt: '2024-04-01T10:21:02.000Z',
      deletedAt: null,
      customer: {
        id: 1,
        fullname: 'Subham kumar jena',
        username: 'subham.kj@jurysoft.com',
        profile_img: null,
        phone: null,
        email: null,
        dob: null,
        gender: null,
        language: null,
        device_token: null,
        verified: 1,
        createdAt: '2024-03-26T09:45:44.000Z',
        updatedAt: '2024-08-27T06:50:44.000Z',
        deletedAt: null,
      },
    },
    {
      id: 2,
      customer_id: 1,
      rating: 4.5,
      heading: 'Testimony',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit hic odit obcaecati, earum, temporibus vitae cum ad dignissimos quam ex amet. Sed cum obcaecati, ratione voluptatibus quisquam, saepe aspernatur fuga fugiat voluptate, velit porro pariatur dicta suscipit odit. Cum deleniti earum ducimus non dolor consequatur eligendi architecto necessitatibus commodi explicabo.',
      status: 1,
      createdAt: '2024-04-01T10:21:02.000Z',
      updatedAt: '2024-04-01T10:21:02.000Z',
      deletedAt: null,
      customer: {
        id: 1,
        fullname: 'Subham kumar jena',
        username: 'subham.kj@jurysoft.com',
        profile_img: null,
        phone: null,
        email: null,
        dob: null,
        gender: null,
        language: null,
        device_token: null,
        verified: 1,
        createdAt: '2024-03-26T09:45:44.000Z',
        updatedAt: '2024-08-27T06:50:44.000Z',
        deletedAt: null,
      },
    },
  ];
  const handleImageError = useCallback(id => {
    setImgError(prevState => ({...prevState, [id]: true}));
  }, []);

  const renderItem = useCallback(
    item => (
      <View style={styles.card}>
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
        <View style={styles.textContainer}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <AirbnbRating
          defaultRating={item?.rating}
          count={5}
          size={20}
          showRating={false}
          isDisabled={true}
          starContainerStyle={styles.rating}
        />
        <Text style={styles.customerName}>{item?.customer?.fullname}</Text>
      </View>
    ),
    [imgError, handleImageError],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Testimonials</Text>
      <Swiper
        style={styles.wrapper}
        showsPagination={true}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        contentContainerStyle={styles.contentContainer}>
        {testimonials2.map(item => (
          <View key={item.id} style={styles.slide}>
            {renderItem(item)}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1CB2A',
  },
  header: {
    color: 'white',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    marginVertical: 15,
    textAlign: 'center',
  },
  wrapper: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH * 0.9,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '90%',
    width: '90%',
    backgroundColor: '#1C1F22',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_HEIGHT / 8,
    borderRadius: SCREEN_HEIGHT / 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Color.white,
  },
  textContainer: {
    height: 20,
    marginBottom: 15,
    width: '100%',
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: Color.white,
    paddingHorizontal: 10,
  },
  rating: {
    marginVertical: 10,
  },
  customerName: {
    fontSize: 16,
    color: Color.white,
    fontWeight: 'bold',
  },
  paginationStyle: {
    bottom: 10,
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDotStyle: {
    backgroundColor: Color.yellow,
  },
  contentContainer: {
    alignItems: 'center',
  },
});
