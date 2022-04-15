import React, {useState, createRef} from 'react';
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
  Pressable,
  useWindowDimensions,
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
const Checkbox = ({
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
};


/**
 * 
 * <View style={{flex:1,justifyContent:'center'}}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModal(true)}
            >
                <Text style={styles.textStyle}>클릭하여 주소찾기</Text>
            </Pressable>
        </View>
 * 
 * 
 */

const data = [
    { title : '등록하시는 분은 누구인가요? ', filterNumber : 0},
];

const choicesName=[
    ['개인분양자','동물보호소'],
];

function EnrollStep1({navigation}) {

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


    const {width, height} = useWindowDimensions();
    const passwordInputRef = createRef();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    const gotoNextScreen = () => {
        if(userEmail === ""){
            Alert.alert(
                "번호를 입력해주세요!"
            );
        }
        else{
            navigation.navigate('EnrollStep2',{animal: userEmail, owner: userPassword});
        }
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

                <View style={[styles.board,{backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    <View style={{flex:1.5,justifyContent:'flex-end'}}>
                        <Text style={styles.title}>Step 1.</Text>
                        <Text style={styles.title}>동물등록 번호를 조회해주세요. </Text>
                    </View>
                    <View style={{flex:0.5, justifyContent:'center', marginLeft:"3%"}}>
                    </View>
                    {/*data.map((x) => (
                    <Choice
                        text={x.title}
                        btnTxtStyles={styles.btnTxtStyles}
                        btnstyles={styles.btnstyles}
                        btnstylesSelect={styles.btnstylesSelect}
                        onValueChange={handleValueChange}
                        choicesCount={choicesName[x.filterNumber].length}
                        choicesName={choicesName[x.filterNumber]}
                    />
                    ))*/}
                      
            <View style={[styles.formArea, {width: width > height ? '40%': '75%'}]}>
                  <TextInput
                      style={[styles.textFormTop, {height: width >height ? '35%' : '25%'}]}
                      onChangeText={(UserEmail) =>
                        setUserEmail(UserEmail)
                      }
                      placeholder="동물등록번호" //dummy@abc.com
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
                      placeholder="소유자 성명" //12345
                      placeholderTextColor="#8b9cb5"
                      keyboardType="default"
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                  />
                {/* <Text style={{...styles.TextValidation}}>유효하지 않은 ID입니다.</Text> */}
            </View>
                </View>
            
            <TouchableOpacity 
                onPress={gotoNextScreen}
                style={styles.nextBtn} 
            >
                <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
            </TouchableOpacity>
                <View style={{flex:0.2}}/>
            </View>
            
        </SafeAreaView>
    );
}

const checkBoxBaseStyles = {
    height: 40,
    width: 40,
    margin: 10,
};

const labelDimentions = {
  width: 100
};


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
        height:"80%",
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
        marginLeft: "5%"
    },
    subtitle:{
        flex:1,
        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        marginLeft: "5%"
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
    marginTop: 50,
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
    marginBottom: 15,
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
    btnstyles: {
        ...checkBoxBaseStyles,
        borderWidth: 2,
        borderColor: '#d3a4fc',
        borderRadius: 100,
        //backgroundColor: '#FFFFFF',
      },
      btnstylesSelect: {
        ...checkBoxBaseStyles,
        backgroundColor: '#d3a4fc',
        borderRadius: 100,
      },
      btnTxtStyles: {
        ...labelDimentions,
        alignItems: 'center',
        fontSize: bigOne*0.02,
      },
      choicesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: labelDimentions.width
      },

      button: {
        width:"50%",
        marginHorizontal:10,
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#9C27B0",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:responsiveFontSize(2)
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
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
  });
export default EnrollStep1;