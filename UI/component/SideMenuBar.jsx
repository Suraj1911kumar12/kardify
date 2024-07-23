import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import ScreenNames from '../constants/Screens';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../styles/Size';
import {UseAuth} from '../context/AuthContext';

const SideMenuBar = props => {
  const auth = UseAuth();

  return (
    // <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom:0}}>
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.maiview}>
        <View style={styles.mainview1}>
          <View style={styles.firstimg}>
            <View style={styles.imageview}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/profile/profileimg.png')}
                style={{height: 40, width: 40}}
              />
            </View>
            <View style={styles.salerview}>
              <Text style={styles.salertext}>Suraj Kumar</Text>

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(ScreenNames.myprofile)
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 5,
                  }}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.myprofile)}>
          <View style={styles.Myprofiletextview}>
            <Text style={styles.Myprofiletext}>My Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.selectaddress)}
          style={styles.Myprofiletextview}>
          <Text style={styles.Myprofiletext}>My Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.myorder)}
          style={styles.Myprofiletextview}>
          <Text style={styles.Myprofiletext}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate(ScreenNames.wishlist);
          }}
          style={styles.Myprofiletextview}>
          <Text style={styles.Myprofiletext}>My Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate(ScreenNames.myratingreview);
          }}
          style={styles.Myprofiletextview}>
          <Text style={styles.Myprofiletext}>Ratings & Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.ChangePassword)}
          style={styles.Myprofiletextview}>
          <Text style={styles.Myprofiletext}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={auth.handleLogout}>
          <View style={styles.Myprofiletextview}>
            <Text style={styles.Myprofiletext}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SideMenuBar;
const styles = StyleSheet.create({
  maiview: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  mainview1: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#32363C',
  },
  imageview: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 120,
  },
  firstimg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
  },
  salerview: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  salertext: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    //fontFamily: fonts.PoppinsRegular,
  },
  salercodetext: {
    fontSize: 14,
    color: '#D1D1D1',
    //fontFamily: fonts.PoppinsRegular,
  },
  Folowertext: {
    fontSize: 10,
    color: '#FFFFFF',
    //fontFamily: fonts.PoppinsRegular,
  },
  Myprofiletextview: {
    
    height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 1.5,
    // backgroundColor:"red",
    alignSelf: 'center',
    marginTop: 5,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  Myprofiletext: {
    fontSize: 14,
    color: '#575757',
    //fontFamily: fonts.PoppinsRegular,
    paddingHorizontal: 8,
    top: 2,
    fontWeight: '500',
    // marginLeft:50
  },
  RateourAppview: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    top: 0,
  },
  newview: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    marginHorizontal: 0,
    paddingBottom: 15,
    borderTopWidth: 0.6,
    borderColor: '#E8EFF7',
    justifyContent: 'center',
  },
  RateourApptext: {
    fontSize: 11,
    color: '#575757',
    //fontFamily: fonts.PoppinsRegular,
  },
});
