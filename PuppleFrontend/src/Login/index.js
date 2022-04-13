import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './LoginScreen';

import EnterType from './RegisterStep/EnterType';
import EnterName from './RegisterStep/EnterName';
import EnterHouse from './RegisterStep/EnterHouse';
import EnterEmail from './RegisterStep/EnterEmail';
import EnterPassword from './RegisterStep/EnterPassword';
import PasswordCheck from './RegisterStep/PasswordCheck';

const LogStack = createStackNavigator();

function Login({user_info}) {
    return (
      <LogStack.Navigator>


        <LogStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />

        {/* <LogStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        /> */}

        {/* 구매자, 판매자 구별 */}
        <LogStack.Screen
        name="EnterType"
        component={EnterType}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
          // headerStyle:{
          //   backgroundColor:'#E1BEE7'
          // }
        }}
        />
       

        {/* 이름입력 */}
        <LogStack.Screen
        name="EnterName"
        component={EnterName}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
        }}
        />

        {/* 집주소 */}
        <LogStack.Screen
        name="EnterHouse"
        component={EnterHouse}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
        }}
        />

        {/* 이메일입력 */}
        <LogStack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
        }}
        />

        {/* 비밀번호입력 */}
        <LogStack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
        }}
        />

        {/* 비밀번호 확인 */}
        <LogStack.Screen
        name="PasswordCheck"
        component={PasswordCheck}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTintColor:'rgba(153, 0, 255, 1.0)',
        }}/>

      </LogStack.Navigator>
    );
};

export default Login;