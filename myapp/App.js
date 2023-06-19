import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LoginScrn from './screens/loginScreen';
import SignUpScrn from './screens/signUpScreen';
import DeliveryMap from './screens/deliveryMain';
import CustomDrawer from './navigation/CustomDrawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'LoginScrn'}>
        <Stack.Screen
          name='Login Screen'
          component={LoginScrn}>
        </Stack.Screen>
        <Stack.Screen
          name='Drawer'
          component={CustomDrawer}>
        </Stack.Screen>
        <Stack.Screen
          name='Home'
          component={DeliveryMap}>
        </Stack.Screen>
        <Stack.Screen
          name='SignUp'
          component={SignUpScrn}>
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
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
