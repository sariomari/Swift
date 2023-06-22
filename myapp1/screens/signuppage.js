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
    ScrollView,
  } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import loginpage from './loginpage';
import {Own_URL} from '../Variables';
const Signuppage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigation = useNavigation();

 
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
      padding: 16,
      justifyContent: 'center',
      backgroundColor:"#ffffff",
      paddingTop:40
    },
    logo: {
      width: 250,
      height: 100,
      marginBottom: 24,
      alignSelf: 'center',
    },
    label: {
      fontSize: 20,
      marginBottom: 8,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingHorizontal: 10,
      marginBottom: 16,
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontSize:16
    },
    button: {
      backgroundColor: '#e66100',
      paddingVertical: 12,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    loginText: {
      fontSize: 16,
      color: '#333',
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
    },
    loginButton: {
      fontSize: 16,
      color: '#e66100',
      marginLeft: 5,
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
    },
  });

  const handleSignup = async () => {
    if (
      firstname &&
      lastname &&
      username &&
      password &&
      phoneNumber &&
      email &&
      latitude &&
      longitude
    ) {
      try {
        const response = await fetch(`${Own_URL}/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id:1,
            first_name: firstname,
            last_name: lastname,
            username: username,
            password: password,
            phone_number: phoneNumber,
            email: email,
            latitude: latitude,
            longitude: longitude,
            favorite_stores:[],
          }),
        });
  
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
  
        const data = await response.json();
  
        if (data === 'Added Successfully') {
          navigation.navigate('Loginpage');
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>

    <View style={styles.container}>
              <Image source={require('../assets/Swiftlogo.jpg')} style={styles.logo}  />
              <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
        placeholder="Enter your first name"
      />
       <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        placeholder="Enter your last name"
      />

       <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />


      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Enter your latitude"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Enter your longitude"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Loginpage')}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Signuppage;
