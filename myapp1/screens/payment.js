import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Text,TouchableWithoutFeedback, TouchableOpacity, Image, Keyboard } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const Payment = () => {
    const [fontLoaded, setFontLoaded] = React.useState(false);

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
  const [cardDetails, setCardDetails] = useState();
  const navigation = useNavigation();
  const handleSaveCard = () => {
    if (cardDetails?.complete) {
      Alert.alert('Card details saved!');
    } else {
      Alert.alert('Please enter complete card details');
    }
  };
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },saveCardButtonText: {
      color: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',

    },
    
    saveCardButton: {
      backgroundColor: '#ebebeb',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    container1: {
      alignItems: 'center',
      paddingTop: 40,
      backgroundColor: '#FFFFFF',
    },
    card: {
      height: 50,
    },
    buttonContainer: {
      marginTop: 20,
      alignSelf: 'center',
      backgroundColor:"#ffffff"
    },
    logoButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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

    return (
        <View style={styles.mainContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container1}>
              {renderSearch()}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={styles.card}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveCardButton} onPress={handleSaveCard}>
                <Text style={styles.saveCardButtonText}>Save Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
}



export default Payment;
