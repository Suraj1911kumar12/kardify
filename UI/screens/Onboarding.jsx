import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenNames from '../constants/Screens';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../styles/Size';
import {Color} from '../styles/Color';
import image2 from '../../assets/images/onboarding/ob2.png';
import image from '../../assets/images/onboarding/splash.png';
import image3 from '../../assets/images/onboarding/main.png';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

const Onboarding = () => {
  const navigation = useNavigation();
  const [showHomePage, setShowHomePage] = useState(false);

  const data = [
    {
      id: 1,
      image: image,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis',
    },
    {
      id: 2,
      image: image2,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis',
    },
    {
      id: 3,
      image: image3,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis',
    },
  ];

  const Slides = ({item}) => {
    return (
      <View style={styles.slideContainer}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={[styles.imageBackground, {backgroundColor: 'gray'}]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate(ScreenNames.LoginScreen)}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <AppIntroSlider
          data={data}
          renderItem={({item}) => <Slides item={item} />}
          activeDotStyle={styles.activeDotStyle}
          dotStyle={styles.dotStyle}
          renderNextButton={() => (
            <View style={styles.buttonContainer2}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          )}
          renderDoneButton={() => (
            <View style={styles.buttonContainer}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </View>
          )}
          onDone={() => navigation.navigate(ScreenNames.LoginScreen)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.black}}>
      <View>Hallo</View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  slideContainer: {
    alignItems: 'center',
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    alignItems: 'center',
    marginBottom: 100,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  description: {
    color: Color.grey,
    textAlign: 'center',
  },
  buttonContainer: {
    width: width,
    // marginHorizontal: 10,
    height: height / 18,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: -65,
    marginHorizontal: 50,
    backgroundColor: Color.yellow,
    overflow: 'hidden',
  },
  buttonContainer2: {
    width: width,
    height: height / 18,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: -15,
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: height / 45,
  },
  continueButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: height / 45,
    color: Color.white,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 20,
  },
  skipButtonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeDotStyle: {
    backgroundColor: Color.yellow,
    marginBottom: 60,
  },
  dotStyle: {
    backgroundColor: Color.white,
    marginBottom: 60,
  },
});
