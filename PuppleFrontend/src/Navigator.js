import React from 'react';
import {View, Text, StatusBar, Header} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from './Login/LoginScreen';
import EnterType from './Login/RegisterStep/EnterType';
import EnterName from './Login/RegisterStep/EnterName';
import EnterHouse from './Login/RegisterStep/EnterHouse';
import EnterEmail from './Login/RegisterStep/EnterEmail';
import EnterPassword from './Login/RegisterStep/EnterPassword';
import PasswordCheck from './Login/RegisterStep/PasswordCheck';
import DogList from './DogList';

const Stack = createStackNavigator();
const LogStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomNavigation = ({navigation}) => {
  return (
      <BottomTab.Navigator>
          <BottomTab.Screen
              name="DogList"
              component={DogList}
              options={{
                  tabBarLabel: '반려견리스트',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="bookshelf" size={25} />
                  )
              }}
          >
          </BottomTab.Screen>

          {/* <BottomTab.Screen
              name="BookStore"
              component={BookStore}
              options={{
                  tabBarLabel: '북스토어',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="cart" size={25} />
                  )
              }}
          >
          </BottomTab.Screen>
          <BottomTab.Screen
              name="MyPage"
              component={MyPage}
              options={{
                  tabBarLabel: '마이페이지',
                  headerShown: false,
                  animationEnabled: false,
                  tabBarIcon: ()=> (
                      <MaterialCommunityIcons name="account" size={25} />
                  )
              }}
          >
          </BottomTab.Screen> */}
     

      </BottomTab.Navigator>
  )
}

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

function Navigator() {

    return (

        <NavigationContainer
        
        >
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

                <Stack.Screen 
                name="BottomNav"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                    animationEnabled: false
                }}/>

                
   
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default Navigator;