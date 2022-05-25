import React, {useEffect, useState, useCallback, useRef} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import Loader from './Components/Loader';
import { USER_INFO, HOST_IP } from '../../Shared/env';
import { Divider } from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;
import { GiftedChat, Bubble } from 'react-native-gifted-chat/src'


import axios from 'axios';
import { set } from 'react-native-reanimated';


// 받는 메시지의 색을 바꾸기 위한 것
function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }



function ChattingRoom({navigation, route}) {

    const [socketConnected, setSocketConnected] = useState(false);

    const [roomNumber, setroomNumber] = useState(route.params?.aboutDog.room); // 동적인 값 관리
    const [sellerID, setSellerID] = useState(Number(route.params?.aboutDog.room.split('.')[2])); // 동적인 값 관리
    const [customerID, setcustomerID] = useState(Number(route.params?.aboutDog.room.split('.')[1])); // 동적인 값 관리
    const isFocused = useIsFocused();

    const [messages, setMessages] = useState([]);
    const [customText, setCustomText] = useState([]);

    // ${route.params?.aboutDog.id}${USER_INFO.USER_ID}
    // ws로 했을 때는 안됨 ..........
    let ws = useRef(null);
    
    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    }

    useEffect(() => {

        if(!ws.current){
            // 방이름=개ID/보내는이/받는이
        ws.current = (new WebSocket(`wss://${HOST_IP}/ws/chat/${roomNumber}/`));

        // 페이지 헤더의 제목을 반려견 이름으로 설정
        navigation.setOptions({
            title: route.params?.aboutDog.name
        });
        

        // onLoadEarlier (Function) - 이전 메시지 로드 시 콜백
        // isLoadingEarlier (Bool) - ActivityIndicator이전 메시지를 로드할 때 표시
        setMessages([{
            _id: 4, // 받는 사람
            text: 'Hello developer', // 받은 메시지
            createdAt: new Date(),
            user: {
            _id: 2, // 보낸 사람
            name: 'React Native',
            avatar: route.params?.aboutDog.image,
            },
        }])
        /*
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        }
        */

        // onChangeRoomNumber(`${route.params?.aboutDog.id}${USER_INFO.USER_ID}`);
         // http가 아니기 때문에 ws(web socket)을 사용한 것이다. 
         console.log(ws)
         ws.current.onopen = () => {
             // connection opened
             console.log('connected')
             // send a message
             setSocketConnected(true);
         };
 
         ws.current.onmessage = (e) => {
             // a message was received
             data = JSON.parse(e.data);
             message = data['message'];

             console.log("received message", message);

            /*newMessage = [{
            _id: 1, // 메시지 아이디
            text: message,
            createdAt: new Date(),
            user: {
                _id: 2, // 작성자 아이디
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
            //sent: true,
            //received: JSON.parse(`${chat.isRead}`),
            }]*/
            
            setMessages(previousMessages => GiftedChat.append(previousMessages, [message]))
         };
 
         ws.current.onerror = (e) => {
             // an error occurred
             console.log(e.message);
         };
 
         ws.current.onclose = (e) => {
             // connection closed
             console.log(e.code, e.reason);
         };
        }
         return () => {
            ws.current.close();
         };
    }, [])

   
    const onSend = useCallback((messages = []) => {
        // 여기 어떻게 바꾸지 
        if (socketConnected) {


            const [messageToSend] = messages;
            // messageToSend.received = true; // 읽음 표시 

            /*if(USER_INFO.USER_TYPE=='seller'){
                messageToSend._id = customerID
            }else{
                messageToSend._id = sellerID
            }*/

            console.log("LOG: send message--> ",messageToSend)
            ws.current.send(JSON.stringify(messageToSend)); 
            /***
             * client
                    .mutate({
                    variables: {
                        ...
                    },
                    mutation: YOUR_MUTATION,
                    })
            * 
            * 
            */

            setMessages(previousMessages => GiftedChat.append(previousMessages, [messageToSend]))
        }
    }, [socketConnected])
   
    return (
        <SafeAreaView style={styles.container}>  
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: USER_INFO.USER_ID,
                name: USER_INFO.USER_TYPE,
                avatar: route.params?.aboutDog.image,
            }}
            renderBubble={renderBubble} // 보낸 메시지 배경색
            //text={customText} // Redux 관련 ?
            //onInputTextChanged={text => setCustomText(text)} // 아직 용도 ?
            // onQuickReply={messages => on}
            renderLoading={renderLoading} // 로딩화면
            />

        </SafeAreaView>
        
    );
}
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
        marginTop:10,
        fontSize: bigOne*0.03,
        fontWeight:'bold',
        textAlign:'left',
        //marginLeft:30
    },
    subtitle:{
        flex:1,
        fontSize: bigOne*0.02,
        color:'rgba(0,0,0,0.7)',
        textAlign:'left',
        //marginLeft:30
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
        fontSize: bigOne*0.03,
        fontWeight:'bold',
    },
    nextBtn: {
    flex:1,
    width:'90%',
    // maxHeight:50,
    borderRadius:10,
    backgroundColor:'#9C27B0',
    justifyContent: 'center',
    alignSelf: 'center',
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
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
  });
export default ChattingRoom;