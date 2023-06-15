import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';


export default function LoginScrn({ navigation: { navigate } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    if (email == "Cox" && password == "Cox") {
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
          placeholder="Email123"
          placeholderTextColor="#003f5c"
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
      <TouchableOpacity>
        <Text style={styles.normalText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
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
