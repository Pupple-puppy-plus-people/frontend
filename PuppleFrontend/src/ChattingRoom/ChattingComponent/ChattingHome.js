
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
//import * as RNFS from 'react-native-fs'
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';
import {navigation, useIsFocused} from '@react-navigation/native';
import EmptyChatList from '../EmptyList';

import Item from '../../Tab2/Tab2Component/ItemComponent';

const ChattingHome = ({navigation})=>{
  const isFocused = useIsFocused();
  const [dogs, setDogs] = useState([{}]) 
  const [roomNumber, setRoomNumber] = useState([])
  const [unreadChatRoom, setunreadChatRoom] = useState([])

  async function checkUnreadMessgae(wish_dog){ // 방 나가기 전까지 읽은 메시지 모두 읽음 처리 해주기 

    // 진행률 100%인 찜목록의 dog_id로 dogs에서 받아옴
    console.log("--->",roomNumber, wish_dog)
    await axios.all(roomNumber.map((endpoint) => 
    axios.post(`${HS_API_END_POINT}/api/chat/check/`,{ room_number: endpoint, user_type: USER_INFO.USER_TYPE,}))) //id= 으로 찾으려고 하면 오류남 Warning: Encountered two children with the same key, `:`
        .then((data)=> {
          history = []
          //console.log("message history 받음.", history);
          
          for(dog in data){
            if(data[dog].data.unread=='true'){
              history.push(true)
              wish_dog[dog].unread=true // 읽어야할 메시지가 있으면 적어줌 
            }
            else{
              history.push(false)
              wish_dog[dog].unread=false
            }
          }
          setDogs(wish_dog)
          //console.log("messages updated to received true:", history, USER_INFO.USER_TYPE)
          setunreadChatRoom(history)
      })
      .catch((err)=> {
          console.log(err);
      })

  }

  // dog list 받아옴
  React.useEffect(()=> {

    // 구매자로 들어올때 
    if (USER_INFO.USER_TYPE == "customer"){ 
        let wish = []

        // 찜목록 받아옴
        axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
          email: USER_INFO.USER_EMAIL,}) 
          .then((res)=> {
              wish = res.data
              console.log("구매자 wishlist Data 받음.");

              dog_idx = []
              room_idx = []
              for(dog in wish){
                if(wish[dog].total==100){ // 진행률이 100%인 것만 받아옴
                  dog_idx.push(wish[dog].dog_id)
                  room_idx.push(`${wish[dog].dog_id}.${wish[dog].user}`) // '/' 오류 가능임
                }
              }
              console.log("room_idx", room_idx);

              // 진행률 100%인 찜목록의 dog_id로 dogs에서 받아옴
              axios.all(dog_idx.map((endpoint) => 
              axios.get(`${HS_API_END_POINT}/api/dogs/list/${endpoint}/`))) //id= 으로 찾으려고 하면 오류남 Warning: Encountered two children with the same key, `:`
              .then(
                (data) => {
                  
                  wish_dog = []
                  for(dog in data){
                    room_idx[dog]=room_idx[dog]+`.${data[dog].data.user_id}`
                    data[dog].data.room=room_idx[dog]
                    wish_dog.push(data[dog].data)
                  }
                  setDogs(wish_dog)
                  console.log(room_idx)
                  setRoomNumber(room_idx)

                  checkUnreadMessgae(wish_dog)

                }
              );

          })
          .catch((err)=> {
              console.log(err);
          })
      }else{  // 판매자로 들어올떄
        query = 
            '?'+
            'user_id='+USER_INFO.USER_ID 
            
        // dogs에서 판매자가 등록한 dog_id 받아옴
        axios.get(`${HS_API_END_POINT}/api/dogs/list/${query}`)  
        .then((res)=> {      
            console.log("판매자 등록한 Doglist Data 받음.");
            enrolledDog = res.data

            dog_idx = []
            for(dog in enrolledDog){
              dog_idx.push(enrolledDog[dog].id)
            }

            // 판매자가 등록한 dog의 찜목록에서 진행률을 받아옴
            axios.all(dog_idx.map((endpoint) => 
            axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
              dog_id: endpoint,}) )) //id= 으로 찾으려고 하면 오류남 Warning: Encountered two children with the same key, `:`
            .then(
              (data) => {
                completed_dog = []
                room_idx = []
                
                console.log("판매자 dog 찜목록 ", data.length)
                for(dog in data){
                  // 진행률 100% 된 것만 저장
                  console.log("판매자 dog 찜목록 ", data.length, data[dog].data)

                  if(data[dog].data.length == 0){
                    continue
                  }
                  for(idx in data[dog].data){
                    wishDog = data[dog].data[idx]
                    console.log("       --> ",idx, wishDog, wishDog.user)
                    copydog = JSON.parse(JSON.stringify(enrolledDog[dog])) //deepcopy
                    if(wishDog.total==100){
                      roomNum = `${wishDog.dog_id}.${wishDog.user}.${copydog.user_id}`
                      console.log("       --> ",idx, roomNum)
                      room_idx.push(roomNum) // '/' 오류 가능임?

                      if(data[dog].data.length>1){
                        num = Number(idx)+Number(1)
                        console.log("   num    --> ",num, typeof(idx))
                        copydog.name=`${copydog.name} (${num})`
                      }

                      copydog.room=roomNum
                      completed_dog.push(copydog)
                    }
                  }
                }
                console.log("NOW ROOM:", room_idx, completed_dog)
                setDogs(completed_dog)
                setRoomNumber(room_idx) 
                
                checkUnreadMessgae(completed_dog)

              }
            );

           })
           .catch((err)=> {
               console.log(err);
           })

           
      }



  },[isFocused]); // isFocused로 refresh시 state 업데이트 됨
  

  // 채팅방 리스트 정보
    const renderItem = ({ item }) => (
      /* item: 아이템 배열
       * navigation: 네비게이션
       * icon: 표시할 아이콘 모양 */
      <Item item={item} navigation={navigation} icon={'circle'} nextPage='ChattingRoom' />
    );
      
    return (
        <SafeAreaView style={styles.container}>
  
            
            <View style={{justifyContent: 'center', width: "100%", height: "100%"}}>

              {/* dog 리스트가 빈 리스트인지 확인*/}
              { Object.keys(dogs).length === 0 || Object.keys(dogs[0]).length === 0 ? 
                  /* 입양인/입양처에 따라 Empty Data 내용 다름 */
                  <EmptyChatList user={USER_INFO.USER_TYPE} /> 
                : 
                /* dog 리스트 */  
                <FlatList
                  data={dogs}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={2}  // column의 개수
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    //marginBottom: 5, 
                  }}/>
              }
              {/*마지막 홀수번째 리스트 튀어나오는 현상, 이상함 -> flex 조정으로 해결*/ }
            </View> 
            
            
            <View>
                {/*<View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        // onPress={() => setModal(true)}
                    >
                        <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>
                            나의 조건과 맞는 반려견 추천받기
                        </Text>
                    </Pressable>
                </View>*/}  

                {/*<View style={{alignItems: 'center', width: '100%', marginTop: '3%'}}>
                <Text style={{
                    textAlign: 'left',
                    width: '90%',
                    marginBottom: '1%',
                    fontSize: responsiveScreenFontSize(1.5),
                    fontWeight: '600',
                    
                }}>채팅방 </Text>
                <View style={{width: '90%', borderBottomWidth: 1, borderBottomColor: 'gray'}}/>
              </View>*/}
            </View>
          
  
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    bookBox: {
        margin:'5%',
        alignItems:'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    pressItemStyle: { 
        height: '90%',
        alignItems:'center',
        shadowColor: 'gray',
        shadowOffset: {
          width: 3,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 30
    },
    image: {
      width: '100%',
      height: '100%',
      borderWidth:1,
      borderColor: '#C2C2C2',
      borderRadius: 5

    },
    title: {
        width: '100%',
        textAlign: 'center',
        height: '10%',
        overflow: 'hidden',
        fontSize: responsiveScreenFontSize(0.9)
    },
    removeButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'red',
      position: 'absolute',
      alignSelf: 'flex-end',
      marginTop: 5,
      zIndex: 10
    },
    button: {
        marginHorizontal:5,
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

})

export default ChattingHome;