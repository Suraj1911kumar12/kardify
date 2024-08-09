import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../styles/Color';

const {width, height} = Dimensions.get('screen');

const ContinueWith = () => {
  return (
    <View
      style={{
        marginVertical: 10,
        width: width / 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 5,
      }}>
      <Text style={styles.line}></Text>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: Color.white}}> or continue with</Text>
      </View>
      <Text style={styles.line}></Text>
    </View>
  );
};

export default ContinueWith;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    flex: 1,
  },
});
