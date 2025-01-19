import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={(prop) => {
                    HomeScreen(prop)
                }} />
                <Stack.Screen name="AddTask" component={AddTaskScreen} />
                <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
