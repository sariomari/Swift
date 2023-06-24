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
  Button,
  ScrollView
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { Horizontalcards } from "../components"
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { Alert } from 'react-native';
import { PermissionsAndroid, Geolocation } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Own_URL } from '../Variables';
import { AntDesign } from '@expo/vector-icons';
const Cart = ({ navigation, route }) => {
  const { firstname, lastname, customerId, username, password, phone_number, email, latitude, longitude } = route.params;

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

  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        SweetRomane: require('../assets/fonts/SweetRomance.ttf'),
        Popregular: require('../assets/fonts/PoppinsRegular.ttf'),
        Popsemibold: require('../assets/fonts/PoppinsSemiBold.ttf'),
        Rockstyle: require('../assets/fonts/Starlight.ttf'),
        Formalf: require('../assets/fonts/SFCartoonistHand.ttf'),
        FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),



      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);





  const [currentlatitude, setcurrentlatitude] = useState(null);
  const [currentlongitude, setcurrentlongitude] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const [dataids, setdataids] = useState([]);
  const items = []
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${Own_URL}/cart/get_cart_items?customer=${customerId}`);
      if (response.ok) {
        const data = await response.json();
        const items = data.cart_items;
        setdataids(items)
        const itemDataPromises = items.map(async (item) => {
          const itemResponse = await fetch(`${Own_URL}/item/get_item_data?item_id=${item}`);
          if (itemResponse.ok) {
            const itemData = await itemResponse.json();
            return itemData;
          } else {
            console.log(`Failed to fetch item data for item ID ${item.id}`);
            return null;
          }
        });

        // Wait for all item data promises to resolve
        const itemDataList = await Promise.all(itemDataPromises);

        // Filter out any failed item data requests
        const validItemDataList = itemDataList.filter((itemData) => itemData !== null);

        // Set the fetched item data to the cartItems state
        setCartItems(validItemDataList);
      } else {
        console.log('Failed to fetch cart items');
      }
    } catch (error) {
      console.log('Error while fetching cart items:', error);
    }
  };



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
      height: 178, width: 255,
      marginBottom: 5,
      flexDirection: 'column', // Added this line
    },
    itemImage: {
      width: 150,
      height: 115,
      marginBottom: 5,
      marginTop: 5,
    },
    textContainer: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'left',
      flex: 1,
    },
    itemPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 24,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',


    },
    itemText: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
      fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Added this line
      paddingHorizontal: 10,

      },
    });
    
    const handleOrderNow = async () => {
      console.log(dataids)

      const firstItemId = dataids[0];  // Replace with your item id property
      let storeIdResponse = await fetch(`${Own_URL}/item/get_store_by_item_id?item_id=${firstItemId}`);
      let storeId = await storeIdResponse.text();
      storeId = storeId.replace('Store ID: ', '');
      console.log(firstItemId,storeId)
      if (cartItems.length > 0) {
        const currentTime = new Date().toISOString();
        const newOrder = {
          customer_id: customerId,
          destination_latitude: latitude,
          destination_longitude: longitude,
          items_ordered: dataids,
          store_id: storeId,
          order_time: currentTime,
        };
        if (dataids.length > 0) {
          try {
            const response = await fetch(`${Own_URL}/order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newCart),
            });
            if (response.ok) {
              const orderData = await response.json();
              // Process the order data
    
              const newCart = {
                customer: customerId,
                itemsincart: [],
              };
              const cartResponse = await fetch(`${Own_URL}/cart`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCart),
              });
              if (cartResponse.ok) {
                Alert.alert('Order Made!', 'You will have your items in no time , keep swifting ');

                setCartItems(fetchCartItems ); // Clear the cart items
              } else {
                console.log('Failed to clear cart:', cartResponse.status);
              }
            } else {
              console.log('Failed to clear cart:', cartResponse.status);
            }
          } 
         
      catch (error) {
          console.error('Error while adding order:', error);
        }
      } else {
        Alert.alert('Empty Cart', 'Please add items to your cart before placing an order.');
      }
    } else {
      Alert.alert('Empty Cart', 'Please add items to your cart before placing an order.');
    }
  };









  function renderSearch() {
    return (
      <View >
        {renderLogo()}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 2 }}>
            <Image source={require('../assets/menu.png')} style={{ width: 24, height: 24, tintColor: "#000000" }} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              marginHorizontal: 24,
              marginVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              flex: 1,
              backgroundColor: '#ebebeb'
            }}
          >
            <Image source={require("./../assets/search.png")}
              style={{
                width: 20, height: 20, tintColor: "#000000"
              }} />
            <TextInput
              style={{
                flex: 1,
                marginLeft: 12, fontFamily: fontLoaded ? 'SweetRomane' : 'Arial', fontSize: 18, lineHeight: 22



              }} placeholder='   Find a product' />

          </View>
        </View>
      </View>

    )
  }

  const MyFlatList = () => {
    const handleCartPress = React.useCallback(
      (item) => {

        const removeCartItem = async () => {
          try {

            const response = await fetch(`${Own_URL}/cart/remove_cart_item?customer=${customerId}&item=${item.item_id}`, {
              method: 'POST',
            });
            if (response.ok) {
              console.log('Item removed from cart:', item.id);

              // Update the cart items state by filtering out the removed item
              const updatedCartItems = cartItems.filter((cartItem) => cartItem.item_id !== item.item_id);
              setCartItems(updatedCartItems);
            } else {
              console.log('Failed to remove item from cart:', item.id);
            }
          } catch (error) {
            console.log('Error while removing item from cart:', error);
          }
        };

        removeCartItem();
      },
      [cartItems, customerId]
    );

    const handlePress = (item) => {
      // Handle press action for a specific item
      console.log('Pressed item:', item);
    };



    const renderItem = ({ item }) => (
      <View style={[styles.itemContainer, { width: screenWidth - 40 }]}>
        <View style={styles.itemContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={imageMapper[item.picture1]} style={styles.itemImage} resizeMode="contain" />
            <Image source={imageMapper[item.picture2]} style={styles.itemImage} resizeMode="contain" />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'right', paddingHorizontal: 14 }}>
            <TouchableOpacity style={styles.cartButton} onPress={() => handleCartPress(item)}>
              <AntDesign name="close" style={styles.cartIcon} />

            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.textContainer]}>
          <Text style={styles.itemText} >{item.description}</Text>

          <Text style={styles.itemPrice}>{item.price}<Text>₪</Text></Text>
        </View>

      </View>
    );
    return (
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        numColumns={numColumns}

      />
    )

  }

  const FlatListRef = React.useRef()

  function renderLogo() {
    return (
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Swiftlogo.jpg')} style={styles.logoImage} resizeMode="contain" />
      </View>
    );
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{
        backgroundColor: '#FFFFFF', // Set the desired background color here
        paddingTop: 30
      }}>

        {renderSearch()}

        <View style={{ marginBottom: 20 }}>
          <MyFlatList data={items}
            renderItem={({ item }) => renderItem(item)}
            numColumns={numColumns} />
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={() => handleOrderNow()}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
};



export default Cart;

