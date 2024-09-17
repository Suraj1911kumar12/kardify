import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../styles/Color';

const Customselect = ({selectedType, setSelectedType, arr}) => {
  const handleSelectAddressType = type => {
    setSelectedType(type);
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <View style={styles.radioGroup}>
        {arr?.map(type => (
          <TouchableOpacity
            key={type?.id}
            style={styles.radioButton}
            onPress={() => handleSelectAddressType(type)}>
            <View
              style={[
                styles.radioCircle,
                selectedType === (type?.delivery_type_name || type) &&
                  styles.selectedRadioCircle,
              ]}
            />
            <Text style={styles.radioText}>
              {type?.delivery_type_name || type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Customselect;

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
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
});
