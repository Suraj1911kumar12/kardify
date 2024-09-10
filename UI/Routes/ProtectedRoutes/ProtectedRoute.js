import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {UseAuth} from '../../context/AuthContext';
import ScreenNames from '../../constants/Screens';

const ProtectedRoute = ({component: Component, ...rest}) => {
  const navigation = useNavigation();
  const {token} = UseAuth();
  const auth = token;
  useEffect(() => {
    if (!auth) {
      showMessage({
        message: 'You need to be logged in to access the cart.',
        type: 'danger',
      });
      navigation.navigate(ScreenNames.LoginScreen);
    }
  }, [auth, navigation]);

  // If authenticated, render the component, otherwise render null
  return auth ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
