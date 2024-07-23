import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {apis} from '../../../utils/api';
const Catalogue = props => {
  const categoryApi = apis.baseUrl + apis.category;

  const arr = [
    {id: 1, name: 'Exterior'},
    {id: 1, name: 'Interior'},
    {id: 1, name: 'AUDIO/VIDEO'},
    {id: 1, name: 'LIGHTS'},
    {id: 1, name: 'CAR CARE'},
    {id: 1, name: 'INSTALLATION'},
  ];

  const [category, setCategory] = useState([]);

  const getCategoryData = async () => {
    try {
      const res = await axios.get(categoryApi);
      // console.log("res for categorty", res.data.categories);
      setCategory(res.data.categories);
    } catch (error) {
      console.error(error, 'category Error');
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <View style={styles.catHeader}>
        <Text style={styles.catText}>Catalogue</Text>
      </View>

      <View style={styles.grid}>
        {arr &&
          arr.map((ele, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.boxView, {marginLeft: i == 0 ? 10 : 0}]}>
                <Text numberOfLines={2} style={styles.valText}>
                  {ele?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
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
    display: 'flex',
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
    borderRadius: 30,
    marginBottom: 30,
    backgroundColor: '#1C1F22',
    elevation: 1,
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
  },
});
