import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import CustomButton from '../../../component/CustomButton';
import AuthCommonHeader from '../../../component/AuthCommonHeader';
import ScreenNames from '../../../constants/Screens';
import {UseAuth} from '../../../context/AuthContext';
import ContinueWith from '../../../component/ContinueWith';
import LoginHeader from '../../../component/LoginHeader';
import {showMessage} from 'react-native-flash-message';
import {Color} from '../../../styles/Color';

const SignUpOneScreen = props => {
  const auth = UseAuth();

  const [showPass, setShowPass] = useState(true);
  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async () => {
    if (firstName == '' && lastName == '' && password == '' && email == '') {
      // Alert.alert('Sign Up Failed', 'Please Fill All Details');
      showMessage({
        message: 'Please Fill All Details',
        type: 'danger',
      });
      // props.navigation.navigate('SignUpNumberOtp')
    } else {
      await auth.SignUp(firstName, lastName, email, password);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
        <LoginHeader />
        <View style={styles.signin}>
          <Text
            style={{
              fontSize: 26,
              color: '#ffffff',
              fontWeight: '500',
              lineHeight: 39,
            }}>
            Sign Up
          </Text>
        </View>
        
        <View style={styles.mbleno}>
          <Text style={{color: '#ffffff', fontWeight: '500', fontSize: 13}}>
            Email Id
          </Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome
              name="envelope"
              style={{fontSize: 20, color: '#7F8489'}}
            />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>
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
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              secureTextEntry
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
            Email Id
          </Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome
              name="envelope"
              style={{fontSize: 20, color: '#7F8489'}}
            />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>
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
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              secureTextEntry
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

        <View style={styles.sbmitbtn}>
          <CustomButton
            onPressButton={handleRegister}
            // onPressButton={() => props.navigation.navigate(ScreenNames.tabstack)}
            // onPressButton={() => props.navigation.navigate(ScreenNames.Otp)}
            title="Submit"
          />
        </View>
        <View style={{marginVertical: 5}}>
          <ContinueWith />
        </View>
        <View style={styles.sclmediacmnbdy}>
          <TouchableOpacity
            // onPress={() =>
            //   props.navigation.navigate(ScreenNames.ChangePassword)
            // }
            style={styles.googlebdy}>
            <Icon
              name="google"
              style={{fontSize: 25, marginHorizontal: 20, color: Color.white}}
            />
            <Text style={{color: '#ffffff', fontWeight: '500', lineHeight: 23}}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.LoginScreen)}
          style={{
            width: SCREEN_WIDTH / 1.1,
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#777777'}}>Already Have an account? </Text>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '500',
              fontSize: 13,
              textDecorationLine: 'underline',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.cmnimg}>
                    <Image
                        source={require('../../../assets/images/Auth/singupbdy.png')}
                        resizeMode="contain"
                    />
                </View> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUpOneScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  signin: {
    // height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    //justifyContent:'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  sclmediacmnbdy: {
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_WIDTH / 2.5,
    // backgroundColor:"green",
    alignSelf: 'center',
    //justifyContent:'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  googlebdy: {
    // height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 2.35,
    height: 50,
    //backgroundColor:"yellow",
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    // elevation: 8,
    // opacity: 5,
    // x: 1,
    // y: 3,
    //flexDirection:"row",
    alignItems: 'center',
    //justifyContent:'center'
  },
  facebookbdy: {
    // height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 2.35,
    height: 50,
    //backgroundColor:"yellow",
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    // elevation: 8,
    // opacity: 5,
    // x: 1,
    // y: 3,
    //flexDirection:"row",
    alignItems: 'center',
    marginLeft: 22,
    //justifyContent:'center'
  },
  mbleno: {
    // height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"yellow",
    alignSelf: 'center',
    // justifyContent: 'flex-end',
    marginBottom: 10,
  },
  callbdy: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 10,
    //backgroundColor:"red",
    backgroundColor: '#1C1F22',
    elevation: 8,
    opacity: 8,
    x: 1,
    y: 3,
    alignSelf: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  callIcon: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 10,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  enterheretxt: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 1.25,
    //backgroundColor:"pink"
  },
  input: {
    marginLeft: 14,
    fontWeight: '900',
  },
  pswrdtxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"red",
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Passwordbdy: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 10,
    //backgroundColor:"red",
    backgroundColor: '#1C1F22',
    elevation: 8,
    opacity: 8,
    x: 1,
    y: 3,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  passwordIcon: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 10,
    //backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  enterheretxts: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.45,
    //backgroundColor:"pink"
  },
  eyeIcon: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 9,
    // backgroundColor:"green",
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwords: {
    height: SCREEN_HEIGHT / 22,
    width: SCREEN_WIDTH / 3.6,
    //backgroundColor:'yellow',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#848282',
  },
  sbmitbtn: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"yellow",
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  logintxt: {
    height: SCREEN_HEIGHT / 15,
    width: SCREEN_WIDTH / 3,
    //backgroundColor:"cyan",
    justifyContent: 'flex-end',
    // alignItems:'flex-end'
  },
  cmnimg: {
    height: SCREEN_HEIGHT / 3.5,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  peoplebdy: {
    // flex: 1,

    // height: SCREEN_HEIGHT / 13,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:'yellow',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  firstNme: {
    // height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 2.4,
    // backgroundColor:"red",
  },
  lastNme: {
    // height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 2.4,
    //backgroundColor:"pink",
    marginLeft: 30,
  },
  sclmediacmn: {
    // height: SCREEN_HEIGHT / 13.5,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"green",
    alignSelf: 'center',
    //justifyContent:'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  inputBox: {
    height: 40,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 8,
    //backgroundColor:"red",
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15,
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
});
