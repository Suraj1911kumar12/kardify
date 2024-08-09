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
import {Color} from '../styles/Color';

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
          <Icon name="mic" size={20} color={Color.white} />
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
    padding: 5,
  },
  input: {
    flex: 1,
    width: 'auto',
    height: 40,
    // margin: 12,
    // borderWidth:2,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#222',
  },
  mike: {
    backgroundColor: '#222',
    borderRadius: 50,
    padding: 2,
    color: '#fff',
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
