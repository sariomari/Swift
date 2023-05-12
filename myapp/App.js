import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import LoginScrn from './screens/loginScreen';
import SignUpScrn from './screens/signUpScreen';
import DeliveryMap  from './screens/deliveryMain';

export default function App() {
  return (
    <SafeAreaView style = {styles.root}>
      <DeliveryMap />
    </SafeAreaView>
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
