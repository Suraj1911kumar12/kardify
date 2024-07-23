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
import CustomTab from '../../component/CustomTab';

const MyOrders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <ScrollView style={{paddingBottom: 10}}>
          {/* <View style={styles.cardContainer}> */}
          <Cmnhdr2 backIcon title="My Orders" />
          <CustomTab />
          {/* <FlatList
            data={arr}
            renderItem={renderItem}
            keyExtractor={item => item.toLocaleString()}
            numColumns={2} // Display 2 items per row
            contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
          /> */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
