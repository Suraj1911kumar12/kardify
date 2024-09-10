import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const AddressModal = ({visible, onClose, addresses, onAddressChange}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = address => {
    setSelectedAddress(address);
    onAddressChange(address);
    onClose();
  };

  const renderAddressItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.addressItem,
        item === selectedAddress && styles.selectedAddress,
      ]}
      onPress={() => handleSelect(item)}>
      <Text style={styles.addressText}>{item?.add1}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Address</Text>
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={item => item}
            style={styles.addressList}
          />
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
    marginBottom: 10,
  },
  addressList: {
    width: '100%',
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedAddress: {
    backgroundColor: '#e0e0e0',
  },
  addressText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddressModal;
