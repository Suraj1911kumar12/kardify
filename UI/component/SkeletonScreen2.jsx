import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonScreen2 = () => {
  const opacity = new Animated.Value(0.3);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeletonItem, {opacity}]} />
      <Animated.View style={[styles.skeletonItem, {opacity}]} />
      <Animated.View style={[styles.skeletonButton, {opacity}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonItem: {
    width: '80%',
    height: 40,
    backgroundColor: '#333',
    marginVertical: 10,
    borderRadius: 4,
  },
  skeletonButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#333',
    marginVertical: 10,
    borderRadius: 25,
  },
});

export default SkeletonScreen2;
