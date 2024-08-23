import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import FullSearchBar from '../../component/FullSearchBar';
import Icon from 'react-native-vector-icons/Entypo';
import {Color} from '../../styles/Color';
import CustomButton from '../../component/CustomButton'; // Assuming you have this component

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [selectedShippingType, setSelectedShippingType] =
    useState('Standard Shipping');

  const handleAddressChange = () => {
    // Logic to change the address
    setSelectedAddress('New Address'); // Example: Changing to a new address
  };

  const handleShippingTypeChange = () => {
    // Logic to change the shipping type
    setSelectedShippingType('Express Shipping'); // Example: Changing to express shipping
  };

  const renderItem = data => {
    const item = data?.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => dispatch(removeProduct(item))}
          style={{position: 'absolute', top: 5, right: 5}}>
          <Icon name="close" size={20} color={Color.white} />
        </TouchableOpacity>

        <View style={styles.itemImageContainer}>
          <Image
            source={{uri: apis.baseImgUrl + item?.images[0]?.image_url}}
            style={styles.itemImage}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>{item?.product?.product_name}</Text>
          <Text style={{color: Color.white}}> {item?.product?.rating}</Text>
          {/* <CustomBtn
            id={item?.product_id}
            quantity={item?.quantity}
            combId={item?.combination_id}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: Color.grey, fontSize: 20}}>
              ₹
              {item?.product?.default_price -
                (item?.product?.default_price * item?.product?.discount) / 100}
            </Text>
            {item?.product?.discount && (
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  color: Color.grey,
                  fontSize: 13,
                }}>
                M.R.P : ₹ {item?.product?.default_price}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  const cartData = [];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Checkout Page" />
        <FullSearchBar />
        <ScrollView>
          {/* Shipping Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <View style={styles.addressContainer}>
              <Icon name="location-pin" size={20} color={Color.white} />
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{selectedAddress}</Text>
                <Text style={styles.addressText}>
                  123 Main St, Anytown, USA 12345
                </Text>
              </View>
              <TouchableOpacity onPress={handleAddressChange}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Shipping Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Type</Text>
            <View style={styles.shippingTypeContainer}>
              <Text style={styles.shippingTypeText}>
                {selectedShippingType}
              </Text>
              <TouchableOpacity onPress={handleShippingTypeChange}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Order List Section */}
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toLocaleString()}
            numColumns={1} // Display 2 items per row
            contentContainerStyle={{
              padding: 10,
              gap: 2,
              marginBottom: 50,
            }}
          />
          {/* Checkout Button */}
          <View style={styles.checkoutButtonContainer}>
            <CustomButton title="Proceed to Payment" onPressButton={() => {}} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressDetails: {
    flex: 1,
    marginLeft: 10,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  addressText: {
    fontSize: 14,
    color: Color.grey,
  },
  changeText: {
    color: Color.red,
  },
  shippingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingTypeText: {
    fontSize: 16,
    color: Color.white,
  },
  orderList: {
    marginTop: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  orderItemName: {
    fontSize: 14,
    color: Color.white,
  },
  orderItemPrice: {
    fontSize: 14,
    color: Color.white,
  },
  checkoutButtonContainer: {
    padding: 20,
  },
});
