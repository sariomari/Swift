import React, { useState, useEffect } from 'react';
import {View,Text,} from 'react-native';
import * as Font from 'expo-font';
const Header=({containerStyle,title})=>{

    const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        SweetRomane: require('../assets/fonts/SweetRomance.ttf'),
        Popregular: require('../assets/fonts/PoppinsRegular.ttf'),
        Popsemibold: require('../assets/fonts/PoppinsSemiBold.ttf'),
        Rockstyle: require('../assets/fonts/Starlight.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);
    return(
        <View
            style={{
                flexDirection:'row',
                ...containerStyle

            }}

            

        >
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'

            }}>
                <Text style={{  fontFamily: fontLoaded ? 'Popsemibold' : 'Arial', fontSize: 16, lineHeight: 22}}>
                {title}

                </Text>


            </View>


        </View>
    )
}
export default Header;