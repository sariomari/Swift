import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Alert } from 'react-native';


export default function LoginScrn({ navigation: { navigate } }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Own_URL = 'http://172.20.10.2:8000';
  const handleLogin = async () => {
    try {
      print("hey")
      print(email,password)
      const response = await fetch(`${Own_URL}/driver/login?driver_username=${username}&driver_password=${password}`
      , {
        method: 'GET',
      });
      if (response.ok) {
      const data = await response.json();
      const driver_id = data.driver_id; // Retrieve the customerId from the response
      const driver_username=data.driver_username;
      const driver_password=data.driver_password;
      navigate("Drawer")
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  const login = () => {
    if (email == "Sari" && password == "1") {
      navigate("Drawer")
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.image} source={require("./../assets/logo.jpeg")} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
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
      <TouchableOpacity>
        <Text style={styles.normalText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.normalText} onPress={() => navigate("SignUp")}>Don't have an account?</Text>
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
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fff",
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 50,
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
});
