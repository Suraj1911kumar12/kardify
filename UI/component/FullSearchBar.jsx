import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native';

const {width} = Dimensions.get('window');

const FullSearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={30} color="#000" />

        <TextInput
          style={styles.input}
          placeholder="Search "
          placeholderTextColor={'#222'}
          // onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.mike}>
          <Icon name="mic" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FullSearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    width: 'auto',
    height: 35,
    margin: 12,
    fontSize: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#222',
  },
  mike: {
    backgroundColor: '#222',
    borderRadius: 50,
    padding: 10,
    color: '#fff',
  },
});
