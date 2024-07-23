import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
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

const Onboarding = props => {
  const navigation = useNavigation();
  const [doneValue, setDoneValue] = useState(null);
  const [showHomePage, setshowHomePage] = useState(false);

  const data = [
    {
      id: 1,
      image: image,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis ',
    },
    {
      id: 2,
      image: image2,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis ',
    },
    {
      id: 3,
      image: image3,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut quis scelerisque pharetra vulputate. Consectetur sit nibh ut in vitae. Quis ',
    },
  ];

  const Slides = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          borderWidth: 1,
          flex: 1,
          position: 'relative',
        }}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={{flex: 1, height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={data}
        renderItem={({item}) => <Slides item={item} />}
        activeDotStyle={{
          backgroundColor: Color.yellow,
          marginBottom: 60,
        }}
        dotStyle={{
          backgroundColor: Color.white,
          marginBottom: 60,
        }}
        renderNextButton={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: SCREEN_WIDTH,
              flex: 1,
              marginVertical: 10,
            }}>
            <Text style={{color: Color.white, fontWeight: 'bold'}}>Next</Text>
          </View>
        )}
        renderDoneButton={() => (
          <View style={{width: SCREEN_WIDTH, marginBottom: 50}}>
            <View style={styles.button}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height / 45,
                  Color: Color.white,
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </View>
          </View>
        )}
        onDone={() =>
          setDoneValue(navigation.navigate(ScreenNames.LoginScreen))
        }
        // showSkipButton
        // renderSkipButton={() => (
        //   <View
        //     style={{
        //       position: 'absolute',
        //       width: 10,
        //       height: 10,
        //       flex: 1,
        //       justifyContent: 'flex-start',
        //       borderWidth: 1,
        //     }}>
        //     <Text>Skip</Text>
        //   </View>
        // )}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.black}}>
      <View>hallo</View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    marginBottom: 100,
  },
  text: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  desc: {
    color: Color.grey,
    textAlign: 'center',
    // opacity: 0.8,
  },
  button: {
    width: width / 1.35,
    height: height / 18,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#424750',
    backgroundColor: Color.yellow,
  },
});
