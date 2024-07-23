import { View, Text, Image, ScrollView, StyleSheet, TextInput, StatusBar, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AuthCommonHeader from '../../../component/AuthCommonHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../styles/Size';
import ScreenNames from '../../../constants/Screens';
import CustomButton from '../../../component/CustomButton';

const SignUpNumber = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 2, y: 0 }} colors={['#353A40', '#16171B', '#424750', '#202326',]} style={styles.linearGradient}>
                <StatusBar
                    backgroundColor="#131417"
                    barStyle='light-content'
                    hidden={false}
                />
                <AuthCommonHeader
                    onPress={() => props.navigation.goBack()}
                />
                <View style={styles.signin}>
                    <Text style={{ fontSize: 26, color: "#ffffff", fontWeight: '500', lineHeight: 39 }}>Sign Up</Text>
                </View>
                <View style={styles.sclmediacmnbdy}>
                    <View style={styles.googlebdy}>
                        <Image
                            source={require("../../../assets/images/Auth/google.png")}
                            resizeMode="contain"
                            style={{ marginHorizontal: 20 }}
                        />
                        <Text style={{ color: "#ffffff", fontWeight: '500', lineHeight: 23 }}>Google</Text>
                    </View>
                    <View style={styles.facebookbdy}>
                        <Image
                            source={require("../../../assets/images/Auth/facebook.png")}
                            resizeMode="contain"
                            style={{ marginHorizontal: 20 }}
                        />
                        <Text style={{ color: "#ffffff", lineHeight: 23, fontWeight: '500' }}>Facebook</Text>
                    </View>
                </View>

                <View style={styles.mbleno}>
                    <Text style={{ color: "#ffffff", fontWeight: "500", fontSize: 13 }}>Mobile no.</Text>
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.leftInputBox}>
                        <FontAwesome name="phone" style={{ fontSize: 20, color: '#7F8489' }} />
                    </View>
                    <View style={styles.rightInputBox}>
                        <TextInput
                            placeholder='Enter here'
                            placeholderTextColor={"#C6C5C5"}
                            style={{ color: 'white' }}
                            keyboardType='numeric'
                        />
                    </View>
                </View>


                <View style={styles.sbmitbtn}>
                    <CustomButton
                        onPressButton={() => props.navigation.navigate(ScreenNames.SignUpNumberOtp)}
                        title="Submit"
                    />
                </View>
                
                <TouchableOpacity
                    onPress={() => props.navigation.navigate(ScreenNames.LoginScreen)}
                    style={{ width: SCREEN_WIDTH / 1.1, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ color: "#777777", }}>Already have an account?  </Text>
                    <Text style={{ color: "#ffffff", fontWeight: '500', fontSize: 13, textDecorationLine: 'underline' }}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.cmnimg}>
                    <Image
                        source={require("../../../assets/images/Auth/authcmnbdy.png")}
                        resizeMode='contain'
                        style={{ width: SCREEN_WIDTH / 1, height: SCREEN_HEIGHT / 3 }}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUpNumber

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    signin: {
        height: SCREEN_HEIGHT / 15,
        width: SCREEN_WIDTH / 1,
        //backgroundColor:"red",
        //justifyContent:'flex-end',
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    sclmediacmnbdy: {
        height: SCREEN_HEIGHT / 10,
        width: SCREEN_WIDTH / 1.1,
        // backgroundColor:"green",
        alignSelf: "center",
        //justifyContent:'flex-end',
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20
    },
    googlebdy: {
        // height:SCREEN_HEIGHT/15,
        width: SCREEN_WIDTH / 2.35,
        //backgroundColor:"yellow",
        borderRadius: 8,
        flexDirection: "row",
        backgroundColor: "#1C1F22",
        // elevation: 8,
        // opacity: 5,
        //   x: 1,
        //   y: 3,
        height: 50,
        //flexDirection:"row",
        alignItems: "center"
        //justifyContent:'center'  
    },
    facebookbdy: {
        // height:SCREEN_HEIGHT/15,
        width: SCREEN_WIDTH / 2.35,
        //backgroundColor:"yellow",
        borderRadius: 8,
        flexDirection: "row",
        backgroundColor: "#1C1F22",
        // elevation: 8,
        // opacity: 5,
        //   x: 1,
        //   y: 3,
        height: 50,
        //flexDirection:"row",
        alignItems: "center",
        marginLeft: 22
        //justifyContent:'center'  
    },
    mbleno: {
        // height:SCREEN_HEIGHT/20,
        width: SCREEN_WIDTH / 1.1,
        // backgroundColor:"yellow",
        alignSelf: "center",
        // justifyContent:'flex-end'
        marginBottom: 10
    },
    callbdy: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 1.1,
        borderRadius: 10,
        //backgroundColor:"red",
        backgroundColor: "#1C1F22",
        elevation: 8,
        opacity: 8,
        x: 1,
        y: 3,
        alignSelf: "center",
        marginTop: 8,
        flexDirection: "row"
    },
    callIcon: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 10,
        // backgroundColor:"cyan",
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    enterheretxt: {
        height: SCREEN_HEIGHT / 14,
        width: SCREEN_WIDTH / 1.25,
        //backgroundColor:"pink"
    },
    input: {
        marginLeft: 15,
        fontWeight: "900"
    },
    pswrdtxt: {
        height: SCREEN_HEIGHT / 18,
        width: SCREEN_WIDTH / 1.1,
        //backgroundColor:"red",
        alignSelf: "center",
        justifyContent: "center"
    },
    Passwordbdy: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 1.1,
        borderRadius: 10,
        //backgroundColor:"red",
        backgroundColor: "#1C1F22",
        elevation: 8,
        opacity: 8,
        x: 1,
        y: 3,
        alignSelf: "center",
        flexDirection: "row"
    },
    passwordIcon: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 10,
        //backgroundColor:"cyan",
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    enterheretxts: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 1.45,
        //backgroundColor:"pink"
    },
    eyeIcon: {
        height: SCREEN_HEIGHT / 16,
        width: SCREEN_WIDTH / 9,
        // backgroundColor:"green",
        justifyContent: "center",
        alignItems: 'center'
    },
    forgetpswrd: {
        height: SCREEN_HEIGHT / 22,
        width: SCREEN_WIDTH / 1.1,
        // backgroundColor:"red",
        alignSelf: "center",
        // alignSelf:'flex-end'
    },
    passwords: {
        height: SCREEN_HEIGHT / 22,
        width: SCREEN_WIDTH / 3.6,
        //backgroundColor:'yellow',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#848282'
    },
    sbmitbtn: {
        // height:SCREEN_HEIGHT/3.5,
        width: SCREEN_WIDTH / 1.1,
        //backgroundColor:"yellow",
        alignSelf: 'center',
        justifyContent: "flex-end",
        marginBottom: 10
    },
    AcntTxt: {
        height: SCREEN_HEIGHT / 18,
        width: SCREEN_WIDTH / 1,
        //backgroundColor:'yellow',
        alignSelf: "center",
        //justifyContent: "flex-end",
        flexDirection: "row",
        //alignItems: "flex-end"
    },
    alreadytxt: {
        height: SCREEN_HEIGHT / 18,
        width: SCREEN_WIDTH / 1.56,
        // backgroundColor:"red",
        justifyContent: 'flex-end',
        //alignItems: 'flex-end'

    },
    logintxt: {
        height: SCREEN_HEIGHT / 18,
        width: SCREEN_WIDTH / 9.6,
        //backgroundColor:"cyan",
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        marginLeft: 2
        // alignItems:'flex-end'
    },
    cmnimg: {
        height: SCREEN_HEIGHT / 3,
        width: SCREEN_WIDTH / 1,
        //backgroundColor:"red",
        //justifyContent:'flex-end'
    },

    inputBox: {
        height: 45,
        width: SCREEN_WIDTH / 1.1,
        borderRadius: 8,
        //backgroundColor:"red",
        backgroundColor: "#1C1F22",
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 80
    }, leftInputBox: {
        height: '100%',
        paddingHorizontal: 17,
        justifyContent: 'center'
    }, rightInputBox: {
        flex: 1,
        justifyContent: 'center'
    }

});