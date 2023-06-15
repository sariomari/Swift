import React, { useState, } from 'react';
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, Image,TouchableOpacity, View ,StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import LoginScrn from '../screens/loginScreen';
import SignUpScrn from '../screens/signUpScreen';
import MainLayout from '../screens/MainLayout';
import Favorites from '../screens/favorites';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import StorePage  from '../screens/StorePage';
const storeItems = [
    { id: '1', name: 'Slim Fit Trousers', image: require('./../assets/nike.png'), price: '$29.99' },
    { id: '2', name: 'Straight Leg Pants', image: require('./../assets/nike.png'), price: '$39.99' },
    { id: '3', name: 'Wide-Leg Trousers', image: require('./../assets/nike.png'), price: '$34.99' },
    { id: '4', name: 'High-Waisted Pants', image: require('./../assets/nike.png'), price: '$44.99' },
    // Add more items as needed
  ];
const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({label,icon,isFocused,onPress})=>{
    return (
        <TouchableOpacity 
        style={{
            flexDirection:'row',
            height:40,
            marginBottom:8,
            alignItems: 'center',
            paddingLeft:12,
            borderRadius:8,
            backgroundColor:isFocused? "rgba(0, 0, 0, 0.1)":null
        }}
        onPress={onPress}
        >
            <Image source={icon}
                style={{
                    width:20,
                    height:20,
                    tintColor:"#000000"
                }}/>
            <Text 
            style={{
                marginLeft:15,
                color:"#000000",
                fontFamily: "Poppins-SemiBold",
                 fontSize: 16,
                  lineHeight: 22

            }}
            >{label}</Text>
        </TouchableOpacity>
    )
}
const CustomDrawerContent=({navigation,selectedTab,setSelectedTab})=>{
    return (
        <DrawerContentScrollView
             scrollEnabled={true}
            contentContainerStyle={{flex :1 }}
        >
            <View style={{
                flex: 1,
                paddingHorizontal: 20
            }}>
                {/*close*/}
                <View style={{alignItems:'flex-start',
                                justifyContent:'center'
                }
                }>
                    <TouchableOpacity
                    style={{
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={() => navigation.closeDrawer()}
                    >
                        <Image source={require("./../assets/cross.png")}
                        style={{
                            height:35,
                            width:35,
                            tintColor:"#000000"

                        }}
                                />
                    </TouchableOpacity>
                </View>
                {/*profile*/}
                <TouchableOpacity 
                style={{
                    flexDirection:'row',
                    marginTop:12,
                    alignItems:'center'
                }}
                onPress={() => console.log("Profile")}
                >
                    <Image source={require("./../assets/avataricon.png")}
                        style={{
                            width:50,
                            height:50,
                            borderRadius:12
                        }}
                    />
                    <View style={{
                        marginLeft:12
                    }}>
                        <Text style={{color:"#000000",  fontFamily: 'Poppins-SemiBold', fontSize: 16, lineHeight: 22 }}>Ahmad Rayan </Text>
                        <Text style={{color:"#000000",fontFamily: "Poppins-Regular", fontSize: 14, lineHeight: 22 }}>View Your Profile </Text>
                    </View>
                </TouchableOpacity>
                {/*Drawer Items */}
                <View
                style={{
                    flex:1,
                    marginTop:24
                }}
                >
                    <CustomDrawerItem
                        label={"Home"} 
                        icon={require("./../assets/home.png")}
                        isFocused={selectedTab=="Home"}
                        onPress={()=>{
                            setSelectedTab("Home")
                            navigation.navigate("Home")
                        }}
                    />
                     <CustomDrawerItem
                        label={"My Favorites"} 
                        icon={require("./../assets/favourite.png")}
                        isFocused={selectedTab=="My Favorites"}
                        onPress={()=>{
                            setSelectedTab("My Favorites")
                            navigation.navigate("Favorites")
                        }}
                    />
                    <CustomDrawerItem
                        label={"My Cart"} 
                        icon={require("./../assets/carticon.png")}
                        isFocused={selectedTab=="My Cart"}
                        onPress={()=>{
                            setSelectedTab("My Cart")
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label={"My Orders"} 
                        icon={require("./../assets/orders.png")}
                        isFocused={selectedTab=="My Orders"}
                        onPress={()=>{
                            setSelectedTab("My Orders")
                            navigation.navigate("MainLayout")}}
                    />
                    {/*line devider*/}
                    <View
                        style={{
                            height:1 ,
                            marginVertical:12,
                            marginLeft:12,
                            backgroundColor:"#525C67"
                        }}></View>
                    <CustomDrawerItem
                        label={"Invite A friend"} 
                        icon={require("./../assets/profile.png")}
                    />
                    <CustomDrawerItem
                        label={"Help Center"} 
                        icon={require("./../assets/help.png")}
                    />
                    
                   

                </View>
                <View
                    style={{
                        marginBottom:24
                    }}
                    >
                    <CustomDrawerItem 
                        label="Logout"
                        icon={require("./../assets/logout.png")}                  
                              />
                </View>
            </View>

        </DrawerContentScrollView>
    )
}
const CustomDrawer = ({selectedTab,setSelectedTab}) => {
    const [progress,setProgress] =React.useState(new Animated.Value(0))
    const scale = Animated.interpolateNode(progress,{
        inputRange:[0,1],
        outputRange:[1,0.8]
    })
    const borderRadius = Animated.interpolateNode(progress,{
        inputRange:[0,1],
        outputRange:[0,26]
    })
    const animatedStyle = {borderRadius,tranform:[{scale}]}

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
                setTimeout(()=>{
                    setProgress(props.progress)},0)
                return(
                    <CustomDrawerContent 
                    navigation = {props.navigation}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    /> 
                )
            }} 
        >
            <Drawer.Screen name="Home" options={{headerShown:false}} >
                {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle}/>}

            </Drawer.Screen>
            <Drawer.Screen name="Favorites" options={{headerShown:false}} component={Favorites} />
            <Drawer.Screen name="StorePage" options={{headerShown:false}} component={StorePage} />


        </Drawer.Navigator>

    </View>
    )
}

function mapStateToProps(state){
    return{
        selectedTab:state.tabReducer.selectedTab
    }
}
function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selectedTab)=>{return dispatch(setSelectedTab(selectedTab)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
