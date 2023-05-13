import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image } from "react-native";
import * as Location from "expo-location";

const requestLocationPermission = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

}

const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coords;
    // Do something with latitude and longitude
};

export default function DeliveryMap() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const getPermissions = async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        };
        getPermissions();
    }, []);

    let text = 'Waiting..';
    let latitude = 32.0852997;
    let longitude = 34.7818064;
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
    }
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
                ><Image source={require('./../assets/driverlogo.png')} style={{ height: 35, width: 35 }} />
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
