import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import ScreenNames from '../../constants/Screens';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Accessories = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <ScrollView>
          <View style={styles.MainBdy}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Exterior
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Interior
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Car Utility
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Car Part{' '}
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Car{' '}
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Electronics
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Car Care
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(ScreenNames.light)}>
              <View style={styles.cmncrd}>
                <View style={styles.cmncrds}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: SCREEN_HEIGHT / 45,
                      fontWeight: '500',
                    }}>
                    Lighting
                  </Text>
                  <Icon name="arrow-forward-ios" style={{fontSize: 20}} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Accessories;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  cmncrd: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 1.1,
    // backgroundColor:"red",
    backgroundColor: '#1C1F22',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 8,
    opacity: 5,
    x: 1,
    y: 3,
    marginVertical: SCREEN_HEIGHT / 80,
  },
  cmncrds: {
    height: SCREEN_HEIGHT / 14,
    width: SCREEN_WIDTH / 1.25,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  MainBdy: {
    height: SCREEN_HEIGHT / 1,
    width: SCREEN_WIDTH / 1,
  },
});
