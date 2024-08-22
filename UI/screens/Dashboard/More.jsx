import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import ScreenNames from '../../constants/Screens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cmnhdr from '../../component/Cmnhdr';
import {UseAuth} from '../../context/AuthContext';
import {Color} from '../../styles/Color';
import {useSelector} from 'react-redux';

const More = props => {
  const auth = UseAuth();

  const userDetail = useSelector(state => state.profile);

  const arr = [
    {
      id: 1,
      name: 'My Orders',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.myorder),
    },
    {
      id: 2,
      name: 'Stories',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.stories),
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.contactus),
    },
    {
      id: 13,
      name: 'About Us',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.aboutus),
    },
    {
      id: 4,
      name: 'Privacy Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.privacypolicy),
    },
    {
      id: 5,
      name: 'Return Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.returnpolicy),
    },
    {
      id: 20,
      name: 'Refund Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.refundPolicy),
    },
    {
      id: 6,
      name: 'Shipping Policy',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.shippingpolicy),
    },
    {
      id: 7,
      name: 'Feedback',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.feedback),
    },
    {
      id: 8,
      name: 'Purchase Gift card',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.purchaseGiftCard),
    },

    {
      id: 10,
      name: 'Customer Support',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.customerSupport),
    },
    {
      id: 11,
      name: 'Rewards',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.reward),
    },
    {
      id: 12,
      name: 'Terms & Condition',
      icon: 'all-inbox',
      onPress: () => props.navigation.navigate(ScreenNames.termsAndConditions),
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <Cmnhdr
          // backIcon
          title="Profile"
          onPress={() => props.navigation.openDrawer()}
          notification={() =>
            props.navigation.navigate(ScreenNames.notification)
          }
        />

        <ScrollView>
          <View style={styles.Morebdy}>
            <View
              style={{
                gap: 4, //backgroundColor:'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {userDetail?.profile_img?.length > 0 ? (
                <Image
                  source={{uri: apis.baseImgUrl + userDetail?.profile_img}}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/profile/profileimg.png')}
                />
              )}
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 18, fontWeight: '800'}}>
                  {userDetail?.fullname || 'N/A'}
                </Text>
                <TouchableOpacity>
                  <Icon
                    name="edit-square"
                    style={{fontSize: 15, color: Color.white}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {arr.map((elem, index) => (
              <TouchableOpacity
                key={elem.id}
                onPress={elem?.onPress}
                // onPress={() => props.navigation.navigate(ScreenNames.stories)}
              >
                <View style={styles}>
                  <View style={styles.stores}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Icon
                        name={elem.icon}
                        style={{fontSize: 20, color: Color.grey}}
                      />
                      <Text style={{color: '#ffffff'}}>{elem.name}</Text>
                    </View>
                    <Icon
                      name="arrow-forward-ios"
                      style={{fontSize: 20, color: Color.white}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={auth.handleLogout}>
              <View style={styles}>
                <View style={styles.stores}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Icon name={'all-inbox'} style={{fontSize: 20}} />
                    <Text style={{color: '#ffffff'}}>Log Out</Text>
                  </View>
                  <Icon
                    name="arrow-forward-ios"
                    style={{fontSize: 20, color: Color.grey}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.installationpatner)
              }>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Installation</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.catalogs)}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Catalog</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.newdesignorproduct)
              }>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>New Designs</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.aboutus)}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>About us</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.contactus)}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Contact us</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.privacypolicy)
              }>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Privacy policy</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.returnpolicy)
              }>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Return policy</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.shippingpolicy)
              }>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Shipping policy</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.termsofuse)}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Terms of use</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Support')}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Support</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={auth.handleLogout}>
              <View style={styles}>
                <View style={styles.stores}>
                  <Text style={{color: '#ffffff'}}>Log Out</Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={{height: 150}} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default More;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Morebdy: {
    // height:SCREEN_HEIGHT/1.6,
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    // marginTop:10,
    borderRadius: 10,
    flexDirection: 'column',
    paddingVertical: 15,
  },
  stores: {
    height: SCREEN_HEIGHT / 12,
    width: SCREEN_WIDTH / 1.25,
    //backgroundColor:'red',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
  },
});
