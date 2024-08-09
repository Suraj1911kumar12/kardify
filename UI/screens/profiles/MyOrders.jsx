import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import CustomTab from '../../component/CustomTab';
import {UseAuth} from '../../context/AuthContext';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import {Color} from '../../styles/Color';
// import CustomButton from '../../component/CustomButton';

const MyOrders = () => {
  const auth = UseAuth();

  const [selected, setSelected] = useState(0);

  const [orders, setOrders] = useState([]);

  const arr = [
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
    {
      date: '21/08/23',
      time: '12:15AM',
      status: 'Progress',
      type: 'Car',
      price: '3500',
      totalItem: 1,
      img: 'https://media.istockphoto.com/id/1933752815/photo/modern-interior-of-living-room-with-leather-armchair-on-wood-flooring-and-dark-blue-wall.webp?b=1&s=170667a&w=0&k=20&c=-eVUYIBkyuOjUkHthYL0UR2ojC_1s64xoLsxF9AJoMM=',
    },
  ];

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get(apis.getOrder, {
        headers: {
          Authorization: auth.token,
        },
      });
      if (response.status === 200) {
        // console.log('This is Orders', response.data.orders);
        setOrders(response?.data?.orders);
      }
    } catch (error) {
      console.log('Error fetching orders', error);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.orderContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <Text style={{color: '#fff'}}>
              {item?.date} - {item?.time}
            </Text>
            <Text>{item?.status}</Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            <Image
              source={{uri: item?.img}}
              alt="order Image"
              height={80}
              width={80}
              style={styles.image}
            />
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Text style={styles.text}>{item?.type}</Text>
                <Text style={styles.text}>₹ {item?.price}</Text>
              </View>
              <View style={{width: 2, backgroundColor: Color.white}} />
              <View>
                <Text style={styles.text}>Total Item(s)</Text>
                <Text style={styles.text}>{item?.totalItem} item (s)</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Text style={{color: Color.red}}>Cancel The Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="My Orders" />
        <CustomTab selected={selected} setSelected={setSelected} />
        <ScrollView style={{paddingBottom: 10}}>
          {/* <View style={styles.cardContainer}> */}

          <FlatList
            data={orders?.length > 0 ? orders : arr}
            renderItem={renderItem}
            keyExtractor={item => item.toLocaleString()}
            numColumns={1} // Display 1 items per row
            contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  orderContainer: {
    minHeight: 100,
    backgroundColor: Color.lightBlack,
    margin: 10,
    elevation: 5,
    borderRadius: 20,
    flex: 1,
    color: Color.white,
    padding: 10,
    gap: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    flex: 1,
  },
  text: {
    color: Color.white,
    fontSize: 16,
  },
});
