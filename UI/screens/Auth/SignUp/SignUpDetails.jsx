import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import CustomButton from '../../../component/CustomButton';
import ScreenNames from '../../../constants/Screens';
import {UseAuth} from '../../../context/AuthContext';
import ContinueWith from '../../../component/ContinueWith';
import LoginHeader from '../../../component/LoginHeader';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color} from '../../../styles/Color';

const SignUpOneScreen = props => {
  const auth = UseAuth();

  const [showPass, setShowPass] = useState(true);
  const [name, setName] = useState('');
  const [mblNo, setMblNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateMobile = mblNo => {
    return /^\d{10}$/.test(mblNo);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    setError('');

    if (!name || !mblNo || !password || !email) {
      // setError('Please fill all details.');
      showMessage({
        message: 'Please fill all details.',
        type: 'danger',
      });
      return;
    }
    if (!validateEmail(email)) {
      // setError('Please enter a valid email.');
      showMessage({
        message: 'Please enter a valid email.',
        type: 'danger',
      });
      return;
    }
    if (!validateMobile(mblNo)) {
      // setError('Please enter a valid mobile number.');
      showMessage({
        message: 'Please enter a valid mobile number.',
        type: 'danger',
      });
      return;
    }
    if (!validatePassword(password)) {
      // setError('Password must be at least 8 characters long.');
      showMessage({
        message: 'Password must be at least 6 characters long.',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      await auth.SignUp(name, mblNo, email, password);
      // showMessage({
      //   message:  'Sign Up Successful!',
      //   type: 'success',
      // });
      // props.navigation.navigate(ScreenNames.Otp);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.mbleno}>
          <Text style={styles.inputLabel}>Your Name</Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="user" style={styles.icon} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
            />
          </View>
        </View>

        <View style={styles.mbleno}>
          <Text style={styles.inputLabel}>Mobile No</Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="phone" style={styles.icon} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={mblNo}
              onChangeText={setMblNo}
              placeholder="Enter your mobile no."
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.mbleno}>
          <Text style={styles.inputLabel}>Email Id</Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="envelope" style={styles.icon} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.mbleno}>
          <Text style={styles.inputLabel}>Password</Text>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.leftInputBox}>
            <FontAwesome name="lock" style={styles.icon} />
          </View>
          <View style={styles.rightInputBox}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={'#C6C5C5'}
              style={{color: 'white'}}
              secureTextEntry={showPass}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowPass(!showPass)}
            style={styles.leftInputBox}>
            <Feather name={showPass ? 'eye' : 'eye-off'} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.sbmitbtn}>
          <CustomButton
            onPressButton={handleRegister}
            title={loading ? <ActivityIndicator color="#fff" /> : 'Submit'}
          />
        </View>

        <View style={{marginVertical: 5}}>
          <ContinueWith />
        </View>

        <View style={styles.sclmediacmnbdy}>
          <TouchableOpacity style={styles.googlebdy}>
            <Icon name="google" style={styles.socialIcon} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenNames.LoginScreen)}
          style={styles.signInLink}>
          <Text style={{color: '#777777'}}>Already Have an account? </Text>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = {
  linearGradient: {
    flex: 1,
  },
  signin: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: 39,
  },
  mbleno: {
    marginLeft: SCREEN_WIDTH / 10,
    marginBottom: 3,
  },
  inputBox: {
    height: 40,
    width: SCREEN_WIDTH / 1.1,
    borderRadius: 8,
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
  icon: {
    fontSize: 20,
    color: '#7F8489',
  },
  inputLabel: {
    color: Color.white,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginVertical: 10,
  },
  sbmitbtn: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  sclmediacmnbdy: {
    height: SCREEN_HEIGHT / 10,
    width: SCREEN_WIDTH / 2.5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  googlebdy: {
    width: SCREEN_WIDTH / 2.35,
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#1C1F22',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 25,
    marginHorizontal: 20,
    color: '#ffffff',
  },
  socialText: {
    color: '#ffffff',
    fontWeight: '500',
    lineHeight: 23,
  },
  signInLink: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signInText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#ffffff',
  },
};

export default SignUpOneScreen;
