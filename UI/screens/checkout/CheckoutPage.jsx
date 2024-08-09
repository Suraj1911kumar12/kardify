import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import FullSearchBar from '../../component/FullSearchBar';
import Icon from 'react-native-vector-icons/Entypo';
import {Color} from '../../styles/Color';

const CheckoutPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <Cmnhdr2 backIcon title="Checkout Page" />
        <FullSearchBar />
        <ScrollView>
          <View style={styles.shipAdd}>
            <Text>Shipping Address</Text>
            <View>
              <Icon name="location-pin" size={20} color={Color.white} />
              <View>
                <Text>Home</Text>
                <Text>123 Main St, Anytown, USA 12345</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shipAdd: {
    width: '100%',
    minHeight: 50,
    padding: 15,
  },
});
