import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import {Own_URL, API_URL} from '../Variables'; 
const loginpage = ({ setSelectedTab }) => {
  
  const navigation = useNavigation();

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        SweetRomane: require('../assets/fonts/SweetRomance.ttf'),
        Popregular: require('../assets/fonts/PoppinsRegular.ttf'),
        Popsemibold: require('../assets/fonts/PoppinsSemiBold.ttf'),
        Rockstyle: require('../assets/fonts/Starlight.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
        Formalf: require('../assets/fonts/SFCartoonistHand.ttf'),

      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor:'#ffffff'
    },
    image: {
      width: 250,
      height: 100,
      marginBottom: 50
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      paddingHorizontal: 10,
      marginBottom: 10,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      fontSize:20
    },
    signupText: {
      marginBottom: 10,
    },
    signupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    signupButton: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
    },
    signupButton: {
      backgroundColor: '#e66100',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      elevation: 2, // for android
      shadowColor: '#000', // for ios
      shadowOffset: { width: 0, height: 2 }, // for ios
      shadowOpacity: 0.8, // for ios
      shadowRadius: 2, // for ios
    },
    loginButton: {
      backgroundColor: '#ebebeb',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      paddingBottom:10,
      elevation: 2, // for android
      shadowColor: '#000', // for ios
      shadowOffset: { width: 0, height: 2 }, // for ios
      shadowOpacity: 0.8, // for ios
      shadowRadius: 2, // for ios
    },
    loginButtonText: {
      color: '#e66100',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      fontSize:24
    },
    signupText: {
      marginRight: 5,
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontSize:24,
      
    },
    signupButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      fontSize:12
    },

  });
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/customer/login?username=${username}&password=${password}`
      , {
        method: 'GET',
      });
      if (response.ok) {
      const data = await response.json();
      const customerId = data.customerId; // Retrieve the customerId from the response
      const firstname=data.first_name;
      const lastname=data.last_name;
      const username=data.username;
      const password=data.password;
      const email=data.email;

      const phone_number=data.phone_number;
      const latitude=data.latitude;
      const longitude=data.longitude;
      const favorite_stores = data. favorite_stores;
      

      navigation.navigate('CustomDrawer', { firstname, lastname, customerId,username,password,phone_number,email,latitude,longitude });


    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  const handleSignUp = () => {
    // Handle sign up navigation or logic here
    // You can use the navigation object to navigate to the sign-up screen
    navigation.navigate('Signuppage');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image
        source={require('../assets/Swiftlogo.jpg')}
        style={styles.image }
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
       <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
  <Text style={styles.signupText}>Don't have an account?</Text>
  <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
    <Text style={styles.signupButtonText}>Sign Up</Text>
  </TouchableOpacity>
</View>
    </View>
    </TouchableWithoutFeedback>

  );
  
};



function mapDispatchToProps(dispatch) {
    return {
      setSelectedTab: (selectedTab) => {
        return dispatch(setSelectedTab(selectedTab));
      },
    };
  }
  
  export default connect(null, mapDispatchToProps)(loginpage);
  