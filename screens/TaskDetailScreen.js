import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskDetail = ({ route, navigation }) => {
    const { task } = route.params;

    const handleCompleteTask = () => {
        // Mark task as completed (to be implemented later)
        console.log(`Task "${task.title}" marked as completed!`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title:</Text>
            <Text style={styles.text}>{task.title}</Text>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{task.description}</Text>

            <Text style={styles.label}>Priority:</Text>
            <Text style={styles.text}>{task.priority}</Text>

            <Button title="Mark as Completed" onPress={handleCompleteTask} />
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
        fontWeight: 'bold',
        marginTop: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default TaskDetail;
