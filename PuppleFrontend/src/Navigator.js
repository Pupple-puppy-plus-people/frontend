import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './Login/LoginScreen';

const Stack = createStackNavigator();
const LogStack = createStackNavigator();
// const BottomTab = createBottomTabNavigator();

const Auth = () => {
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
        {/* <LogStack.Screen
        name="EnterType"
        component={EnterType}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        /> */}

        {/* 이름입력 */}
        {/* <LogStack.Screen
        name="EnterName"
        component={EnterName}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        /> */}

        {/* 이메일입력 */}
        {/* <LogStack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        /> */}

        {/* 비밀번호입력 */}
        {/* <LogStack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        /> */}

        {/* 비밀번호 확인 */}
        {/* <LogStack.Screen
        name="PasswordCheck"
        component={PasswordCheck}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}/> */}

      </LogStack.Navigator>
    );
};

function Navigator() {

    return (

        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
                /> */}

                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{headerShown: false}}
                />
                
                {/* <Stack.Screen
                name="MainLog"
                component={MainLog}
                options={{headerShown: false}}
                /> */}

                {/* <Stack.Screen 
                name="BottomNav"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                    animationEnabled: false
                }}/> */}

                
   
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default Navigator;