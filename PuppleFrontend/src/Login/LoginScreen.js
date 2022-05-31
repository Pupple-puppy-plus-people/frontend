import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import {HS_API_END_POINT, USER_INFO} from '../Shared/env';
import LottieView from 'lottie-react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { Button } from 'react-native-vector-icons/dist/FontAwesome';
// import { setJwt,setUserInfo } from '../Store/Actions';
// import { connect } from 'react-redux';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

// const screenWidth = useWindowDimensions().width;
// const screenHeight = useWindowDimensions().height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function LoginScreen({navigation, handleJwtResult, handleUserInfo, user_info}) {
  const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const {width, height} = useWindowDimensions();

    const passwordInputRef = createRef();

    const submitPress = async () => {
      
      // navigation.replace('BottomNav');
      await axios.post(`${HS_API_END_POINT}/api/users/auth/login/`,{
        email: userEmail,
        password: userPassword
      })
      .then(async function(res){
        console.log(res.data)
        if(res.data.error==="fail"){
          Alert.alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        } else{
          console.log("response == ",res.data.data);
          USER_INFO.USER_ID = res.data.id;
          USER_INFO.USER_EMAIL = userEmail;
          USER_INFO.USER_ID = res.data.id;
          USER_INFO.USER_TYPE = res.data.user_type;
          USER_INFO.USER_USERNAME = res.data.username;
          navigation.replace('BottomNav');
          //토큰이 온다.
          //토큰 async 저장
          //AsyncStorage.setItem('user_jwt', res.data);
          
          // //토큰으로부터 유저정보 가져오기
          // await axios.get(`${HS_API_END_POINT}/user/my-info`,{
          //   headers: {
          //     'Authorization' : "Bearer " + res.data
          //   }
          // }).then(function(result){
          //   console.log("result.data  ",result.data.username);
          //   handleUserInfo(result.data);
          // })
          // .catch(function(error){
          //   navigation.replace('Auth');
          // });
          //handleJwtResult(res.data);
          // console.log("user INFO :::",user_info);
        }
        //console.log("res = ",res);
        // console.log("res data = ",res.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    // const compareAsyncLogin = () => {
    //   AsyncStorage.getItem('user_information', (err, result) => {
    //     const userInfo = JSON.parse(result);             //string화 된 result를 parsing
    //     //console.log('아이디는' + userInfo.user_id);        // user에 담긴 id출력
    //     if(userInfo===null){
    //       Alert.alert("아이디가 존재하지 않아요.");
    //     }
    //     else if(userEmail===userInfo.user_id && userPassword===userInfo.user_password){
    //       navigation.replace('BottomNav');
    //     }
    //     else{
    //       Alert.alert("아이디 또는 비밀번호가 일치하지 않아요.");
    //     }

    //   });

    // }

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                
                <View style={styles.titleArea}>
                  <LottieView style={{alignItems:'center'}} source={require('../Assets/json/95961-puppy-sleeping.json')} autoPlay loop />               
                </View>
            </View>

            <View style={[styles.formArea, {width: width > height ? '40%': '75%'}]}>
                  <TextInput
                      style={[styles.textFormTop, {height: width >height ? '35%' : '25%'}]}
                      onChangeText={(UserEmail) =>
                        setUserEmail(UserEmail)
                      }
                      placeholder="Enter Email" //dummy@abc.com
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          passwordInputRef.current &&
                          passwordInputRef.current.focus()
                      }
                      underlineColorAndroid="#f000"
                      blurOnSubmit={false}
                  />
                  <TextInput
                      style={[styles.textFormBottom,{height: width >height ? '35%' : '25%'}]}
                      onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                      }
                      placeholder="Enter Password" //12345
                      placeholderTextColor="#8b9cb5"
                      keyboardType="default"
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={true}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                  />
                {/* <Text style={{...styles.TextValidation}}>유효하지 않은 ID입니다.</Text> */}
            </View>
            <View style={{flex:0.75}}>
              <Text 
                onPress={() => {
                  navigation.navigate('EnterType');
                }}
                style={styles.toRegister}
              >
                Pupple의 회원이 아니신가요?
              </Text>
              
            </View>
       
            <View style={
              [styles.btnArea,  
                {
                  width: width > height ? '40%': '55%', 
                  height:  width > height? '8%' : '7%'
              }]}>
                    <TouchableOpacity 
                      style={styles.btn} 
                      activeOpacity={0.5}
                      //onPress={() => {navigation.replace('BottomNav');}}
                      onPress={submitPress}
                    >
                        <Text style={[styles.Text, {color: 'white', fontSize:bigOne*0.02}]}>로그인</Text>
                    </TouchableOpacity>
            </View>
      
            <View style={{flex: 3}} />
        </View>
    );
}

//   const mapDispatchToProps = (dispatch) => ({
//     handleJwtResult: (value)=>  dispatch(setJwt(value)),
//     handleUserInfo: (value) => dispatch(setUserInfo(value)),
// });

// const mapStateToProps = (state) => ({
//     user_info : state.userReducer.userObj
// });

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  topArea: {
      flex: 3,
      paddingTop: screenWidth*0.01,
  },
  titleArea: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  TextArea: {
    backgroundColor:'blue',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Text: {
    fontSize: bigOne*0.015,
    fontWeight:'bold'
  },
  TextValidation: {
    fontSize: screenWidth*0.02,
    color: 'red',
  },

  formArea: {
    justifyContent: 'center',
    flex: 2,
    alignSelf:'center'
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#C9C9C9',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: '#C9C9C9',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    paddingBottom: screenHeight*0.01,
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(153, 0, 255, 1.0)',
  },
  toRegister: {
    fontSize: bigOne*0.018,
    textDecorationLine: 'underline',
    color:'rgba(153, 0, 255, 0.7)',
    alignSelf:'center',
    
  },
});

export default LoginScreen;