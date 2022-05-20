import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WalkPassCondition from '../../../Template/WalkPassCondition';

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
import OpenCamera from '../../../Shared/OpenCameraComponent';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnrollWalkAuth({route, navigation}) {
    const ref = React.useRef(null);

    console.log("---navigated to EnrollWalkAuth---> ", route.params);
    //console.log("---route.pparames---> ", route.params?.selectedFilter);
    //console.log("---route.pparames---> ", route.params?.dogRegInfo);

    const [walkDay, setWalkDay] = useState(7);
    const [walkTime, setWalkTime] = useState(30);
    const [walkDistance, setWalkDistance] = useState(2500)
    function setAllData(walkDayNew,walkTimeNew,walkDistanceNew){
        setWalkDay(walkDayNew);
        setWalkTime(walkTimeNew);
        setWalkDistance(walkDistanceNew);
    }
    useEffect(()=>{
    console.log(walkDay,walkTime,walkDistance)
    });

    const gotoNextScreen = () => {
        navigation.navigate('EnrollTimeAuth',
        {dogInfo: route.params?.dogInfo, 
            dogText: route.params?.dogText, 
            dogImage: route.params?.dogImage, 
            walkDay: walkDay, 
            walkTime: walkTime, 
            walkDistance: walkDistance});
    }


    return (

        <View  style={[styles.container]}>
            <View style={{flex:0.1}}>
                <Text style={styles.title}>Step 3. 산책량 검증 시간 설정{'\n'}</Text>
            </View>
            
            <View style={{flex:1.4}}>
                <WalkPassCondition
                setAllData={setAllData}/>
            </View>
            
            <View style={{height:"10%", marginBottom:"5%", justifyContent:'flex-end', flex:0.2}}>
                <Divider style={{margin:"5%"}} />

                <TouchableOpacity 
                    onPress={gotoNextScreen}
                    style={styles.nextBtn}>
                    <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                </TouchableOpacity>
            </View>  
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        
    },
    scrollView: {
        backgroundColor: 'white',
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
        elevation: 5,
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
    //marginTop: 300,
    flex:1,
    height: 30,
    width:'100%',
    //axHeight:50,
    borderRadius:10,
    backgroundColor:'#9C27B0',
    justifyContent: 'center',
    //alignItems: 'center',
},  
UploadBtn: {
//marginTop: 300,
flex:1,
height: 30,
width:'100%',
//axHeight:50,
borderRadius:10,
backgroundColor:'#d3a4fc',
justifyContent: 'center',
//alignItems: 'center',
},  
input: {
    height: bigOne*0.1,
    margin: 12,
    //marginTop: 100,
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
export default EnrollWalkAuth;
