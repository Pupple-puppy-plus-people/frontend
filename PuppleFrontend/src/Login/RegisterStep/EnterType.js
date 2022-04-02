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
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterType({navigation}) {
    const [type, setType] = useState("");
    const [number, onChangeNumber] = React.useState(null);
    const onChangeText = (type) => {
        setName(type);
    }
    const gotoNextScreen = (type) => {
        setType(type)
        navigation.navigate('EnterName',{types: type});
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'#fff'}}>
                <View style={{flex:0.5}}/>
                <View style={[styles.board,{flex:9,backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        {/* <Text style={styles.title}>Step 1.</Text> */}
                        <Text style={styles.title}>Step 1.</Text>
                        <Text style={styles.title}>역할을 선택해주세요.</Text>
                    </View>
                    <View style={{flex:0.5, padding:10,justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>도서 판매자와 구매자를 고를 수 있어요.</Text>

                    </View>
                    <View style={{flex:4, flexDirection:'column',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.card}
                            onPress={() => {gotoNextScreen("seller")}}
                        >
                            {/* <LottieView style={{width:screenWidth===bigOne? bigOne*0.3:smallOne*0.6,alignSelf:'center'}} source={require('../../Assets/json/22620-store.json')} autoPlay /> */}
                            <Text style={{fontSize:responsiveFontSize(2.5),fontWeight:'bold'}}>강아지를 다른사람에게 보낼래요!</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}
                            onPress={() => {gotoNextScreen("customer")}}
                        >
                            {/* <LottieView style={{width:screenWidth===bigOne? bigOne*0.3:smallOne*0.6,alignSelf:'center'}} source={require('../../Assets/json/22620-store.json')} autoPlay /> */}
                            <Text style={{fontSize:responsiveFontSize(2.5),fontWeight:'bold'}}>입양/분양 받고 싶어요!</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{flex:1.5}}/>
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
export default EnterType;