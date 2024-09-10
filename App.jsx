import 'react-native-gesture-handler';
import 'react-native-reanimated';

import Route from './UI/Routes/Route';

import {Provider} from 'react-redux';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Store from './UI/redux/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={Store}>
      <Route />
    </Provider>
  );
};

export default App;
