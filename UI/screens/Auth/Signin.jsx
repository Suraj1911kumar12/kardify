import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LoginHeader from '../../component/LoginHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import ScreenNames from '../../constants/Screens';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../component/CustomButton';
import {useDispatch} from 'react-redux';
import {UseAuth} from '../../context/AuthContext';
import ContinueWith from '../../component/ContinueWith';
import SigninTemplate from '../../component/SigninTemplate';

const Signin = props => {
  const auth = UseAuth();

  const [username, setUserName] = useState('suraj.softfix@gmail.com');
  const [password, setPassword] = useState('123456');

  const [showPass, setShowPass] = useState(true);

  const handleLogin = () => {
    auth.login(username, password);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SigninTemplate>
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
              Sign In
            </Text>
          </View>
          {/* <View style={styles.sclmediacmnbdy}>
          <View style={styles.googlebdy}>
            <Icon name="google" style={{fontSize: 25, marginHorizontal: 20}} />
            <Text style={{color: '#ffffff', fontWeight: '500', lineHeight: 23}}>
              Google
            </Text>
          </View>
          <View style={styles.facebookbdy}>
            <Icon
              name="facebook"
              style={{fontSize: 25, marginHorizontal: 20}}
            />

            <Text style={{color: '#ffffff', lineHeight: 23, fontWeight: '500'}}>
              Facebook
            </Text>
          </View>
        </View> */}

          <View style={styles.mbleno}>
            <Text style={{color: '#ffffff', fontWeight: '500', fontSize: 13}}>
              Email
            </Text>
          </View>
          <View style={styles.inputBox}>
            <View style={styles.leftInputBox}>
              <Icon name="envelope" style={{fontSize: 20, color: '#7F8489'}} />
            </View>
            <View style={styles.rightInputBox}>
              <TextInput
                onChangeText={text => setUserName(text)}
                value={username}
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
              <Icon name="lock" style={{fontSize: 20, color: '#7F8489'}} />
            </View>
            <View style={styles.rightInputBox}>
              <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Enter here"
                placeholderTextColor={'#C6C5C5'}
                style={{color: 'white'}}
                secureTextEntry={showPass}
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

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(ScreenNames.ForgotPassword)
            }
            style={{
              width: SCREEN_WIDTH / 1.1,
              alignSelf: 'center',
              alignItems: 'flex-end',
              marginBottom: 50,
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontWeight: '500',
                fontSize: 13,
                textDecorationLine: 'underline',
              }}>
              Forgot Password
            </Text>
          </TouchableOpacity>

          <View style={styles.sbmitbtn}>
            <CustomButton
              onPressButton={handleLogin}
              // onPress={handleLogin}
              title={auth.isLoading ? <ActivityIndicator /> : 'Submit'}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <ContinueWith />
          </View>
          <View style={styles.sclmediacmnbdy}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.ChangePassword)
              }
              style={styles.googlebdy}>
              <Icon
                name="google"
                style={{fontSize: 25, marginHorizontal: 20}}
              />
              <Text
                style={{color: '#ffffff', fontWeight: '500', lineHeight: 23}}>
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(ScreenNames.SignUpDetails)}
            style={{
              width: SCREEN_WIDTH / 1.1,
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#777777'}}>Don’t have an account? </Text>
            <Text
              style={{
                color: '#ffffff',
                fontWeight: '500',
                fontSize: 13,
                textDecorationLine: 'underline',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.cmnimg}>
            <Image
              source={require('../../../assets/images/Auth/authcmnbdy.png')}
              resizeMode="cover"
              style={{width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 5}}
            />
          </View>
        </LinearGradient>
      </SigninTemplate>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  signin: {
    // height:SCREEN_HEIGHT/10,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    //justifyContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  sclmediacmnbdy: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 2.5,
    //backgroundColor:"green",
    alignSelf: 'center',
    //justifyContent:'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  googlebdy: {
    // height:SCREEN_HEIGHT/15,
    height: 50,
    width: SCREEN_WIDTH / 2.35,
    //backgroundColor:"yellow",
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    // elevation: 8,
    // opacity: 5,
    //   x: 1,
    //   y: 3,
    //flexDirection:"row",
    alignItems: 'center',
    //justifyContent:'center'
  },
  facebookbdy: {
    // height:SCREEN_HEIGHT/15,
    height: 50,
    width: SCREEN_WIDTH / 2.35,
    //backgroundColor:"yellow",
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    // elevation: 8,
    // opacity: 5,
    //   x: 1,
    //   y: 3,
    //flexDirection:"row",
    alignItems: 'center',
    marginLeft: 22,
    //justifyContent:'center'
  },
  mbleno: {
    // height:SCREEN_HEIGHT/20,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"yellow",
    alignSelf: 'center',
    marginBottom: 10,
    // justifyContent:'flex-end'
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
    // marginLeft:15,
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
  forgetpswrd: {
    height: SCREEN_HEIGHT / 22,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"red",
    alignSelf: 'center',
    // alignSelf:'flex-end'
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
    // height:SCREEN_HEIGHT/10,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"yellow",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
  AcntTxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:'yellow',
    alignSelf: 'center',
    //justifyContent: "flex-end",
    flexDirection: 'row',
    //alignItems: "flex-end"
  },
  alreadytxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 1.56,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    //alignItems: 'flex-end'
  },
  logintxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 7.5,
    //backgroundColor:"cyan",
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginLeft: 2,
    // alignItems:'flex-end'
  },
  cmnimg: {
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
    //justifyContent:'center'
  },
  scrl: {
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_WIDTH / 1,
    //backgroundColor:'yellow'
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
