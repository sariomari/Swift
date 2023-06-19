import React from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { View, SafeAreaView, StyleSheet, Dimensions, Image, Text } from "react-native";
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import PubNub from "pubnub";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 51.515579;
const LONGITUDE = -0.128360;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DeliveryMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        };

        this.pubnub = new PubNub({
            publishKey: "pub-c-f06a9a5c-8872-4069-9e9f-24c21f169c4b",
            subscribeKey: "sub-c-2b7777f6-156d-46a5-a975-3e7a4ff60d38",
            userId: "sari12"
        });

    }

    componentDidMount() {
        this.watchLocation();
    }

    componentDidUpdate(prevState) {
        if (this.props.latitude !== prevState.latitude) {
            this.pubnub.publish({
                message: {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                },
                channel: "location"
            });
        }
    }

    componentWillUnmount() {
        this.stopWatchingLocation();
    }

    watchLocation = async () => {
        const { coordinate } = this.state;
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission denied for accessing location');
            // Handle the case where the user denied permission
            return;
        }

        this.watchLocationTask = watchPositionAsync(
            {
                distanceInterval: 10, // Set the desired distance interval for updates
                accuracy: Location.Accuracy.BestForNavigation, // Set the desired accuracy level
            },
            (location) => {
                const { latitude, longitude } = location.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "ios") {
                    coordinate.timing(newCoordinate).start();
                } else {}

                this.setState({
                    latitude,
                    longitude
                });
            }
        );
    };

    stopWatchingLocation = () => {
        if (this.watchLocationTask) {
            this.watchLocationTask.remove();
            this.watchLocationTask = null;
        }
    };

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    render() {
        let deliveringArea = "Tel Aviv";
        let demand = "Busy";
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        showUserLocation
                        followUserLocation
                        loadingEnabled
                        region={this.getMapRegion()}
                    >
                        <Marker.Animated
                            ref={marker => {
                                this.marker = marker;
                            }}
                            coordinate={this.state.coordinate}
                        >
                            <Image source={require('./../assets/driverlogo.png')} style={{ height: 35, width: 35 }} />
                        </Marker.Animated>
                    </MapView>
                </View>

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

            </SafeAreaView>

        );
    }
}

const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission denied for accessing location');
        // Handle the case where the user denied permission
    } else {
        console.log('Permission granted for accessing location');
        // Proceed with accessing the user's location
    }
};



// export default function DeliveryMap({ navigator }) {

//     const [location, setLocation] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);

//     useEffect(() => {
//         const getPermissions = async () => {

//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             setLocation(location);
//         };
//         getPermissions();
//     }, []);

//     let text = 'Waiting..';
//     let latitude = 32.0852997;
//     let longitude = 34.7818064;
//     if (errorMsg) {
//         text = errorMsg;
//     } else if (location) {
//         text = JSON.stringify(location);
//         latitude = location.coords.latitude;
//         longitude = location.coords.longitude;
//     }
//     let deliveringArea = "Tel Aviv";
//     let demand = "Busy";
//     return (

//         <View style={{ flex: 1 }}>
//                 <MapView
//                     style={{ flex: 1 }}
//                     initialRegion={{
//                         latitude: latitude,
//                         longitude: longitude,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     }}
//                 >
//                     <Marker
//                         coordinate={{ latitude: latitude, longitude: longitude }}
//                         title="Your Location"
//                     ><Image source={require('./../assets/driverlogo.png')} style={{ height: 35, width: 35 }} />
//                     </Marker>

//                 </MapView>

//             <View style={styles.bottomBar}>
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.infoText}>Delivery Area</Text>
//                 </View>
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.deliveringAreaText}>{deliveringArea}</Text>
//                 </View>
//                 <View style={styles.infoContainer}>
//                     <Text style={{ color: "gray", fontSize: 14, marginBottom: 4, }}>Demand: {demand}</Text>
//                 </View>

//             </View>
//         </View>

//     );
// };

const styles = {
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
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
