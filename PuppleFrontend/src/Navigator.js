import React from 'react';
import {View, Text, StatusBar, Header} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import DogList from './DogList';
import Login from './Login';

const Stack = createStackNavigator();
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
                      <MaterialCommunityIcons name="dog" size={25} />
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
                    component={Login}
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