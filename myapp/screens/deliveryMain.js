import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image } from "react-native";

export default function DeliveryMap() {
    const latitude = 32.0852997;
    const longitude = 34.7818064;
    let driverName = "Sari Omari";
    let deliveringArea = "Tel Aviv";
    let demand = "Busy";
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title="Your Location"
                ><Image source={require('./../assets/driverlogo.png')} style={{height: 35, width: 35 }} />
                </Marker>
                
            </MapView>

            <View style={styles.bottomBar}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Delivery Area</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.deliveringAreaText}>{deliveringArea}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: "gray", fontSize: 14, marginBottom: 4, }}>Demand: {demand}</Text>
                </View>

            </View>
        </View>
    );
};

const styles = {
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
        alignItems: 'left',
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    deliveringAreaText: {
        fontSize: 23,
        marginBottom: 4,
        fontWeight: "bold",
    },
    infoContainer: {
        marginRight: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 4,
    },
};
