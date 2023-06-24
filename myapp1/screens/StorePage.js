
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
import {Own_URL} from '../Variables'; 
import { Alert } from 'react-native';

const StorePage = ({ navigation, route }) => {
  const [items, setItems] = useState([]);

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
  const { store_id ,customerId} = route.params;
  const getdata = async () => {
    
  try{
    
    let response = await fetch(`${Own_URL}/item/get_store_items?store_id=${store_id}`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      setItems(data.items);

  // Navigating to the StorePage with the items
    }
    else {
    Alert.alert('Login Failed', 'Invalid username or password');
    }
  
  }
  catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'An error occurred during login');
  }
 
};
useEffect(() => {
  getdata();
}, [store_id]);












  const [itemsList, setitemsList] = React.useState([]);
  
  React.useEffect(() => {
    setitemsList(items);
  }, [items]);
 
  const screenWidth = Dimensions.get('window').width;

   navigation = useNavigation();
  
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
      width: 150,
      height: 115,
      marginBottom: 5,
      marginTop:5,
    },
      textContainer: {
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'left',
        flex: 1,
      },
      itemPrice:{
        fontSize: 18,
        fontWeight: 'bold',
        marginRight:24,
        fontFamily: fontLoaded ? 'FormalfB' : 'Arial',

        
      },
      itemText: {
        fontSize: 16,
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
        alignItems: 'led',
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

const handleCartPress = async (item) => {
      curritemid=item.item_id
      const response1 = await fetch(`${Own_URL}/cart/get_cart_id?customer_id=${customerId}`);
      const currentcartid = await response1.json();
      try {
        // Make the request to add the item to the cart
        const response = await fetch(`${Own_URL}/cart`, {
          method: 'ADD_I',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customerId,
            cart_id: currentcartid,
            item_id: item.item_id,
          }),
        });
    
        if (response.ok) {
          // Item was added successfully
          Alert.alert('Great Pick ', 'Item added to cart');
        } else {
          // Handle the case where adding the item to the cart failed
          Alert.alert('Error', 'Failed to add item to cart');
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        Alert.alert('Error', 'An error occurred while adding item to cart');
      }
    
        
}
    

    
  
const MyFlatList = () => {
  
  const handlePress = (item) => {
    // Handle press action for a specific item
    console.log('Pressed item:', item);
  };

  const imageMapper = {
    './../../ItemsPictures/Nike/nike_first_item1.jpeg': require('./../assets/Nike/nike_first_item1.jpeg'),
    './../../ItemsPictures//Nike/nike_first_item2.jpeg': require('./../assets/Nike/nike_first_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_2_item1.jpeg': require('./../assets/Nike/nike_2_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_2_item2.jpeg': require('./../assets/Nike/nike_2_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_3_item1.jpeg': require('./../assets/Nike/nike_3_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_3_item2.jpeg': require('./../assets/Nike/nike_3_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_4_item1.jpeg': require('./../assets/Nike/nike_4_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_4_item2.jpeg': require('./../assets/Nike/nike_4_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_5_item1.jpeg': require('./../assets/Nike/nike_5_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_5_item2.jpeg': require('./../assets/Nike/nike_5_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_6_item1.jpeg': require('./../assets/Nike/nike_6_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_6_item2.jpeg': require('./../assets/Nike/nike_6_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_7_item1.jpeg': require('./../assets/Nike/nike_7_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_7_item2.jpeg': require('./../assets/Nike/nike_7_item2.jpeg'),
    './../../ItemsPictures/Nike/nike_8_item1.jpeg': require('./../assets/Nike/nike_8_item1.jpeg'),
    './../../ItemsPictures/Nike/nike_8_item2.jpeg': require('./../assets/Nike/nike_8_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_1_item1.jpeg': require('./../assets/Zara/zara_1_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_1_item2.jpeg': require('./../assets/Zara/zara_1_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_2_item1.jpeg': require('./../assets/Zara/zara_2_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_2_item2.jpeg': require('./../assets/Zara/zara_2_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_3_item1.jpeg': require('./../assets/Zara/zara_3_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_3_item2.jpeg': require('./../assets/Zara/zara_3_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_4_item1.jpeg': require('./../assets/Zara/zara_4_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_4_item2.jpeg': require('./../assets/Zara/zara_4_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_5_item1.jpeg': require('./../assets/Zara/zara_5_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_5_item2.jpeg': require('./../assets/Zara/zara_5_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_6_item1.jpeg': require('./../assets/Zara/zara_6_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_6_item2.jpeg': require('./../assets/Zara/zara_6_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_7_item1.jpeg': require('./../assets/Zara/zara_7_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_7_item2.jpeg': require('./../assets/Zara/zara_7_item2.jpeg'),
    './../../ItemsPictures/Zara/zara_8_item1.jpeg': require('./../assets/Zara/zara_8_item1.jpeg'),
    './../../ItemsPictures/Zara/zara_8_item2.jpeg': require('./../assets/Zara/zara_8_item2.jpeg'),
    
    
  }

const renderItem = ({ item }) => (
  <View style={[styles.itemContainer, { width: screenWidth - 40 }]}>
  <View style={styles.itemContent}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={imageMapper[item.picture1]} style={styles.itemImage} resizeMode="contain"  />
      <Image source={imageMapper[item.picture2]} style={styles.itemImage} resizeMode="contain"  />
      </View>
      <View style={{ flexDirection: 'row', alignSelf:'right' ,paddingHorizontal:14 }}>
      <TouchableOpacity style={styles.cartButton} onPress={() => handleCartPress(item)}>
      
          <AntDesign name="shoppingcart" style={styles.cartIcon} />
      
      </TouchableOpacity>
      </View>
      </View>
      <View style={[styles.textContainer ]}>
        <Text style={styles.itemText } >{item.description}</Text>
        
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
      <MyFlatList data={items}
  renderItem={({ item }) => renderItem(item)}
  numColumns={numColumns}/>
    </View>
    </View>

   
    )
    };



  export default StorePage;

