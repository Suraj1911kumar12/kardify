import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Color} from '../../styles/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const ContactUs = () => {
  const socialMedia = [
    {name: 'facebook', url: 'https://www.facebook.com', type: Icon},
    {name: 'twitter', url: 'https://www.twitter.com', type: AntDesign},
    {name: 'instagram', url: 'https://www.instagram.com', type: AntDesign},
    {name: 'linkedin', url: 'https://www.linkedin.com', type: Entypo},
  ];

  const openURL = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cnt}>ContactUs</Text>
      <Text style={styles.git}>Get in touch </Text>
      <Text style={styles.para}>
        If you have any inquries get in touch with us. we ‘ll be happy to help
        you.
      </Text>
      <View style={styles.btn}>
        <Icon name={'call'} style={{fontSize: 20, color: Color.grey}} />
        <Text style={styles.para}>+91- 8765432123</Text>
      </View>
      <View style={styles.btn}>
        <Icon name={'call'} style={{fontSize: 20, color: Color.grey}} />
        <Text style={styles.para}>+91- 8765432123</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.cnt}>Social Media Links</Text>
        <View style={{flexDirection: 'row'}}>
          {socialMedia.map((social, index) => {
            const IconComponent = social.type; // Get the correct Icon component
            return (
              <TouchableOpacity
                key={index}
                style={styles.iconContainer}
                onPress={() => openURL(social.url)}>
                <IconComponent name={social.name} size={30} color="#fff" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 20,
    paddingVertical: 50,
    backgroundColor: Color.bgBlack,
    color: Color.white,
    padding: 10,
  },
  cnt: {
    fontSize: 20,
    color: Color.white,
    marginVertical: 20,
    // fontWeight: 600,
  },
  git: {
    fontSize: 24,
    color: Color.white,
  },
  para: {
    fontSize: 14,
    color: Color.white,
  },
  btn: {
    // flex:1,
    gap: 10,
    height: 50,
    // width: SCREEN_WIDTH,
    width: '100%',
    backgroundColor: Color.lightBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 50,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: Color.lightBlack, // This color can be adjusted or made dynamic per social media
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
});
