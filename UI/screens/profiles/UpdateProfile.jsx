import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Color} from '../../styles/Color';
import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';
const {height, width} = Dimensions.get('screen');
import DateTimePicker from '@react-native-community/datetimepicker';
import {apis} from '../../utils/api';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {addProfile} from '../../redux/slice/profileSlice';
import {useNavigation} from '@react-navigation/native';

const UpdateProfile = props => {
  const navigation = useNavigation();
  const auth = UseAuth();
  const [selected, setSelected] = useState('Male');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const seletor = useSelector(state => state);

  const getUserDetail = async () => {
    setIsLoading(true);
    try {
      const user = await axios.get('/fetch-customer-details', {
        headers: {
          Authorization: auth.token,
        },
      });
      console.log('====================================');
      console.log(user.data);
      console.log('====================================');
      if (user.data.code === 200) {
        const customerData = user.data.customer_data.customer;
        console.log('====================================');
        console.log(customerData);
        console.log('====================================');
        dispatch(addProfile(customerData));
      } else {
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('fullname', fullname);
    data.append('email', email);
    data.append('phone', phone);
    data.append('dob', dob);
    data.append('gender', gender);

    try {
      const res = await axios.post(apis.edit_profile, data, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.stauts) {
        showMessage({
          message: res?.data?.message || 'Profile updated successfully',
          type: 'success',
        });
        getUserDetail();
        navigation.goBack();
      } else {
        getUserDetail();

        showMessage({
          message: res?.data?.message || 'error message',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error.response.data.message);
      showMessage({
        message: 'Error updating profile',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dob);
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, keep the date picker open
    setDob(currentDate.toDateString()); // Format the date as needed
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Function to fetch data for pull-to-refresh
  const fetchProfileData = useCallback(async () => {
    try {
      const data = props.route.params;
      setEmail(data.email);
      setPhone(data.phone);
      setDob(data.dob);
      setFullname(data.fullname);
      setGender(data.gender);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, [props.route.params]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData, showMessage]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Update Profile</Text>
          <Text
            style={{
              color: Color.white,
              fontSize: 18,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            Full Name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullname}
            onChangeText={setFullname}
          />
          <Text
            style={{
              color: Color.white,
              fontSize: 18,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text
            style={{
              color: Color.white,
              fontSize: 18,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            Mobile Number
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Text
            style={{
              color: Color.white,
              fontSize: 18,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            Date Of Birth
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(dob) || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()} // Optional: to prevent selecting future dates
            />
          )}
          <TouchableOpacity onPress={showDatePickerHandler}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              editable={false} // Prevent manual input
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Color.white,
              fontSize: 18,
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            Select Gender
          </Text>
          <View style={styles.radioGroup}>
            {['Male', 'Female', 'Other'].map((type, index) => (
              <TouchableOpacity
                key={type}
                style={styles.radioButton}
                onPress={() => {
                  setSelected(type);
                  setGender(type);
                }}>
                <View
                  style={[
                    styles.radioCircle,
                    selected === type && styles.selectedRadioCircle,
                  ]}
                />
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => handleUpdate()}>
          <View>
            <Text style={[styles.text]}>
              {isLoading ? <ActivityIndicator /> : 'Update'}
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.lightBlack,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.grey,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: Color.grey,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: Color.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pickerText: {
    fontSize: 16,
    color: Color.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey,
  },
  modalItemText: {
    fontSize: 16,
    color: Color.black,
  },
  modalCloseButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: Color.primary,
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
    marginBottom: 20,
  },
});

export default UpdateProfile;
