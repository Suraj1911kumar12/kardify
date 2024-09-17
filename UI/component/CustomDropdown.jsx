import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomDropdown = ({data, onSelect, labelKey}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('Select');

  const handleSelect = item => {
    setSelectedName(item[labelKey]); // Use dynamic labelKey to select either brand_name or model_name
    setDropdownOpen(false);
    onSelect(item); // Callback function to handle selection
  };

  return (
    <SafeAreaView>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.dropdownButtonText}>{selectedName}</Text>
        <Icon name="down" size={15} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      {isDropdownOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isDropdownOpen}
          onRequestClose={() => setDropdownOpen(false)}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setDropdownOpen(false)}>
            <View style={styles.dropdownMenu}>
              <FlatList
                data={data}
                style={{
                  paddingHorizontal: 16,
                  maxHeight: 300,
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item)}>
                    <Text style={styles.dropdownItemText}>
                      {item[labelKey]}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdownButton: {
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownMenu: {
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#444',
  },
});
