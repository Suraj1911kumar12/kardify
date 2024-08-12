import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../styles/Color';
import axios from '../../axios';
import Cmnhdr2 from './Cmnheader2';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';

const {width, height} = Dimensions.get('window');

const FullSearchBar = () => {
  const navigation = useNavigation();

  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getProduct = useCallback(async () => {
    try {
      const resp = await axios.get('/get-products-customer');
      if (resp.data.code === 200) {
        setSearchData(resp.data.products);
        setFilteredData(resp.data.products); // Set initial filtered data
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const newData = searchData.filter(item =>
        item.product_name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(newData);
    } else {
      setFilteredData(searchData);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSearchQuery('');
    setFilteredData(searchData); // Reset filtered data when modal is closed
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={30} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={'#222'}
          value={searchQuery}
          onFocus={openModal}
          onPress={openModal} // Open the modal when the input is focused
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.mike}>
          <Icon name="mic" size={20} color={Color.white} />
        </TouchableOpacity>
      </View>

      {/* Full-screen modal for search results */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/images/homeBg.png')}
            resizeMode="stretch"
            style={{flex: 1}}>
            <Cmnhdr2 backIcon title="Search Result" />
            {/* Fixed search bar at the top */}
            <View style={[styles.inputContainer, {margin: 10}]}>
              <Icon name="search" size={30} color="#000" />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={'#222'}
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <TouchableOpacity style={styles.mike} onPress={closeModal}>
                <Icon name="close" size={20} color={Color.white} />
              </TouchableOpacity>
            </View>

            {/* Scrollable list of search results */}
            <View style={{marginVertical: 10}}>
              <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate(ScreenNames.productdetails, {
                        id: item?.id,
                      })
                    }>
                    <Text style={styles.itemText}>{item.product_name}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default FullSearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    width: 'auto',
    height: 40,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#222',
  },
  mike: {
    backgroundColor: '#222',
    borderRadius: 50,
    padding: 2,
    color: '#fff',
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    padding: 10,
    borderColor: '#ddd',
    // borderWidth: 10,
  },
  itemText: {
    color: '#fff',
  },
});
