import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RoomCheckHome from './RoomCheckHome';

const Stack = createStackNavigator();

function RoomCheck({dog_id,setModalVisible}){
    return (
        <RoomCheckHome dog_id={dog_id} setModalVisible={setModalVisible}></RoomCheckHome>
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