import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function SignUpScrn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified_password, setVerifiedPassword] = useState("");

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.image} source = {require("./../assets/logo.jpeg")}/>
        </View>
        <Text style={styles.title}> Create an account</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            secureTextEntry={false}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Verify Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(verified_password) => setVerifiedPassword(password)}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text>Sign Up</Text> 
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      justifyContent: "center",
      alignItems: "center",
    },
    signUpButton: {
      width: "80%",
      borderRadius: 5,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#4760b5",
    },
    inputView: {
      backgroundColor: "#fff",
      borderRadius: 5,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    image: {
      width: 200,
      height: 200,
    },
    normalText: {
      height: 30,
      marginBottom: 30,
      color: "white",
      padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
        color: "white",
        paddingTop: 10,
    },
  });
  