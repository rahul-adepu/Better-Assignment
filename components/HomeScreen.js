import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Buy groceries' },
        { id: '2', title: 'Complete project' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Manager</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
            <Button title="Add Task" onPress={() => navigation.navigate('Add Task')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    taskItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default HomeScreen;
