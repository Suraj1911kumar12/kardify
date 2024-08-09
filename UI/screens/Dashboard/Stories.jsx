import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Color} from '../../styles/Color';
import Cmnhdr from '../../component/Cmnhdr';
import axios from '../../../axios';
import {showMessage} from 'react-native-flash-message';
const {width} = Dimensions.get('screen');

const Stories = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [stories, setStories] = useState([]);

  const getStories = useCallback(async () => {
    try {
      const response = await axios.post('/fetch-all-stories-customer');
      if (response.data.code === 200) {
        setStories(response.data.data);
      } else {
        showMessage({
          message: 'Error',
          description: response.data.message,
          type: 'danger',
        });
      }
    } catch (error) {
      // console.log(error.response.data.message);
      showMessage({
        message: error.response.data.message || 'Failed to fetch stories',
        // description: error.response.data.message || 'Failed to fetch stories',
        type: 'danger',
      });
    }
  }, []);

  useEffect(() => {
    getStories();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={require('../../../assets/images/CarSection/whitecar.png')}
        style={{width: '100%', height: 75, marginVertical: 10}}
        resizeMode="contain"
      />
      <View style={{gap: 4}}>
        <Text style={{color: Color.white}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <TouchableOpacity>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{height: '100%', width: '100%'}}>
        <ScrollView style={{paddingBottom: 10}}>
          {/* <View style={styles.cardContainer}> */}
          <Cmnhdr
            // backIcon
            title="Stories"
            onPress={() => props.navigation.openDrawer()}
            notification={() =>
              props.navigation.navigate(ScreenNames.notification)
            }
          />
          <FlatList
            data={stories.length > 0 ? stories : arr}
            renderItem={renderItem}
            keyExtractor={item =>
              item?.id?.toLocaleString() || item?.toLocaleString()
            }
            numColumns={2} // Display 2 items per row
            contentContainerStyle={{padding: 10, gap: 2, marginBottom: 50}}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Stories;

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
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1,
    width: width / 2,
    backgroundColor: Color.lightBlack,
    borderRadius: 20,
    margin: 4,
    alignItems: 'center',
    gap: 4,
  },
  readMore: {
    color: Color.yellow,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
