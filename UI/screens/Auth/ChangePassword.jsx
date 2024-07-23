import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../component/CustomButton';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import AuthCommonHeader from '../../component/AuthCommonHeader';

const ChangePassword = props => {
  const [showPass, setShowPass] = useState(true);
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
        {/* <CommonHeader
      backIcon="true"
      title="JMA"
      /> */}
        {/* <View style={styles.signin}>
        <Text style={{fontSize:SCREEN_HEIGHT/30,color:"#ffffff",fontWeight:'900'}}>Change Password</Text>
      </View> */}
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

        {/* <View style={styles.pswrdtxt}>
        <Text style={{color:"#ffffff",fontWeight:"600"}}>Confirm password</Text>
      </View>
      <View style={styles.Passwordbdy}>
      <View style={styles.passwordIcon}>
            <Image
            source={require("../../../../assets/images/Auth/password.png")}
            resizeMode="contain"
            />
        </View>
        <View style={styles.enterheretxts}>
            <TextInput
            placeholder='Enter here'
            placeholderTextColor={"#C6C5C5"}
            style={styles.input}
            />
        </View>
        <View style={styles.eyeIcon}>
            <Image
            source={require("../../../../assets/images/Auth/eye.png")}
            />
        </View>
      </View> */}
        <View style={styles.sbmitbtn}>
          <CustomButton
            //  onPressButton={() =>props.navigation.navigate(ScreenNames.SignUpOneScreen)}
            title="Reset Password"
          />
        </View>
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
    //backgroundColor:"red",
    //justifyContent:'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pswrdtxt: {
    height: SCREEN_HEIGHT / 18,
    width: SCREEN_WIDTH / 1.2,
    //backgroundColor:"red",
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Passwordbdy: {
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
    flexDirection: 'row',
  },
  passwordIcon: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 10,
    // backgroundColor:"cyan",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  enterheretxts: {
    height: SCREEN_HEIGHT / 16,
    width: SCREEN_WIDTH / 1.59,
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

  cmnimg: {
    height: SCREEN_HEIGHT / 2.2,
    width: SCREEN_WIDTH / 1,
    // backgroundColor:"red",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
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
  mbleno: {
    // height:SCREEN_HEIGHT/20,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"yellow",
    alignSelf: 'center',
    marginBottom: 10,
    // justifyContent:'flex-end'
  },
});
