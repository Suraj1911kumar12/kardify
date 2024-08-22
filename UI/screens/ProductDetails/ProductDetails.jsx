import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import Cmnhdr2 from '../../component/Cmnheader2';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/Size';
import {Color} from '../../styles/Color';
import axios from '../../../axios';
import {apis} from '../../utils/api';
import RenderHTML from 'react-native-render-html';
import {addProduct} from '../../redux/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import {AirbnbRating} from 'react-native-ratings';

const ProductDetails = ({route, navigation}) => {
  const auth = UseAuth();
  const {id} = route.params;
  // console.log(id, 'id');

  const {width} = useWindowDimensions();

  const [selectedAttribute, setSelectedAttribute] = useState(null); // State to store the selected attribute
  const [attributes, setAttributes] = useState([]); // State to store attribute options
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [imageIndex, setImageIndex] = useState(0); // State to keep track of the current image index
  const flatListRef = useRef(null); // Reference to the FlatList
  const [addData, setAddData] = useState({
    id: '',
    combination_id: '',
    quantity: '',
  });

  const getProductDetails = useCallback(async () => {
    try {
      const res = await axios.get(`/get-products-customer?product_id=${id}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      if (res.data.code === 200) {
        setProductDetail(res?.data?.products);
        setAddData({
          id: res?.data?.products[0].id,
          // combination_id: res?.data?.products[0].combination_id,
          quantity: res?.data?.products[0].quantity,
        });
        const attributeOptions =
          res?.data?.products[0]?.product_attributes_associations?.map(
            attr => ({
              label: attr.combination,
              value: {
                id: attr.id,
                combination: attr.combination,
                price: attr.price,
              },
            }),
          );
        setAttributes(attributeOptions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, []);

  const addToCart = item => {
    try {
      dispatch(addProduct(item));
      showMessage({
        message: 'Product added to cart',
        type: 'success',
      });
    } catch (error) {
      console.error(error.respons.data.message, 'error');
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  // / console.log(selectedAttribute, 'new');
  // const resp = await axios.post(
  //   '/add-to-cart',
  //   {
  //     product_id: addData.id,
  //     combination_id: selectedAttribute?.id,
  //     quantity: addData.quantity,
  //   },
  //   {
  //     headers: {
  //       Authorization: auth.token,
  //     },
  //   },
  // );

  // if (resp.data.code === 200) {
  //   console.log('Product added to cart successfully');
  //   showMessage({
  //     message: 'Product added to cart',
  //     type: 'success',
  //   });
  // } else {
  //   // console.log('Error adding product to cart');
  //   showMessage({
  //     message: resp.data.message || 'Error adding product to cart',
  //     type: 'danger',
  //   });
  // }

  // console.log(selectedAttribute, addData, 'selcedsfd');

  const dispatch = useDispatch();
  const addedItem = useSelector(state => state);
  console.log(addedItem?.item, 'addeditem');

  const addItem = item => {
    if (selectedAttribute) {
      addToCart(item);
    } else {
      showMessage({
        message: 'Please select an attribute',
        type: 'danger',
      });
    }
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width); // Calculate the current image index
    setImageIndex(index);
  };

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={styles.skeletonTextSmall} />
      {/* Add more skeletons as needed */}
    </View>
  );

  const renderItemDetails = ({item}) => {
    const getDynamicFontSize = textLength => {
      if (textLength > 50) return 22; // Adjust this threshold and size as needed
      if (textLength > 15) return 24;
      return 28;
    };
    const isNameTooLong = item?.product_name.length > 20;

    return (
      <>
        <View style={{flex: 1, minHeight: SCREEN_HEIGHT, padding: 10}}>
          <View style={{height: 200}}>
            <FlatList
              data={item?.images}
              horizontal
              pagingEnabled
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={image => image.id.toString()}
              renderItem={({item: image}) => (
                <Image
                  style={{
                    width: width - 40,
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 2,
                  }}
                  source={{uri: apis.baseImgUrl + image.image_url}}
                />
              )}
              onScroll={handleScroll} // Track the scroll event
              ref={flatListRef} // Attach the reference
            />
            <View style={styles.dotContainer}>
              {item?.images?.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === imageIndex ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={{flex: 1, gap: 10, marginVertical: 20}}>
            <View style={{gap: 5}}>
              {/* Here i have to make a select to select attributes */}
              {attributes.length > 0 && (
                <View style={{marginVertical: 10}}>
                  <Text style={{color: Color.white, fontWeight: 'bold'}}>
                    Select Attribute:
                  </Text>
                  <Pressable
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={[
                      styles.dropdown,
                      isDropdownOpen
                        ? styles.dropdownOpen
                        : styles.dropdownClosed,
                    ]}>
                    <Text style={{color: Color.black}}>
                      {selectedAttribute
                        ? attributes.find(
                            attr => attr.value === selectedAttribute,
                          )?.label
                        : 'Select an attribute'}
                    </Text>
                  </Pressable>
                  {isDropdownOpen && (
                    <View style={styles.dropdownList}>
                      <ScrollView>
                        {attributes &&
                          attributes.map(attr => (
                            <TouchableOpacity
                              key={attr.value}
                              onPress={() => {
                                setSelectedAttribute(attr.value);
                                setIsDropdownOpen(false);
                              }}
                              style={styles.dropdownItem}>
                              <Text style={{color: Color.black}}>
                                {attr.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}

              {/* Here i have to make a select to select attributes */}

              {/* <View
                style={{
                  width: SCREEN_WIDTH,
                  // overflow:'scroll',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 28,
                      textTransform: 'capitalize',
                      color: Color.white,
                    }}>
                    {item?.product_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: Color.white,
                    }}>
                    {item?.product_type}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: Color.white,
                    }}>
                    ₹{' '}
                    {item?.default_price -
                      (item?.default_price * item?.discount) / 100}
                  </Text>
                  {item?.discount && (
                    <>
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          fontSize: 12,
                          color: Color.grey,
                        }}>
                        ₹ {item?.default_price}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                        }}>
                        ({item?.discount}% Off)
                      </Text>
                    </>
                  )}
                </View>
              </View> */}

              <View
                style={{
                  width: SCREEN_WIDTH,
                  flexDirection: 'column', // Change to column to move the price below the name
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginVertical: 10,
                }}>
                <View
                  style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: getDynamicFontSize(item?.product_name.length),
                      textTransform: 'capitalize',
                      color: Color.white,
                    }}>
                    {item?.product_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: Color.white,
                    }}>
                    {item?.product_type}
                  </Text>
                  {isNameTooLong && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        marginTop: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: Color.white,
                        }}>
                        ₹{' '}
                        {item?.default_price -
                          (item?.default_price * item?.discount) / 100}
                      </Text>
                      {item?.discount && (
                        <>
                          <Text
                            style={{
                              textDecorationLine: 'line-through',
                              fontSize: 12,
                              color: Color.grey,
                            }}>
                            ₹ {item?.default_price}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.grey,
                            }}>
                            ({item?.discount}% Off)
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                </View>

                {/* If the name is not too long, show the price on the same line */}
                {!isNameTooLong && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginTop: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: Color.white,
                      }}>
                      ₹{' '}
                      {item?.default_price -
                        (item?.default_price * item?.discount) / 100}
                    </Text>
                    {item?.discount && (
                      <>
                        <Text
                          style={{
                            textDecorationLine: 'line-through',
                            fontSize: 12,
                            color: Color.grey,
                          }}>
                          ₹ {item?.default_price}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.grey,
                          }}>
                          ({item?.discount}% Off)
                        </Text>
                      </>
                    )}
                  </View>
                )}
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                {/* <Text style={{fontWeight: 'bold', color: Color.white}}>
              Quantity:
            </Text>
            <Text style={{fontWeight: 'bold', color: Color.grey}}>
              {item?.quantity}
            </Text> */}
                <AirbnbRating
                  defaultRating={item?.rating}
                  count={5}
                  size={20}
                  showRating={false}
                  isDisabled={true}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{fontWeight: 'bold', color: Color.white}}>
                  Net Quantity:
                </Text>
                <Text style={{fontWeight: 'bold', color: Color.grey}}>
                  {item?.quantity}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{fontWeight: 'bold', color: Color.white}}>
                  warranty:
                </Text>
                <Text style={{fontWeight: 'bold', color: Color.grey}}>
                  {item?.warranty}
                </Text>
              </View>
              {/* <View style={{flexDirection: 'row', gap: 5}}>
            <Text style={{fontWeight: 'bold', color: Color.white}}>
              warranty:
            </Text>
            <Text style={{fontWeight: 'bold', color: Color.grey}}>
              {item?.warranty}
            </Text>
          </View> */}
              <Text style={{fontWeight: 'bold', color: Color.white}}>
                Description:{' '}
              </Text>
              <RenderHTML
                contentWidth={SCREEN_WIDTH}
                source={{
                  html: `<p style="color: ${Color.grey}">
                <span style="">
                  ${item?.product_desc}
                </span>
              </p>`,
                }}
              />
              <Text style={{fontWeight: 'bold', color: Color.white}}>
                Exchange Policy:{' '}
              </Text>
              <Text style={{fontWeight: 'bold', color: Color.grey}}>
                {item?.exchange_policy}
              </Text>
              <Text style={{fontWeight: 'bold', color: Color.white}}>
                Cancellation Policy:{' '}
              </Text>
              <Text style={{fontWeight: 'bold', color: Color.grey}}>
                {item?.cancellation_policy}
              </Text>
              {/* <RenderHTML
            contentWidth={SCREEN_WIDTH}
            source={{
              html: `<p style="color: ${Color.grey}">
                <span style="">
                  ${item?.product_desc}
                </span>
              </p>`,
            }}
          /> */}
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/homeBg.png')}
        resizeMode="stretch"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Cmnhdr2 backIcon cart title="Product Details" />
        <View style={styles.detailContainer}>
          <View style={styles.innerContainer}>
            {loading ? (
              renderSkeletonLoader() // Show skeleton while loading
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false} // Disable vertical scrollbar
                showsHorizontalScrollIndicator={false} // Disable horizontal scrollbar
                data={productDetail}
                renderItem={renderItemDetails}
              />
            )}
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            gap: 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              addItem(productDetail[0]);
              // addToCart()
            }} // Correctly passing the item
            style={[
              styles.button,
              {backgroundColor: 'transparent', borderColor: Color.yellow},
            ]}>
            <Text style={[styles.text]}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.text]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  // Custom dropdown styles
  dropdown: {
    padding: 10,
    backgroundColor: Color.white,
    borderColor: Color.black,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownClosed: {},
  dropdownList: {
    backgroundColor: Color.white,
    borderColor: Color.black,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  detailContainer: {
    margin: 10,
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    gap: 10,
    borderRadius: 10,
  },
  skeletonContainer: {
    flex: 1,
    padding: 10,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    backgroundColor: Color.darkGrey,
    borderRadius: 10,
    marginBottom: 10,
  },
  skeletonText: {
    width: '80%',
    height: 20,
    backgroundColor: Color.darkGrey,
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonTextSmall: {
    width: '50%',
    height: 15,
    backgroundColor: Color.darkGrey,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    color: Color.white,
    fontSize: SCREEN_HEIGHT / 45,
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  button: {
    width: SCREEN_WIDTH / 1.35,
    flex: 1,
    height: SCREEN_HEIGHT / 18,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#424750',
    backgroundColor: Color.yellow,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Color.yellow,
  },
  inactiveDot: {
    backgroundColor: Color.grey,
  },
});
