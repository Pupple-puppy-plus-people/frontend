import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RoomCheckHome from '../Template/RoomCheck/RoomCheckHome';
import Agreement from '../Template/Survey/Agreement';
import Survey from '../Template/Survey/Survey';
import DogListHome from './DogListComponent/DogListHome';
import FilterDogList from './FilterComponent/FilterDogList';
// import { connect } from 'react-redux';
const Stack = createStackNavigator();




function DogList({user_info}){

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="DogListHome"
            component={DogListHome}
            options={{
                title: "오늘도 강아지들은 당신을 기다립니다.",
            }}/>
            <Stack.Screen
            name='FilterDogList'
            component={FilterDogList}
            options={{
                title: '찾으시는 강아지가 있으신가요?',
            }}/>

            <Stack.Screen 
            name="RoomCheck" 
            component={RoomCheckHome}
            options={{
                title: '카메라 테스트',
            }}
            />
            <Stack.Screen 
            name="Survey" 
            component={Survey}
            options={{
                title: '설문조사 테스트',
            }}
            />
            <Stack.Screen 
            name="Agreement" 
            component={Agreement}
            options={{
                title: '설문조사 테스트',
            }}
            />
            
            
        </Stack.Navigator>
    )
}
// const mapStateToProps = (state) => ({
//     user_info : state.userReducer.userObj
//   });

export default DogList;
