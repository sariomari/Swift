import React from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { View, SafeAreaView, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import * as Location from 'expo-location';
import TaskScreen from "./taskScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 32.113;
const LONGITUDE = 34.79935;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DeliveryMap extends React.Component {
    constructor(props) {
        super(props);
        this.driver_id = 1;
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
    }

    componentDidMount() {
        this.watchLocation();
    }

    componentDidUpdate(prevState) {
        if (this.props.latitude !== prevState.latitude) {
            const driver_id = this.driver_id
            this.sendLocationToBackend(driver_id, this.props.latitude, this.props.longitude);
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
                        this.sendLocationToBackend(this.driver_id, latitude, longitude);
                    }
                );
            }
        );
        // if a new task has arrived
        const task_to_assign = await this.taskExists(this.driver_id);
        if (task_to_assign) {
            this.assignTask(task_to_assign['task_id'],
                 task_to_assign['fromAddress'], task_to_assign['toAddress']);
        }
    };

    taskExists = async (driver_id) => {
        console.log('checking if there are tasks');
        const task_url = `http://127.0.0.1:8000/check_tasks_for_driver?driver_id=${driver_id}&latitude=${this.state.latitude}&longitude=${this.state.longitude}`;
        console.log(task_url);
        let response = await fetch(task_url);
        if (!response.ok){
            console.log('response is not ok');
        }
        let task_data = await response.json();
        console.log(task_data);
        if (Object.keys(task_data)) {
            console.log(task_data);
            return task_data;
        }
        else {
            console.log('no tasks')
            return null;
        }
    };

    assignTask = (task_id, fromAddress, toAddress) => {
        this.setState({
            task: {
                task_id,
                fromAddress,
                toAddress
            }
        });
    };

    handleTaskAcceptance = async () => {
        const driver_id = this.driver_id;
        const { task_id } = this.state.task;
        console.log(`${task_id}`)
        const response = await fetch(`http://127.0.0.1:8000/accept_task`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task_id: task_id,
            driver_id: driver_id,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        })
    });
        if (!response.ok){
            console.log('could not accept task')
        }
        else{
            console.log('accepted task');
            this.setState({ taskActive: true });
        }
    };

    finishTask = async () => {
        const { task_id } = this.state.task;
        // Send to backend that task is finished
        const response = await fetch(`http://127.0.0.1:8000/complete_task`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "task_id": task_id
            }),
        });
        if (response.ok){
            console.log("Task Completed");
        }
        else{
            console.log(response.status)
        }
        this.setState({ task: null, taskActive: false })
    }

    sendLocationToBackend = (driver_id, latitude, longitude) => {
        const url = 'http://127.0.0.1:8000/update_location';
        const data = {
            driver_id: driver_id,
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
                            <MaterialCommunityIcons name="bike" size={23} color="white" backgroundColor="#3273a8" borderRadius="10" overflow="hidden" />
                        </Marker.Animated>
                    </MapView>
                    {task && !taskActive && (
                        <TaskScreen
                            title="New Task Has Arrived!"
                            fromAddress={task.fromAddress}
                            toAddress={task.toAddress}
                            onAcceptTask={this.handleTaskAcceptance}
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
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Complete Task</Text>
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
