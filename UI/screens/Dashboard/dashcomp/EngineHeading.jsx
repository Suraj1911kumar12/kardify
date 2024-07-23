import { View, Text, Image, ScrollView, StyleSheet, TextInput, StatusBar, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../styles/Size';
//import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../style/Size';
// import { SCREEN_HEIGHT,SCREEN_WIDTH } from '../../../style/Size';
const EngineHeading = (props) => {
    const DATA = [
        {
            id: "1",
            img: require("../../../../assets/images/Dashbaoad/carengine.png"),
            heading: 'Heading',
            cmntxt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            readtxt: 'Read more',
        },
        {
            id: "2",
            img: require("../../../../assets/images/Dashbaoad/carengine.png"),
            heading: 'Heading',
            cmntxt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            readtxt: 'Read more',
        },

    ]


    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={({ item }) => {

                return (

                    <View style={styles.headingbdy}>
                        <View style={styles.carenginebdy}>
                            <Image
                                source={item.img}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.cmntxt}>
                            <Text style={{ color: '#FFFFFF', fontSize: 19, fontWeight: '600', marginBottom: 5 }}>{item.heading}</Text>
                            <Text style={{ color: '#CAC4C4', fontSize: 12, fontWeight: '500', lineHeight: 16 }}>{item.cmntxt}</Text>
                        </View>
                        <View style={styles.readmoretxt}>
                            <Text style={{ fontSize: 16, color: '#E3BB55', fontWeight: '500' }}>{item.readtxt}</Text>
                        </View>
                    </View>
                )

            }}

        />


    );
};

export default EngineHeading;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    headingbdy: {
        height: SCREEN_HEIGHT / 3.7,
        width: SCREEN_WIDTH / 2,
        backgroundColor: "#171819",
        marginTop: 60,
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 10,
        elevation: 8,
        opacity: 5,
        x: 1,
        y: 3,
        //position:'absolute'
    },
    carenginebdy: {
        height: SCREEN_HEIGHT / 5.5,
        width: SCREEN_WIDTH / 2.25,
        //backgroundColor:'yellow',
        position: 'absolute',
        marginTop: -60,
        alignItems: 'center'

    },
    cmntxt: {
        height: SCREEN_HEIGHT / 9,
        width: SCREEN_WIDTH / 2.25,
        //backgroundColor:"cyan",
        marginTop: 80
    },
    readmoretxt: {
        height: SCREEN_HEIGHT / 30,
        width: SCREEN_WIDTH / 2.25,
        //justifyContent:'center',
        //backgroundColor:"pink"
    }

});




