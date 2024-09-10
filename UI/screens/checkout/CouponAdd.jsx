import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const CouponAdd = ({visible, onClose, coupons, onCouponSelect}) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleCouponSelect = coupon => {
    setSelectedCoupon(coupon);
    onCouponSelect(coupon);
    onClose();
  };

  const renderCoupon = ({item}) => (
    <TouchableOpacity
      style={styles.couponItem}
      onPress={() => handleCouponSelect(item)}>
      <Text style={styles.couponText}>{item}</Text>
      {selectedCoupon === item && <View style={styles.selectedCircle} />}
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
          <Text style={styles.modalTitle}>Select a Coupon</Text>
          {coupons.length > 0 ? (
            <FlatList
              data={coupons}
              renderItem={renderCoupon}
              keyExtractor={(item, index) => index.toString()}
              extraData={selectedCoupon}
            />
          ) : (
            <Text>
              No coupons available. Please add a coupon in the settings section.
              Click 'Add Coupon' to create one.
            </Text>
          )}

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
    marginBottom: 10,
  },
  couponItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  couponText: {
    fontSize: 16,
  },
  selectedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CouponAdd;
