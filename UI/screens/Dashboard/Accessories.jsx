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
import SkeletonLoader from '../../component/SkeletonLoader';

import ScreenNames from '../../constants/Screens';

const Accessories = props => {
  const navigation = useNavigation();

  const [subcategories, setSubCategories] = useState([]);
  const [subId, setSubId] = useState(null);
  const [superSubCat, setSuperSubCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubId, setSelectedSubId] = useState(null);
  const {params} = props.route;
  const [showSuperSub, setShowSuperSub] = useState(false);
  const auth = UseAuth();

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
    const getSuperSubCategories = async () => {
      try {
        const res = await axios.get(
          `/fetch-supersubcategories-customers?category_id=${params}`,
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
  }, [params]);

  const handleSubCategoryPress = id => {
    setSubId(prevSubId => (prevSubId === id ? null : id));
  };

  const renderItem = ({item}) => (
    <>
      <View style={styles.card}>
        <TouchableOpacity
          // onPress={() => handleSubCategoryPress(item?.id)}
          onPress={() => {
            const hasSubCategories =
              superSubCat?.filter(filter => filter.sub_category_id === item?.id)
                .length > 0;
            if (hasSubCategories) {
              handleSubCategoryPress(item?.id);
            } else {
              // Navigate to the product page
              navigation.navigate(
                ScreenNames.productsList,
                `sub_category_id=${item?.id}`,
              );
            }
          }}
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
          {superSubCat?.filter(filter => filter.sub_category_id === item?.id)
            .length > 0 ? (
            <View style={{width: '10%', alignItems: 'flex-start'}}>
              <Icon name="chevron-down" size={20} color={Color.white} />
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
      {subId === item?.id ? (
        <View style={{height: 'auto', padding: 10}}>
          <View>
            {superSubCat
              ?.filter(filter => filter.sub_category_id === item?.id)
              ?.map(e => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      ScreenNames.productsList,
                      `super_sub_category_id=${e?.id}`,
                    )
                  }
                  style={{
                    gap: 5,
                    flexDirection: 'row',
                    backgroundColor: Color.lightBlack,
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    elevation: 5,
                    marginVertical: 5,
                    // justifyContent: 'center',
                  }}
                  key={e?.id}>
                  <Text style={{fontSize: 16, color: Color.white}}>
                    {e?.super_sub_category_name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={styles.background}>
        <Cmnhdr2 backIcon title="Accessories" />
        <ScrollView style={{paddingBottom: 10}}>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
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
                  <Text style={styles.noStoriesText}>
                    No accessories available
                  </Text>
                </View>
              )}
            </>
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
