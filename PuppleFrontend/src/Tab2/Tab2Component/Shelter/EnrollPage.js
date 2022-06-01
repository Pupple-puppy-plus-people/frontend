import React, {useState, createRef} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, useScrollToTop, useIsFocused } from '@react-navigation/native';
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
  FlatList,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import Loader from './Components/Loader';

import DogInfo from '../DogInfo';
import AdoptionStep from '../AdoptionStep'
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../../Shared/env';
import HandleTemplateReqeust from '../HandleTemplateRequest';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

import "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();

function TopTabs({aboutDog, setWishList}) {
   
    return (
      <NavigationContainer 
         screenOptions={{ tabBarScrollEnabled: true,tabBarIndicatorStyle:{
        } }}
      independent={true}>  
        <Tab.Navigator>
            <Tab.Screen name="DogInfo" children={()=><DogInfo aboutDog={aboutDog}/>}
                 options={{
                // tabBarLabel: '인증',
                // tabBarLabel: aboutDog.title,
                //tabBarLabelPosition: 'beside-icon', -> ipad에서 전형적인 것임
                
                headerShown: false,
                animationEnabled: false,
                tabBarLabel:() => {return null},
                tabBarIcon: ()=>(
                    
                    <Icon name = "dog" size={25}/>
                ),
            }}/>
            <Tab.Screen name="AdoptionStep" children={()=>{
                return(
                    <View style={{flex:1}}>
                    {USER_INFO.USER_TYPE==='customer'&&<AdoptionStep aboutDog={aboutDog} setWishList={setWishList}/>}
                    {USER_INFO.USER_TYPE==='seller'&&<HandleTemplateReqeust aboutDog={aboutDog} setWishList={setWishList}/>} 
                    </View>
                )}} 
             options={{
                    
                headerShown: false,
                animationEnabled: false,
                tabBarLabel:() => {return null},
                tabBarIcon: ()=>(
                    
                    <Icon name = "grid" size={25}/> 
                )
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  

function EnrollPage({navigation,route}) {
    const ref = React.useRef(null);
    const isFocused = useIsFocused();

    useScrollToTop(ref);

    const [parentHeight, setParentHeight] = useState({height:0}); // 동적인 값 관리
    const [parentHeight2, setParentHeight2] = useState({height:0}); // 동적인 값 관리
    const [wishlist, setWishList] = useState({}); // AdoptionStep에서 받아옴

    const onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
        setParentHeight({height:height});
    };
    console.log("wishlist", wishlist);

    const getHeader = () => {
        return (
            <View style={{flex:0.5,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                {USER_INFO.USER_TYPE==='customer'?
                // 구매자면 인증진행률 보여주고 
                <View style={[styles.board,{flex:9,backgroundColor:'#E1BEE7',borderRadius:20, padding:10}]}>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginTop:10, alignSelf:'center'}}>
                        <Text style={styles.title}> </Text>
                        <Text style={styles.title}>반려견에 대한 인증진행률 </Text>
                        <Text style={[styles.title, {color:'purple', marginBottom:10}]}>{wishlist.total}%</Text>
                    </View>
                    <View style={{flex:5, padding:10,justifyContent:'flex-start', alignItems:'center'}}>
                        <Text style={styles.subtitle}>반려견 인증절차 수행 및 견적사항 확인</Text>
                    </View>
                    <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                    </View>
                </View>
                : // 판매자면 신청한 인원 보여주기 
                <View style={[styles.board,{flex:9,backgroundColor:'#E1BEE7',borderRadius:20, padding:10}]}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginTop:10, alignSelf:'center'}}>
                    <Text style={styles.title}>반려견 입양 신청인원 </Text>
                    <Text style={[styles.title, {color:'purple', marginBottom:10}]}>{wishlist.length}명</Text>
                </View>
                <View style={{flex:5,justifyContent:'flex-start', alignSelf:'center'}}>
                    <Text style={styles.subtitle}>반려견 인증 및 견적사항 확인</Text>
                </View>
                <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        // console.log('here',item)
                        Alert.alert(
                            "반려견 입양을 마감하시나요?",
                            "마감하면 더 이상 입양 신청자를 받지 않아요.",
                            [
                            {
                                text: "아니요",
                                style: "default",
                            },
                            {
                                text: "네",
                                onPress: () => {Alert.alert("입양을 마감합니다.")}, // 여기 dogs에 adpation_status를 P로 업데이트하기 
                                style: "default",
                            },
                            ],
                        );
                    }}
                    style={{
                        borderColor:'purple',
                        borderWidth:3,
                        borderRadius:10,
                        marginVertical:10,
                        backgroundColor:'purple',
                        width:responsiveWidth(50),
                        height:responsiveHeight(4),
                        alignSelf:'center',
                        justifyContent:'center',
                        alignItems:'center',
                        }}>
                        <Text
                        style={{fontSize:responsiveFontSize(2),color:'white', fontWeight:'bold'}}>입양 마감하기</Text>
                    </TouchableOpacity>
                </View>}
                <View style={{flex:1.5}}/>
            </View>       
        );
    };

    const renderItem = ({item}) =>{
        return(
            <View style={{ flex:1, 
                // 여기 크기 다시다시 !
                height: responsiveScreenHeight(150)
                }} /**(Dimensions.get('window').width)/(0.4) */>  
                <TopTabs 
                aboutDog={route.params?.aboutDog}
                setWishList={setWishList}
                ></TopTabs>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} onLayout={onLayout}>  
            
            <FlatList
            ref={ref}
            style={styles.scrollView}
            data={[{id:0}]}
            renderItem={renderItem}
            listKey={new Date().getTime().toString()}
            ListHeaderComponent={getHeader}
            />
            
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
        backgroundColor: 'white',
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
        elevation: 5,
        //justifyContent:'center',
        //alignContent:'baseline',
    },
    title: {
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
    },
    subtitle:{
        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
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