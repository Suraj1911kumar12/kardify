import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../styles/Size';
import axios from '../../../../axios';
import {apis} from '../../../utils/api';
import {showMessage} from 'react-native-flash-message';

const EngineHeading = props => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await axios.get('/fetch-all-stories-customer');
        if (response.data.code === 200) {
          setStories(response.data.allStories);
        } else {
          // showMessage({
          //   message: 'Error',
          //   description: response.data.message,
          //   type: 'danger',
          // });
        }
      } catch (error) {
        // showMessage({
        //   message: error.response?.data?.message || 'Failed to fetch stories',
        //   type: 'danger',
        // });
      } finally {
        setLoading(false);
      }
    };

    getStories();
  }, []);

  const renderStoryItem = ({item}) => (
    <View style={styles.headingbdy}>
      <View style={styles.carenginebdy}>
        <Image
          source={{uri: apis.baseImgUrl + item?.image_url}}
          resizeMode="cover"
          style={styles.storyImage}
        />
      </View>
      <View style={styles.cmntxt}>
        <Text style={styles.headingText}>{item.heading}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.readmoretxt}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!stories.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            textAlign: 'center',
          }}>
          No stories available
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={stories}
      renderItem={renderStoryItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default EngineHeading;

const styles = StyleSheet.create({
  headingbdy: {
    height: SCREEN_HEIGHT / 3.7,
    width: SCREEN_WIDTH / 2,
    backgroundColor: '#171819',
    marginTop: 60,
    alignItems: 'center',
    marginLeft: 15,
    borderRadius: 10,
    elevation: 8,
  },
  carenginebdy: {
    height: SCREEN_HEIGHT / 5.5,
    width: SCREEN_WIDTH / 2.25,
    position: 'absolute',
    marginTop: -60,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cmntxt: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 2.25,
    marginTop: 80,
  },
  readmoretxt: {
    height: SCREEN_HEIGHT / 30,
    width: SCREEN_WIDTH / 2.25,
  },
  storyImage: {
    height: '100%',
    width: '100%',
    maxWidth: 158,
    maxHeight: 112,

    borderRadius: 30,
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 5,
  },
  descriptionText: {
    color: '#CAC4C4',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  readMoreText: {
    fontSize: 16,
    color: '#E3BB55',
    fontWeight: '500',
  },
});
