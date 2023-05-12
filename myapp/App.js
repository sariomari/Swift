import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import LoginScrn from './screens/loginScreen';

export default function App() {
  return (
    <SafeAreaView style = {styles.root}>
      <LoginScrn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
