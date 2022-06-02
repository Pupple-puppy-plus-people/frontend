import React, {useEffect, useState, createRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import { NavigationContainer } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import Loader from './Components/Loader';
import { HS_API_END_POINT, USER_INFO } from '../../../Shared/env';
import { Divider } from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

import axios from 'axios';


function EnrollStep3({route, navigation}) {
    // user ID 어디서 받아와야함
    const input = route.params;

    const [selectedFilter, setselectedFilter] = useState(null);
    const [dogRegInfo, setdogRegInfo] = useState(null);
    const [dogImage, setdogImage] = useState(null);
    const [dogText, setdogText] = useState(null);
    const [walk_total_count, setwalk_total_count] = useState(null);
    const [min_per_walk, setmin_per_walk] = useState(null);
    const [meter_per_walk, setmeter_per_walk] = useState(null);
    const [dogID, setdogID] = useState("");

    const [isFloor, setIsFloor] = useState(false);
    const [isHousePhoto, setIsHousePhoto] = useState(false);

    useEffect(()=>{
        console.log("---navigated to EnrollStep3---> ", route.params);

        setselectedFilter(route.params?.dogInfo.selectedFilter);
        setdogRegInfo(route.params?.dogInfo.dogRegInfo);
        setdogImage(route.params?.dogImage);
        setdogText(route.params?.dogText);
        setwalk_total_count(route.params?.walkDay);
        setmin_per_walk(route.params?.walkTime);
        setmeter_per_walk(route.params?.walkDistance);
    }, []);

    
    navigation.setOptions({
        headerRight: () => (
            <Text style={{margin:"7%", color:'dodgerblue', fontWeight:'bold', fontSize:smallOne*0.04}}
                onPress={() => {

                    // dogs DB에 등록하기
                    axios.post(`${HS_API_END_POINT}/api/dogs/add/`,{
                        registration_number : dogRegInfo[4].value ,
                        image : dogImage,
                        name:dogRegInfo[0].value,
                        gender:dogRegInfo[1].value,
                        kind:dogRegInfo[2].value,
                        desexing:dogRegInfo[3].value,
                        age:selectedFilter[0].value,
                        location:dogRegInfo[5].value,
                        size:selectedFilter[1].value,
                        hair_loss:selectedFilter[2].value,
                        bark_term:selectedFilter[3].value,
                        activity:selectedFilter[4].value,
                        person_personality:selectedFilter[5].value,
                        adoptation_status:'N',
                        introduction:dogText,
                        approval:'승인',
                        user_id:USER_INFO.USER_ID, 
                        house_auth:isHousePhoto,
                        floor_auth:isFloor,    
                    }).then(function (response) {
                        // get 응답에서 pk 값 받아옴
                        setdogID(JSON.parse(response.request._response).id);
                        
                        //console.log("dogID>>>>>>", response.config.data)

                        console.log("dogID>>>>>213123>", response.data.pk)


                        // 인증 템플릿 설정에 post 하기 --> get 안에 넣기 
                        axios.post(`${HS_API_END_POINT}/api/passcondition/${response.data.pk}/`,{
                            dog_id: response.data.pk, 
                            walk_total_count:walk_total_count,
                            min_per_walk:min_per_walk,
                            meter_per_walk:meter_per_walk,
                            ts_total_count: input.checkDay,
                            ts_check_time:input.setTime,
                        }).then(function (response) {console.log(response);})
                        .catch(error => {console.log('error : ',error.response)});

                        
                    }).catch(error => {console.log('error : ',error.response)});

                    
                    alert('게시글이 등록 되었습니다.');
                    navigation.navigate('Tab2Home',{}); // Tab2Home

            }}>완료</Text>
        ),
    });

   
    return (

        <SafeAreaView style={styles.container}>  


            <View style={{flex:1,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                <View style={{flex:2}}>
                    {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                    {/* <Text style={styles.title}>Step 1.</Text> */}
                    <Text style={styles.title}>Step 5.</Text>
                    <Text style={styles.title}>추가 인증절차를 선택해주세요. </Text>
                </View>
                <Divider style={{margin:"5%"}} />
                <View style={{flex:1}}>
                    {/** 인증 템플릿 설명 **/}
                    <Text style={styles.subtitle}>*바닥재질 검사: 반려견의 실내 생활 공간의 바닥을 점검해요.</Text> 
                    <Text style={styles.subtitle}>*집인증 검사: 반려견의 생활 공간을 점검해요.</Text> 
                </View>
                
                {/** 인증 템플릿 선택 - 버튼 누를 것을 isActive 형태로 boolean 처리하기 **/}
                <View style={[styles.board,{flex:8,backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    <View style={{flex:0.2}}/>
                    <>
                    <TouchableOpacity 
                        onPress={() => 
                            setIsFloor(!isFloor)
                        }
                        style={[isFloor? styles.selectedCard : styles.card]} 
                        //activeOpacity={0.5}
                    >   
                        <Text style={[styles.botText]}>바닥재질 검사</Text> 
                    </TouchableOpacity>
                    <View style={{flex:0.2}}/>
                    <TouchableOpacity  
                        onPress={() => 
                            setIsHousePhoto(!isHousePhoto)
                        }
                        style={[isHousePhoto? styles.selectedCard : styles.card]} 
                        //activeOpacity={0.5} '#d3a4fc'
                    >
                        <Text style={[styles.botText]}>집인증 검사</Text>
                    </TouchableOpacity>
                    </> 
                    <View style={{flex:0.2}}/>
                    {/**버튼 배경을 어떤 사진으로 넣어도 될듯 */}
                </View>

                <View style={{flex:1.5}}>
                    <Text style={[styles.subtitle, {margin:"5%", alignSelf:'center'}]}> 마치시려면 상단 완료 버튼을 눌러주세요. </Text> 
                </View>
            </View>
            
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
        marginTop:10,
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        //marginLeft:30
    },
    subtitle:{
        flex:1,
        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        //marginLeft:30
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
        fontSize: bigOne*0.03,
        fontWeight:'bold',
    },
    basicBtn: {
    flex:1,
    width:'90%',
    // maxHeight:50,
    borderRadius:10,
    backgroundColor:'#FBEDFD',
    justifyContent: 'center',
    alignSelf: 'center',
},selectedBtn: {
    flex:1,
    width:'90%',
    // maxHeight:50,
    borderRadius:10,
    backgroundColor:'#9C27B0', // d3a4fc
    justifyContent: 'center',
    alignSelf: 'center',
},card: {
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
},selectedCard: {
    backgroundColor: '#d3a4fc',
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
input: {
    height: bigOne*0.1,
    margin: 12,
    marginBottom: 15,
    borderBottomWidth: 3,
    padding: 10,
    borderBottomColor:'#9C27B0',
    fontSize:bigOne*0.02,
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
export default EnrollStep3;