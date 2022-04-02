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
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';

//import axios from 'axios';
//import {HS_API_END_POINT} from '../../Shared/env';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterEmail({navigation, route}) {
    const [email, setEmail] = useState("");
    const [checkGoNext, setCheckGoNext] = React.useState(false);
    const [checkError, setCheckError] = useState("이메일을 입력해주세요.");
    const [coloring, setColoring] = useState("pupple");
    const onChangeText = async (text) => {
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmail(text);
        if(text===""){
            setCheckError("이메일을 입력해주세요.");
            setCheckGoNext(false);
            setColoring("pupple");
        }
        else if(!regex.test(text)){
            setCheckError("올바른 형식의 이메일을 입력해주세요.");
            setCheckGoNext(false);
            setColoring("red");
        }
        else{
            //------임시
            setCheckError("사용가능한 이메일입니다!");
            setCheckGoNext(true);
            setColoring("pupple");
            //--------------

            // --------------  서버랑 통신시에 다시 연결
            // const formData = new FormData();
            // let emailData = {
            //     email: text
            // }
            // formData.append('duplicateEmailCheckDto',JSON.stringify(emailData));
            // console.log("formData = ",formData);
            // await axios.get(`${HS_API_END_POINT}/user/register/email-check?email=${text}`)
            // .then((res)=>{
            //     console.log("*********************",res);
            //     if(res.data){
            //         setCheckError("사용가능한 이메일입니다!");
            //         setCheckGoNext(true);
            //         setColoring("pupple");
            //     }
            //     else{
            //         setCheckError("이미 사용중인 이메일이에요!");
            //         setCheckGoNext(false);
            //         setColoring("red");
            //     }
            // });
            
        }
    }

    const gotoNextScreen = () => {
        if(checkGoNext === true){
            navigation.navigate('EnterPassword',{types: route.params.types, names: route.params.names, address: route.params.address, emails: email});
        }
        else{                    
            Alert.alert(
            "입력하신 이메일을 확인해주세요."
            );
        }
        // const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        // if(email===""){
        //     Alert.alert(
        //         "이메일을 입력해주세요."
        //     );
        // }
        // else if(!regex.test(email)){
        //     Alert.alert(
        //         "올바른 형식의 이메일을 입력해주세요."
        //     );
        // }
        // else{
        //     const formData = new FormData();
        //     formData.append()
        //     axios.get(`${HS_API_END_POINT}/user/register/email-check`,{
        //         body: {
        //             "email":email
        //         }
        //     }).then((res)=>{
        //         if(res === null){
        //             Alert.alert(
        //                 "올바른 형식의 이메일을 입력해주세요."
        //             );
        //         }
        //         else{
        //             navigation.navigate('EnterPassword',{types: route.params.types, names: route.params.names, emails: email});
        //         }
        //     })


            
        // }
    }
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>
                <View style={{flex:1}}/>
                <View style={[styles.board,{flex:8, backgroundColor:'#E1BEE7',borderRadius:20,padding:15}]}>
                    <View style={{flex:2, justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        <Text style={styles.title}>Step 4.</Text>
                        <Text style={styles.title}>이메일을 입력해주세요</Text>
                    </View>
                    <View style={{flex:0.5,justifyContent:'center'}}>
                        <Text style={styles.subtitle}>'Pupple'의 로그인 아이디가 됩니다.</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={{...styles.input, borderBottomColor:coloring==="pupple"?'#9C27B0':'red'}}
                            onChangeText={onChangeText}
                            value={email}
                            placeholder="ex) pupple@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize='none'
                        
                        />
                        <Text style={{...styles.checkEr, color:coloring==="pupple"?'#9C27B0':'red'}}>{checkError}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2}}/>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    board:{
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
        fontSize: responsiveFontSize(3.5),
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
        fontWeight:'bold',
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
        borderBottomColor:'blue',
        fontSize:bigOne*0.02,
        
    },
    checkEr: {
        fontSize:15,
        marginLeft: 12,
    }
  });
export default EnterEmail;