import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
            {/* <Stack.Screen 
            name="Reading" 
            component={ReadingView}
            options={{
                title: '머리위에 제목',
                
                
            }}
            /> */}
            
        </Stack.Navigator>
    )
}
// const mapStateToProps = (state) => ({
//     user_info : state.userReducer.userObj
//   });

export default DogList;
