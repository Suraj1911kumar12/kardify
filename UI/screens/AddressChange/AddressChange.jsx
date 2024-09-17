import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../styles/Color';
import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {setMainAddress} from '../../redux/slice/MainAddressSlice';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
const {height, width} = Dimensions.get('screen');

const AddressChange = () => {
  const auth = UseAuth();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.MainAddressSlice);
  const navigation = useNavigation();

  const [shipToken, setShiptoken] = useState(null);

  useEffect(() => {
    const getShipRocToken = async () => {
      try {
        const response = await axios.get(
          '/get-token?email=akashbbu@gmail.com&password=Alaska100@b9',
        );
        if (response.data.code === 200) {
          setShiptoken(response.data.token);
          console.log('ShipRoc Token:', response.data.token);
        }
      } catch (error) {
        console.error('Error getting ShipRoc token:', error);
      }
    };
    getShipRocToken();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    buildingName: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    addressType: 'Home',
  });
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const paymentType = useSelector(state => state.payment.payemntType);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const resp = await axios.get('/get-all-addresses', {
          headers: {
            Authorization: auth.token,
          },
        });
        if (resp.data.code === 200) {
          const fetchedAddresses = resp.data.addresses.map(address => ({
            id: address.id,
            fullName: address.fullname,
            phone: address.mobile,
            buildingName: address.add1,
            landmark: address.landmark,
            area: address.area,
            city: address.city,
            state: address.state,
            pincode: address.zipcode,
            country: address.country,
            addressType: address.add_type,
          }));
          setAddresses(fetchedAddresses);
          setSelected(resp.data.addresses[0]?.id);
          dispatch(setMainAddress(resp.data.addresses[0]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

  const getShipping = async () => {
    const add = addresses?.filter(e => e.id === selector?.addresses?.id)?.[0];

    try {
      const resp = await axios.post(
        '/get-shipping-price',
        {
          pickup_pincode: '560027',
          delivery_pincode: ` ${add?.pincode}`,
          COD: paymentType === 'COD',
          token: shipToken,
          weight: '2',
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );

      if (resp.data.code === 200) {
        console.log('shipping', resp.data.data);
      } else {
        console.log(resp.data.message);
      }
    } catch (error) {
      console.log('====================================');
      console.log(error, 'errore');
      console.log('====================================');
    }
  };

  useEffect(() => {
    getShipping();
  }, [selected]);

  const handleAddAddress = async () => {
    setIsLoading(true);
    if (Object.values(newAddress).some(field => field.trim() === '')) {
      // Ensure no fields are empty
      return;
    }

    try {
      const resp = await axios.post(
        '/add-addresses',
        {
          fullname: newAddress.fullName,
          mobile: newAddress.phone,
          //   email: auth.user.email,
          add_type: newAddress.addressType,
          add1: newAddress.buildingName,
          add2: '', // Assuming no second address line is provided
          city: newAddress.city,
          state: newAddress.state,
          country: newAddress.country,
          pincode: newAddress.pincode,
          area: newAddress.area,
          landmark: newAddress.landmark,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );

      if (resp.data.code === 200) {
        setAddresses([...addresses, newAddress]);
        setNewAddress({
          fullName: '',
          phone: '',
          buildingName: '',
          landmark: '',
          area: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          addressType: 'Home',
        });
        setOpen(false);
        showMessage({
          message: resp.data.message,
          type: 'success',
        }); // Optionally close the add address form
      } else {
        showMessage({
          message: resp.data.message,
          type: 'danger',
        });
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'An error occurred while adding address.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Add or Edit Address Submission
  const handleSaveAddress = async () => {
    if (isEditMode && editingAddressId) {
      // Update existing address
      try {
        const resp = await axios.post(
          `/edit-addresses`,
          {
            addressID: editingAddressId,
            fullname: newAddress.fullName,
            mobile: newAddress.phone,
            add_type: newAddress.addressType,
            add1: newAddress.buildingName,
            city: newAddress.city,
            state: newAddress.state,
            country: newAddress.country,
            pincode: newAddress.pincode,
            area: newAddress.area,
            landmark: newAddress.landmark,
          },
          {
            headers: {
              Authorization: auth.token,
            },
          },
        );

        if (resp.data.code === 200) {
          // Update the address in state
          setAddresses(
            addresses.map(addr =>
              addr.id === editingAddressId ? {...addr, ...newAddress} : addr,
            ),
          );
          showMessage({
            message: 'Address updated successfully',
            type: 'success',
          });
          resetForm(); // Reset form and close modal
        } else {
          showMessage({
            message: resp.data.message,
            type: 'danger',
          });
        }
      } catch (error) {
        console.log(error.response.data.message || 'Failed to delete address');

        showMessage({
          message: 'An error occurred while updating the address.',
          type: 'danger',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Add new address logic (same as before)
      handleAddAddress();
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setNewAddress({
      fullName: '',
      phone: '',
      buildingName: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      addressType: 'Home',
    });
    setEditingAddressId(null);
    setIsEditMode(false);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setNewAddress({...newAddress, [field]: value});
  };
  const handleSelectAddressType = type => {
    setNewAddress({...newAddress, addressType: type});
  };

  const handleDeleteAddress = async id => {
    try {
      const resp = await axios.post(
        `/delete-addresses`,
        {
          address_id: id,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );

      if (resp.data.code === 200) {
        showMessage({
          message: resp.data.message,
          type: 'success',
        });
        setAddresses(addresses.filter(address => address.id !== id));
      } else {
        showMessage({
          message: 'Error',
          description: resp.data.message || 'Failed to delete address',
          type: 'error',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed to delete address',
        type: 'error',
      });
    }
  };

  const handleEditAddress = address => {
    setNewAddress({
      addressID: address?.id,
      fullName: address.fullName,
      phone: address.phone,
      buildingName: address.buildingName,
      landmark: address.landmark,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      addressType: address.addressType,
    });
    setEditingAddressId(address.id); // Save the ID of the address being edited
    setIsEditMode(true); // Switch to edit mode
    setOpen(true); // Open the modal
  };
  const handleAddAddressItemToStore = address => {
    dispatch(setMainAddress(address));
    navigation.navigate(ScreenNames.checkout);
  };

  const renderAddressItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setSelected(item?.id);
        handleAddAddressItemToStore(item);
      }}
      style={[
        styles.addressItem,
        item?.id === selector?.addresses?.id && styles.selectedAddress,
      ]}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        ({item.addressType})
      </Text>
      <Text style={styles.addressText}>
        {item.fullName}, {item.buildingName}, {item.landmark}, {item.area},{' '}
        {item.city}, {item.state}, {item.pincode}, {item.country}
      </Text>
      <Text style={styles.phoneText}>Phone: {item.phone}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handleDeleteAddress(item?.id)}>
          <Icon name="delete" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditAddress(item)}>
          <Icon name="edit" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <StatusBar
          backgroundColor="#131417"
          barStyle="light-content"
          hidden={false}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Your Addresses</Text>
          {addresses.length > 0 ? (
            <FlatList
              data={addresses}
              renderItem={renderAddressItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.addressList}
            />
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: '#E5E5E5',
                paddingVertical: 20,
                paddingHorizontal: 20,
                textAlign: 'center',
              }}>
              No addresses found.
            </Text>
          )}

          <View>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.title}>Add Address</Text>
              <Text style={styles.title}>+</Text>
            </TouchableOpacity>
            {open && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={Color.white}
                  value={newAddress.fullName}
                  onChangeText={value => handleChange('fullName', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  placeholderTextColor={Color.white}
                  value={newAddress.phone}
                  onChangeText={value => handleChange('phone', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  placeholderTextColor={Color.white}
                  value={newAddress.email}
                  onChangeText={value => handleChange('email', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Building Name"
                  placeholderTextColor={Color.white}
                  value={newAddress.buildingName}
                  onChangeText={value => handleChange('buildingName', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Landmark"
                  value={newAddress.landmark}
                  placeholderTextColor={Color.white}
                  onChangeText={value => handleChange('landmark', value)}
                />
                <TextInput
                  placeholderTextColor={Color.white}
                  style={styles.input}
                  placeholder="Area"
                  value={newAddress.area}
                  onChangeText={value => handleChange('area', value)}
                />
                <TextInput
                  placeholderTextColor={Color.white}
                  style={styles.input}
                  placeholder="City"
                  value={newAddress.city}
                  onChangeText={value => handleChange('city', value)}
                />
                <TextInput
                  placeholderTextColor={Color.white}
                  style={styles.input}
                  placeholder="State"
                  value={newAddress.state}
                  onChangeText={value => handleChange('state', value)}
                />
                <TextInput
                  placeholderTextColor={Color.white}
                  style={styles.input}
                  placeholder="Pincode"
                  keyboardType="numeric"
                  value={newAddress.pincode}
                  onChangeText={value => handleChange('pincode', value)}
                />
                <TextInput
                  placeholderTextColor={Color.white}
                  style={styles.input}
                  placeholder="Country"
                  value={newAddress.country}
                  onChangeText={value => handleChange('country', value)}
                />

                <Text style={{color: Color.white}}>Address Type</Text>
                <View style={styles.radioGroup}>
                  {['Home', 'Work', 'Other'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={styles.radioButton}
                      onPress={() => handleSelectAddressType(type)}>
                      <View
                        style={[
                          styles.radioCircle,
                          newAddress.addressType === type &&
                            styles.selectedRadioCircle,
                        ]}
                      />
                      <Text style={styles.radioText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <CustomButton
                  title={
                    isLoading ? (
                      <ActivityIndicator />
                    ) : isEditMode ? (
                      'Save Changes'
                    ) : (
                      'Add Address'
                    )
                  }
                  onPressButton={handleSaveAddress}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {!open && (
          <CustomButton
            title={'Continue'}
            onPressButton={() => navigation.navigate(ScreenNames.checkout)}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const CustomButton = ({onPressButton, title, txtStyle}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPressButton}>
      <View>
        <Text style={[styles.text, txtStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddressChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.lightBlack, // Background color of the container
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white, // Title color matching the theme
    marginBottom: 10,
  },
  addressList: {
    marginBottom: 20,
  },
  addressItem: {
    marginVertical: 5,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey, // Light grey border for separation
    borderRadius: 10,
    // backgroundColor: Color.light, // Background color for address items
  },
  selectedAddress: {
    backgroundColor: Color.yellow, // Highlight selected address with yellow background
    borderColor: Color.yellow, // Matching border color
    borderWidth: 2,
  },
  addressText: {
    fontSize: 16,
    color: Color.white, // White text color for better readability
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 14,
    color: Color.grey, // Grey color for phone number to differentiate it
  },
  input: {
    borderWidth: 1,
    borderColor: Color.grey, // Grey border for inputs
    // backgroundColor: Color.light, // Light background for inputs
    padding: 10,
    borderRadius: 5,
    color: Color.white, // White text color inside input fields
    marginBottom: 10,
  },
  radioGroup: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: Color.yellow,
    borderColor: Color.yellow,
  },
  radioText: {
    fontSize: 16,
    color: Color.white,
  },
  addButton: {
    backgroundColor: Color.btn, // Button color from the theme
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Color.white, // White text on the button
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginVertical: 10,
  },
  text: {
    color: Color.white,
    fontSize: height / 45,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    width: width / 1.35,
    // flex: 1,
    height: height / 18,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#424750',
    backgroundColor: Color.yellow,
  },
});
