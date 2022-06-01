import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HS_API_END_POINT } from '../../../Shared/env';

import axios from 'axios';

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

const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  
function EnrollStep2({route, navigation}) {
    const ref = React.useRef(null);

    console.log("---navigated to EnrollStep2---> ", route.params);
    console.log("---route.pparames---> ", route.params?.selectedFilter);
    console.log("---route.pparames---> ", route.params?.dogRegInfo);


    const [name, setName] = useState("");
    const [dogImage, setdogImage] = useState([]);   // 강아지 이미지
    const [text, setText] = useState('');   // 강아지 소개글

    const onChangeText = (name) => {
        setName(name);
    }

    const onChangeDogImage = (image) => {
        // image="https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L"
        setdogImage(image); 
        console.log("dogImage", dogImage);
    }
      
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const [currentWeather, setCurrentWeather] = useState('');

    const gotoNextScreen = () => {
        if(text === ""){
            Alert.alert(
                "소개를 입력해주세요!"
            );
        }
        else{
            //url="https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L"
            // setdogImage(url)
            // setdogImage(dogImage[dogImage.length-1]) // 찍은 것 중에서 하나만 보냄 
            navigation.navigate('EnrollWalkAuth',{dogInfo: route.params, dogText: text, dogImage: dogImage}); // dogImage로 바꾸기 
        }
    }

    const openCamera = () => {    
        const options = {
            maxHeight: 250,
            maxWidth: 250,
            //selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        };
        launchCamera(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else if (response.fileSize > 5242880) {
                Alert.alert(
                    "Nilamhut Say\'s",
                    "Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry",
                    [
                        { text: "OK", onPress: () => console.log('ok Pressed') }
                    ],
                    { cancelable: false }
                )
            }
            else {
                console.log('Response uri =', response.assets[0].uri)
                console.log("base64 =",response.assets[0].base64);
                console.log("base64 length =",response.assets[0].base64.length);
                axios.post(`${HS_API_END_POINT}/api/dogs/add/`,{"image":response.assets[0].base64})
                .then(function(res){
                    
                    console.log("post response", res.data);
                    
                })
                .catch(function(error){
                    console.log(error);
                });

                setdogImage([...dogImage,response.assets[0].base64]) //access like this
            }
        });
        //launchImageLibrary(options, setPickerResponse);
        //console.log(pickerResponse);
    };

    return (
        <KeyboardAwareScrollView  contentContainerStyle={{flex: 1}}>   

        <View  style={[styles.container]}>
            <View style={{flex:0.5, marginBottom:'3%'}}>
                <Text style={styles.title}>Step 2. 반려견 소개 작성하기{'\n'}</Text>
            </View>
            
            <View style={{flex:5}}>
                <Text style={[styles.subtitle, {marginBottom:'2%'}]}>반려견 사진을 등록해주세요. </Text>
                
                {console.log("dogImage2", dogImage.length, `data:image/jpeg;base64,${dogImage[dogImage.length-1]}`)}
                
                
                {/**alignself: controls how a child aligns in the cross direction, overriding the alignItems of the parent*/}
                {dogImage.length===0?
                <View style={{flex:6, justifyContent:'center',  borderColor:'black',borderWidth:2,borderStyle:'dashed', width:'100%'}}>
                    <Icon name="file-image-plus" size={100} color='gray' style={{alignSelf:'center'}}></Icon>
                </View>
                : 
                <View style={{flex:6, justifyContent:'center',  borderColor:'black', width:'100%'}}>
                    <Image source={{uri: `data:image/jpeg;base64,${dogImage[dogImage.length-1]}`}}
                        style={ {width: "100%", 
                        height:"100%", resizeMode:'contain'}}/>                 
                </View>}

                <View style={{flex:1, marginTop:'1%'}}>
                    <TouchableOpacity 
                        onPress={openCamera}// () => {
                            // {setPhotoData:{onChangeDogImage}}
                            // onChangeDogImage()
                        //}}
                        style={[styles.UploadBtn, {alignItems:'center', flexDirection:'row'}]}>

                        {dogImage.length===0 ?  
                        <Text style={[styles.botText, {color: 'black'}]}>이미지 업로드  </Text>
                        :  <Text style={[styles.botText, {color: 'black'}]}> 다시 찍기</Text>}
                        
                        <Icon name="camera" size={responsiveWidth(7)} color="black" style={{alignSelf:'center',justifyContent:'center'}}/>
                    </TouchableOpacity>
                </View>

                {/*<Icon name="file-image-plus" size={100} color='gray'
                    style={ {width: "70%",
                    height:"70%",
                    borderRadius:5,
    margin: '3%'}}></Icon>*/}

                 
            </View>

            <View style={{flex:5}}>
                <Divider style={{margin:"5%"}} />

                <Text style={styles.subtitle}>반려견에 대한 소개를 작성해주세요. </Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    height="75%"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                    placeholder="상세한 반려견 정보는 분양에 도움이 돼요."/>
            </View> 

            <View style={{height:"10%", marginBottom:"5%", justifyContent:'flex-end', flex:1.5}}>
                <Divider style={{margin:"5%"}} />

                <TouchableOpacity 
                    onPress={gotoNextScreen}
                    style={styles.nextBtn}>
                    <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                </TouchableOpacity>
            </View>         
        </View>
        </KeyboardAwareScrollView>
    );

    /*ImagePicker.launchImageLibrary(options, (response) => {
        if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
        }
        else {
            onChangeDogImage(response.uri);
        }
    });*/
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
export default EnrollStep2;
