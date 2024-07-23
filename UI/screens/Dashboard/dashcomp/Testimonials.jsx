import { View, Text, Image, StyleSheet, TextInput, StatusBar, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../styles/Size';
import axios from 'axios';
import { apis } from '../../../utils/api';
import { AirbnbRating, Rating } from 'react-native-ratings'

const Testimonials = (props) => {
    const testiApi = apis.baseUrl + apis.testimonials



    const [imgError, setImgError] = useState(false)
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        getTestimonials()
    }, [])

    const getTestimonials = async () => {
        try {
            const res = await axios.get(testiApi)
            // console.log(res.data)

            if (res.status === 200) {
                setTestimonials(res.data.testimonials)
            }
        } catch (error) {
            console.error('error', error);
        }
    }





    const renderItem = ({ item }) => (
        <View style={styles.cmnbdy}>
            {/* {
                console.log(item.profile_img)
            } */}
            <Image
                source={
                    item?.profile_img ?
                        { uri: apis.baseImgUrl + item?.profile_img }
                        :
                        require('../../../../assets/images/Dashbaoad/mans.png')
                }

                resizeMode="contain"
                style={{ marginTop: 10 }}
                onError={() => setImgError(true)}
            />

            <Text style={{ color: '#FFFFFF', marginTop: 5 }}>{item?.customer?.fullname}</Text>
            <View style={styles.cmntxt}>
                <Text style={{ fontSize: 12, textAlign: 'center', color: '#888484' }}>{item.description}</Text>
            </View>
            {/* <Rating
                type='custom'

                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                ratingCount={item?.rating}
                imageSize={30}
                style={{ paddingVertical: 10 }}
                starContainerStyle
                tintColor='#222'

            /> */}
            {/* <AirbnbRating
                defaultRating={item?.rating}
                count={5}
                size={20}
                showRating={false}
                isDisabled={true}
            /> */}

        </View>
    );
    return (
        // <FlatList
        //     horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     data={DATA}
        //     renderItem={({ item }) => {

        //         return (

        //             <View style={styles.cmnbdy}>
        //                 <Image
        //                     source={item.img}
        //                     resizeMode="contain"
        //                     style={{ marginTop: 10 }}
        //                 />

        //                 <Text style={{ color: '#FFFFFF', marginTop: 5 }}>{item.cartxt}</Text>
        //                 <View style={styles.cmntxt}>
        //                     <Text style={{ fontSize: 12, textAlign: 'center', color: '#888484' }}>{item.cartxt1}</Text>
        //                 </View>
        //             </View>

        //         )

        //     }}

        // />
        <FlatList
            data={testimonials}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
        />

    );
};

export default Testimonials;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    cmnbdy: {
        height: SCREEN_HEIGHT / 4,
        width: SCREEN_WIDTH / 1.25,
        marginBottom: 1,
        backgroundColor: '#1C1F22',
        marginLeft: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        opacity: 5,
        x: 1,
        y: 3,
    },
    cmntxt: {
        height: SCREEN_HEIGHT / 18,
        width: SCREEN_WIDTH / 1.4,
        alignSelf: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        width: Dimensions.get('window').width - 40,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    testimonial: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: 'black'
    },
    name: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        color: 'black'

    },
});




