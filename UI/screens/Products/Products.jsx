import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import FullSearchBar from '../../component/FullSearchBar';
import {Color} from '../../styles/Color';
const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';

const Products = () => {
  const navigation = useNavigation();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const renderItem = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate(ScreenNames.productdetails, {
          id: item,
        })
      }
      style={styles.card}>
      <Image
        source={require("../../../assets/images/bodykits.png")}
        style={{width: '100%', height: 100, marginVertical: 10}}
        resizeMode="cover"
      />
      <View style={{gap: 6}}>
        <Text>Sumsung Galaxy</Text>
        <Text>Flagship smartphone</Text>
        <Text>
          <Icon name="star" size={20} color={Color.yellow} />
          4.9
        </Text>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text>₹64,999</Text>
          <Text style={{color: Color.grey, opacity: 0.5}}>₹75,999</Text>
        </View>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{flex: 1}}>
        <Cmnhdr2 backIcon title="Product Page" />
        <FullSearchBar />

        <ScrollView style={{paddingBottom: 10}}>
          <FlatList
            data={arr}
            renderItem={renderItem}
            keyExtractor={item => item.toLocaleString()}
            numColumns={2} // Display 2 items per row
            contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: width,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
    margin: 4,
    paddingBottom: 4,
    alignItems: 'center',
    gap: 8,
  },
  readMore: {
    color: Color.yellow,
    textAlign: 'center',
  },
});
