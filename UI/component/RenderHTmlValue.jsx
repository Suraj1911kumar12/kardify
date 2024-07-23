import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const RenderHTmlValue = props => {
  const { width } = useWindowDimensions();
  console.log(props, 'hey wow');
  return <RenderHtml contentWidth={width} source={props} />;
};

export default RenderHTmlValue;

const styles = StyleSheet.create({});
