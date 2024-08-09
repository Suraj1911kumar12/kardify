import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AuthCommonHeader from '../../../component/AuthCommonHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import Display from '../../../styles/display/untils';
import CustomButton from '../../../component/CustomButton';
import ScreenNames from '../../../constants/Screens';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UseAuth} from '../../../context/AuthContext';

const {height, width} = Dimensions.get('screen');

const SignUpNumberOtp = props => {
  const [otp, setOtp] = useState('');
  const [id, setID] = useState({});

  const getAsyncData = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    console.log('jsonValue', jsonValue);
    setID(jsonValue);
    console.log('idds', id);
  };
  useEffect(() => {
    getAsyncData();
  }, []);

  const auth = UseAuth();

  const handleVerifyOtp = async e => {
    if (otp.length > 4) {
      Alert.alert('Error', 'fill otp');
    } else {
      console.log(otp, id);
      await auth.signupOTPVerify(otp);
    }
  };

  return (
    <SafeAreaView>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <StatusBar
          backgroundColor="#131417"
          barStyle="light-content"
          hidden={false}
        />
        <AuthCommonHeader />
        <View style={styles.maincontainer}>
          <View style={styles.verifyView}>
            <Text
              style={{
                fontSize: height / 40,
                color: '#FFFFFF',
                fontWeight: '500',
              }}>
              Enter OTP
            </Text>
          </View>
          <View style={styles.sentView}>
            <Text
              style={{
                fontSize: height / 65,
                textAlign: 'center',
                color: '#FFFFFF',
              }}>
              We have sent an Email with a 4-digit-code
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height / 65,
                color: '#FFFFFF',
              }}>
              {/* to {email} */}
            </Text>
          </View>
          <View style={styles.otpContainer}>
            {/* <View style={styles.otpBox}>
                            <TextInput
                                placeholder=""
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                            // ref={firstInput}
                            // onChangeText={text => {
                            //     setOtp({ ...otps, 1: text });
                            //     text && secondInput.current.focus();
                            // }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                placeholder=""
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                            // ref={secondInput}
                            // onChangeText={text => {
                            //     setOtp({ ...otps, 2: text });
                            //     text
                            //         ? thirdInput.current.focus()
                            //         : firstInput.current.focus();
                            // }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                placeholder=""
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                            // ref={thirdInput}
                            // onChangeText={text => {
                            //     setOtp({ ...otps, 3: text });
                            //     text
                            //         ? fourthInput.current.focus()
                            //         : secondInput.current.focus();
                            // }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                placeholder=""
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                            // ref={fourthInput}
                            // onChangeText={text => {
                            //     setOtp({ ...otps, 4: text });
                            //     !text && thirdInput.current.focus();
                            // }}
                            />
                        </View> */}
            <OTPTextView
              inputCount={4}
              tintColor={'#1C1F22'}
              handleTextChange={e => setOtp(e)}
            />
          </View>

          <View style={styles.resendOtp}>
            <Text style={styles.sendtxt}>
              Resend in{' '}
              <Text style={styles.txt}>
                00:
                {/* {counter} */}
              </Text>
            </Text>
          </View>

          <View style={styles.BTN}>
            <TouchableOpacity>
              <CustomButton onPressButton={handleVerifyOtp} title="Submit" />
            </TouchableOpacity>
          </View>
          <View style={styles.cmnimg}>
            <Image
              source={require('../../../../assets/images/Auth/authcmnbdy.png')}
              resizeMode="cover"
              style={{width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 4}}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUpNumberOtp;

const styles = StyleSheet.create({
  mbleno: {
    // height:SCREEN_HEIGHT/20,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"yellow",
    alignSelf: 'center',
    marginBottom: 10,
    // justifyContent:'flex-end'
  },
  inputBox: {
    height: 45,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 8,
    //backgroundColor:"red",
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  maincontainer: {
    height: height / 1,
    width: width / 1,
    //backgroundColor: '#FFFFFF',
  },
  verifyView: {
    height: Display.setHeight(10),
    width: Display.setWidth(1.1),
    // backgroundColor: "yellow",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    //fontFamily: Medium,
    fontWeight: 'bold',
    fontSize: Display.setHeight(40),
    color: 'rgba(255, 255, 255, 1)',
  },
  txtSent: {
    //fontFamily: Medium,
    fontWeight: 'bold',
    fontSize: Display.setHeight(48),
    color: 'rgba(23, 23, 22, 1)',
  },
  sentView: {
    height: Display.setHeight(24),
    width: Display.setWidth(1.4),
    // backgroundColor: "green",
    alignSelf: 'center',
    justifyContent: 'center',
  },
  otpContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignSelf: 'center',
    height: Display.setHeight(7),
    width: Display.setWidth(1.2),
  },
  otpBox: {
    height: Display.setHeight(16),
    width: Display.setWidth(8.2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1C1F22',
    backgroundColor: '#1C1F22',
    elevation: 8,
    opacity: 5,
    x: 1,
    y: 3,
    // borderTopWidth:1,
    // borderLeftWidth:1,
    // borderRightWidth:1,
    // borderBottomWidth:1,
    borderRadius: 5,
    borderColor: '#000000',
    marginBottom: 20,
  },
  otpText: {
    //fontFamily: Medium,
    fontSize: Display.setHeight(35),
    padding: 0,
    textAlign: 'center',
    // color: Colors.black
    color: '#000000',
  },
  resendOtp: {
    height: Display.setHeight(13),
    width: Display.setWidth(1.1),
    //backgroundColor: "green",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sendtxt: {
    color: '#858585',
    // fontFamily: Bold,
    fontWeight: 'bold',
    fontSize: Display.setHeight(48),
  },
  Img: {
    height: height / 3.4,
    width: width / 1.1,
    // backgroundColor:'red',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  BTN: {
    height: height / 10,
    width: width / 1.1,
    // backgroundColor:'pink',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  cmnimg: {
    height: SCREEN_HEIGHT / 2.2,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftInputBox: {
    height: '100%',
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
});
