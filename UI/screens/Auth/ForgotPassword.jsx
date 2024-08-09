import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/Size'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../component/CustomButton';
import AuthCommonHeader from '../../component/AuthCommonHeader'
import ScreenNames from '../../constants/Screens';
import { UseAuth } from '../../context/AuthContext';
import { useState } from 'react';

const ForgotPassword = (props) => {
  const [username, setUserName] = useState('')

  const auth = UseAuth()



  const handleForgotPassword = async () => {
    // props.navigation.navigate(ScreenNames.ForgotPasswordOTP)
    await auth.forgotPasswordOtpSent(username)
    // props.navigation.navigate(ScreenNames.ChangePassword)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 2, y: 0 }}
        colors={['#353A40', '#16171B', '#424750', '#202326']}
        style={styles.linearGradient}>
        <StatusBar
          backgroundColor="#131417"
          barStyle="light-content"
          hidden={false}
        />
        <AuthCommonHeader onPress={() => props.navigation.goBack()} />
        {/* <View style={styles.signin}>
        <Text style={{fontSize:SCREEN_HEIGHT/30,color:"#ffffff",fontWeight:'900'}}>Forgot password</Text>
      </View> */}
        <View style={styles.signin}>
          <Text
            style={{
              fontSize: 26,
              color: '#ffffff',
              fontWeight: '500',
              lineHeight: 39,
            }}>
            Forgot Password
          </Text>
        </View>
        {/* <View style={styles.mbleno}>
        <Text style={{color:"#ffffff",fontWeight:"700"}}>Mobile no.</Text>
      </View>
      <View style={styles.callbdy}>
        <View style={styles.callIcon}>
            <Image
            source={require("../../../../assets/images/Auth/call.png")}
            resizeMode="contain"
            />
        </View>
        <View style={styles.enterheretxt}>
            <TextInput
            placeholder='Enter here'
            placeholderTextColor={"#C6C5C5"}
            keyboardType="phone-pad"
            style={styles.input}
            />
        </View>
      </View> */}
        <View style={styles.mbleno}>
          <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 13 }}>
            Email
          </Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome
              name="envelope"
              style={{ fontSize: 20, color: '#7F8489' }}
            />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              onChangeText={text => setUserName(text)}
              placeholder="Enter here"
              placeholderTextColor={'#C6C5C5'}
              style={{ color: 'white' }}
              keyboardType='email-address'
              autoCapitalize='none'
              textContentType='emailAddress'
            />
          </View>
        </View>
        <View style={styles.sbmitbtn}>
          <CustomButton
            onPressButton={handleForgotPassword}
            title="Send OTP"
          />
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.LoginScreen)}
          style={{
            width: SCREEN_WIDTH / 1.1,
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          <Text style={{ color: '#777777' }}>Go back to </Text>
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
        <View style={styles.cmnimg}>
          <Image
            source={require('../../../assets/images/Auth/authcmnbdy.png')}
            resizeMode="cover"
            style={{ width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 4 }}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  signin: {
    width: SCREEN_WIDTH / 1,
    //backgroundColor:"red",
    //justifyContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginBottom: 30,
  },

  sbmitbtn: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 1.1,
    //backgroundColor:"yellow",
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },

  cmnimg: {
    height: SCREEN_HEIGHT / 1.9,
    width: SCREEN_WIDTH / 1,
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    width: SCREEN_WIDTH / 1.18,
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
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.36,
    //backgroundColor:"pink"
  },
  input: {
    marginLeft: 15,
    fontWeight: '900',
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
    width: SCREEN_WIDTH / 1.9,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    //alignItems: 'flex-end'
  },
  logintxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 8.2,
    //backgroundColor:"cyan",
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginLeft: 5,
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