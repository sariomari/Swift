import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const TaskScreen = ({ task_id, order_id, fromAddress, toAddress, onAcceptTask }) => {
  return (
    <View style={styles.container}>
        <View style={styles.taskContainer}>
          <Text style={styles.title}>New Task Has Arrived</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>
              <Text style={styles.bold}>From: </Text>
              {fromAddress}
              </Text>
            <Text style={styles.address}>
            <Text style={styles.bold}>To: </Text>
              {toAddress}
              </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Accept" color="white" onPress={onAcceptTask} />
          </View>
        </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskContainer: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
  addressContainer: {
    marginTop: 10
  },
  address: {
    color: 'black',
    marginBottom: 5
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    alignSelf: 'stretch'
  },
  bold: {
    fontWeight: 'bold'
  }
};

export default TaskScreen;
