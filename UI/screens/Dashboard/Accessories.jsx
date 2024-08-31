import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import {Color} from '../../styles/Color';
import Cmnhdr2 from '../../component/Cmnheader2';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your icon library
import {UseAuth} from '../../context/AuthContext';

const Accessories = props => {
  const navigation = useNavigation();

  const [subcategories, setSubCategories] = useState([]);
  const [subId, setSubId] = useState(null);
  const [superSubCat, setSuperSubCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const {params} = props.route;
  const auth = UseAuth();
  // console.log('====================================');
  // console.log(auth.token);
  // console.log('====================================');

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const res = await axios.get(
          `/fetch-subcategories-customers?category_id=${params}`,
        );
        if (res?.data?.code === 200) {
          setSubCategories(res?.data?.subcategories);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error('Error fetching accessories:', error);
      } finally {
        setLoading(false);
      }
    };

    getSubCategories();
  }, [params]);

  useEffect(() => {
    if (subId) {
      // console.log('====================================');
      // console.log('id', subId, 'id');

      // console.log('====================================');
      const getSuperSubCategories = async () => {
        try {
          const res = await axios.get(
            `/fetch-supersubcategories-customers?sub_category_id=${subId}`,
          );
          if (res?.data?.code === 200) {
            setSuperSubCat(res?.data?.superSubcategories);
          } else {
            console.log(res.data.message);
          }
        } catch (error) {
          console.error('Error fetching accessories:', error);
        }
      };
      getSuperSubCategories();
    }
  }, [subId]);

  const handleSubCategoryPress = id => {
    setSubId(id);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => handleSubCategoryPress(item?.id)}
        style={styles.cardInner}>
        <View style={{width: '20%'}}>
          <Image
            source={{uri: apis.baseImgUrl + item?.image_url}}
            style={styles.image}
          />
        </View>
        <View style={{width: '70%'}}>
          <Text style={styles.text}>{item.sub_category_name}</Text>
        </View>
        <View style={{width: '10%', alignItems: 'center'}}>
          <Icon name="chevron-down" size={20} color={Color.white} />
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Color.white} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={styles.background}>
        <Cmnhdr2 backIcon title="Accessories" />
        <ScrollView style={{paddingBottom: 10}}>
          {subcategories.length > 0 ? (
            <FlatList
              data={subcategories}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              numColumns={1}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <View style={styles.noStoriesContainer}>
              <Text style={styles.noStoriesText}>No accessories available</Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Accessories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lightBlack,
  },
  flatListContent: {
    padding: 10,
    gap: 2,
    marginBottom: 50,
  },
  card: {
    height: 'auto',
    backgroundColor: Color.lightBlack,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
    marginVertical: 10,
    elevation: 5,
  },
  cardInner: {
    height: 60,
    backgroundColor: Color.lightBlack,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  image: {
    marginVertical: 10,
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  text: {
    color: Color.white,
    textTransform: 'capitalize',
  },
  icon: {
    fontSize: 20,
    color: Color.white,
  },
  superSubCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.darkGray,
    borderRadius: 5,
    marginVertical: 5,
  },
  superSubText: {
    color: Color.white,
    fontSize: 16,
  },
  noStoriesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noStoriesText: {
    color: Color.white,
    fontSize: 18,
  },
  subcategories: {
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
  },
});
