import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from AsyncStorage
    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadTasks);
        return unsubscribe; // Cleanup listener on unmount
    }, [navigation]);

    // Delete a specific task
    const deleteTask = async (indexToDelete) => {
        try {
            const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);

            // Update AsyncStorage
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

            // Update state
            setTasks(updatedTasks);

            Alert.alert('Success', 'Task deleted successfully.');
        } catch (error) {
            console.error('Failed to delete task:', error);
            Alert.alert('Error', 'Failed to delete the task.');
        }
    };

    const renderTask = ({ item, index }) => (
        <View style={styles.task}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate('TaskDetail', { task: item })}
            >
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.priority}</Text>
            </TouchableOpacity>
            <Button
                title="Delete"
                color="red"
                onPress={() =>
                    Alert.alert(
                        'Confirm Delete',
                        'Are you sure you want to delete this task?',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Delete', onPress: () => deleteTask(index) },
                        ]
                    )
                }
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTask}
                ListEmptyComponent={<Text>No tasks found.</Text>}
            />
            <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginVertical: 8,
        borderRadius: 5,
        elevation: 2,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
