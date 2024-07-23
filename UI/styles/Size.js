import {Dimensions, PixelRatio, StatusBar} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const DEVICE_HEIGHT = Dimensions.get('screen').height;
export const STATUS_BAR = StatusBar.statusBarHeight || 24;
export const NAVIGATION_BAR_HEIGHT = parseInt(
  DEVICE_HEIGHT - (STATUS_BAR + SCREEN_HEIGHT),
  10,
);
export const SMALL_SCREEN_HEIGHT = 550;

export const ButtonHeight = {
  buttonLarge: 48,
  buttonMedium: 40,
  buttonSmall: 36,
  buttonExtraSmall: 40,
};

export const PageIndicatorSize = {
  width: 10,
  height: 10,
};


export const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);

};


