import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');

    const handleAddTask = async () => {
        if (title.trim() === '' || description.trim() === '') {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        const newTask = { title, description, priority };

        try {
            // Retrieve existing tasks
            const storedTasks = await AsyncStorage.getItem('tasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];

            // Add new task to the list
            tasks.push(newTask);

            // Save updated tasks to AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

            // Navigate back to HomeScreen
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to save task:', error);
        }

        // Optionally, reset the form fields
        setTitle('');
        setDescription('');
        setPriority('Low');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter task description"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Priority:</Text>
            <TextInput
                style={styles.input}
                placeholder="Low, Medium, High"
                value={priority}
                onChangeText={setPriority}
            />

            <Button title="Add Task" onPress={handleAddTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
});

export default AddTask;
