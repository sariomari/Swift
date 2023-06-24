import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import LoginScrn from '../screens/loginScreen';
import SignUpScrn from '../screens/signUpScreen';
import MainLayout from '../screens/MainLayout';
import Favorites from '../screens/favorites';
import StorePage from '../screens/StorePage';
import Cart from '../screens/cart';
import Invite from '../screens/Invite';
import HelpCenter from '../screens/HelpCenter';
import Loginpage from '../screens/loginpage';
import Orders from '../screens/orders';
import OrderDetails from '../screens/OrderDetails';
import Profile from '../screens/Profile';
import Signuppage from '../screens/signuppage';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import {Own_URL} from '../Variables'; 

const storeItems = [
  { id: '1', name: 'Slim Fit Trousers', image: require('./../assets/nike.png'), price: '$29.99' },
  { id: '2', name: 'Straight Leg Pants', image: require('./../assets/nike.png'), price: '$39.99' },
  { id: '3', name: 'Wide-Leg Trousers', image: require('./../assets/nike.png'), price: '$34.99' },
  { id: '4', name: 'High-Waisted Pants', image: require('./../assets/nike.png'), price: '$44.99' },
  // Add more items as needed
];
const OrdersI = [
  { id: '12345',  items: storeItems },
  { id: '23456', items: storeItems  },
  { id: '34567',items: storeItems  },
  { id: '45678', items: storeItems  },
  // Add more items as needed
];

