import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from "./navigation/CustomDrawer";
import {createStore,applyMiddleware} from "redux"
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import StorePage  from './screens/StorePage';
import rootReducer from './stores/rootReducer';
import MainLayout from './screens/MainLayout';
import Signuppage from './screens/signuppage';
import Cart from './screens/cart';
import HelpCenter from './screens/HelpCenter';
import Orders from './screens/orders';
import Loginpage from './screens/loginpage';
import OrderDetails from './screens/OrderDetails';
import { LogBox } from 'react-native';

//LogBox.ignoreAllLogs(); // Ignore all log notifications
const Stack = createNativeStackNavigator();
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Loginpage'}>
      <Stack.Screen
        name='Loginpage'
        component={Loginpage}>
      </Stack.Screen>
      <Stack.Screen
        name='CustomDrawer'
        component={CustomDrawer}>
      </Stack.Screen>
      <Stack.Screen name='MainLayout' component={MainLayout} />

    
      <Stack.Screen name='StorePage' component={StorePage} />
      <Stack.Screen name='Cart' component={Cart} />
      <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ headerShown: false }}
        />
         <Stack.Screen name='Signuppage' component={Signuppage} />
    </Stack.Navigator>
    
    </NavigationContainer>
    </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  }
});
