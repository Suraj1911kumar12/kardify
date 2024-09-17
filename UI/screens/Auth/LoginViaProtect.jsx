import React, {useEffect, useState} from 'react';
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
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginHeader from '../../component/LoginHeader';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import ScreenNames from '../../constants/Screens';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../component/CustomButton';
import {UseAuth} from '../../context/AuthContext';
import ContinueWith from '../../component/ContinueWith';
import SigninTemplate from '../../component/SigninTemplate';
import {Color} from '../../styles/Color';
import {useNavigation} from '@react-navigation/native';

const LoginViaProtect = props => {
  const navigation = useNavigation();
  const auth = UseAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate(ScreenNames.Home); // Navigate to the main screen
      return true; // Prevent default back press behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, []);

  const handleLogin = () => {
    auth.login(username, password, navigation);
  };
  const handleSkip = async () => {
    auth.setIsAuthenticated(true);
    navigation.navigate(ScreenNames.Home);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 50,
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: Color.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
          <LoginHeader />
          <View style={styles.signin}>
            <Text style={styles.signinText}>Sign In</Text>
          </View>

          <InputField
            label="Email"
            iconName="envelope"
            value={username}
            onChangeText={setUserName}
            placeholder="Enter here"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            iconName="lock"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter here"
            secureTextEntry={showPass}
            showPasswordToggle
            onTogglePassword={() => setShowPass(!showPass)}
            isPasswordVisible={!showPass}
          />

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(ScreenNames.ForgotPassword)
            }
            style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={styles.submitButtonContainer}>
            <CustomButton
              onPressButton={handleLogin}
              title={auth.isLoading ? <ActivityIndicator /> : 'Submit'}
            />
          </View>

          <View style={styles.continueWithContainer}>
            <ContinueWith />
          </View>

          <SocialMediaLogin />

          <TouchableOpacity
            onPress={() => props.navigation.navigate(ScreenNames.SignUpDetails)}
            style={styles.signupLink}>
            <Text style={styles.noAccountText}>Don’t have an account? </Text>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.bottomImageContainer}>
            <Image
              source={require('../../../assets/images/Auth/authcmnbdy.png')}
              resizeMode="cover"
              style={styles.bottomImage}
            />
          </View>
        </LinearGradient>
      </SigninTemplate>
    </SafeAreaView>
  );
};

// ... (Rest of the component code, including InputField, SocialMediaLogin, and styles)

const InputField = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showPasswordToggle = false,
  onTogglePassword,
  isPasswordVisible,
}) => (
  <>
    <View style={styles.inputLabel}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <View style={styles.inputBox}>
      <View style={styles.leftInputBox}>
        <Icon name={iconName} style={styles.icon} />
      </View>
      <View style={styles.rightInputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C6C5C5"
          style={styles.inputText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {showPasswordToggle && (
        <TouchableOpacity
          onPress={onTogglePassword}
          style={styles.passwordToggle}>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  </>
);

const SocialMediaLogin = () => (
  <View style={styles.socialMediaContainer}>
    <TouchableOpacity style={styles.socialMediaButton}>
      <Icon name="google" style={[styles.icon, styles.socialMediaIcon]} />
      <Text style={styles.socialMediaText}>Google</Text>
    </TouchableOpacity>
  </View>
);

export default LoginViaProtect;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
  },
  linearGradient: {
    flex: 1,
    paddingTop: 50,
  },
  signin: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  signinText: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: 39,
  },
  inputLabel: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginBottom: 10,
  },
  labelText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 13,
  },
  inputBox: {
    height: 45,
    width: SCREEN_WIDTH * 0.9,
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
  passwordToggle: {
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  icon: {
    fontSize: 20,
    color: '#7F8489',
  },
  inputText: {
    color: 'white',
  },
  forgotPasswordLink: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  submitButtonContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginBottom: 25,
  },
  continueWithContainer: {
    marginVertical: 5,
  },
  socialMediaContainer: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 2.5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  socialMediaButton: {
    height: 50,
    width: SCREEN_WIDTH / 2.35,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    alignItems: 'center',
  },
  socialMediaIcon: {
    marginHorizontal: 20,
    color: Color.white,
  },
  socialMediaText: {
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: 23,
  },
  signupLink: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  noAccountText: {
    color: '#777777',
  },
  signupText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  bottomImageContainer: {
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 5,
  },
});
