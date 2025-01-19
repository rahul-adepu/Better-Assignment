import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        console.log('Task added:', task);
        navigation.goBack(); // Go back to the Home screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a New Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task here"
                value={task}
                onChangeText={setTask}
            />
            <Button title="Add Task" onPress={handleAddTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default AddTaskScreen;
