import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator,
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

const ProductDetails = ({route, navigation}) => {
  const auth = UseAuth();
  const {id} = route.params;
  const {width} = useWindowDimensions();
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
      const res = await axios.get(`/get-products-customer?product_id=${id}`);
      setProductDetail(res?.data?.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, []);

  const addToCart = async (id, combination_id, quantity) => {
    try {
      const resp = await axios.post(
        '/add-to-cart',
        {
          product_id: id,
          combination_id: combination_id,
          quantity: quantity,
        },
        {
          headers: auth.token,
        },
      );
      if (resp.data.code === 200) {
        console.log(resp);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const dispatch = useDispatch();
  const addedItem = useSelector(state => state);
  console.log(addedItem, 'addeditem');

  const addItem = item => {
    // console.log(item, 'item');

    dispatch(addProduct(item));
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

  const renderItemDetails = ({item}) => (
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
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              textTransform: 'capitalize',
              color: Color.grey,
            }}>
            {item?.product_name}
          </Text>
          <Text style={{fontWeight: 'bold', color: Color.grey}}>
            Quantity: {item?.quantity}
          </Text>
          <Text style={{fontWeight: 'bold', color: Color.grey}}>
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
        </View>
        <View>
          <Text style={{fontWeight: 'bold', color: Color.grey}}>
            Specification:
          </Text>
          {/* Add specification details here */}
        </View>
      </View>
    </View>
  );

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
        <Cmnhdr2 backIcon title="Product Details" />
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
            onPress={() => addItem(productDetail[0])} // Correctly passing the item
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
