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

function EnterName({navigation, route}) {
    const [name, setName] = useState("");
    const [number, onChangeNumber] = React.useState(null);
    const onChangeText = (name) => {
        setName(name);
    }

    const gotoNextScreen = () => {
        if(name === ""){
            Alert.alert(
                "이름을 입력해주세요!"
            );
        }
        else{
            navigation.navigate('EnterHouse',{types: route.params.types, names: name});
        }
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>
                <View style={{flex:1.5}}/>
                <View style={[styles.board,{flex:8, backgroundColor:'#E1BEE7',margin:10,borderRadius:20,padding:15}]}>
                    <View style={{flex:1,justifyContent:'center',paddingBottom:15}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        <Text style={styles.title}>Step 2.</Text>
                        <Text style={styles.title}>이름을 입력해주세요</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>저희는 당신의 이름이 궁금해요.</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'flex-start',}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={name}
                            placeholder="ex) 박퍼플"
                        
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                    </TouchableOpacity>
                </View>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, padding:'1%', justifyContent:'flex-end'}}>
                    

                </View>
                <View style={{flex:1.5}}/>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: bigOne*0.035,
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
  });
export default EnterName;