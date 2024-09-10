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
import {UseAuth} from '../../context/AuthContext';
import {showMessage} from 'react-native-flash-message';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNames from '../../constants/Screens';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from '../../redux/slice/cartSlice';
import Icon from 'react-native-vector-icons/Entypo';
import {addWishList, getWhishList} from '../../redux/slice/wishlist';
import Modal from 'react-native-modal';
import BottomSheetModal from '../../component/BottomSheetModal';

const ProductDetails = ({route, navigation}) => {
  const [openSheetModal, setOpenSheetModal] = useState(false);
  const selector = useSelector(state => state);
  const auth = UseAuth();
  const {token} = auth;
  const {id} = route.params;
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [isWish, setisWish] = useState([]);

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
  const addCartApiData = async (prId, comId, qunt) => {
    try {
      const response = await axios.post(
        '/add-to-cart',
        {
          product_id: prId,
          combination_id: comId || null,
          quantity: 1,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );
      console.log('====================================');
      console.log(response.data.code, 'response.data.code');
      console.log('====================================');

      if (response.data.code === 201) {
        // Extract the product data from the response
        showMessage({
          message: response?.data?.message || 'Product added to cart!',
          type: 'success',
        });
      } else if (response.data.code === 401) {
        showMessage({
          message:
            response?.data?.message || 'Please login to add items to the cart!',
          type: 'warning',
        });
        AsyncStorage.removeItem('token');
        navigation.navigate(ScreenNames.LoginScreen);
      } else {
        showMessage({
          message: response.data.message,
          type: 'warning',
        });
      }
    } catch (error) {
      showMessage({
        message:
          error?.response.data.message || 'Error adding product to cart!',
        type: 'danger',
      });
    }
  };
  const closeTrackOrderModal = () => {
    setOpenSheetModal(false);
  };
  useEffect(() => {
    setisWish(selector?.wishList?.data);
  }, [isWish?.length, dispatch, selector?.wishList?.data]);
  const addToCart = async product => {
    try {
      if (token) {
        // If token is available, call the API function to add the product to the cart
        await addCartApiData(
          product.id,
          selectedAttribute?.id,
          product.quantity,
        );
      } else {
        // If token is not available, proceed with the local storage function
        // Get the current cart from AsyncStorage
        const existingCart = await AsyncStorage.getItem('cart');
        let cart = [];

        // If there is an existing cart, parse it
        if (existingCart !== null) {
          cart = JSON.parse(existingCart);
        }

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
          // Optionally, you can update the quantity or notify the user that the product is already in the cart
          showMessage({
            message: 'Product is already in the cart',
            type: 'warning',
          });
        } else {
          // Add the new product to the cart
          cart.push(product);

          // Update Redux store with the new product
          dispatch(addProduct(product));

          showMessage({
            message: 'Product added to cart! with datA',
            type: 'success',
          });
        }
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      }

      // Save the updated cart back to AsyncStorage
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      showMessage({
        message: 'Failed to add product to cart. Please try again later.',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  const addWishListProduct = async id => {
    const cred = {
      token: auth.token,
      id: id,
    };

    try {
      // Dispatch addWishList and wait for it to complete
      await dispatch(addWishList(cred)).unwrap();

      // Dispatch getWhishList and wait for it to complete
      await dispatch(getWhishList(auth.token)).unwrap();

      // Optionally handle success here, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Optionally handle the error here, e.g., show an error message
    }
  };
  const removeFromWishList = useCallback(
    async id => {
      try {
        const res = await axios.post(
          `/remove-from-wishlist`,
          {product_id: id},
          {headers: {Authorization: auth.token}},
        );
        if (res?.data?.code === 200) {
          dispatch(getWhishList(auth.token)); // Refresh wishlist
          showMessage({
            message: res?.data?.message || 'Removed from wishlist',
            type: 'success',
          });
        } else {
          showMessage({
            message: res?.data?.message || 'Error removing from wishlist',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        showMessage({
          message: 'An error occurred while removing from wishlist.',
          type: 'danger',
        });
      }
    },
    [auth.token, dispatch],
  );

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
    const isInWishlist =
      Array.isArray(isWish) &&
      isWish?.some(wishItem => wishItem?.product_id === item.id);

    return (
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
                source={{uri: apis.baseImgUrl + image?.image_url}}
                resizeMode="contain"
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
              <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
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
                      ₹
                      {item?.discount_type === 'amount'
                        ? item?.default_price - item?.discount
                        : item?.default_price -
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
                          {item?.discount_type === 'amount'
                            ? `( ₹${item?.discount} off )`
                            : `(${item?.discount}% off)`}
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
                        {item?.discount_type === 'amount'
                          ? `( ₹${item?.discount} off )`
                          : `(${item?.discount}% off)`}
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
            {item?.warranty > 0 && (
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{fontWeight: 'bold', color: Color.white}}>
                  warranty:
                </Text>
                <Text style={{fontWeight: 'bold', color: Color.grey}}>
                  {item?.warranty}
                </Text>
              </View>
            )}

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
        {/* {auth.token && ( */}
        <TouchableOpacity
          onPress={() => {
            if (isInWishlist) {
              removeFromWishList(item?.id);
            } else {
              addWishListProduct(item?.id);
            }
          }}
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            padding: 6,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            // backgroundColor: Color.yellow,
          }}>
          <Icon
            name={isInWishlist ? 'heart' : 'heart-outlined'}
            size={30}
            color={isInWishlist ? Color.red : Color.black}
          />
        </TouchableOpacity>
        {/* )} */}
      </View>
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
              // addItem(productDetail[0]);
              addToCart(productDetail[0]);
            }} // Correctly passing the item
            style={[
              styles.button,
              {backgroundColor: 'transparent', borderColor: Color.yellow},
            ]}>
            <Text style={[styles.text]}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (token) {
                setOpenSheetModal(true);
                // addToCart(productDetail[0]);
              } else {
                navigation.navigate(ScreenNames.LoginViaProtect);
                showMessage({
                  message: 'Please login to proceed',
                  type: 'warning',
                });
              }
            }}
            style={styles.button}>
            <Text style={[styles.text]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          modalVisible={openSheetModal}
          setModalVisible={setOpenSheetModal}
          addToCart={addToCart}
          productDetail={productDetail}
        />
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
  separator: {
    width: 2,
    backgroundColor: Color.white,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bottomSheetContent: {
    backgroundColor: Color.lightBlack,
    padding: 16,
    height: SCREEN_HEIGHT * 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    fontSize: 18,
    color: Color.white,
    marginBottom: 10,
  },
  sheetText: {
    color: Color.white,
    marginVertical: 5,
  },
  sheetButton: {
    backgroundColor: Color.yellow,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  sheetButtonText: {
    color: Color.white,
    fontSize: 16,
  },
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 16,
  },
  sheetButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sheetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
