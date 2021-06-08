import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './features/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios, {AxiosError} from 'axios';
import HomeScreen from './screens/HomeScreen';
import TodoScreen from './screens/TodoScreen';
import CameraScreen from './screens/CameraScreen';
import {createError, HttpError} from './utils/axiosUtil';

axios.interceptors.response.use(
  res => {
    return res;
  },
  (err: AxiosError) => {
    let error: HttpError<any>;
    if (err.response) {
      error = createError({
        message: err.response.statusText,
        code: err.response.status,
      });
    } else if (err.request) {
      error = createError({
        message: 'The server is not responding.',
        code: 503,
      });
    } else {
      error = createError({message: 'Error executing request.', code: 400});
    }

    return Promise.reject(error);
  },
);

const Stack = createStackNavigator();

const {Navigator, Screen} = Stack;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Screen
            name="Todo"
            component={TodoScreen}
            options={{headerTitle: 'Todo List'}}
          />
          <Screen
            name="Camera"
            component={CameraScreen}
            options={{headerShown: false}}
          />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
