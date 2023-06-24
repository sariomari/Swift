
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
    Button ,Alert 
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
import OrderDetails from './OrderDetails';
import { Own_URL } from '../Variables';

const Orders = ({ navigation, route }) => {
  const {firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude} = route.params;  

    const [fontLoaded, setFontLoaded] = useState(false);
    useEffect(() => {
      const loadFont = async () => {
        await Font.loadAsync({
          SweetRomane: require('../assets/fonts/SweetRomance.ttf'),
          Popregular: require('../assets/fonts/PoppinsRegular.ttf'),
          Popsemibold: require('../assets/fonts/PoppinsSemiBold.ttf'),
          Rockstyle: require('../assets/fonts/Starlight.ttf'),
          FormalfB: require('../assets/fonts/SFCartoonistHandB.ttf'),
          Formalf: require('../assets/fonts/SFCartoonistHand.ttf'),

        });
        setFontLoaded(true);
      };
      loadFont();
    }, []);


    

    const [ordersList, setOrdersList] = React.useState([]);

    useEffect(() => {
      fetchOrderItems();
    }, []);
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`${Own_URL}/order/get_orders_by_customer?customer_id=${customerId}`);
        if (response.ok) {
          const data = await response.json();
          const processedOrders = await Promise.all(data.orders.map(async (order) => {
            const storeName = await retrieveStoreName(order.store_id);
            return {
              ...order,
              storeName,
            };
          }));
          setOrdersList(processedOrders);
        } else {
          console.log('Failed to fetch order data:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching order data:', error);
      }
    };






    const retrieveStoreName = async (storen) => {
      try {
        const response = await fetch(`${Own_URL}/store/get_store_name?store_id=${storen}`);
        if (response.ok) {
          const data = await response.json();
          return data.store_name;
        } else {
          console.log('Failed to retrieve store name:', response.status);
        }
      } catch (error) {
        console.log('Error occurred:', error);
      }
    };










     
      const screenWidth = Dimensions.get('window').width;
    
       navigation = useNavigation();
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 40,
            backgroundColor: '#FFFFFF', // Set the background color to match the first snippet
      
          },
    
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
          height:220,width:255,
          marginBottom:10,
          flexDirection: 'column', 

        },
        itemImage: {
          width: 100,
          height: 90,
          marginBottom: 15,
          borderRadius: 5,
          marginTop:5,
        },
          textContainer: {
            marginTop:1,
            flexDirection: 'row',
            alignItems: 'left',
            flex: 1,
            paddingHorizontal:20,
          },
          itemPrice:{
            fontSize: 22,
            fontWeight: 'bold',
            marginRight:24,
            fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
    
            
          },
          itemText: {
            fontSize: 25,
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
            paddingBottom:30,
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
          },
          logoButtonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          returnButton: {
            backgroundColor: '#B7E1A1',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 5,
            marginTop: 1,
          },
          returnButtonText: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize:25,
            fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
          },
          alertText: {
            fontFamily: fontLoaded ? 'Formalf' : 'Arial',            // Add other text styles as needed
          },
      });
      function renderLogo() {
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
      const [Orders, setOrders] = React.useState([]);
      ;
  
const MyFlatList = () => {
  
    const handlePress = (item) => {
        // Handle press action for a specific item
        //navigation.navigate('OrderDetails', { orderId: item.id }); // Pass orderId and itemsList as parameters // Navigates to OrderDetails page with orderId as a parameter
      };
      const [storeName, setStoreName] = useState('');


      const handleReturn = (item) => {
        const orderTime = new Date(item.order_time).getTime();
        const currentTime = Date.now();
        const timeDifference = currentTime - orderTime;
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        
        if (hoursDifference < 24) {
          Alert.alert('Eligible for Return', 'You need to pay a delivery fee of 25₪ , The card you are using would be charged with the fee.', [
         
          {
            text: 'Return',
            onPress: () => {
              Alert.alert('We are already working on it ', 'A currier is coming to take the order and to return it.', [{ text: 'OK' }]);
              // Handle Return button press
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              // Handle Cancel button press
            },
          },
        ]);
        } else {
          Alert.alert('Not Eligible for Return', 'An order is eligible for return only within 24 hours of making it.', [{ text: 'OK' }]);
        }
      };
    
    

const renderItem = ({ item }) => (


  
    <TouchableOpacity onPress={() => handlePress(item)} style={[styles.itemContainer, { width: screenWidth - 40 }]}>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{"Order Number:"}</Text>
      <Text style={styles.itemText}>{item.order_id}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{"Store:"}</Text>
      <Text style={styles.itemText}>{item.storeName}</Text>
    </View>
    <TouchableOpacity style={styles.returnButton} onPress={() => handleReturn(item)}>
      <Text style={styles.returnButtonText}>Return Order</Text>
    </TouchableOpacity>
  </TouchableOpacity>
    
    
);
return (
  <FlatList
  data={ordersList}
  renderItem={renderItem}
  numColumns={1}
  
/>
)

}

return (
    <View style={styles.container}>
    
     
      {renderLogo()}
      
      <View style={{ flex: 1 }}>
      <MyFlatList data={ordersList}
  renderItem={({ item }) => renderItem(item)}
  numColumns={1}/>
    </View>
    </View>

   
    )
    };

export default Orders;

