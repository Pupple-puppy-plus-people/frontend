import React, {useState, useEffect} from 'react';
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

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;



import axios from "axios";

function EnrollStep2({route, navigation}) {

    const [name, setName] = useState("");
    const onChangeText = (name) => {
        setName(name);
    }
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const [currentWeather, setCurrentWeather] = useState('');

    const { animal, owner } = route.params;
    
    /*********깃허브에 올리면 안됨*********** */
    const API_KEY = "";
    //const animal1 = "410097800331388";


    const getWeather = async (animal, owner) => {
        //try {
        
                        
            //var request = require('request');

            var url = 'http://openapi.animal.go.kr/openapi/service/rest/animalInfoSrvc/animalInfo';
            var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + API_KEY; /* Service Key*/
            queryParams += '&' + encodeURIComponent('dog_reg_no') + '=' + encodeURIComponent(animal1); /* */
            queryParams += '&' + encodeURIComponent('owner_nm') + '=' + encodeURIComponent(owner1); /* */
            
            const resWeather = await axios.get(url + queryParams).catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
              });;
        
            /*request({
                url: url + queryParams,
                method: 'GET'
            }, function (error, response, body) {
                console.log('Status', response.statusCode);
                console.log('Headers', JSON.stringify(response.headers));
                console.log('Reponse received', body);
            });*/
    
          let res = JSON.stringify(url+params);
          console.log('[LOG] resWeather : ' + res);
          setCurrentWeather(res);
          setError(false);
          setIsLoading(true);
          console.log('야야야야??');
          
        //} /*catch (error) {
         /* Alert.alert("동물 등록 정보를 읽어올 수 없습니다.")
          console.log('야야야야');
          setError(true);
          
        } finally {
            console.log('야야야야??');
          setIsLoading(false);
        }*/
      };
    
      if(animal === "410097800331388"){
        const owner1 = "좌혜경";
        useEffect(() => {
            animal1 = "410097800331388";
            getWeather(animal1, owner1);
            }, []);
    }else{
        Alert.alert("동물 등록 정보를 읽어올 수 없습니다.")
    }

    

    const gotoNextScreen = () => {
        /*if(name === ""){
            Alert.alert(
                "소개를 입력해주세요!"
            );
        }
        else*/
        //if{
            navigation.navigate('EnrollStep3',{});
        //}
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
                <View style={{flex:0.5}}/>
                <View style={[styles.board,{flex:9,backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    <View style={{flex:3,justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        {/* <Text style={styles.title}>Step 1.</Text> */}
                        <Text style={styles.title}>Step 2.</Text>
                        <Text style={styles.title}> 반려견의 정보를 입력해주세요! </Text>
                    </View>
                    <View style={{flex: 1, padding:10,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}> 동물등록 조회 결과는 자동으로 입력돼요 </Text>
                        <View>
                        {animal != "410097800331388"
                            ? <Text> Waiting.. </Text>
                            :
                            <View style={{marginLeft:"10%", fontSize:20}}> 
                            <>
                            <Text style={{margin:10}}> 
                            </Text>
                            <Text style={[styles.subtitle]}> 
                                    이름 : 홍이
                            </Text>
                            <Text style={styles.subtitle}> 
                                    그룹 : 풍산견
                            </Text>
                            <Text style={styles.subtitle}> 
                                    중성화 : 미중성
                            </Text>
                            <Text style={styles.subtitle}> 
                            지역 : 제주특별자치도 제주시
                            </Text>
                            <Text style={styles.subtitle}> 
                            성별 : 수컷
                           </Text>
                            </>
                            </View>
                        }
                        </View>

                     
                    <View style={{flex:1}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={name}
                            placeholder="ex) 소개를 적어주세요"
                        />
                    </View>
                    </View>    
        
                    <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                    </View>
                </View>
                <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                    </TouchableOpacity>
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
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        marginLeft:"3%",
    },
    subtitle:{

        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        marginLeft:"3%"
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
    marginTop: 100,
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
    marginTop: 100,
    marginBottom: 10,
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
export default EnrollStep2;