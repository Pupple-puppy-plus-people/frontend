import React, {useState, createRef} from 'react';
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
import { HS_API_END_POINT } from '../../../Shared/env';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

import axios from 'axios';


function EnrollStep3({navigation, route}) {
    // user ID 어디서 받아와야함
    console.log("---navigated to EnrollStep3---> ", route.params);
    console.log("---navigated to EnrollStep3-1---> ", route.params?.dogInfo);
    let USER_ID = 2;  // 판매자의 아이디임

    let query = '?';
    let userID = '9';

    const selectedFilter = route.params?.dogInfo.selectedFilter;
    const dogRegInfo = route.params?.dogInfo.dogRegInfo;
    const dogImage = route.params?.dogImage;
    const dogText = route.params?.dogText;

    console.log("->", selectedFilter);
    console.log("->", dogRegInfo);
    console.log("->", dogImage);
    console.log("->", dogText);

    navigation.setOptions({
        headerRight: () => (
            <Text style={{margin:"7%", color:'dodgerblue', fontWeight:'bold', fontSize:smallOne*0.04}}
                onPress={() => {

                    // axios.get(baseUrl+'/api/dogs/list'
                    // `${HS_API_END_POINT}/api/dogs//list`
                    axios.post(`${HS_API_END_POINT}/api/dogs/list/`,{
                        id : 100,
                        registration_number : dogRegInfo[4].value ,
                        image :dogImage,
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
                        user_id:USER_ID, // 변수 받기 -> user_user 의 PK 값을 FK 값으로 받아와야하는건가?
                        //pproval:'F',
                        //approval:'승인',
                    }).then(function (response) {console.log(response);})
                    .catch(error => {console.log('error : ',error.response)});
                    
                      // DEBUG = false 설정하라는 에러
                      // server error -> django 봐보기

                    alert('게시글이 등록 되었습니다.');
                    navigation.navigate('Tab2Home',{}); // Tab2Home


            }}>완료</Text>
        ),
    });

    const [name, setName] = useState("");
    const onChangeText = (name) => {
        setName(name);
    }
    
    const gotoNextScreen = () => {
            navigation.navigate('EnterHouse',{});
    }
    return (

        // bottom navigation 지우기
        // 그 아래 등록하기(홈에서 보임), 저장하기 버튼 두기 

        // 선택하기 (입양처 / 입양인)
        // 사진 올리기 
        // 견적사항 완성하기 (step 1) - 왼쪽 페이지에서
        // 인증절차 선택하기 (step 2) - 오른쪽 페이지에서 
        // progress bar는 어디에?

        <SafeAreaView style={styles.container}>  


            <View style={{flex:1,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                <View style={{flex:1}}/>
                <View style={[styles.board,{flex:8,backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    
                    <View style={{flex:3}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        {/* <Text style={styles.title}>Step 1.</Text> */}
                        <Text style={styles.title}>Step 3.</Text>
                        <Text style={styles.title}> 인증절차를 선택해주세요. </Text>
                    </View>
                    <View style={{flex:1}}>
                        {/**4개의 인증템플릿 중 하나를 선택해주세요. */}
                        <Text style={styles.subtitle}>   </Text> 

                    </View>

                    <>
                    
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>산책량 검사</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>반려견과 보내는 시간검사</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>바닥재질 검사</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>집인증 검사</Text>
                    </TouchableOpacity>
                    </>

                    <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                    </View>
                </View>

                <View style={{flex:1.5}}/>
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
        marginLeft:30
    },
    subtitle:{
        flex:1,
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
    marginTop: 50,
    flex:1,
    height: '100%',
    width:'100%',
    maxHeight:50,
    borderRadius:10,
    backgroundColor:'#9C27B0',
    justifyContent: 'center',
    //alignItems: 'center',
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