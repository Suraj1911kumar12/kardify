import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {UseAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
import {Color} from '../styles/Color';
import {useSelector} from 'react-redux';
import AddressModal from './AddressModal'; // Import the AddressModal component
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';

const Cmnhdr = props => {
  const {backIcon, title} = props;
  const navigation = useNavigation();
  const auth = UseAuth();
  const userDetail = useSelector(state => state.profile);
  const userAddress = useSelector(state => state.address);

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const handleAddressPress = () => {
    setModalVisible(true);
  };

  const handleSelectAddress = selectedAddress => {
    // Handle the logic to update the selected address
    setModalVisible(false);
    // Optionally, dispatch an action to update the selected address in the store
  };

  return (
    <View style={styles.header}>
      {backIcon ? (
        <View style={styles.firstView}>
          <View style={{gap: 2, color: Color.white}}>
            <Text style={{fontSize: 18, color: Color.white}}>
              Welcome {userDetail?.fullname}
            </Text>
            {userAddress?.length > 0 && (
              <TouchableOpacity onPress={handleAddressPress}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                  }}>
                  <EnIcon
                    name="location-pin"
                    style={{fontSize: 15, color: Color.white}}
                  />
                  <Text style={{color: Color.white}}>
                    {userAddress[0]?.city + ' ' + userAddress[0]?.state}
                  </Text>
                  <MiIcon
                    name="arrow-drop-down"
                    style={{fontSize: 15, color: Color.white}}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.firstView}></View>
      )}

      {title ? (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: Color.white}}>
            {title}
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.thirdView}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.wishlist)}
          style={styles.circleView}>
          <Icon name="heart" style={{fontSize: 20, color: Color.grey}} />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={props.notification}
          style={styles.circleView}>
          <Icon
            name="bell-ring-outline"
            style={{fontSize: 20, color: Color.grey}}
          />
        </TouchableOpacity>
      </View>

      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addresses={userAddress}
        onSelectAddress={handleSelectAddress}
      />
    </View>
  );
};

export default Cmnhdr;

// Styles remain the same as before

const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  circleView: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#1C1F22',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
    flex: 1,
  },
  secondView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1,
  },
  logo: {
    height: 47,
    width: 59,
  },
  img: {
    height: 19,
    width: 19,
  },
});
