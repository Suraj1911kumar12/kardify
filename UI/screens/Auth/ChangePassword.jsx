import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../component/CustomButton';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import AuthCommonHeader from '../../component/AuthCommonHeader';
import {showMessage} from 'react-native-flash-message';
import {UseAuth} from '../../context/AuthContext';

const ChangePassword = props => {
  const [showPass, setShowPass] = useState(true);
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [counter, setCounter] = useState(30);
  const [disabled, setDisabled] = useState(true);

  const auth = UseAuth();

  const changePasswordVerify = () => {
    if (confPass !== pass) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
    } else {
      auth.forgotPasswordOtpVerify(props.route.params, pass, confPass);
    }
  };

  const handleResendOtp = () => {
    setCounter(30);
    setDisabled(true);
    // Logic to resend OTP (e.g., API call)
    showMessage({
      message: 'OTP Resent',
      description: 'A new OTP has been sent to your email.',
      type: 'success',
    });
  };

  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.linearGradient}>
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
        <AuthCommonHeader onPress={() => props.navigation.goBack()} />
        <View style={styles.signin}>
          <Text
            style={{
              fontSize: 26,
              color: '#ffffff',
              fontWeight: '500',
              lineHeight: 39,
            }}>
            Reset Password
          </Text>
        </View>

        <View style={styles.mbleno}>
          <Text style={{color: '#ffffff', fontWeight: '500', fontSize: 13}}>
            Password
          </Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="lock" style={{fontSize: 20, color: '#7F8489'}} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              secureTextEntry={!showPass}
              value={pass}
              onChangeText={text => setPass(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass);
            }}
            style={styles.leftInputBox}>
            <Feather
              name={showPass ? 'eye' : 'eye-off'}
              style={{fontSize: 20, color: '#7F8489'}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mbleno}>
          <Text style={{color: '#ffffff', fontWeight: '500', fontSize: 13}}>
            Confirm Password
          </Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="lock" style={{fontSize: 20, color: '#7F8489'}} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              value={confPass}
              onChangeText={text => setConfPass(text)}
            />
          </View>
        </View>

        <View style={styles.sbmitbtn}>
          <CustomButton
            onPressButton={() => changePasswordVerify()}
            title="Reset Password"
          />
        </View>

        {/* <View style={styles.resendOtp}>
          <Text style={styles.sendtxt}>
            Resend in{' '}
            <Text style={styles.txt}>
              00:{counter < 10 ? `0${counter}` : counter}
            </Text>
          </Text>
          <TouchableOpacity
            disabled={disabled}
            onPress={handleResendOtp}
            style={styles.resendButton}>
            <Text style={{color: '#FFFFFF'}}>Resend OTP</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.cmnimg}>
          <Image
            source={require('../../../assets/images/Auth/authcmnbdy.png')}
            resizeMode="cover"
            style={{width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 5}}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  signin: {
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_WIDTH / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mbleno: {
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputBox: {
    height: 45,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 8,
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftInputBox: {
    height: '100%',
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
  rightInputBox: {
    flex: 1,
    justifyContent: 'center',
  },
  sbmitbtn: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  resendOtp: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 13,
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  sendtxt: {
    color: '#858585',
    fontWeight: 'bold',
    fontSize: SCREEN_HEIGHT / 48,
  },
  resendButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1C1F22',
  },
  cmnimg: {
    height: SCREEN_HEIGHT / 2.2,
    width: SCREEN_WIDTH / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
