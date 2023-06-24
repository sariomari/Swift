import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import {Own_URL} from '../Variables'; 
import axios from 'axios';

const Profile = ({ setSelectedTab ,route}) => {
  const {firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude} = route.params;  

  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [firstName, setFirstName] = React.useState(firstname);
  const [Username, setusername] = React.useState(username);
  const [Password, setpassword] = React.useState(password);

  const [lastName, setLastName] = React.useState(lastname);
  const [phoneNumber, setPhoneNumber] = React.useState(phone_number);
  const [Email, setEmail] = React.useState(email);
  const [Latitude, setLatitude] = React.useState(latitude);
  const [Longitude, setLongitude] = React.useState(longitude);

  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        CoolFont: require('../assets/fonts/SweetRomance.ttf'),
        Formalf: require('../assets/fonts/SFCartoonistHand.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 40,
      backgroundColor: '#FFFFFF',
    },
    text: {
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontWeight: 'bold',
      fontSize: 34,
      textAlign: 'center',
      color: '#000000',
      marginBottom: 20,
      paddingTop: 25,
    },
    textt: {
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontWeight: 'bold',
      fontSize: 34,
      textAlign: 'center',
      color: '#000000',
      marginBottom: 20,
      paddingTop: 25,
      
    },
    texttt: {
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontWeight: 'bold',
      fontSize: 26,
      textAlign: 'center',
      color: '#000000',
      marginBottom: 20,
      paddingTop: 25,
      
    },
    textnew: {
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      color: '#000000',
      marginBottom: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      width: 150,
      height: 60,
      alignItems: 'center',
    },
    logoButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    drawerButton: {
      position: 'absolute',
      right: 16,
    },
    drawerIcon: {
      width: 24,
      height: 24,
      tintColor: '#000000',
    },
    inputContainer: {
      width: 180,
      flexDirection: 'row',
      alignItems: 'left',
      alignItems: 'flex-start'
    },
    inputLabel: {
      flex: 0,
      fontWeight: 'bold',
    },
    input: {
      flex: 2,
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: 18, // Adjust the font size as desired
      paddingVertical: 12, // Adjust the padding to increase the height
    },
    editButton: {
      backgroundColor: '#ebebeb',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginTop: 5,
    },
    editButtonText: {
      color: '#000000',
      fontWeight: 'bold',
    },
  });

  function renderSearch() {
    return (
      <View style={styles.logoButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ position: 'absolute', right: 232 }}
        >
          <Image
            source={require('../assets/menu.png')}
            style={{ width: 24, height: 24, tintColor: '#000000' }}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Swiftlogo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  const handleButtonPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveButtonPress = () => {

    const updatedCustomer = {
      customer_id: customerId,
      username: Username,
      password: Password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: Email,
      latitude: Latitude,
      longitude: Longitude,
    };

    // Send PUT request to update the customer
    axios.put(`${Own_URL}/customer`, updatedCustomer)
      .then((response) => {
        console.log('Update Successful');
        // Perform necessary actions after successful update
      })
      .catch((error) => {
        console.error('Failed to update:', error);
        // Perform necessary actions on error
      });

    setIsEditing(false);
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <ScrollView > 
    <View style={styles.container}>
      {renderSearch()}
      {fontLoaded && (
        <View style={{ alignSelf:'flex-start' , paddingLeft:10}}>
        <View style={styles.inputContainer}>
          <Text style={styles.textt}>User Name:</Text>
          {isEditing ? (
             <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              defaultValue={Username}
              onChangeText={setusername}
            />
            </View>
          ) : (
            <Text style={styles.textt}>{Username}</Text>
          )}
        </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textt}>Password:</Text>
            {isEditing ? (
               <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                defaultValue={Password}
                onChangeText={setpassword}
              />
              </View>
            ) : (
              <Text style={styles.textt}>{Password}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textt}>First Name:</Text>
            {isEditing ? (
               <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                defaultValue={firstName}
                onChangeText={setFirstName}
              />
              </View>
            ) : (
              <Text style={styles.textt}>{firstName}</Text>
            )}
          </View>

         <View style={styles.inputContainer}>
          <Text style={styles.textt}> 
            Last Name:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  defaultValue={lastName}
                  onChangeText={setLastName}
                />
              </View>
            ) : (
              <Text style={styles.textt}>{lastName}</Text>
            )}
         </View>
            
         <View style={styles.inputContainer}>
          <Text style={styles.textt}> 
          Phone Number:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  defaultValue={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            ) : (
              <Text style={styles.textt}>{phoneNumber}</Text>
            )}
         </View>

         <View style={styles.inputContainer}>
          <Text style={styles.textt}> 
          Email:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
            <TextInput
                  style={[styles.input]}
                  defaultValue={Email}
                  onChangeText={setEmail}
                />
              </View>
            ) : (
              <Text style={styles.textt}>{Email}</Text>
            )}
         </View>


         <View style={styles.inputContainer}>
          <Text style={styles.textt}> 
          Latitude:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
          <TextInput
                  style={styles.input}
                  defaultValue={Latitude}
                  onChangeText={setLatitude}
                />
              </View>
            ) : (
              <Text style={styles.textt} >{Latitude}</Text>
            )}
         </View>    
         
         
              <View style={styles.inputContainer}>
          <Text style={styles.textt}> 
          Longitude:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
 <TextInput
                  style={styles.input}
                  defaultValue={Longitude}
                  onChangeText={setLongitude}
                />
              </View>
            ) : (
              <Text style={styles.textt}>{Longitude}</Text>
            )}
         </View>
       
        </View>
      )}

      <TouchableOpacity style={styles.editButton} onPress={handleButtonPress}>
        <Text style={styles.editButtonText}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Text>
      </TouchableOpacity>
      {isEditing && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleSaveButtonPress}
        >
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
    </ScrollView>
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

export default connect(null, mapDispatchToProps)(Profile);
