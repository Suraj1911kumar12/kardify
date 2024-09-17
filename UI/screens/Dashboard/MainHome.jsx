import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {UseAuth} from '../../context/AuthContext';
import Catalogue from './dashcomp/Catologue';
import TopSellingCategories from './dashcomp/TopSellingComp';
import EngineHeading from './dashcomp/EngineHeading';
import CarFacility from './dashcomp/CarFaculty';
import Testimonials from './dashcomp/Testimonials';
import Brands from './dashcomp/Brands';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FullSearchBar from '../../component/FullSearchBar';
import Cmnhdr from '../../component/Cmnhdr';
import ScreenNames from '../../constants/Screens';
import {useNavigation} from '@react-navigation/native';
import axios from '../../../axios';
import {useDispatch, useSelector} from 'react-redux';
import {addProfile} from '../../redux/slice/profileSlice';
import {addAddress} from '../../redux/slice/addresSlice';
import Banner from '../Banner/Banner';

const MainHome = props => {
  const auth = UseAuth();
  const dispatch = useDispatch();

  const selector = useSelector(state => state.item);
  // State for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  // *********************************State's Call **********************************
  const [isLoading, setIsLoading] = useState(false);
  const [isuser, setIsuser] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [userAddress, setUserAddress] = useState([]);

  const getUserDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await axios.get('/fetch-customer-details', {
        headers: {
          Authorization: auth.token,
        },
      });
      if (user.data.code === 200) {
        const customerData = user.data.customer_data.customer;
        const customerAddresses = user.data.customer_data.customer_addresses;

        setIsuser(true);
        console.log('====================================');
        // console.log();
        console.log('====================================');
        setUserDetail(customerData);
        setUserAddress(customerAddresses);

        dispatch(addProfile(customerData)); // Directly dispatch the fetched customer data
        dispatch(addAddress(customerAddresses));
      } else if (user.data.code === 401) {
        setIsuser(false);
        setUserDetail(null);
        auth.handleLogout();
      } else {
        setIsuser(false);
        setUserDetail(null);
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUserDetail();
    setRefreshing(false);
  }, [getUserDetail]);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr
          backIcon
          // title="Home"
          // onPress={() => props.navigation.openDrawer()}
          notification={() => navigation.navigate(ScreenNames.notification)}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FullSearchBar />
          {/* ************************ banner ************************************ */}

          <Banner />

          {/* ***********************************catelogue*********************************** */}
          <Catalogue />
          {/* ***********************************Customized Seat covers*********************************** */}

          {/* <View style={styles.customizeView}>
            <ImageBackground
              resizeMode="stretch"
              source={require('../../assets/images/custmz1.png')}
              style={{
                flex: 1,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  fontWeight: '500',
                  lineHeight: 26,
                }}>
                CUSTOMIZED SEAT COVERS
              </Text>
              <View style={styles.discoverBtn}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 18,
                    fontWeight: '500',
                  }}>
                  Discover
                </Text>
              </View>
            </ImageBackground>
          </View> */}

          {/* ***********************************Top Selling Products*********************************** */}
          <TopSellingCategories />
          {/* ***********************************Try On Whees*********************************** */}
          {/* <View style={styles.tryView}>
            <Image
              source={require('../../assets/images/tryonwl.png')}
              resizeMode="contain"
              style={{width: '70%', height: 42, marginBottom: 10}}
            />
            <View style={[styles.viewAllBtn, {marginBottom: 10}]}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/tryItNow.png')}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <Image
              source={require('../../assets/images/RecCar.png')}
              resizeMode="stretch"
              style={{
                height: 150,
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
              }}
            />
          </View> */}

          {/* ***********************************HR Line*********************************** */}
          <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />
          {/* ***********************************Stories*********************************** */}
          <View style={styles.yellowBox}>
            <Icon name="headset" style={{fontSize: 25}} />
          </View>
          {/* <Image
                        resizeMode="contain"
                        source={require('../../assets/images/story2.png')}
                        style={{ height: 70, width: 242, alignSelf: 'center' }}
                    /> */}
          <Text
            style={{
              fontSize: 48,
              color: '#fff',
              fontFamily: 'Playball',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Stories
          </Text>
          <Text
            style={{
              color: '#E5BC56',
              fontFamily: 'Playball',
              fontSize: 20,
              alignSelf: 'center',
              marginBottom: 15,
            }}>
            Driving Social Network
          </Text>
          {/* <CustomButton txtStyle={{}} /> */}
          <ImageBackground
            style={{
              height: 33,
              width: 129,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 20,
            }}
            source={require('../../../assets/images/yellowBtnBg.png')}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
              View Stories
            </Text>
          </ImageBackground>
          <View style={{marginBottom: 20}}>
            <EngineHeading />
          </View>
          <View style={{backgroundColor: '#17181A'}}>
            <Image
              source={require('../../../assets/images/offer2.png')}
              style={{width: '100%', height: 75, marginVertical: 10}}
              resizeMode="contain"
            />
            <CarFacility />
          </View>
          <Brands />
          <View
            style={[
              styles.BrandMainView,
              {backgroundColor: '#16171B', marginBottom: 0},
            ]}>
            <Testimonials />
          </View>
          {/* <View style={{backgroundColor:'#16171B',height:100}} /> */}
          <View style={{height: 100, backgroundColor: '#16171B'}} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customizeView: {
    height: 147,
    width: '95%',
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  discoverBtn: {
    height: 31,
    width: 136,
    backgroundColor: '#DFB852',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
  tryView: {
    height: 287,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#17181A',
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewAllBtn: {
    alignSelf: 'center',
    borderRadius: 20,
    height: 33,
    width: 127,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowBox: {
    height: 63,
    width: 63,
    backgroundColor: '#DFB852',
    borderRadius: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2.5,
    borderColor: 'black',
  },
  storiesBtn: {
    alignSelf: 'center',
    borderRadius: 20,
    height: 42,
    width: 161,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyBtn: {
    alignSelf: 'center',
    height: 42,
    width: 161,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storie_title: {
    fontSize: 48,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Monoton-Regular',
  },
});
