import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../styles/Color';
import CustomDropdown from '../../component/CustomDropdown';
import axios from '../../../axios';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../constants/Screens';
import {showMessage} from 'react-native-flash-message';

const FilterProductList = props => {
  // console.log('====================================');
  // console.log(props.route.params);
  // console.log('====================================');
  const title = props.route.params.title;
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);
  const [modal, setModal] = useState([]);
  const [year, setYear] = useState([]);

  const [BrandId, setBrandId] = useState('');
  const [modalId, setModalId] = useState('');
  const [YearID, setYearId] = useState('');

  const [sYear, setSYear] = useState('');
  const [eYear, setEYear] = useState('');

  const [showMark, setShowMark] = useState(false);

  useEffect(() => {
    if (id === 13) {
      setShowMark(true);
    }
  }, [id]);

  // getBrandList()
  const getBrandList = async () => {
    try {
      const response = await axios.get('/fetch-car-brands-customers');
      if (response.status === 200) {
        setVehicles(response.data.brandName);
      }
    } catch (error) {
      console.error('Error fetching brand list:', error);
    }
  };

  // getModalList()
  const getModalList = async () => {
    try {
      const response = await axios.get(
        `/fetch-car-models-customers?brand_id=${BrandId}`,
      );
      if (response.status === 200) {
        setModal(response.data.modelName);
      }
    } catch (error) {
      console.error('Error fetching modal list:', error);
    }
  };

  // Generate years dynamically
  useEffect(() => {
    let startYear = sYear;
    let endYear = eYear;
    let newYear = [];
    if (startYear !== '' && endYear !== '') {
      for (let i = startYear; i <= endYear; i++) {
        newYear.push({id: i, year: i}); // Create objects with id and year keys
      }

      setYear(newYear); // Store years in the state
    }
  }, [sYear, eYear]);

  useEffect(() => {
    getBrandList();
  }, []);

  useEffect(() => {
    if (BrandId) {
      getModalList();
    }
  }, [BrandId]);

  const handleVehicleSelect = selectedVehicle => {
    setBrandId(selectedVehicle?.id);
  };

  const handleModelSelect = selectedModel => {
    setModalId(selectedModel?.id);
    setSYear(selectedModel?.start_year);
    setEYear(selectedModel?.end_year);
  };

  const handleYearSelect = selectedYear => {
    setYearId(selectedYear?.id);
  };

  const handleSubmit = async () => {
    // Define the URL based on the ID value
    const url = `get-products-shop-by-car?&product_type=general&car_brand_id=${BrandId}&car_model_id=${modalId}&year=${YearID}`;

    // Validate fields based on the ID value
    if (id === 13) {
      if (!BrandId || !modalId || !YearID) {
        showMessage({
          message: 'Please select all required filters',
          type: 'warning',
        });
        return; // Exit the function early if validation fails
      }
    } else {
      // Optional: add different validation for other IDs or if all fields are required
      if (!BrandId && !modalId && !YearID) {
        showMessage({
          message: 'Please select at least one filter',
          type: 'warning',
        });
        return; // Exit the function early if validation fails
      }
    }

    // Log the URL for debugging
    console.log('====================================');
    console.log(url);
    console.log('====================================');

    // Navigate to the product list screen with the query parameters
    navigation.navigate(ScreenNames.ProductListforFilter, url);

    try {
      // Handle submit logic here (e.g., API call)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // const handleSubmit = async () => {
  //   if (id === 13) {
  //     if (BrandId === '' && modalId === '' && YearID === '') {
  //       showMessage({
  //         message: 'Please select at least one filter',
  //         type: 'warning',
  //       });
  //     } else {
  //       console.log('====================================');
  //       console.log(
  //         `get-products-shop-by-car?&product_type=general&car_brand_id=${BrandId}&car_model_id=${modalId}&year=${YearID}`,
  //       );
  //       console.log('====================================');
  //       navigation.navigate(
  //         ScreenNames.ProductListforFilter,
  //         `get-products-shop-by-car?&product_type=general&car_brand_id=${BrandId}&car_model_id=${modalId}&year=${YearID}`,
  //       );
  //       try {
  //         // Handle submit logic (e.g., API call)
  //       } catch (error) {
  //         console.error('Error submitting form:', error);
  //       }
  //     }
  //   } else {
  //     if (BrandId === '' && modalId === '' && YearID === '') {
  //       showMessage({
  //         message: 'Please select at least one filter',
  //         type: 'warning',
  //       });
  //     } else {
  //       console.log('====================================');
  //       console.log(
  //         `get-products-shop-by-car?&product_type=general&car_brand_id=${BrandId}&car_model_id=${modalId}&year=${YearID}`,
  //       );
  //       console.log('====================================');
  //       navigation.navigate(
  //         ScreenNames.ProductListforFilter,
  //         `get-products-shop-by-car?&product_type=general&car_brand_id=${BrandId}&car_model_id=${modalId}&year=${YearID}`,
  //       );
  //       try {
  //         // Handle submit logic (e.g., API call)
  //       } catch (error) {
  //         console.error('Error submitting form:', error);
  //       }
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={styles.backgroundImage}>
        <View style={styles.cardBody}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/Auth/kardifylogo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.titleText}>{title || 'Vehicle Selection'}</Text>

            {/* Car Make/Brand Dropdown */}
            <View>
              <Text style={styles.headline}>
                Choose Car Make/Brand{' '}
                {showMark && (
                  <Text
                    style={{
                      color: Color.red,
                    }}>
                    *
                  </Text>
                )}
              </Text>
              <CustomDropdown
                labelKey="brand_name"
                data={vehicles}
                onSelect={handleVehicleSelect}
              />
            </View>

            {/* Car Model Dropdown */}
            <View>
              <Text style={styles.headline}>
                Choose Car Model{' '}
                {showMark && (
                  <Text
                    style={{
                      color: Color.red,
                    }}>
                    *
                  </Text>
                )}
              </Text>
              <CustomDropdown
                labelKey="model_name"
                data={modal}
                onSelect={handleModelSelect}
              />
            </View>

            {/* Year Dropdown */}
            <View>
              <Text style={styles.headline}>
                Choose Year{' '}
                {showMark && (
                  <Text
                    style={{
                      color: Color.red,
                    }}>
                    *
                  </Text>
                )}
              </Text>
              <CustomDropdown
                labelKey="year"
                data={year}
                onSelect={handleYearSelect}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={{color: Color.white, fontSize: 16, fontWeight: 600}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FilterProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  cardBody: {
    flex: 1,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: Color.BLACK,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
    minHeight: 500,
    gap: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  headline: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  btn: {
    backgroundColor: Color.yellow,
    borderRadius: 8,
    height: 50,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    alignItems: 'center',
    justifyContent: 'center',
  },
});
