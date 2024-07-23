import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Color} from '../styles/Color';

const SkeletonScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <View style={styles.profileInfo}>
          <View style={styles.name} />
          <View style={styles.subtitle} />
        </View>
      </View>
      <View style={styles.body} />
      <View style={styles.body} />
      <View style={styles.body} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.black,
  },
  header: {
    height: 200,
    width: '100%',
    backgroundColor: Color.BLACK,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: Color.BLACK,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 20,
  },
  name: {
    width: 120,
    height: 20,
    backgroundColor: Color.BLACK,
    borderRadius: 4,
    marginBottom: 6,
  },
  subtitle: {
    width: 80,
    height: 20,
    backgroundColor: Color.BLACK,
    borderRadius: 4,
  },
  body: {
    width: '100%',
    height: 150,
    backgroundColor: Color.BLACK,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default SkeletonScreen;
