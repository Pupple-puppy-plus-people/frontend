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

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterPassword({navigation, route}) {
    const [password, setPassword] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const onChangeText = (data) => {
        setPassword(data);
    }
    
    const gotoNextScreen = () => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
        if(password === ""){
            Alert.alert(
                "비밀번호를 입력해주세요!"
            );
        }
        else if(!regex.test(password)){
            Alert.alert(
                "비밀번호는 영문, 숫자 포함 8~15자리로 입력해주세요!"
            );
        }
        else{
            navigation.navigate('PasswordCheck',{types: route.params.types, address:route.params.address, names: route.params.names, emails: route.params.emails, passwords: password});
        }
    }
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>

                <View style={{flex:1}}/>
                <View style={[styles.board,{flex:9, backgroundColor:'#E1BEE7',borderRadius:20,padding:15}]}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        <Text style={styles.title}>Step 5.</Text>
                        <Text style={styles.title}>비밀번호를 입력해주세요</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>비밀번호는 영문, 숫자 포함 8~15자리로 입력해주세요</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={password}
                            placeholder="Password"
                            autoCapitalize='none'
                            secureTextEntry={true}
                        
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={[styles.nextBtn]} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                    </TouchableOpacity>
                </View>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2, padding:'1%', justifyContent:'flex-end'}}>

                </View>
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
        borderBottomColor:'#9C27B0',
        fontSize:bigOne*0.02,
    },
  });
export default EnterPassword;