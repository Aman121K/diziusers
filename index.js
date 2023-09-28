/**
 * @format
 */

import { AppRegistry, } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import 'react-native-reanimated'
import { GoogleSignin } from '@react-native-community/google-signin';
// Initialize GoogleSignin
GoogleSignin.configure({
  webClientId: '1027140066510-49f6k42pgas39i0s7jtnfk8t3kuq6mfg.apps.googleusercontent.com', // Add your web client ID here
});
const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
