import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Color} from '../styles/Color';

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLineShort} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 10,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Color.lightBlack,
    borderRadius: 10,
    padding: 10,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    backgroundColor: Color.grey,
    borderRadius: 10,
  },
  skeletonTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  skeletonLine: {
    width: '80%',
    height: 10,
    backgroundColor: Color.grey,
    borderRadius: 5,
    marginBottom: 5,
  },
  skeletonLineShort: {
    width: '60%',
    height: 10,
    backgroundColor: Color.grey,
    borderRadius: 5,
  },
});

export default SkeletonLoader;
