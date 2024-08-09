import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {apis} from '../../../utils/api';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../../constants/Screens';

const Catalogue = () => {
  const navigation = useNavigation();
  const categoryApi = apis.baseUrl + apis.category;

  const [category, setCategory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getCategoryData = async () => {
    try {
      const res = await axios.get(categoryApi);
      setCategory(res.data.categories);
    } catch (error) {
      console.error(error, 'category Error');
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const displayedCategories = showAll ? category : category.slice(0, 6); // Display two rows initially

  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <View style={styles.catHeader}>
        <Text style={styles.catText}>Catalogue</Text>
      </View>

      <ScrollView>
        <View style={styles.grid}>
          {displayedCategories.map((ele, i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenNames.productsList, ele?.id)
              }
              key={ele?.id}
              style={[styles.boxView, {marginLeft: i % 3 === 0 ? 10 : 0}]}>
              <Text numberOfLines={2} style={styles.valText}>
                {ele?.category_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => setShowAll(!showAll)}>
          <Text style={styles.viewAllText}>
            {showAll ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Catalogue;

const styles = StyleSheet.create({
  catText: {
    fontSize: 24,
    lineHeight: 50,
    fontWeight: '600',
    color: 'white',
  },
  catHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    height: 89,
    width: 87,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: '#1C1F22',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    paddingHorizontal: 3,
  },
  valText: {
    fontSize: 13,
    color: 'white',
    lineHeight: 18,
    fontWeight: '500',
  },
  viewAllBtn: {
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C1F22',
    marginVertical: 20,
  },
  viewAllText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
