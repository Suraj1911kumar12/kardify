import {
  Button,
  Dimensions,
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
import {showMessage} from 'react-native-flash-message';
import SkeletonLoader from '../../component/SkeletonLoader';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

const screenHeight = Dimensions.get('window').height;

const MyOrders = () => {
  const auth = UseAuth();
  const {token} = auth;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [orders, setOrders] = useState([]);
  const [trackOrder, setTrackOrder] = useState(null); // For tracking selected order

  const getApi = apis.getOrder;

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(getApi, {
        headers: {
          Authorization: auth.token,
        },
      });
      const orders = response?.data?.orders;

      const filteredOrders =
        selected === 0 ? orders : orders.filter(e => e?.id === 5);

      setOrders(filteredOrders);
    } catch (error) {
      console.log('Error fetching orders', error);
    } finally {
      setIsLoading(false);
    }
  }, [auth.token, selected]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const openTrackOrderModal = order => {
    setTrackOrder(order); // Set selected order for tracking
    setModalVisible(true);
  };

  const closeTrackOrderModal = () => {
    setTrackOrder(null);
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    const statusColors = {
      1: Color.orange,
      2: Color.green,
      3: Color.yellow,
      4: Color.green,
      5: Color.green,
      6: Color.red,
      7: Color.gray,
      8: Color.lightGray,
      9: Color.darkRed,
      10: Color.darkGray,
      11: Color.darkGray,
      12: Color.red,
      13: Color.orange,
    };
    const statusColor = statusColors[item?.order_status?.id];

    return (
      <TouchableOpacity key={item?.id} onPress={() => setModalVisible(true)}>
        <View style={styles.orderContainer}>
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row', gap: 2}}>
              <Text style={{color: '#fff'}}>
                {new Date(item?.createdAt).toLocaleDateString('en-GB')} -
              </Text>
              <Text style={{color: '#fff'}}>
                {new Date(item?.createdAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
            </View>

            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: '#ECFDF3',
                borderRadius: 50,
              }}>
              <Text style={{color: statusColor}}>
                {item?.order_status?.status_name}
              </Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                // key={data?.product?.images[0]?.image_url}
                source={{
                  uri:
                    apis.baseImgUrl +
                    item?.order_details[0]?.product?.images[0]?.image_url,
                }}
                style={styles.image}
              />
            </View>

            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.text}>{item?.order_id}</Text>
                <Text style={styles.text}>₹ {item?.total_paid_amount}</Text>
              </View>
              <View style={styles.separator} />
              <View>
                <Text style={styles.text}>Total Item(s)</Text>
                <Text style={styles.text}>{item?.totalItem} item(s)</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text style={{color: Color.red}}>Cancel The Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openTrackOrderModal(item)}>
              <Text style={{color: Color.green}}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const formatDate = dateString => {
    const date = new Date(dateString);

    // Format the date
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date,
    );

    return formattedDate;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="My Orders" />
        <CustomTab
          cData={orders?.length > 0 ? orders?.length : ''}
          pData={orders.filter(e => e?.id === 5)?.length}
          selected={selected}
          setSelected={setSelected}
        />
        <ScrollView style={{paddingBottom: 10}}>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item?.id.toLocaleString()}
              numColumns={1}
              contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
            />
          )}
        </ScrollView>

        {/* Track Order Bottom Sheet */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeTrackOrderModal}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.sheetTitle}>Delivered By Kardify</Text>
            {/* <Text style={styles.sheetTitle}>Tracking Id : (123456789) </Text> */}

            {trackOrder && (
              <View>
                <Text style={styles.sheetText}>
                  Order ID: {trackOrder?.order_id}
                </Text>

                <Text style={styles.sheetText}>
                  Total Amount: ₹ {trackOrder?.total_paid_amount}
                </Text>
                {trackOrder?.order_status_logs?.map(e => (
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{
                        color: Color.white,
                        fontSize: 16,
                        marginVertical: 5,
                      }}>
                      {formatDate(e?.createdAt)}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        justifyContent: 'space-between',
                        width: '100%',
                        height: 40,
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            marginVertical: 5,
                          }}>
                          {new Date(
                            e?.order_status?.updatedAt,
                          ).toLocaleTimeString()}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          width: 5,
                          borderRadius: 5,
                          backgroundColor: Color.yellow,
                        }}
                      />
                      <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            marginVertical: 5,
                          }}>
                          {e?.order_status?.status_name}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.sheetButton}
              onPress={closeTrackOrderModal}>
              <Icon name="close" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    color: Color.white,
    fontSize: 16,
  },
  separator: {
    width: 2,
    backgroundColor: Color.white,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bottomSheetContent: {
    backgroundColor: Color.lightBlack,
    padding: 16,
    height: screenHeight * 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    paddingTop: 60,
  },
  sheetTitle: {
    fontSize: 18,
    color: Color.white,
    marginBottom: 10,
    fontWeight: '600',
  },
  sheetText: {
    color: Color.grey,
    marginVertical: 5,
  },
  sheetButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    right: 10,
    top: 0,
    color: 'white',
  },
  sheetButtonText: {
    color: Color.white,
    fontSize: 16,
  },
});
