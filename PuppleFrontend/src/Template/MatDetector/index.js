import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MatDetectorHome from './MatDetectorHome';

const Stack = createStackNavigator();

function MatDetector({dog_id,setModalVisible}){
    return (
        <MatDetectorHome dog_id={dog_id} setModalVisible={setModalVisible}></MatDetectorHome>
        // <NavigationContainer>
        //     <Stack.Navigator>
        //         <Stack.Screen
        //         name = "MatDetectorHome"
        //         component={MatDetectorHome}
        //         options={{
        //             title: '',
        //         }}
        //         />


        //     </Stack.Navigator>
        // </NavigationContainer>
        
    )
}
export default MatDetector;