import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tab2Home from './Tab2Component/Tab2Home';
// import { connect } from 'react-redux';
const Stack = createStackNavigator();

function Tab2({user_info}){
    const onChangeText = (type) => {
        setName(type);
    }
    const gotoNextScreen = (type) => {
        setType(type)
        navigation.navigate('EnterName',{types: type});
    }
    return (
        <Stack.Navigator>
            {/* 로그인 정보에 따라서 Tab2AdoptorHome 과 Tab2ShelterHome 으로 각각 연결한다. */}

            <Stack.Screen
            name="Tab2Home"
            component={Tab2Home}
            options={{
                title: "반려견을 위한 인증 절차",
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
export default Tab2;
