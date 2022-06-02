import React, {useState, createRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import 'react-xml-parser'
import 'react-native-xml2js'
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
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer, useScrollToTop} from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import axios from 'axios';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Divider } from 'react-native-paper';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
//import FilterDogList from '../../../DogList/FilterComponent/FilterDogList';
import FilterDogList from './FilterDogList';
import { API_KEY } from '../../../../secret';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

let selectedFilter = [
    //{filter:'gender',value : "수컷"},
    //{filter:'kind',value : ""},
    //{filter:'desexing',value : "중성"},
    {filter:'age',value : ""},
    {filter:'size',value : ""},
    {filter:'hair_loss',value : ""},
    {filter:'bark_term',value : ""},
    {filter:'activity',value : ""},
    {filter:'person_personality',value : ""},
]

let dogRegInfo = [
    {filter:'dogNm',value : ""},
    {filter:'gender',value : ""},
    {filter:'kind',value : ""},
    {filter:'desexing',value : ""},
    {filter:'registration_number',value : ""},
    {filter:'location',value : ""},
]



function animalGET(urls) {
    axios.get(urls)
        .then(function(response){
            // handle success
            console.log("** LOG: Success");
            //console.log(response);
            console.log("------------");

            dogInfo = response.data.response.body.item
            console.log(dogInfo);

            //showCheckBox(dogInfo)

        })
        .catch(function (error) {
            //handle error
            //console.log("** Error:", urls);
            //showCheckBox(dogInfo)
            dogInfo = null
            console.log(error);
        });
    
    return dogInfo

}

const AnimalNumberAPI = (props) => {

    /*********깃허브에 올리면 안됨*********** */
    //const animal1 = "410097800331388";

    const [animalNumber, setAnimalNumber] = useState('');
    const [RFID, setRFID] = useState('');
    const [ownerBirth, setOwnerBirth] = useState('');
    const [ownerName, setOwnerName] = useState("");
    const [url,setUrl] = useState("");
    const [xml,setXml] = useState();
    const [dog,setDog] = useState({});


    const passwordInputRef = createRef();

    const onChangeText = (name) => {
        setName(name);
    }

    const onChangeNum = (RFID) => {
        setNum(RFID);
    }

    const sendDogInfo = (dogInfo) => {
        props.setDogInfo(dogInfo)
        props.setAnimalNumber(animalNumber)
        // props.onChangeDogInfo(dogInfo, animalNumber)
        console.log("** ************************** ** ");
    }

    
    const animalNumberAPI = async () => {
        if(animalNumber === ""){
            Alert.alert(
                "번호를 입력해주세요!"
            );
        }
        else{

            console.log("** 입력 정보: ", animalNumber, ownerName);

            // var url = `https://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo`;
            // var queryParams = `?` + encodeURIComponent('dog_reg_no') + '=' + encodeURIComponent(animalNumber); /* */
            // queryParams += `&` + encodeURIComponent('owner_nm') + '=' + encodeURIComponent(ownerName); /* */
            // queryParams += `&` + encodeURIComponent('ServiceKey') + '=' + API_KEY; /* Service Key*/
            setUrl(`http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo`+`?` + encodeURIComponent('dog_reg_no') + '=' + encodeURIComponent(animalNumber)+`&` + encodeURIComponent('owner_nm') + '=' + encodeURIComponent(ownerName)+`&` + encodeURIComponent('ServiceKey') + '=' + API_KEY)
            console.log("******* url + query = ",url)
            await axios.get(`http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo`+`?` + encodeURIComponent('dog_reg_no') + '=' + encodeURIComponent(animalNumber)+`&` + encodeURIComponent('owner_nm') + '=' + encodeURIComponent(ownerName)+`&` + encodeURIComponent('ServiceKey') + '=' + API_KEY)
            .then(function(response){
                // handle success
                console.log("** LOG: Success");
                //console.log(response);
                console.log("------------");
                var parseString = require('react-native-xml2js').parseString;
                var xml = response.data
                parseString(xml, function (err, result) {
                    console.log("********res ::: ",result.response.body[0].item[0]);
                    setDog({
                        dogNm:result.response.body[0].item[0].dogNm[0],
                        kindNm:result.response.body[0].item[0].kindNm[0],
                        neuterYn:result.response.body[0].item[0].neuterYn[0],
                        orgNm:result.response.body[0].item[0].orgNm[0],
                        sexNm: result.response.body[0].item[0].sexNm[0]
                    })
                    console.log(dog)
                    sendDogInfo([{
                        dogNm:result.response.body[0].item[0].dogNm[0],
                        kindNm:result.response.body[0].item[0].kindNm[0],
                        neuterYn:result.response.body[0].item[0].neuterYn[0],
                        orgNm:result.response.body[0].item[0].orgNm[0],
                        sexNm: result.response.body[0].item[0].sexNm[0]
                    }])
                });
                // console.log(response.data)
                // // var XMLparser = require('react-xml-parser');
                // // setXml(new require('react-xml-parser')().parseFromString(response.data))
                // // console.log(xml)
                // // console.log(xml.getElementsByTagName('*'))
                // sendDogInfo(response.data.response.body.item)
                // console.log(response.data.response.body.item);
    
                //showCheckBox(dogInfo)
    
            })
            .catch(function (error) {
                //handle error
                //console.log("** Error:", urls);
                //showCheckBox(dogInfo)
                dogInfo = null
                console.log(error);
            });
            // Promise.all([animalGET(url)]) 
            // .then(dogInfo => {
            //     console.log("dogInfo:",dogInfo)
            //     sendDogInfo(dogInfo)
            // }).catch(function (error) {
            //     console.log(error);
            // });
        }
    }

    return (

        <View style={styles.formArea}>
                
                        <TextInput
                            style={[styles.textFormTop, styles.textFrom]}
                            onChangeText={(AnimalNumber) =>
                                setAnimalNumber(AnimalNumber)
                            }
                            placeholder="동물등록번호" 
                            placeholderTextColor="#C9C9C9"
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
                            style={[styles.textFormBottom, styles.textFrom]}
                            onChangeText={(OwnerName) =>
                                setOwnerName(OwnerName)
                            }
                            placeholder="소유자 성명" //12345
                            placeholderTextColor="#C9C9C9"
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />

                    <TouchableOpacity 
                        onPress={animalNumberAPI}
                        style={styles.nextBtn}>
                        <Text style={[styles.botText, {color: 'white'}]}>조회하기</Text>
                    </TouchableOpacity>
                    </View>
    )
}

