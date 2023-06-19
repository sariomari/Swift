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

const Invite = ({ setSelectedTab }) => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        CoolFont: require('../assets/fonts/SweetRomance.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHand.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Set the background color to match the first snippet

      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 40,
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
      width:150,
      height:60
    },
    
    FImage: {
        width: 300,
        height: 300,

        alignItems: 'center',
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
          style={styles.logoContainer}
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
            Send this to your Friends :
            
          </Text>
         
        )}
        
      </View>
      <Image
          source={require('../assets/Download.png')}
          style={styles.FImage}
          resizeMode="contain"
        />
          <View>
        {fontLoaded && (
          <Text style={styles.text}>
            {'\n'}

           Thanks for all the love 
            {'\n'}
            {'\n'}
          </Text>
         
        )}
         {fontLoaded && (
          <Text style={styles.textnew}>

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

export default connect(null, mapDispatchToProps)(Invite);
