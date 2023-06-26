import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LoginScrn from './loginScreen';

export default function SignUpScrn() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [area, setarea] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified_password, setVerifiedPassword] = useState("");
    
    const handleSignup = async () => {
      if (
        
        firstname &&
        lastname &&
        username &&
        area &&
        password &&
        verified_password == password &&
        email 
      ) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/driver`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              driver_id:1,
              first_name: firstname,
              last_name: lastname,
              driver_username: username,
              driver_password: password,
              email: email,
              latitude: 32.123456,
              longitude: 31.222141,
              area: area,
              zone: 1
            }),
          });
    
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
    
          const data = await response.json();
    
          if (data === 'Added Successfully') {
            navigation.navigate('LoginScrn');
            Alert.alert('Welcome To Swift ! ', 'Please login to continue');
          } else {
            Alert.alert('Error', data);
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to connect to server');
        }
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    };

    return (
      <ScrollView backgroundColor="#000000">
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.image} source = {require("./../assets/logo.jpeg")}/>
        </View>
        <Text style={styles.title}> Create an account</Text>
       
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            secureTextEntry={false}
            onChangeText={(firstname) => setfirstname(firstname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            secureTextEntry={false}
            onChangeText={(lastname) => setlastname(lastname)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            secureTextEntry={false}
            onChangeText={(username) => setusername(username)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Area"
            placeholderTextColor="#003f5c"
            secureTextEntry={false}
            onChangeText={(area) => setarea(area)}
          />
        </View>
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
            onChangeText={(verified_password) => setVerifiedPassword(verified_password)}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text>Sign Up</Text> 
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      </ScrollView>
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
      alignItems: "left",
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
  
  