const data = [
    { title : '등록하시는 분은 누구인가요? ', filterNumber : 0},
];

const choicesName=[
    ['개인분양자','동물보호소'],
];

function EnrollStep1({navigation}) {
    const ref = React.useRef(null);
    const [dogInfo, setDogInfo] = useState(null);
    const [animalNumber, setAnimalNumber] = useState(null);

    useScrollToTop(ref);

    const onChangeDogInfo = (dogInfo, animalNumber) => {
        setDogInfo(dogInfo)
        setAnimalNumber(animalNumber)
        console.log("Changed !", dogInfo, animalNumber);
    } // props 로 자식에서 부모로 값 전달하는 거 하던 중


    const {width, height} = useWindowDimensions();

    const gotoNextScreen = (dogInfo) => {
        /*if(name === ""){
            Alert.alert(
                "소개를 입력해주세요!"
            );
        }
        else*/
        //if{

            dogRegInfo[0].value=dogInfo.dogNm
            dogRegInfo[1].value=dogInfo.sexNm
            dogRegInfo[2].value=dogInfo.kindNm
            dogRegInfo[3].value=dogInfo.neuterYn
            dogRegInfo[4].value=animalNumber
            dogRegInfo[5].value=dogInfo.orgNm

            console.log("---navigate to EnrollStep2---> ", selectedFilter, dogRegInfo);

            navigation.navigate('EnrollStep2',{selectedFilter:selectedFilter, dogRegInfo:dogRegInfo});
        //}
    }

    return (

        // bottom navigation 지우기
        // 그 아래 등록하기(홈에서 보임), 저장하기 버튼 두기 

        // 선택하기 (입양처 / 입양인)
        // 사진 올리기 
        // 견적사항 완성하기 (step 1) - 왼쪽 페이지에서
        // 인증절차 선택하기 (step 2) - 오른쪽 페이지에서 
        // progress bar는 어디에?
       
        <KeyboardAwareScrollView style={{ backgroundColor: "white", flex: 1 }} >   

           
        <View style={{flex:1,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>

            <ScrollView ref = {ref} style={[styles.scrollView]}> 

                <View style={{justifyContent:'flex-start'}}>
                    <Text style={styles.title}>Step 1. 반려견 정보 작성하기{'\n'}</Text>
                    <Text style={[styles.subtitle]}>반려견 분양을 위해 동물등록 조회가 필요해요. </Text>
                    
                    <AnimalNumberAPI setAnimalNumber={setAnimalNumber} setDogInfo={setDogInfo} onChangeDogInfo={onChangeDogInfo} />

                    <Text>{dogInfo === null ? null : 
                    
                        (dogInfo[0] === undefined || dogInfo[0] === 'undefined') ?
                        <Icon name='close-circle' color='red'> 조회 실패</Icon>  : 
                    <Icon name='check-circle' color='green'> 조회 완료</Icon> }
                    </Text>
                   
                <Divider style={{margin:"5%"}} />
                
                </View>
                
                <View style={[{justifyContent:'flex-start'}]}>
                    {/*<Text style={[styles.subtitle, {marginTop: "3%"}]}> 동물등록된 반려견 분양이 가능해요. </Text>*/}
                    
                    {console.log("** dog: ", dogInfo)}
                    {dogInfo == null || (dogInfo[0] === undefined || dogInfo[0] === 'undefined') ? 
                    null : 

                    <>

                        <Text style={styles.subtitle}>반려견 등록 정보를 확인해주세요. </Text>
                    
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.btnTxtStyles}>
                                <Text>이름</Text>
                            </View>

                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <Text>{dogInfo[0].dogNm}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.btnTxtStyles}>
                                <Text>성별</Text>
                            </View>
                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <Text>{dogInfo[0].sexNm}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                            <View style={styles.btnTxtStyles}>
                                <Text>품종</Text>
                            </View>
                        
                            <View style={[{flex:1}, styles.btnTxtStyles]}>
                                <Text>{dogInfo[0].kindNm}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                            <View style={styles.btnTxtStyles}>
                                <Text>중성화</Text>
                            </View>
                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <Text>{dogInfo[0].neuterYn}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>

                            <View style={styles.btnTxtStyles}>
                                <Text>지역</Text>
                            </View>
                            <View style={[{flex:1},styles.btnTxtStyles]}>
                                <Text>{dogInfo[0].orgNm}</Text>
                            </View>
                        </View>

                        <Divider style={{margin:"5%"}} />

                        <Text style={styles.subtitle}>반려견 정보를 체크해주세요. </Text>
                        <TouchableWithoutFeedback >
                        <FilterDogList selectedFilter={selectedFilter}>   
                            {console.log("-&&&&& >", dogInfo[0].sexNm)}    
                        </FilterDogList>
                        </TouchableWithoutFeedback>
                        <Divider style={{margin:"5%"}} />

                        
                        <View  style={{flex:3,justifyContent:'flex-end'}}>
                            <TouchableOpacity 
                                onPress={() => {
                                    gotoNextScreen(dogInfo[0]);
                                }}
                                style={styles.nextBtn}>
                                <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    
                    }
                   
                </View>


                <View style={[styles.board,{backgroundColor:'#E1BEE7',borderRadius:20}]}>
                    
                </View>
        
                    
            </ScrollView>
        </View>
        </KeyboardAwareScrollView>
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
        flex: 1,
        backgroundColor: 'white',
        padding:"2%",
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
    title: {
        flex:1,
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        //marginLeft: "5%",
        //marginTop: "5%",
    },
    subtitle:{
        flex:1,
        fontSize: bigOne*0.02,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        marginBottom: '3%',
        //marginLeft: "5%",        
        //marginTop: "3%",

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
    marginTop: 5,
    flex:1,
    //height: '100%',
    height: 30,
    width:'100%',
    //maxHeight:50,
    borderRadius:7,
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
        paddingVertical:"3%",
        flex: 1,
      },
      textFrom: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#C9C9C9',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
      },
      textFormTop: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomWidth: 1,
      },
      textFormMiddle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
      },
      textFormBottom: {
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderTopWidth: 1,
      },
      btnTxtStyles: {
        ...labelDimentions,
        alignItems: 'center',
        marginVertical:'3%'
      },
  });
export default EnrollStep1;