import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tab2Home from './Tab2Component/Tab2Home';
import EnrollPage from './Tab2Component/Shelter/EnrollPage';

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
                title: "반려견 목록",
            }}/>

            <Stack.Screen
            name="EnrollPage"
            component={EnrollPage}
            options={{
                title: false,
                headerShown: true,
                headerTransparent: true,
                // header shadow
                // header 반려견 삭제 버튼 (글라스모피즘 버튼)
                
            }}/>
            
        </Stack.Navigator>
    )
}
// const mapStateToProps = (state) => ({
//     user_info : state.userReducer.userObj
//   });

// export default connect(mapStateToProps)(BookShelf);
export default Tab2;
