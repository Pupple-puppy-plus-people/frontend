import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
    const [dogImage, setdogImage] = useState("");   // 강아지 이미지
    const [text, setText] = useState('');   // 강아지 소개글

    const onChangeText = (name) => {
        setName(name);
    }

    const onChangeDogImage = () => {
        url="https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L"
        setdogImage(url);
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
            navigation.navigate('EnrollStep3',{dogInfo: route.params, dogText: text, dogImage: dogImage});
        }
    }
    return (
        <KeyboardAwareScrollView  contentContainerStyle={{flex: 1}}>   

        <View  style={[styles.container]}>
            <View style={{flex:0.5, marginBottom:'3%'}}>
                <Text style={styles.title}>Step 2. 반려견 소개 작성하기{'\n'}</Text>
            </View>
            
            <View style={{flex:5}}>
                <Text style={styles.subtitle}>반려견 사진을 등록해주세요. </Text>
                
                {        console.log("dogImage", dogImage)}
                

                <View style={{flex:6, alignItems:'center'}}>
                    {dogImage == "" ?  
                    <Icon name="file-image-plus" size={100} color='gray'
                    style={ {width: "70%",
                    height:"70%",
                    borderRadius:5,
                    margin: '3%'}}></Icon>: 
                    <Image source={{uri: dogImage}}
                    style={ {width: "70%",
                    height:"70%",
                    borderRadius:5,
                    margin: '3%'}}/> }
                </View>

                 <View style={{flex:1}}>
                    <TouchableOpacity 
                        //onChangeDogImage={onChangeDogImage}
                        onPress={() => {
                            onChangeDogImage()
                        }}
                        style={[styles.UploadBtn]}>
                            
                        <Text style={[styles.botText, {color: 'black'}]}>이미지 업로드</Text>
                    </TouchableOpacity>
                </View>
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


/****
 * 
 * <View style={{felx:1}}>

                    <View style={{flex:1}}>
                        <Text style={styles.title}>Step 2. 반려견 소개 작성하기{'\n'}</Text>
                    </View>

                    <View style={[{flex:2}]}>

                    </View>


                    <View style={[{flex:1}]}>

                       

                    </View>

                
                    <View style={{justifyContent:'flex-end'}}>
                
                        <TouchableOpacity 
                            onPress={gotoNextScreen}
                            style={styles.nextBtn}>
                            <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                        </TouchableOpacity>
                    </View>     
                 </View>
 * 
 * 
 * 
 * 
 * 
 */
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


/**
 * <>
                        
                        <View style={[{justifyContent:'flex-start'}]}>
                            <Text style={styles.subtitle}>반려견에 대한 소개를 작성해주세요. </Text>
                            <TextInput
                            style={styles.input}
                            multiline={true}
                            placeholder="상세한 반려견 정보는 분양에 도움이 돼요."
                            >
                            </TextInput>
                        </View>
                        
                        </>

 * 
 * 
 */

/*const Checkbox = ({
    id,
    btnstyles,
    btnstylesSelect,
    checked,
    selectedIndex,
    onCheckboxChange,
    choicesName,
    }) => {
    return selectedIndex !== id ? (
        <>
        <TouchableOpacity
        style={btnstyles}
        onPress={() => {
            onCheckboxChange(id);
        }}>
        </TouchableOpacity>
        
        <Text style={styles.btnTxtStyles}>{choicesName[id]}</Text>
        </>

    ) : (
        <>
        <TouchableOpacity
        style={btnstylesSelect}
        onPress={() => {
            onCheckboxChange(id);
        }}>
        </TouchableOpacity>
        <Text style={styles.subtitle}>{choicesName[id]}</Text>
        </>
    );
};
*/
/*
const Choice = ({
    callback,
    text,
    btnstyles,
    btnTxtStyles,
    btnstylesSelect,
    btnTxtStylesSelect,
    onValueChange,
    choicesCount,
    choicesName
    }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleCheckboxChange = (id) => {
        setSelectedIndex(id)
        if (onValueChange) {
        onValueChange(text, id);
        }
    };

    const [name, setName] = useState("");
    const onChangeText = (name) => {
        setName(name);
    }

    const [RFID, setNum] = useState("");
    const onChangeNum = (RFID) => {
        setNum(RFID);
    }

    const handleValueChange = (filtername, checkboxId) => {
        // do what ever you want with this two
      };

    const gotoNextScreen = () => {
        if(name === ""){
            Alert.alert(
                "번호를 입력해주세요!"
            );
        }
        else{
            navigation.navigate('EnrollStep2',{});
        }
    }
    const [isModal, setModal] = useState(false);


    return (
        <>
        <Text style={styles.subtitle}>{text}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:"3%"}}>

            {Array.from({length: choicesCount}).map((item, index) => (
            <Checkbox
                id={index}
                btnstyles={btnstyles}
                btnstylesSelect={btnstylesSelect}
                selectedIndex={selectedIndex}
                onCheckboxChange={handleCheckboxChange}
                choicesName={choicesName}
            />
            ))}
        </View>        
                    
        </>
        
    );
}
*/
