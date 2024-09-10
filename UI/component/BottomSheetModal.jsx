import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {Color} from '../styles/Color';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';

const BottomSheetModal = ({
  modalVisible,
  setModalVisible,
  addToCart,
  productDetail,
}) => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsButtonEnabled(!isChecked); // Enable button only when checkbox is checked
  };

  const handleProceed = () => {
    closeModal();
    if (addToCart && productDetail) {
      addToCart(productDetail[0]); // Execute addToCart function
    }
    navigation.navigate(ScreenNames.checkout);
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeModal}>
      <Pressable style={styles.modalOverlay} onPress={closeModal}>
        <View style={styles.modalContent}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}

          <Text style={styles.modalText}>Accept Terms and Conditions</Text>

          <Pressable
            style={styles.checkboxContainer}
            onPress={handleCheckboxChange}>
            <View style={styles.checkbox}>
              {isChecked && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>
              I have read and accept the Privacy Policy & Terms and Conditions
            </Text>
          </Pressable>

          <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: isButtonEnabled ? Color.yellow : 'gray'},
            ]}
            onPress={handleProceed}
            disabled={!isButtonEnabled}>
            <Text style={styles.submitButtonText}>Agree</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.termsAndConditions)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#222',
              }}>
              Read Policies and Terms And Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: 215,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Color.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: Color.yellow,
  },
  label: {
    fontSize: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
