import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setShippingType} from '../../redux/slice/SeletedAddress';

const ShippingTypeModal = ({
  visible,
  onClose,
  shippingOptions,
  onShippingChange,
}) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(shippingOptions[0]);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    dispatch(setShippingType(option));
    onShippingChange(option);
  };
  const seletor = useSelector(state => state.shipping);
  // console.log(seletor, 'sle');

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Shipping Type</Text>
          <View
            style={{
              gap: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {shippingOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => handleOptionSelect(option?.delivery_type_name)}>
                <View
                  style={[
                    styles.circle,
                    selectedOption === option?.delivery_type_name &&
                      styles.selectedCircle,
                  ]}
                />

                <Text style={styles.optionText}>
                  {option?.delivery_type_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShippingTypeModal;
