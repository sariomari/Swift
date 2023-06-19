import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const HelpCenter = ({ setSelectedTab }) => {
  const navigation = useNavigation();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 40,
      backgroundColor: '#FFFFFF', // Set the background color to match the first snippet

    },
    text: {
      fontFamily: fontLoaded ? 'Formalf' : 'Arial',
      fontWeight: 'bold',
      fontSize: 34,
      textAlign: 'center',
      color: '#000000',
      marginBottom: 20,
    },
    textnew: {
      fontFamily: fontLoaded ? 'CoolFont' : 'Arial',
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
  });



  function renderSearch() {
    return (
      <View style={styles.logoButtonContainer}>
         <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ position:'absolute' , right:232 }}>
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
    // Handle button press logic here
    console.log('Button pressed');
  };

  return (
 
      <View style={styles.container}>{renderSearch()}
      <View>
        {fontLoaded && (
          <Text style={styles.text}>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            Contact us for any problem:
            {'\n'}
            {'\n'}
            TechnicalSupport@Swift.com
            {'\n'}
            {'\n'}
            +972502638799
            {'\n'}
            {'\n'}
            We are always here to help!
          </Text>
         
        )}
         {fontLoaded && (
          <Text style={styles.textnew}>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            Swift Team
          </Text>

        )}
      </View>
      </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

export default connect(null, mapDispatchToProps)(HelpCenter);
