import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AuthCommonHeader from '../../../component/AuthCommonHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import Display from '../../../styles/display/untils';
import CustomButton from '../../../component/CustomButton';
import OTPTextView from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UseAuth} from '../../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';

const {height, width} = Dimensions.get('screen');

const SignUpNumberOtp = props => {
  const [otp, setOtp] = useState('');
  const [id, setID] = useState({});
  const [counter, setCounter] = useState(30);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const getAsyncData = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    setID(jsonValue);
  };

  useEffect(() => {
    getAsyncData();

    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(prevCounter => prevCounter - 1);
      } else {
        setDisabled(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const auth = UseAuth();

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      showMessage({
        message: 'Error',
        description: 'Please fill in the 4-digit OTP.',
        type: 'danger',
      });
    } else {
      setLoading(true);
      try {
        await auth.signupOTPVerify(otp);
      } catch (error) {
        showMessage({
          message: 'Error',
          description: 'Failed to verify OTP. Please try again.',
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    setCounter(30);
    setDisabled(true);
    setLoading(true);
    try {
      // Replace with actual API call to resend OTP
      await auth.resendOTP(); // Ensure this method exists in your auth context
      showMessage({
        message: 'OTP Resent',
        description: 'A new OTP has been sent to your email.',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed to resend OTP. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
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
              We have sent an Email with a 4-digit code
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OTPTextView
              inputCount={4}
              tintColor={'#1C1F22'}
              handleTextChange={setOtp}
              keyboardType="number-pad"
              accessibilityLabel="OTP input"
              accessibilityHint="Enter the 4-digit OTP code you received."
            />
          </View>

          <View style={styles.resendOtp}>
            <Text style={styles.sendtxt}>
              Resend in{' '}
              <Text style={styles.txt}>
                00:{counter < 10 ? `0${counter}` : counter}
              </Text>
            </Text>
            <TouchableOpacity
              disabled={disabled}
              onPress={handleResendOtp}
              style={[styles.resendButton, {opacity: disabled ? 0.5 : 1}]}
              accessibilityLabel="Resend OTP"
              accessibilityHint="Tap to resend the OTP code.">
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={{color: '#FFFFFF'}}>Resend OTP</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.BTN}>
            <TouchableOpacity
              onPress={handleVerifyOtp}
              accessibilityLabel="Submit OTP"
              accessibilityHint="Tap to submit the OTP code.">
              <CustomButton
                onPressButton={handleVerifyOtp}
                title={loading ? 'Submitting...' : 'Submit'}
                disabled={loading}
              />
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
  maincontainer: {
    height: height / 1,
    width: width / 1,
  },
  verifyView: {
    height: Display.setHeight(10),
    width: Display.setWidth(1.1),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentView: {
    height: Display.setHeight(24),
    width: Display.setWidth(1.4),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  otpContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'center',
    height: Display.setHeight(7),
    width: Display.setWidth(1.2),
  },
  resendOtp: {
    flexDirection: 'row',
    height: Display.setHeight(13),
    width: Display.setWidth(1.1),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  sendtxt: {
    color: '#858585',
    fontWeight: 'bold',
    fontSize: Display.setHeight(48),
  },
  resendButton: {
    padding: 10,
    borderRadius: 5,
  },
  BTN: {
    height: height / 10,
    width: width / 1.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  cmnimg: {
    height: SCREEN_HEIGHT / 2.2,
    width: SCREEN_WIDTH / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
