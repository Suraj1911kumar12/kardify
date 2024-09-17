import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Voice from '@react-native-voice/voice'; // Import the Voice module
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../../axios';
import Cmnhdr2 from './Cmnheader2';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../constants/Screens';
import {Color} from '../styles/Color';
import {apis} from '../utils/api';

const {width} = Dimensions.get('window');

const FullSearchBar = () => {
  const navigation = useNavigation();

  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState('');

  // Fetch product data
  const getProduct = useCallback(async () => {
    try {
      const resp = await axios.get('/get-products-customer');
      if (resp.data.code === 200) {
        setSearchData(resp.data.products);
        setFilteredData(resp.data.products);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }, []);

  useEffect(() => {
    getProduct(); // Load products on component mount

    Voice.onSpeechResults = onSpeechResults; // Event listener for speech results
    Voice.onSpeechError = onSpeechError; // Event listener for speech errors

    // Cleanup voice listeners on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [getProduct]);

  // Request microphone permissions
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // iOS handles permissions differently
    }
  };

  // Start listening for voice input
  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.error('Microphone permission denied');
      return;
    }
    try {
      setIsModalVisible(true);
      setIsListening(true);
      await Voice.start('en-US'); // Start voice recognition for English (US)
      setVoiceResult('Listning....');
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      setIsListening(false);
    }
  };

  // Stop listening
  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop(); // Stop voice recognition
      // Perform search with the last recognized voice result
      handleSearch(voiceResult);
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  // Callback when speech recognition results are available
  const onSpeechResults = event => {
    if (event.value && event.value.length > 0) {
      const spokenText = event.value[0];
      setVoiceResult(spokenText); // Update voiceResult with spoken text
      setSearchQuery(spokenText); // Update search query with spoken text
      handleSearch(spokenText); // Trigger search with the recognized text
    }
    // Call stopListening after processing results to perform a search
    stopListening();
  };

  // Callback for speech recognition errors
  const onSpeechError = event => {
    console.error('Speech Recognition Error: ', event.error);
    setIsListening(false);
  };

  // Handle search input and filter results
  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const newData = searchData.filter(item =>
        item.product_name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(newData);
    } else {
      setFilteredData(searchData); // Reset to original data if search query is cleared
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSearchQuery('');
    setFilteredData(searchData); // Reset search when modal is closed
  };

  // Microphone press handler to toggle between listening states
  const handleMicPress = () => {
    isListening ? stopListening() : startListening();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={openModal}>
        <Icon name="search" size={30} color="#000" />
        <Text style={styles.placeholderText}>{'Search'}</Text>
        <TouchableOpacity style={styles.mike} onPress={handleMicPress}>
          <Icon
            name={isListening ? 'mic-off' : 'mic'}
            size={20}
            color={Color.white}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Modal for search results */}
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

            {/* Search bar inside modal */}
            <View style={[styles.inputContainer, {margin: 10}]}>
              <Icon name="search" size={30} color="#000" />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#222"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true} // Focus on the input when modal opens
              />
              <TouchableOpacity style={styles.mike} onPress={closeModal}>
                <Icon name="close" size={20} color={Color.white} />
              </TouchableOpacity>
            </View>

            {/* Search results list */}
            <View style={{marginVertical: 10}}>
              <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      setIsModalVisible(false);
                      navigation.navigate(ScreenNames.productdetails, {
                        id: item?.id,
                      });
                    }}>
                    <View style={styles.img}>
                      <Image
                        source={{
                          uri: apis.baseImgUrl + item?.images[0]?.image_url,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.txt}>
                      <Text style={styles.itemText}>{item.product_name}</Text>
                    </View>
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
    zIndex: 10,
  },
  placeholderText: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#222',
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: '#222',
  },
  mike: {
    backgroundColor: '#222',
    borderRadius: 50,
    padding: 2,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  itemText: {
    color: '#fff',
    width: 200,
  },
  img: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
