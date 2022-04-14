import React, {useState, createRef} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import Loader from './Components/Loader';

import DogInfo from '../DogInfo';
import AdoptionStep from '../AdoptionStep'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

import "react-native-gesture-handler";


const Tab = createMaterialTopTabNavigator();

function TopTabs() {

    return (
      <NavigationContainer 
         screenOptions={{ tabBarScrollEnabled: true,tabBarIndicatorStyle:{
        } }}
      independent={true}>  
        <Tab.Navigator>
            <Tab.Screen name="DogInfo" component={DogInfo} 
                 options={{
                //tabBarLabel: '인증',
                //tabBarLabelPosition: 'beside-icon', -> ipad에서 전형적인 것임
                
                headerShown: false,
                animationEnabled: false,
                tabBarLabel:() => {return null},
                tabBarIcon: ()=>(
                    
                    <Icon name = "dog" size={25}/>
                )
            }}/>
            <Tab.Screen name="AdoptionStep" component={AdoptionStep} 
             options={{
                
                headerShown: false,
                animationEnabled: false,
                tabBarLabel:() => {return null},
                tabBarIcon: ()=>(
                    
                    <Icon name = "grid" size={25}/> // 아이콘 추천 받아요
                )
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  

function EnrollPage({navigation}) {
    const ref = React.useRef(null);

    useScrollToTop(ref);

    const [parentHeight, setParentHeight] = useState({height:0}); // 동적인 값 관리

    const onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
        setParentHeight({height:height});
    };
   
    return (
        <SafeAreaView style={styles.container} onLayout={onLayout}>  
             
            <ScrollView ref = {ref} style={styles.scrollView} >

             <> 
            <View style={{flex:0.5,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                <View style={{flex:0.5}}/>
                <View style={[styles.board,{flex:9,backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        {/* <Text style={styles.title}>Step 1.</Text> */}
                        <Text style={styles.title}> </Text>
                        <Text style={styles.title}>반려견에 대한 인증절차</Text>
                    </View>
                    <View style={{flex:0.5, padding:10,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>반려견 인증절차 수행 및 견적사항 확인</Text>

                    </View>
                    <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                       
                    </View>
                </View>

                <View style={{flex:1.5}}/>
            </View>
            
            <View style={{ flex:1, 
                // 여기 크기 다시다시 !
                height: (parentHeight.height)}} /**(Dimensions.get('window').width)/(0.4) */>  
                <TopTabs></TopTabs>
            </View>
            </>

            </ScrollView>

        </SafeAreaView>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 0,
        flex: 1,
        flexGrow: 1,
      },
    board:{
        marginTop: "10%", // 이거 임시방편임
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:30
    },
    subtitle:{

        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        marginLeft:30
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    btn: {
      height: bigOne*0.04,
      width: '50%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    botText: {
        textAlign:'center',
        fontSize: bigOne*0.017,
        fontWeight:'bold',
    },
    nextBtn: {
        height: '100%',
        width:'100%',
        maxHeight:70,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    input: {
        height: bigOne*0.1,
        margin: 12,
        borderBottomWidth: 3,
        padding: 10,
        borderBottomColor:'blue',
        fontSize:bigOne*0.02,
        color:'blue',
        
        
    },
    card: {
        backgroundColor: '#FBEDFD',
        flex: 1,
        borderRadius: 15, // to provide rounded corners
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 9
    },
  });
export default EnrollPage;