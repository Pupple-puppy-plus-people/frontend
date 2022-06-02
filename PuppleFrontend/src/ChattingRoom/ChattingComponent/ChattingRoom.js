import React, {useEffect, useState, useCallback, useRef, createRef} from 'react';
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
import { HS_API_END_POINT, USER_INFO, HOST_IP } from '../../Shared/env';
import { Divider } from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;
// import { GiftedChat, Bubble } from 'react-native-gifted-chat/src'
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import CustomToolBar from './CustomToolBar';
import axios from 'axios';
import { set } from 'react-native-reanimated';


// Gifted-chat의 발신자 말풍선 색을 바꾸기 위한 것
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
    const [messageLoaded, setMessageLoaded] = useState(false);

    const [roomNumber, setroomNumber] = useState(route.params?.aboutDog.room); // 채팅방 번호
    const [sellerID, setSellerID] = useState(Number(route.params?.aboutDog.room.split('.')[2])); // 구매자 ID
    const [customerID, setcustomerID] = useState(Number(route.params?.aboutDog.room.split('.')[1])); // 판매자 ID
    const isFocused = useIsFocused(); 

    const [messages, setMessages] = useState([]);
    const [unreadMessage, setunreadMessage] = useState({});
    const [unreadMessageIdx, setunreadMessageIdx] = useState({});

    const [customText, setCustomText] = useState([]);

    const ref2 = useRef(); // 읽지 않은 메시지로 이동하기 위한 ref
    const ref1 = createRef();
    var giftref;
    // ${route.params?.aboutDog.id}${USER_INFO.USER_ID}
    let ws = useRef(null); // 클라이언트 소켓
    
    // 채팅 방 이전 메시지 내용 다 불러올때까지 로딩화면 띄움
    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6646ee" />
            </View>
        );
    }

    async function setMessageHistory(){ // 이전 메시지 가져오기
        
        await axios.post(`${HS_API_END_POINT}/api/chat/history/`,{ room_number: roomNumber,}) 
            .then((res)=> {
                history = res.data
                //console.log("message history 받음.", history);
                unread = false
                unread_message = {}
                message = []
                for(msg in history){
                    data = JSON.parse(history[msg]['message'])
                    /*if( data.user.name == USER_INFO.USER_TYPE){
                        if( history[msg]['received'] == true){ // 상대 읽은 메시지가 있으면 
                            data.received='true' // 상대 읽은 메시지를 읽음 표시 해주기 
                        }
                    }*/
                    message.push(data)
                    // 최초로 안 읽은 메시지 찾기 - 상대가 보낸 메시지 중에서 
                    /*if( unread == false && data.user.name != USER_INFO.USER_TYPE){
                        if( history[msg]['received'] == false){ // 안 읽은 메시지가 있으면 
                            unread = true
                            unread_message = data
                            setunreadMessage(unread_message)
                            setunreadMessageIdx(msg) // 안 읽은 메시지 index
                        }
                    }*/
                }

                setMessages(message)
                setMessageLoaded(true)

            })
            .catch((err)=> {
                console.log(err);
            })
    }

    async function setMessageRead(){ // 방 나가기 전까지 읽은 메시지 모두 읽음 처리 해주기 

        await axios.post(`${HS_API_END_POINT}/api/chat/update/`,{ room_number: roomNumber, user_type: USER_INFO.USER_TYPE,}) 
            .then((res)=> {
                history = res.data
                //console.log("message history 받음.", history);
                console.log("messages updated to received true:", history)

            })
            .catch((err)=> {
                console.log(err);
            })
    }

    // 소켓 프로그래밍
    useEffect(() => {

        if(!ws.current){ // 소켓이 있으면
        // 채팅방 key = 반려견ID/구매자ID/판매자ID로 식별함
        ws.current = (new WebSocket(`wss://${HOST_IP}/ws/chat/${roomNumber}/`));
        // 페이지 헤더의 title을 반려견 이름으로 설정
        navigation.setOptions({
            title: route.params?.aboutDog.name
        });
        
        // 이전 메시지 가져오기
        setMessageHistory()

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
            // message.received = true; // 읽음 표시 처리
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
            setMessageRead(); // 읽은 메시지 처리 
            ws.current.close();
         };
    }, [isFocused])

   
    const onSend = useCallback((messages = []) => {
        if (socketConnected) { // 소켓이 연결되어 있을 때 

            const [messageToSend] = messages;
            // messageToSend.received = false; // 읽음 표시 

            //console.log("LOG: send message--> ",messageToSend)
            ws.current.send(JSON.stringify(messageToSend)); 

            setMessages(previousMessages => GiftedChat.append(previousMessages, [messageToSend]))
            
        }
    }, [socketConnected])

    /*const scrollToIndex = () => {
        ref2?.current?._messageContainerRef?.current?.scrollToIndex({
            animated: true,
            index: 3,})
    }

    giftref?._messageContainerRef?.current?.scrollToIndex({ // 안 읽은 메시지로 이동하고 싶음 -> 잘 안된다. ㅠㅠ 
        animated: true,
        index: 1})*/
    
    return (

        <SafeAreaView style={styles.container}>

            {messageLoaded ?
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: USER_INFO.USER_ID,
                name: USER_INFO.USER_TYPE,
                avatar: route.params?.aboutDog.image,
            }}
            renderBubble={renderBubble} // 보낸 메시지 말풍선 배경색
            // text={customText} // Redux 관련 ?
            // onInputTextChanged={text => setCustomText(text)} // 아직 용도 ?
            // onQuickReply={messages => on}
            // renderSend={true}
            /*renderMessage={shouldScrollTo={(offset: 5) => {
                giftedChatRef.current._messageContainerRef.current.scrollToOffset({
                    offset: scrollViewHeight - offset // for inverted
                });
            }}}*/
            //ref={ref2}
            //scrollToIndex={scrollToIndex}
            renderLoading={renderLoading} // 로딩화면 -> 음 부모 view가 giftedchat 로딩할 때 나타나는 듯(잘 안보임)
            //ref={(component) => (_giftedChatRef.scrollToIndex({index: 8, viewOffset: 0, viewPosition: 1}))}
            /*ref={(component) => (
                giftedChatRef.current?._messageContainerRef?.current?.scrollToIndex({
                    index: 1, viewOffset: 0, viewPosition: 1
                  }))}*/
            //ref={(component) => (this._giftedChatRef = component)}
            /*ref={()=>ref.current._messageContainerRef.current.scrollToOffset({
                offset: 30 // for inverted
            })}*/
            ref={(c)=>( // 안 읽은 메시지부터 스크롤 하고 싶어서 넣었는데 삽질 
                giftref = c
            )}
            
            renderAccessory={props => {
                return (
                  <CustomToolBar
                    aboutDog={route.params?.aboutDog}
                    sellerID={sellerID}
                    customerID={customerID}
                    // handleSendMes={handleSendMes}
                  />
                );
            }}
            />
            : renderLoading() // 로딩화면 있으니까 더 느린 느낌 -> 안 읽은 메시지 구분해주니까 느려짐 // 일단 console.log 다 지우자 
            } 
            

            {/*<Text> ㅎㅇ </Text>*/}
        </SafeAreaView>
        //<KeyboardAvoidingView style={styles.container}>
        //</KeyboardAvoidingView>
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
        marginTop: "10%", // 
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