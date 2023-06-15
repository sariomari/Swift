import React from "react";
import {View,Text,} from 'react-native';

const Header=({containerStyle,title})=>{
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
                <Text style={{  fontFamily: "Poppins-SemiBold", fontSize: 16, lineHeight: 22}}>
                {title}

                </Text>


            </View>


        </View>
    )
}
export default Header;