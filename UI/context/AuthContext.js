import {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {apis} from '../utils/api';
import ScreenNames from '../constants/Screens';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();

  // -------------------------- Api's Url's Calling ------------------------
  const loginAPI = apis.baseUrl + apis.login;
  const signUpApi = apis.baseUrl + apis.register;
  const signupOTPVerifyApi = apis.baseUrl + apis.regiterOtp;
  const forgotPasswordOtpApi = apis.baseUrl + apis.forgotpassword;

  // --------------------------------Setting State---------------------
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpIdSignUp, setOtpIdSignUp] = useState(null);

  // ------------------------------Api Calling -------------------------------------------------------

  // -----------------------------------Cheking Token -----------------------------
  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);
    if (storedToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // -----------------------login authentication-----------------------------

  const login = async (username, password) => {
    setIsLoading(true);
    // console.log("auth cont", username, password);
    try {
      const response = await axios.post(loginAPI, {
        username: username,
        password: password,
      });
      console.log(response.data.code, 'res');

      if (response.status === 200) {
        if (response.data.code === 200) {
          setIsLoading(false);
          AsyncStorage.setItem('token', `${response?.data?.token}`);
          showMessage({
            message: response?.data?.message || 'Login Successfull ',
            type: 'success',
          });
          checkToken();
        } else if (response.data.code === 400) {
          setIsLoading(false);
          showMessage({
            message: response?.data?.message || 'Invalid Credentials',
            type: 'danger',
          });
        } else {
          setIsLoading(false);
          showMessage({
            message: response?.data?.message || 'Server Error',
            type: 'danger',
          });
        }
      } else {
        setIsLoading(false);
        showMessage({
          message: response?.data?.message || 'Login Failed ',
          type: 'danger',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: error.response?.data?.message || 'Login Failed ',
        type: 'danger',
      });
    }
  };

  // -----------------------Signup authentication-----------------------------

  const SignUp = async (firstname, lastname, email, password) => {
    console.log(firstname, lastname, email, password);
    setIsLoading(true);
    try {
      const response = await axios.post(signUpApi, {
        fullname: firstname + lastname,
        username: email,
        password: password,
        confirm_password: password,
      });
      console.log(response.data);
      if (response.status === 200) {
        showMessage({
          message: response.data.message || 'Signup Successfull ',
          type: 'success',
        });
        navigation.navigate(ScreenNames.SignUpNumberOtp);
      }
      if (response.status === 409) {
        showMessage({
          message: response.data.message || 'Email already exists',
          type: 'danger',
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: error.message || 'Error',
        type: 'danger',
      });
    }
  };

  // -----------------------Signup Otp authentication-----------------------------

  const signupOTPVerify = async otp => {
    setIsLoading(true);
    console.log(otp, otpIdSignUp, 'hskldflsdafjlak');
    try {
      const response = await axios.post(signupOTPVerifyApi, {
        user_id: otpIdSignUp,
        otp: otp,
      });
      // console.log(response);
      if (response.status === 200) {
        setIsLoading(false);
        // Alert.alert('Success', response.data.message);
        showMessage({
          message: response.data.message || 'success',
          type: 'success',
        });
        navigation.navigate(ScreenNames.LoginScreen);
      }
      if (response.status === 400) {
        setIsLoading(false);

        Alert.alert('Error', 'Invalid Otp');
        showMessage({
          message: response.data.message || 'Invalid OTP',
          type: 'danger',
        });
      } else {
        setIsLoading(false);

        // Alert.alert('Error', response.data.message);
        showMessage({
          message: response.data.message || 'error',
          type: 'danger',
        });
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: error.message || 'error',
        type: 'danger',
      });
      // console.error(error);
    }
  };

  // -----------------------forgotPasswordOtpSent authentication-----------------------------

  const forgotPasswordOtpSent = async username => {
    setIsLoading(true);
    console.log(username, 'forgot username');
    try {
      const response = await axios.post(forgotPasswordOtpApi, {
        username: username,
      });
      console.log(response.data.message, 'response');
      if (response.status === 200) {
        setIsLoading(false);
        Alert.alert('Success', response?.data?.message);

        showMessage({
          message: response.data.message || 'success',
          type: 'success',
        });

        navigation.navigate(ScreenNames.ForgotPasswordOTP);
      } else {
        setIsLoading(false);
        // Alert.alert('error', response?.data?.message);
        showMessage({
          message: response?.data?.message || 'error',
          type: 'danger',
        });
      }
    } catch (error) {
      //   Alert.alert('error', error.message);
      showMessage({
        message: error.message || 'error',
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  // ---------------------Logout function---------------------
  const handleLogout = async () => {
    setIsAuthenticated(false);
    setToken(null);
    await AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        handleLogout,
        SignUp,
        signupOTPVerify,
        isLoading,
        forgotPasswordOtpSent,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