const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
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
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: 8,
        alignItems: 'center',
        paddingLeft: 12,
        borderRadius: 8,
        backgroundColor: isFocused ? "rgba(0, 0, 0, 0.1)" : null,
        
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: "#000000"
        }}
      />
      <Text
        style={{
          marginLeft: 19,
          color: "#000000",
          fontFamily: fontLoaded ? 'FormalfB' : 'Arial',
          fontSize: 15,
          lineHeight: 23
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab,firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude,favorite_stores }) => {

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
  fetch(`${Own_URL}/customer/${customerId}`, {
    method: 'FAVORITE_STORES',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      favorite_stores=data

      // Process the returned data
      // Update your React Native component state or perform other actions
    })
    .catch((error) => {
      console.error(error);
      // Handle any error that occurs during the request
    });
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{
        flex: 1,
        paddingHorizontal: 20
      }}>
        {/*close*/}
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'center'
        }
        }>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={require("./../assets/cross.png")}
              style={{
                height: 35,
                width: 35,
                tintColor: "#000000"
              }}
            />
          </TouchableOpacity>
        </View>
        {/*profile*/}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 12,
            alignItems: 'center'
          }}
          onPress={() =>  navigation.navigate("Profile",{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude})}
        >
          <Image
            source={require("./../assets/avataricon.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 12
            }}
          />
          <View style={{
            marginLeft: 12
          }}>
            <Text style={{ color: "#000000", fontFamily: fontLoaded ? 'FormalfB' : 'Arial', fontSize: 16, lineHeight: 22 }}>  {`${firstname} ${lastname}`} </Text>
            <Text style={{ color: "#000000", fontFamily: fontLoaded ? 'Formalf' : 'Arial', fontSize: 14, lineHeight: 22 }}>View Your Profile </Text>
          </View>
        </TouchableOpacity>
        {/*Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: 24,
           
          }}
        >
          <CustomDrawerItem
            label={"Home"}
            icon={require("./../assets/home.png")}
            isFocused={selectedTab == "MainLayout"}
            onPress={() => {
              setSelectedTab("MainLayout")
              navigation.navigate("MainLayout",{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude})
            }}
          />
          <CustomDrawerItem
            label={"My Favorites"}
            icon={require("./../assets/favourite.png")}
            isFocused={selectedTab == "My Favorites"}
            onPress={() => {
              setSelectedTab("My Favorites")
              navigation.navigate("Favorites",{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude,favorite_stores})
            }}
          />
          <CustomDrawerItem
            label={"My Cart"}
            icon={require("./../assets/carticon.png")}
            isFocused={selectedTab == "My Cart"}
            onPress={() => {
              setSelectedTab("My Cart")
              navigation.navigate("Cart",{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude})
            }}
          />
          <CustomDrawerItem
            label={"My Orders"}
            icon={require("./../assets/orders.png")}
            isFocused={selectedTab == "My Orders"}
            onPress={() => {
              setSelectedTab("My Orders")
              navigation.navigate("Orders",{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude} )
            }}
          />
          {/*line devider*/}
          <View
            style={{
              height: 1,
              marginVertical: 12,
              marginLeft: 12,
              backgroundColor: "#525C67"
            }}>
          </View>
          <CustomDrawerItem
            label={"Invite A friend"}
            icon={require("./../assets/profile.png")}
            isFocused={selectedTab == "Invite A friend"}
            onPress={() => {
              setSelectedTab("Invite")
              navigation.navigate("Invite")
            }}
          />
          <CustomDrawerItem
            label={"Help Center"}
            icon={require("./../assets/help.png")}
            isFocused={selectedTab == "Help Center"}
            onPress={() => {
              setSelectedTab("Help Center")
              navigation.navigate("HelpCenter")
            }}
          />



        </View>
        <View
          style={{
            marginBottom: 24
          }}
        >
          <CustomDrawerItem
            label="Logout"
            icon={require("./../assets/logout.png")}
            isFocused={selectedTab == "Logout"}
            onPress={() => {
              navigation.navigate("Loginpage")
            }}
          />
        </View>
      </View>

    </DrawerContentScrollView>
  )
}
const CustomDrawer = ({ selectedTab, setSelectedTab,route }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { firstname, lastname, customerId ,username,password,phone_number,email,latitude,longitude} = route.params; // Get the route parameters

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        SweetRomane: require('../assets/fonts/SweetRomance.ttf'),
        Popregular: require('../assets/fonts/PoppinsRegular.ttf'),
        Popsemibold: require('../assets/fonts/PoppinsSemiBold.ttf'),
        Rockstyle: require('../assets/fonts/Starlight.ttf'),

      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);
  favorite_stores=[]
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  })
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26]
  })
  const animatedStyle = { borderRadius, tranform: [{ scale }] }
  
   
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: '65%',
          paddingRight: 20,
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName="MainLayout"
        drawerPosition="left"
        drawerContent={props => {
          setTimeout(() => {
            setProgress(props.progress)
          }, 0)
          return (
            <CustomDrawerContent
              navigation={props.navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              firstname={firstname}
              lastname ={lastname}
              customerId={customerId}
              username={username}
              password={password}
              phone_number={phone_number}
              latitude={latitude}
              longitude={longitude}
              email={email}
              favorite_stores={favorite_stores}
              
            />
          )
        }}
      >

        <Drawer.Screen name="MainLayout" options={{ headerShown: false }} >
          {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} customerData={{firstname,lastname,customerId,username,password,phone_number,email,latitude,longitude}} />}

        </Drawer.Screen>
        <Drawer.Screen name="Favorites" options={{ headerShown: false }} component={Favorites} />
        <Drawer.Screen name="StorePage" options={{ headerShown: false }} component={StorePage} />
        <Drawer.Screen name="Cart" options={{ headerShown: false }} component={Cart} />
        <Drawer.Screen name="HelpCenter" options={{ headerShown: false }} component={HelpCenter} />
        <Drawer.Screen name="Invite" options={{ headerShown: false }} component={Invite} />
        <Drawer.Screen name="Orders" options={{ headerShown: false }} component={Orders} />
        <Drawer.Screen name="OrderDetails" options={{ headerShown: false }} component={OrderDetails} />

        <Drawer.Screen name="Profile" options={{ headerShown: false }} component={Profile} />

      </Drawer.Navigator>

    </View>
  )
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab  };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => { return dispatch(setSelectedTab(selectedTab)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
