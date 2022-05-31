import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraPage from './CameraPage';
import MatDetectorHome from './MatDetectorHome';

const Stack = createStackNavigator();

function RoomCheck(){
    return (
        <MatDetectorHome></MatDetectorHome>
        // <NavigationContainer>
        //     <Stack.Navigator>
        //         <Stack.Screen
        //         name = "RoomCheckHome"
        //         component={RoomCheckHome}
        //         options={{
        //             title: '',
        //         }}
        //         />


        //     </Stack.Navigator>
        // </NavigationContainer>
        
    )
}
export default RoomCheck;