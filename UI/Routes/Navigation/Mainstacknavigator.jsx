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
import Home from '../../screens/Home';
import ContactUs from '../../screens/Dashboard/ContactUs';
import CheckoutPage from '../../screens/checkout/CheckoutPage';
import PrivacyPolicy from '../../screens/StaticPages/PrivacyPolicy';
import ReturnPolicy from '../../screens/StaticPages/ReturnPolicy';
import FeedbackPage from '../../screens/StaticPages/Feedback';
import PurchaseGiftCard from '../../screens/StaticPages/PurchaseGiftCard';
import CustomerSupportPage from '../../screens/StaticPages/CustomerSupport';
import RefundPolicy from '../../screens/StaticPages/RefundPolicy';
import Rewards from '../../screens/StaticPages/Rewards';
import TermsAndConditions from '../../screens/StaticPages/TermsandConditions';
import AboutUs from '../../screens/StaticPages/AboutUs';
import ShippingPolicy from '../../screens/StaticPages/ShippingPolicy';
import ProductDetails from '../../screens/ProductDetails/ProductDetails';
import Signin from '../../screens/Auth/Signin';
import OTPverify from '../../screens/Auth/OTPverify';
import SignUpNumber from '../../screens/Auth/SignUp/SignUpNumber';
import SignUpNumberOtp from '../../screens/Auth/SignUp/SignUpNumberOtp';
import ForgotPasswordOTP from '../../screens/Auth/ForgotpasswordOTP';
import ChangePassword from '../../screens/Auth/ChangePassword';
import ForgotPassword from '../../screens/Auth/ForgotPassword';

// ***************************** Import Components section starts **********************************

// const Signin = React.lazy(() => import('../../screens/Auth/Signin'));
// const OTPverify = React.lazy(() => import('../../screens/Auth/OTPverify'));
// const SignUpNumber = React.lazy(() =>
//   import('../../screens/Auth/SignUp/SignUpNumber'),
// );
// const SignUpNumberOtp = React.lazy(() =>
//   import('../../screens/Auth/SignUp/SignUpNumberOtp'),
// );
// const ForgotPassword = React.lazy(() =>
//   import('../../screens/Auth/ForgotPassword'),
// );
// const ForgotPasswordOTP = React.lazy(() =>
//   import('../../screens/Auth/ForgotpasswordOTP'),
// );
// const ChangePassword = React.lazy(() =>
//   import('../../screens/Auth/ChangePassword'),
// );
const SignUpDetails = React.lazy(() =>
  import('../../screens/Auth/SignUp/SignUpDetails'),
);

// const Home = React.lazy(() => import('../../screens/Home'));
// const Contactus = React.lazy(() => import('../../screens/Dashboard/ContactUs'));

// const PrivacyPolicy = React.lazy(() =>
//   import('../../screens/StaticPages/PrivacyPolicy'),
// );
// const ReturnPolicy = React.lazy(() =>
//   import('../../screens/StaticPages/ReturnPolicy'),
// );
// const RefundPolicy = React.lazy(() =>
//   import('../../screens/StaticPages/RefundPolicy'),
// );
// const ShippingPolicy = React.lazy(() =>
//   import('../../screens/StaticPages/ShippingPolicy'),
// );
// const AboutUs = React.lazy(() => import('../../screens/StaticPages/AboutUs'));
// const TermsConditions = React.lazy(() =>
//   import('../../screens/StaticPages/TermsandConditions'),
// );
// const Feedback = React.lazy(() => import('../../screens/StaticPages/Feedback'));
// const PurchaseGiftCard = React.lazy(() =>
//   import('../../screens/StaticPages/PurchaseGiftCard'),
// );
// const CustomerSupport = React.lazy(() =>
//   import('../../screens/StaticPages/CustomerSupport'),
// );
// const Rewards = React.lazy(() => import('../../screens/StaticPages/Rewards'));

// const CheckoutPage = React.lazy(() =>
//   import('../../screens/checkout/CheckoutPage'),
// );

// const ProductDetails = React.lazy(() =>
//   import('../../screens/ProductDetails/ProductDetails'),
// );
// ***************************** Import Components section ends **********************************

const Stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

const Mainstacknavigator = () => {
  const auth = UseAuth();
  console.log(auth.token);
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
            <Stack.Screen name={ScreenNames.contactus} component={ContactUs} />
            <Stack.Screen
              name={ScreenNames.checkout}
              component={CheckoutPage}
            />
            <Stack.Screen
              name={ScreenNames.privacypolicy}
              component={PrivacyPolicy}
            />

            <Stack.Screen
              name={ScreenNames.returnpolicy}
              component={ReturnPolicy}
            />
            <Stack.Screen name={ScreenNames.feedback} component={FeedbackPage} />
            <Stack.Screen
              name={ScreenNames.purchaseGiftCard}
              component={PurchaseGiftCard}
            />
            <Stack.Screen
              name={ScreenNames.customerSupport}
              component={CustomerSupportPage}
            />

            <Stack.Screen
              name={ScreenNames.refundPolicy}
              component={RefundPolicy}
            />
            <Stack.Screen name={ScreenNames.reward} component={Rewards} />
            <Stack.Screen
              name={ScreenNames.termsAndConditions}
              component={TermsAndConditions}
            />
            <Stack.Screen name={ScreenNames.aboutus} component={AboutUs} />
            <Stack.Screen
              name={ScreenNames.shippingpolicy}
              component={ShippingPolicy}
            />

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
