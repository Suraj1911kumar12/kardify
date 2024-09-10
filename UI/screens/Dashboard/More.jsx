import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cmnhdr from '../../component/Cmnhdr';
import {UseAuth} from '../../context/AuthContext';
import {Color} from '../../styles/Color';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import {apis} from '../../utils/api';
import ScreenNames from '../../constants/Screens';
import {showMessage} from 'react-native-flash-message';
import axios from '../../../axios';
import LogoutConfirmationModal from '../ConfirmModal/ConfirmModal';

const More = props => {
  const auth = UseAuth();
  const {token} = auth;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const userDetail = useSelector(state => state.profile);

  const handleImagePick = async () => {
    await launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('====================================');
        console.log(source, 'sourec');
        console.log('====================================');
        setSelectedImage(source);
        handleUploadImage();
        // setModalVisible(true);
      }
    });
  };
  const handleUploadImage = async () => {
    if (!selectedImage) {
      showMessage({
        message: 'No image selected',
        type: 'warning',
      });
      return;
    }

    try {
      const data = new FormData();
      data.append('image', {
        uri: selectedImage.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      data.append('profile_img', selectedImage.uri); // Update as needed

      const response = await axios.post(apis.edit_profile, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      const result = response?.data;
      if (result.code === 200) {
        showMessage({
          message: 'Image uploaded successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Failed to upload image',
          type: 'warning',
        });
      }
    } catch (error) {
      console.log('Error while uploading image:', error);
      showMessage({
        message: 'Failed to upload image',
        type: 'danger',
      });
    }
  };
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);

  const handleLogOut = () => {
    setModalVisibleLogout(true);
  };

  const handleConfirmLogout = () => {
    setModalVisibleLogout(false);
    auth.handleLogout();
    // props.navigation.navigate(ScreenNames.LoginScreen);
  };

  const handleCancelLogout = () => {
    setModalVisibleLogout(false);
  };

  const arr = [
    {
      id: 1,
      name: 'My Orders',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.myorder),
    },
    {
      id: 2,
      name: 'Stories',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.stories),
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.contactus),
    },
    {
      id: 13,
      name: 'About Us',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.aboutus),
    },
    {
      id: 4,
      name: 'Privacy Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.privacypolicy),
    },
    {
      id: 5,
      name: 'Return Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.returnpolicy),
    },
    {
      id: 20,
      name: 'Refund Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.refundPolicy),
    },
    {
      id: 6,
      name: 'Shipping Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.shippingpolicy),
    },
    {
      id: 7,
      name: 'Feedback',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.feedback),
    },
    // {
    //   id: 8,
    //   name: 'Purchase Gift card',
    //   icon: 'all-inbox',
    //   onPress: () => props.navigation.navigate(ScreenNames.purchaseGiftCard),
    // },

    {
      id: 10,
      name: 'Customer Support',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.customerSupport),
    },
    {
      id: 11,
      name: 'Rewards',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.reward),
    },
    {
      id: 12,
      name: 'Terms & Condition',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.termsAndConditions),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <Cmnhdr
          title="Profile"
          onPress={() => props.navigation.openDrawer()}
          notification={() =>
            props.navigation.navigate(ScreenNames.notification)
          }
        />

        <ScrollView>
          <View style={styles.Morebdy}>
            {token && (
              <View
                onPress={() => setIsEditing(true)}
                style={styles.profileContainer}>
                <TouchableOpacity onPress={handleImagePick}>
                  {selectedImage ? (
                    <Image source={selectedImage} style={styles.profileImage} />
                  ) : userDetail?.profile_img?.length > 0 ? (
                    <Image
                      source={{uri: apis.baseImgUrl + userDetail?.profile_img}}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/profile/profileimg.png')}
                      style={styles.profileImage}
                    />
                  )}
                </TouchableOpacity>

                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>
                    {userDetail?.fullname || 'N/A'}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(
                        ScreenNames.profileChange,
                        userDetail,
                      )
                    }>
                    <Icon name="edit-square" style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* {isEditing && (
              <View style={styles.uploadContainer}>
                <Button title="Choose Image" onPress={handleImagePick} />
              </View>
            )} */}

            {!token && (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(ScreenNames.LoginScreen)
                }>
                <View style={styles.stores}>
                  <View style={styles.storesContent}>
                    <Icon name={'all-inbox'} style={styles.storeIcon} />
                    <Text style={styles.storeText}>Login</Text>
                  </View>
                  <Icon name="arrow-forward-ios" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            )}

            {arr.map(elem => (
              <TouchableOpacity key={elem.id} onPress={elem.onPress}>
                <View style={styles.stores}>
                  <View style={styles.storesContent}>
                    <Icon name={elem.icon} style={styles.storeIcon} />
                    <Text style={styles.storeText}>{elem.name}</Text>
                  </View>
                  <Icon name="arrow-forward-ios" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            ))}

            {token && (
              <TouchableOpacity onPress={handleLogOut}>
                <View style={styles.stores}>
                  <View style={styles.storesContent}>
                    <Icon name={'all-inbox'} style={styles.storeIcon} />
                    <Text style={styles.storeText}>Log Out</Text>
                  </View>
                  <Icon name="arrow-forward-ios" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={{height: 150}} />
        </ScrollView>

        {/* Modal for image upload */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {uploading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <Image source={selectedImage} style={styles.modalImage} />
                  <Button title="Upload Image" onPress={handleUploadImage} />
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
        <LogoutConfirmationModal
          visible={modalVisibleLogout}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default More;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Morebdy: {
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    paddingVertical: 15,
  },
  profileContainer: {
    marginTop: 20,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  editIcon: {
    fontSize: 15,
    color: Color.white,
  },
  uploadContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  stores: {
    height: SCREEN_HEIGHT / 12,
    width: SCREEN_WIDTH / 1.25,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
  },
  storesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storeIcon: {
    fontSize: 20,
    color: Color.grey,
  },
  storeText: {
    color: '#ffffff',
  },
  arrowIcon: {
    fontSize: 20,
    color: Color.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: SCREEN_WIDTH / 1.2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
});
