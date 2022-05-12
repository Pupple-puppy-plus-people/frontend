import React, {useState, createRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { HS_API_END_POINT } from '../../Shared/env';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function PasswordCheck({navigation, route}) {
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const onPress = async () => {
        if(text === route.params.passwords){
            // 여기에 데이터를 async storage 로 전달
            const dataToSend = {"user_type": route.params.types, "username":route.params.names, "email":route.params.emails, "password":route.params.passwords, "address":route.params.address}
            console.log(dataToSend);
            //----------- back end 연결하기 전
            // Alert.alert(
            //                 "로그인하여 Pupple을 시작하세요.",
            //                 "회원가입이 완료되었습니다.",
            //                 [{
            //                     text:"로그인 화면으로",
            //                     onPress: () => navigation.navigate('Login')
            //                 }]
            //             );
            // ---------- 연결하면 변경
            await axios.post(`${HS_API_END_POINT}/api/users/auth/register/`,dataToSend)
            .then(function(res){
                if(res.data === "ok"){
                    Alert.alert(
                        "로그인하여 작두를 시작하세요.",
                        "회원가입이 완료되었습니다.",
                        [{
                            text:"로그인 화면으로",
                            onPress: () => navigation.navigate('Login')
                        }]
                    );
                }
            })
            .catch(function(error){
                console.log(error);
            });
            

        } else {
            Alert.alert(
                "올바른 패스워드를 입력해주세요."
            );
        }

    }
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2}}/>
                <View style={{flex:9,backgroundColor:'#E1BEE7',borderRadius:20,padding:15}}>
                    <View style={{flex:2,justifyContent:'center'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        <Text style={styles.title}>Step 6.</Text>
                        <Text style={styles.title}>비밀번호 확인을 위해 다시한번 입력해주세요</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>[Step 5] 의 비밀번호와 같은 비밀번호를 입력해요.</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="password check"
                            autoCapitalize='none'
                            secureTextEntry={true}
                        
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={onPress}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>완료</Text>
                    </TouchableOpacity>
                </View>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2}}>
                    

                </View>
                <View style={{flex:1}}/>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: bigOne*0.03,
        fontWeight:'bold'
    },
    subtitle:{

        fontSize: bigOne*0.02,
        color:'gray',
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
        fontWeight:'500',
    },
    nextBtn: {
        flex:1,
        height: '100%',
        width:'100%',
        maxHeight:50,
        borderRadius:10,
        backgroundColor:'#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    input: {
        height: bigOne*0.1,
        margin: 12,
        borderBottomWidth: 3,
        padding: 10,
        borderBottomColor:'#9C27B0',
        fontSize:bigOne*0.02,
    },
  });
export default PasswordCheck;