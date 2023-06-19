
import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    Button 
} from 'react-native';
import Animated,{useSharedValue ,useAnimatedStyle,withTiming}from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import  {Horizontalcards}from "../components"
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';

const StorePage = ({ navigation, route }) => {
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
  const { items } = route.params;
  const [itemsList, setitemsList] = React.useState(items);
  
  React.useEffect(() => {
    setitemsList(items);
  }, [items]);
 
  const screenWidth = Dimensions.get('window').width;

   navigation = useNavigation();
  console.log('Items:', items);
  
  const numColumns = 1;
  const styles = StyleSheet.create({
    
    
    itemContainer: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      marginVertical: 10,
      marginHorizontal: 8,
      backgroundColor: '#ebebeb',
      borderRadius: 8,
      height:178,width:255,
      marginBottom:10,
      flexDirection: 'column', // Added this line
    },
    itemImage: {
      width: 100,
      height: 90,
      marginBottom: 15,
      borderRadius: 5,
      marginTop:5,
    },
      textContainer: {
        marginTop:15,
        flexDirection: 'row',
        alignItems: 'left',
        flex: 1,
      },
      itemPrice:{
        fontSize: 22,
        fontWeight: 'bold',
        marginRight:24,
        fontFamily: fontLoaded ? 'FormalfB' : 'Arial',

        
      },
      itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex:1,
        fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Added this line
        paddingHorizontal: 10,

      },
      favoriteButton: {
        marginLeft: 16,
       
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoImage: {
        width: 150,
        height:60,
        alignItems:'center',
      },
      cartButton: {
        position: 'absolute',
        top: 5,
        right: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebebeb',
        borderRadius: 15,
        zIndex: 1,
      },
      cartIcon: {
        fontSize: 32,
        color: '#000000',
      }
  });



  function renderSearch(){
    return (
        <View style={styles.container}>
      {renderLogo()}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 2 }}>
          <Image source={require('../assets/menu.png')} style={{ width: 24, height: 24,tintColor:"#000000" }} />
        </TouchableOpacity>
        <View 
            style={{
                flexDirection:'row',
                height:50,
                alignItems:'center',
                marginHorizontal:24,
                marginVertical:8,
                paddingHorizontal:12,
                borderRadius:12,
                flex:1,
                backgroundColor:'#ebebeb'
            }}
        >
            <Image source={require("./../assets/search.png")}
               style={{ width:20,height:20,tintColor:"#000000"
               }}/>
            <TextInput
            style={{
                flex:1,
                fontFamily: fontLoaded ? 'SweetRomane' : 'Arial', fontSize:18, lineHeight: 22,color:'#000000'



              }} placeholder='    Find a Product'/>

</View>
        </View>
        </View>

    )
}
const [cartItems, setCartItems] = React.useState([]);

const handleCartPress = React.useCallback(
  (item) => {
    // Check if the item is already in the cart
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (index === -1) {
      // Item is not in the cart, add it
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
    } else {
      // Item is already in the cart, remove it
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      setCartItems(updatedCart);
    }
  },
  [cartItems]
);
  
const MyFlatList = () => {
  
  const handlePress = (item) => {
    // Handle press action for a specific item
    console.log('Pressed item:', item);
  };

  

const renderItem = ({ item }) => (
  <View style={[styles.itemContainer, { width: screenWidth - 40 }]}>
  <View style={styles.itemContent}>
    <View style={{ flexDirection: 'row', alignItems: 'center',paddingRight:60 }}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain"  />
      <Image source={item.image} style={styles.itemImage} resizeMode="contain"  />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'right', paddingHorizontal: 12 }}>
      <TouchableOpacity style={styles.cartButton} onPress={() => handleCartPress(item)}>
        {cartItems.some((cartItem) => cartItem.id === item.id) ? (
          <AntDesign name="check" style={styles.cartIcon} />
        ) : (
          <AntDesign name="shoppingcart" style={styles.cartIcon} />
        )}
      </TouchableOpacity>
      </View>
      </View>
      <View style={[styles.textContainer ]}>
        <Text style={styles.itemText } >{item.name}</Text>
        
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    
    </View>
);
return (
  <FlatList
  data={itemsList}
  renderItem={renderItem}
  numColumns={numColumns}
  
/>
)

}

const FlatListRef =React.useRef()

  function renderLogo() {
    return (
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Swiftlogo.jpg')} style={styles.logoImage} resizeMode="contain" />
      </View>
    );
  }


  return (
    <View style={{
      flex:1,
      paddingTop:30,
      backgroundColor:"#FFFFFF"

  }}>
     
      {renderSearch()}
      
      <View style={{ flex: 1 }}>
      <MyFlatList data={itemsList}
  renderItem={({ item }) => renderItem(item)}
  numColumns={numColumns}/>
    </View>
    </View>

   
    )
    };



  export default StorePage;

