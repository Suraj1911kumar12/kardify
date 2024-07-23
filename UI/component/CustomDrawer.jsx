import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

const { height, width } = Dimensions.get('window')


const CustomDrawer = props => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: 'rgba(0, 0, 0)', }}>
                <View
                    style={{ padding: 20, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 1)' }}
                >
                    <View style={{
                        height: height / 15, width: height / 15,
                        backgroundColor: 'red',
                        borderRadius: height / 15, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image source={require('../assets/images/Dashbaoad/drawerprofileimg.png')}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ paddingHorizontal: height / 50, }}>
                        <Text
                            style={{
                                color: 'rgba(255, 255, 255, 1)',
                                fontSize: 18,
                            }}>
                            Abhishek Singh
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: 'rgba(209, 209, 209, 1)',
                                    //fontFamily: Regular,
                                }}>
                                My profile
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, height: 'full', backgroundColor: '#222', paddingTop: 10, }}>
                    <DrawerItemList {...props} />
                </View>
                
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

export default CustomDrawer;
