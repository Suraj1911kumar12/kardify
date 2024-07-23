import Route from './UI/Routes/Route';
import {Provider} from 'react-redux';
import store from './UI/redux/store';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
