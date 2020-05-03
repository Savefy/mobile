import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = 'http://savefy.willianrod.com/api';

// import 'moment/locale/pt-br';

import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
