import React from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { View, SafeAreaView, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import PubNub from "pubnub";
import TaskScreen from "./taskScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
            task: null,
            taskActive: false,
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
            const { driver_id } = "tamerdamouni";
            this.sendLocationToBackend(driver_id, latitude, longitude);
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
                } else { }

                this.setState(
                    {
                        latitude,
                        longitude
                    },
                    () => {
                        // Send the location data to the backend
                        const { driver_id } = "tamerdamouni";
                        this.sendLocationToBackend(driver_id, latitude, longitude);
                    }
                );
            }
        );

        if (this.state.latitude == 51.515579 && this.state.longitude == -0.128360) {
            this.assignTask("New Task Has Arrived!", "NY Madison Avenue", "One World Trade Center");
        }
    };

    assignTask = (title, fromAddress, toAddress) => {
        this.setState({
            task: {
                title,
                fromAddress,
                toAddress
            }
        });
    };

    handleTaskAcceptance = () => {
        this.setState({ taskActive: true });
    };

    finishTask = () => {
        // Send to backend that task is finished
        this.setState({ task: null, taskActive: false})
    }

    sendLocationToBackend = (driverId, latitude, longitude) => {
        const url = 'https://your-backend-api.com/updateLocation'; // Replace with your backend URL
        const data = {
            driver_id: driverId,
            latitude,
            longitude
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Location sent to the backend successfully');
                } else {
                    console.log('Failed to send location to the backend');
                }
            })
            .catch(error => {
                console.log('Error while sending location to the backend:', error);
            });
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
        const { taskActive, task } = this.state;
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
                            <MaterialCommunityIcons name="bike" size={23} color="white" backgroundColor="#3273a8" borderRadius="10" overflow="hidden"/>
                        </Marker.Animated>
                    </MapView>
                    {task && !taskActive &&(
                        <TaskScreen
                            title={task.title}
                            fromAddress={task.fromAddress}
                            toAddress={task.toAddress}
                            onAcceptTask={this.handleTaskAcceptance} // Pass the callback function as prop
                        />
                    )}
                </View>
                <View style={styles.bottomBar}>
                    {taskActive ? (
                        <>
                            <View style={styles.iconWithText}>
                                <Octicons name="tasklist" size={24} color="green" />
                                <Text style={styles.taskTitle}>Active Task</Text>
                                <TouchableOpacity style={styles.buttonContainer} onPress={this.finishTask}>
                                    <Text style={{color: "white", fontWeight: "bold"}}>Complete Task</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconWithText}>
                                <Ionicons name="shirt" size={23} color="black" />
                                <Text style={styles.taskAddress}>{task.fromAddress}</Text>
                            </View>
                            <View style={styles.iconWithText}>
                                <Ionicons name="person-circle-outline" size={23} color="black" />
                                <Text style={styles.taskAddress}>{task.toAddress}</Text>
                            </View>
                            
                            
                        </>
                    ) : (
                        <><View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Delivery Area</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.deliveringAreaText}>{deliveringArea}</Text>
                        </View>
                            <View style={styles.infoContainer}>
                                <Text style={{ color: "gray", fontSize: 14, marginBottom: 4 }}>Demand: {demand}</Text>
                        </View></>
                    )}

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingVertical: 3
    },
    taskAddress: {
        fontSize: 16,
        marginBottom: 4,
        paddingVertical: 3
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
    iconWithText: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    buttonContainer: {
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: "green",
        alignSelf: "stretch",
        borderRadius: 10,
        paddingTop: 10,
        paddingBotom: 10,
      },
});
