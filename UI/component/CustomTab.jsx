import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../styles/Color';

const CustomTab = ({selected, setSelected, cData, pData}) => {
  const tabsVal = [
    {
      id: 1,
      name: `Current Orders (${cData && cData})`,
      value: 0,
    },
    {
      id: 2,
      name: `Past Orders (${pData && pData})`,
      value: 1,
    },
  ];

  return (
    <View style={styles.container}>
      {tabsVal.map((elem, index) => (
        <TouchableOpacity
          style={[
            styles.tabs,
            {
              backgroundColor:
                selected === elem.value ? Color.black : Color.white,
            },
          ]}
          onPress={() => setSelected(elem.value)}>
          <Text
            style={{
              color: selected === elem.value ? Color.white : Color.black,
            }}>
            {elem.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    margin: 20,
    borderRadius: 50,
    minHeight: 60,
    padding: 10,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    color: Color.white,
    padding: 5,
    borderRadius: 25,
    paddingVertical: 10,
  },
  text: {},
});
