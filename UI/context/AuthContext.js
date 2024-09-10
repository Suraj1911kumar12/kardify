import {createContext, useContext, useEffect, useState} from 'react';
import ScreenNames from '../constants/Screens';
import axios from '../../axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();

  // -------------------------- Api's Url's Calling ------------------------
  // const loginAPI = apis.baseUrl + apis.login;
  const loginAPI = `/login-user-dealer?type=CUSTOMER`;
  const signUpApi = `/register-customer-dealer?type=CUSTOMER`;
  const signupOTPVerifyApi = '/verify-otp-customer-dealer?type=CUSTOMER';

  const forgotPasswordOtpApi = `/send-otp-forgot-password?type=CUSTOMER`;
  const verify_forgot_password = `/verify-forgot-password?type=CUSTOMER`;

  // --------------------------------Setting State---------------------
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpIdSignUp, setOtpIdSignUp] = useState(null);
  const [otpIdForgotPass, setOtpIdForgotPass] = useState(null);

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
          navigation.navigate(ScreenNames.Home);
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
    setIsLoading(true);
    try {
      const response = await axios.post(signUpApi, {
        fullname: firstname + lastname,
        username: email,
        password: password,
        confirm_password: password,
      });
      if (response?.data?.code === 200) {
        showMessage({
          message: response.data.message || 'Signup Successfull ',
          type: 'success',
        });
        console.log('====================================');
        console.log(
          response?.data?.created_user?.id,
          'response?.data?.created_user?.id',
        );
        console.log('====================================');
        setOtpIdSignUp(response?.data?.created_user?.id);
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
        message: error.response.data.message || 'Error',
        type: 'danger',
      });
    }
  };

  // -----------------------Signup Otp authentication-----------------------------

  const signupOTPVerify = async otp => {
    setIsLoading(true);
    try {
      const response = await axios.post(signupOTPVerifyApi, {
        user_id: otpIdSignUp,
        otp: otp,
      });
      console.log(response);

      if (response?.data?.code === 200) {
        setIsLoading(false);
        showMessage({
          message: response.data.message || 'success',
          type: 'success',
        });
        navigation.navigate(ScreenNames.LoginScreen);
      }
      if (response?.data?.code === 400) {
        setIsLoading(false);
        showMessage({
          message: response.data.message || 'Invalid OTP',
          type: 'danger',
        });
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message || 'error',
          type: 'danger',
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showMessage({
        message: error.response.data.message || 'error',
        type: 'danger',
      });
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
        setOtpIdForgotPass(response?.data?.user_id);
        showMessage({
          message: response.data.message || 'success',
          type: 'success',
        });

        navigation.navigate(ScreenNames.ForgotPasswordOTP);
      } else {
        setIsLoading(false);
        showMessage({
          message: response?.data?.message || 'error',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: error.message || 'error',
        type: 'danger',
      });
      setIsLoading(false);
    }
  };

  // ------------------------ forgot password otpVerify --------------------------
  const forgotPasswordOtpVerify = async (otp, password, confirm_password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(verify_forgot_password, {
        user_id: otpIdForgotPass,
        otp: otp,
        new_password: password,
        confirm_password: confirm_password,
      });
      console.log(response?.data?.code, 'response?.data?.code');

      if (response?.data?.code === 200) {
        setIsLoading(false);
        showMessage({
          message: response.data.message || 'success',
          type: 'success',
        });

        navigation.navigate(ScreenNames.LoginScreen);
      }
      if (response?.data?.code === 400) {
        setIsLoading(false);
        showMessage({
          message: 'Invalid OTP',
          type: 'danger',
        });
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message || 'error',
          type: 'danger',
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showMessage({
        message: error.response.data.message || 'error',
        type: 'danger',
      });
    }
  };
  // ---------------------Logout function---------------------
  const handleLogout = async () => {
    setIsAuthenticated(false);
    setToken(null);
    await AsyncStorage.clear();
    navigation.navigate(ScreenNames.LoginScreen);
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
        forgotPasswordOtpVerify,
        setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
