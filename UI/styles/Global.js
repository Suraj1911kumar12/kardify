import { StyleSheet, SafeAreaView } from 'react-native';
import { Color } from './Color';
import { Medium, SemiBold } from './Font';
import { SCREEN_HEIGHT } from './Size';
const GlobalStyle = (props) => {

  return (
    <SafeAreaView style={styles.linearGradient}>
      <LinearGradient colors={['#353A40', '#16171B', '#424750', '#202326']} style={styles.linearGradient}>
        <StatusBar
          backgroundColor="#131417"
          barStyle='light-content'
          hidden={false}
        />

      </LinearGradient>
    </SafeAreaView>
  );
};
export default GlobalStyle = StyleSheet.create({
  cardShadow: {
    shadowColor: Color.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 4,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  selectbdy: {
    flex: 1,
    backgroundColor: '#F9F4F4'
  },
  mainContainers: {
    flex: 1,
    backgroundColor: Color.btn,
  },
  mainContaineres: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontFamily: Medium,
    color: Color.black,
    fontSize: 15,
  },
  txt: {
    fontFamily: SemiBold,
    color: Color.black,
    fontSize: 16,
  },
  fdrow: {
    flexDirection: 'row',
  },
  fdcolumn: {
    flexDirection: 'column',
  },
  justify: {
    justifyContent: 'space-between',
  },
  listingbdy: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    //backgroundColor:"red",

  },
  flat: {
    height: SCREEN_HEIGHT / 1.35,
    // backgroundColor:'red'
  },
  mainContainere: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  ThankYouMainBdy: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: "center",
    alignItems: "center"
  },
  linearGradient: {
    flex: 1
  },
});
