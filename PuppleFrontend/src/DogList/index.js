import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DogListHome from './DogListComponent/DogListHome';
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
            
            {/* <Stack.Screen 
            name="ReadingBook" 
            component={ReadingBookView}
            options={{
                title: '읽고 있는 책',
                
                
            }}
            /> */}
            
        </Stack.Navigator>
    )
}
// const mapStateToProps = (state) => ({
//     user_info : state.userReducer.userObj
//   });

// export default connect(mapStateToProps)(BookShelf);
export default DogList;
