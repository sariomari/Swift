import React from "react";
import {
    TouchableOpacity,View,Text,Image
} from 'react-native';

const Horizontalcards = ({containerStyle,imageStyle,item,onPress})=>{
    return (
        <TouchableOpacity style={{

            flexDirection:'row',
            borderRadius:12,
            backgroundColor:"#757D85",
            ...containerStyle
        }}>

        </TouchableOpacity>

    )
}
export default Horizontalcards;