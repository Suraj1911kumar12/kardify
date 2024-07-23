import { View, Text, Image, ScrollView, StyleSheet, TextInput, StatusBar, TouchableOpacity, ImageBackground, FlatList, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNames from '../constants/Screens';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/Size';
//import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../style/Size';
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../style/Size';

const ThankYou = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 2, y: 0 }} colors={['#353A40', '#16171B', '#424750', '#202326',]} style={styles.linearGradient}>
                <StatusBar
                    backgroundColor="#131417"
                    barStyle='light-content'
                    hidden={false}
                />

                <View style={styles.bdy}>

                    <View style={styles.IMG}>
                        <Image
                            source={require("../assets/images/Icons/ThankYou.png")}
                            resizeMode="contain"
                            style={{}}
                        />
                    </View>

                    <Text style={{ fontSize: SCREEN_HEIGHT / 15, color: '#FFFFFF', fontWeight: '400' }}>Thank you</Text>
                    <Text style={{ fontSize: 17, textAlign: 'center', color: "#FFFFFF", fontWeight: '400' }}>Lorem Ipsum is simply dummy text of <Text style={{}}>the printing and typesetting industry.</Text></Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate(ScreenNames.tabstack)}>
                        <View style={styles.contineshoppingbdy}>
                            <Text style={{ fontSize: SCREEN_HEIGHT / 70, color: '#000000', fontWeight: '700' }}>CONTINUE SHOPPING</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ThankYou;
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center'
    },
    bdy: {
        height: SCREEN_HEIGHT / 1.8,
        width: SCREEN_WIDTH / 1.2,
        //backgroundColor:"yellow",
        alignSelf: "center",
        alignItems: "center",
        //justifyContent:'space-between',
        flexDirection: 'column'
    },
    contineshoppingbdy: {
        height: SCREEN_HEIGHT / 15,
        width: SCREEN_WIDTH / 2.5,
        backgroundColor: "#FFFFFF",
        alignSelf: "center",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 30
    },
    IMG: {
        height: SCREEN_HEIGHT / 5,
        width: SCREEN_WIDTH / 1.2,
        //backgroundColor:'red',
        justifyContent: 'center',
        alignItems: "center"
    }
});




