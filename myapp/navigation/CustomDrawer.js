import React, { useState, } from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { View } from 'react-native';
import DeliveryMap from '../screens/deliveryMain';

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
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
                initialRouteName="Home"
            >
                <Drawer.Screen name="Home" component={DeliveryMap}>

                </Drawer.Screen>
            </Drawer.Navigator>

        </View>
    )
}