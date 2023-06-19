import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import Cart from './screens/cart';
import HelpCenter from './screens/HelpCenter';
import Orders from './screens/orders';
import OrderDetails from './screens/OrderDetails';
const Stack = createNativeStackNavigator();
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}>
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
    </Stack.Navigator>
    
    </NavigationContainer>
    </Provider>
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
