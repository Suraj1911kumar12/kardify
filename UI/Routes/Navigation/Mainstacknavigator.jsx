import React, {Suspense} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Color} from '../../styles/Color';
import ScreenNames from '../../constants/Screens';
import {UseAuth} from '../../context/AuthContext';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoadingScreen from '../../component/LoadingScreen';
import FlashMessage from 'react-native-flash-message';
import SkeletonScreen from '../../component/SkeletonScreen';
import Notification from '../../component/Notification';
import SkeletonScreen2 from '../../component/SkeletonScreen2';
import Onboarding from '../../screens/Onboarding';
import Products from '../../screens/Products/Products';
import MyOrders from '../../screens/profiles/MyOrders';

// ***************************** Import Components section starts **********************************

const Signin = React.lazy(() => import('../../screens/Auth/Signin'));
const OTPverify = React.lazy(() => import('../../screens/Auth/OTPverify'));
const SignUpNumber = React.lazy(() =>
  import('../../screens/Auth/SignUp/SignUpNumber'),
);
const SignUpNumberOtp = React.lazy(() =>
  import('../../screens/Auth/SignUp/SignUpNumberOtp'),
);
const ForgotPassword = React.lazy(() =>
  import('../../screens/Auth/ForgotPassword'),
);
const ForgotPasswordOTP = React.lazy(() =>
  import('../../screens/Auth/ForgotpasswordOTP'),
);
const ChangePassword = React.lazy(() =>
  import('../../screens/Auth/ChangePassword'),
);
const SignUpDetails = React.lazy(() =>
  import('../../screens/Auth/SignUp/SignUpDetails'),
);

const Home = React.lazy(() => import('../../screens/Home'));
const ProductDetails = React.lazy(() =>
  import('../../screens/ProductDetails/ProductDetails'),
);
// ***************************** Import Components section ends **********************************

const Stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

const Mainstacknavigator = () => {
  const auth = UseAuth();
  return (
    <>
      <Stack.Navigator
        initialRouteName={ScreenNames.onBoardng}
        headerMode="none"
        screenOptions={{
          headerShown: false,
          headerTintColor: Color.white,
          headerStyle: {backgroundColor: Color.theme},
        }}>
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen name={ScreenNames.Home} component={Home} />
            <Stack.Screen name={ScreenNames.myorder} component={MyOrders} />

            <Stack.Screen
              name={ScreenNames.productsList}
              component={Products}
            />
            <Stack.Screen
              name={ScreenNames.productdetails}
              component={ProductDetails}
            />

            <Stack.Screen name={ScreenNames.notification}>
              {props => (
                <Suspense fallback={<LoadingScreen />}>
                  <Notification {...props} />
                </Suspense>
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name={ScreenNames.onBoardng} component={Onboarding} />

            <Stack.Screen name={ScreenNames.LoginScreen} component={Signin} />

            <Stack.Screen name={ScreenNames.Otp} component={OTPverify} />

            <Stack.Screen
              name={ScreenNames.SignUpNumber}
              component={SignUpNumber}
            />

            <Stack.Screen
              name={ScreenNames.SignUpNumberOtp}
              component={SignUpNumberOtp}
            />

            <Stack.Screen
              name={ScreenNames.SignUpDetails}
              component={SignUpDetails}
            />

            <Stack.Screen
              name={ScreenNames.ForgotPassword}
              component={ForgotPassword}
            />

            <Stack.Screen
              name={ScreenNames.ForgotPasswordOTP}
              component={ForgotPasswordOTP}
            />

            <Stack.Screen
              name={ScreenNames.ChangePassword}
              component={ChangePassword}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="bottom" />
    </>
  );
};

export default Mainstacknavigator;
