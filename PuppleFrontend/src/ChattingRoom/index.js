import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChattingHome from './ChattingComponent/ChattingHome';
// import { connect } from 'react-redux';
const Stack = createStackNavigator();




function ChattingRoom({user_info}){

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="ChattingHome"
            component={ChattingHome}
            options={{
                title: "반려견의 내일을 위한 채팅하기",
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
export default ChattingRoom;
