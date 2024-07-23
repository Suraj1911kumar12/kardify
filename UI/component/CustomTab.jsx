import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../styles/Color';

const CustomTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Text style={styles.text}>Home</Text>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.text}>Home</Text>
      </View>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    margin: 20,
    borderRadius: 25,
    minHeight: 45,
    padding: 10,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black,
    color: Color.white,
  },
});
