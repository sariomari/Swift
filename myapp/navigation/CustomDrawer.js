import React, { useState } from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { View } from 'react-native';
import LoginScrn from '../screens/loginScreen';
import DeliveryMap from '../screens/deliveryMain';

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
    return (
        <View
            style={{
                flex: 1,LoginScrn,
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
                initialRouteName=""
            >
                <Drawer.Screen name="Drawer">
                    {props => <DeliveryMap {...props} />}
                </Drawer.Screen>
            </Drawer.Navigator>

        </View>
    )
}