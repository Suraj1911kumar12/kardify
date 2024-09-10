import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Color} from '../../styles/Color';
import ScreenNames from '../../constants/Screens';
import {UseAuth} from '../../context/AuthContext';
import FlashMessage from 'react-native-flash-message';

// Directly import screens
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
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import ForgotPasswordOTP from '../../screens/Auth/ForgotpasswordOTP';
import ChangePassword from '../../screens/Auth/ChangePassword';
import SignUpDetails from '../../screens/Auth/SignUp/SignUpDetails';
import Accessories from '../../screens/Dashboard/Accessories';
import WishList from '../../screens/Wishlist/WishList';
import LoginViaProtect from '../../screens/Auth/LoginViaProtect';
import {checkOnboardingStatus} from '../../utils/isOnboarded';
import PaymentSuccessful from '../../component/PaymentSuccessful';
import AddressChange from '../../screens/AddressChange/AddressChange';
import UpdateProfile from '../../screens/profiles/UpdateProfile';

const Stack = createNativeStackNavigator();

const Mainstacknavigator = () => {
  const auth = UseAuth();
  const {token} = auth;

  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const hasSeenOnboarding = await checkOnboardingStatus();
      setIsOnboarding(!hasSeenOnboarding);
    };
    checkStatus();
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName={ScreenNames.onBoardng}
        screenOptions={{
          headerShown: false,
          headerTintColor: Color.white,
          headerStyle: {backgroundColor: Color.theme},
        }}>
        {/* Public Screens */}

        <Stack.Screen
          name={ScreenNames.onBoardng}
          component={Onboarding}
          options={{headerShown: false}}
        />

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

        <Stack.Screen name={ScreenNames.myorder} component={MyOrders} />
        <Stack.Screen name={ScreenNames.contactus} component={ContactUs} />

        <Stack.Screen name={ScreenNames.accessories} component={Accessories} />
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
        <Stack.Screen name={ScreenNames.productsList} component={Products} />
        <Stack.Screen
          name={ScreenNames.productdetails}
          component={ProductDetails}
        />
        {/* Always Accessible Screens */}
        <Stack.Screen name={ScreenNames.Home} component={Home} />
        <Stack.Screen
          name={ScreenNames.LoginViaProtect}
          component={LoginViaProtect}
        />
        {/* Restricted Screens */}
        <Stack.Screen name={ScreenNames.wishlist} component={WishList} />
        <Stack.Screen name={ScreenNames.checkout} component={CheckoutPage} />
        <Stack.Screen
          name={ScreenNames.PaymentSuccessful}
          component={PaymentSuccessful}
        />
        <Stack.Screen
          name={ScreenNames.addressChange}
          component={AddressChange}
        />
        <Stack.Screen
          name={ScreenNames.profileChange}
          component={UpdateProfile}
        />
      </Stack.Navigator>
      <FlashMessage position="bottom" />
    </>
  );
};

export default Mainstacknavigator;
