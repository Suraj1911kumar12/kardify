import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import {UseAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MiIcon from 'react-native-vector-icons/MaterialIcons';

import EnIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { Color } from '../styles/Color';

const Cmnhdr2 = props => {
  const navigation = useNavigation();
  const {backIcon, title} = props;
  const auth = UseAuth();

  return (
    <View style={styles.header}>
      {backIcon ? (
        <View style={styles.firstView}>
          <Pressable onPress={() => navigation.goBack()}>
            <MiIcon name="keyboard-arrow-left" style={{fontSize: 30,color: Color.white}} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.firstView}></View>
      )}

      {title ? (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 24,color: Color.white}}>{title}</Text>
        </View>
      ) : (
        <View></View>
      )}

      <View style={styles.thirdView}>
        {/* <TouchableOpacity
          // onPress={props.notification}
          style={styles.circleView}>
          <Icon name="heart" style={{fontSize: 20}} />
        </TouchableOpacity> */}
        <TouchableOpacity
          // onPress={props.notification}
          style={styles.circleView}>
          <Icon name="bell-ring-outline" style={{fontSize: 20,color: Color.grey}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cmnhdr2;

const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  circleView: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: '#1C1F22',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-start',
    gap: 5,
    flex: 1,
  },
  secondView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'flex-end',
    gap: 5,
    flex: 1,
  },
  logo: {
    height: 47,
    width: 59,
  },
  img: {
    height: 19,
    width: 19,
  },
});
