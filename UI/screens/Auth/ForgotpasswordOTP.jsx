import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import Display from '../../styles/display/untils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../component/CustomButton';
import AuthCommonHeader from '../../component/AuthCommonHeader';
import OTPTextView from 'react-native-otp-textinput';

const {height, width} = Dimensions.get('screen');

const ForgotPasswordOTP = props => {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = () => {
    // props.navigation.navigate('ChangePassword')
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
            <OTPTextView
              inputCount={4}
              tintColor={'#1C1F22'}
              handleTextChange={e => setOtp(e)}
            />
          </View>
          {/* <View style={styles.mbleno}>
                        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 13 }}>
                            New Password
                        </Text>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.leftInputBox}>
                            <FontAwesome
                                name="lock"
                                style={{ fontSize: 20, color: '#7F8489' }}
                            />
                        </View>
                        <View style={styles.rightInputBox}>
                            <TextInput
                                // onChangeText={text => 
                                //     setNewPassword(text)}
                                placeholder="Enter here"
                                placeholderTextColor={'#C6C5C5'}
                                style={{ color: 'white' }}
                            />
                        </View>
                    </View>
                    <View style={styles.mbleno}>
                        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 13 }}>
                            Confirm Password
                        </Text>
                    </View> */}

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
              source={require('../../../assets/images/Auth/authcmnbdy.png')}
              resizeMode="cover"
              style={{width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 4}}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPasswordOTP;

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
