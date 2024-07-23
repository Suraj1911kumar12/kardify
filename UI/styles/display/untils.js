import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const setHeight = h => height /  h;
const setWidth = w => width / w;

export default {setHeight, setWidth};
