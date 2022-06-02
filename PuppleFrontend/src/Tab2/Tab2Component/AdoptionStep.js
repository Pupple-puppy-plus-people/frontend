
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Walk from '../../Template/Walk/';
import TimeStamp from '../../Template/TimeStamp';
//import * as RNFS from 'react-native-fs'
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';
import {navigation, useIsFocused} from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons//MaterialCommunityIcons';

import MatDetector from '../../Template/MatDetector';
import RoomCheck from '../../Template/RoomCheck';
import Agreement from '../../Template/Survey/Agreement';
import Survey from '../../Template/Survey/Survey';


import { timeEnd } from 'console';

const Item = ({ item, setModalVisible, setSelectedAuth }) => {

    if(item.bool){
        return (
            <View style={{marginVertical:responsiveScreenHeight(3)}}>
                <Pressable
                underlayColor="#ffffff00" 
                activeOpacity={0.5}  
                onPress={()=>{setModalVisible(true) 
                    setSelectedAuth(item.id)
                }}
                style={({ pressed }) => [{
                    backgroundColor: pressed
                    ? '#E1BEE7'
                    : 'white'},{ // 진행률 에 따라 배경색 채워지는 정도 다름 
                    // width:parentWidth.width,
                    borderColor:'purple',
                    borderWidth:3,
                    borderRadius:40,
                    width:responsiveScreenWidth(80),
                    height:responsiveScreenHeight(5),
                    alignSelf:'center',
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    }]
                }>
                    <Icon size={responsiveScreenFontSize(3)} name={item.icon} style={{marginLeft:responsiveScreenWidth(5)}}></Icon>
                    <Text
                    style={{fontSize:responsiveScreenFontSize(3), }}>{item.title}</Text>
                    {item.id == 0 || item.id == 1 ? <Text style={{marginRight:responsiveScreenWidth(2)}}>        </Text>
                    : <Text style={{fontSize:responsiveScreenFontSize(2), marginRight:responsiveScreenWidth(2), fontWeight:'bold', color:'purple'}}>| {item.progress}%</Text>
                    }
                </Pressable>
            </View>
        );
    }
    else{
        return (null);
    }
}

     
const AdoptionStep = ({navigation,aboutDog,setWishList})=>{
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAuth, setSelectedAuth] = useState(null);
    const [passCondition, setPassCondition] = useState(null);
    const [authlist, setAuthlist] = useState([]);
    
    let initAuthlist = [ 
        { title : '설문지', bool : true, id:0, icon:'file-document', progress:0},
        { title : '동의서', bool : true, id:1, icon:'file-sign', progress:0},
        { title : '산책량 측정', bool : true, id:2, icon:'walk', progress:0},
        { title : '생활패턴 검증', bool : true, id:3, icon:'alarm', progress:0},
        { title : '집 바닥재질 평가', bool : true, id:4, icon:'floor-plan', progress:0},
        { title : '반려견 생활환경 평가', bool : true, id:5, icon:'home', progress:0},
        ];
    
    if(!aboutDog.floor_auth){
        initAuthlist[4].bool=false
    } 
    if(!aboutDog.house_auth){ 
        initAuthlist[5].bool=false
    }

    const [startTime, setStartTime] = useState([]);
    const [startDay, setStartDay] = useState([]);

   
    React.useEffect(()=> { // useCallback?
        // 1) dog에서 인증 절차 개수, 종류 확인 
        setSelectedAuth(initAuthlist)

        console.log("다시 초점이 맞춰짐", isFocused)
        // pass condition 받아오기 - 1번만 받아오는게 좋은데 
        axios.get(`${HS_API_END_POINT}/api/passcondition/${aboutDog.id}/`)
        .then(function (response) {
            setPassCondition(response.data[0])
            console.log("pass condition: ",aboutDog.id,response.data);})
        .catch(error => {console.log('error : ',error.response)});
    
        // 반려견 진행율 업데이트하기
        
        // 반려견 진행률 받아오기 
        axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{
            "email":USER_INFO.USER_EMAIL,"dog_id":aboutDog.id})
        .then(function(res){   
            wishlist = res.data[0] 
            initAuthlist[0].progress = wishlist.survey
            initAuthlist[1].progress = wishlist.agreement
            initAuthlist[2].progress = wishlist.template1
            initAuthlist[3].progress = wishlist.template2
            initAuthlist[4].progress = wishlist.template3
            initAuthlist[5].progress = wishlist.template4
            console.log("여기서 받아옵니다->",initAuthlist)
            setWishList(wishlist)
            setAuthlist(initAuthlist)
        })
        .catch(function(error){
            console.log(error);
        });

        // timestamp 시작시간 
        axios.get(`${HS_API_END_POINT}/api/timestamp/get/?user=${USER_INFO.USER_ID}&dog=${aboutDog.id}&day=${-1}`) //aboutDog.dog_id 였는데, 사용자 따라서 달라지는 건가 
        .then((res)=> {      
            if(Object.keys(res.data).length==0){ // Object.keys(this.timelist).length==0
                console.log("HI")
                setStartTime(0)
            }else{
                setStartTime(res.data[0]['start_time'])
                setStartDay(res.data[0]['press_time'])
            }
            console.log("TimeStamp start time", startTime); // 왜 timeList에 안들어가지 
        })
        .catch((err)=> {
            console.log(err);
        })
    

    },[isFocused]);

    const onCloseModal = useCallback(() => {
        setModalVisible(!modalVisible)
      }, []);


    const renderItem = ({ item }) => (
        <Item item={item} setModalVisible={setModalVisible} setSelectedAuth={setSelectedAuth}/>
    );

    return (
        <View style={styles.container}>
            <View style={{margin:"2%"}}></View>
            <FlatList
                horizontal={true}   // 스크롤
                contentContainerStyle={{
                    flexDirection: 'column', // 횡
                }}
                data={authlist}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{alignSelf:'center'}}
                />

            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>{
                //setModalVisible(!modalVisible)
                onCloseModal()
            }}>
                <View
                style={{flexDirection:'column',flex:1}}>
                    <Pressable
                    style={{marginTop:40,
                        marginBottom:40,
                        zIndex:1,}}
                    onPress={()=>{
                        setModalVisible(!modalVisible)
                        // 반려견 진행률 update
                        axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{
                            "email":USER_INFO.USER_EMAIL,"dog_id":aboutDog.id})
                        .then(function(res){   
                            wishlist = res.data[0] 
                            initAuthlist[0].progress = wishlist.survey
                            initAuthlist[1].progress = wishlist.agreement
                            initAuthlist[2].progress = wishlist.template1
                            initAuthlist[3].progress = wishlist.template2
                            initAuthlist[4].progress = wishlist.template3
                            initAuthlist[5].progress = wishlist.template4
                            console.log("여기서 받아옵니다->",initAuthlist)
                            setWishList(wishlist)
                            setAuthlist(initAuthlist)
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    }}>
                        <View style={{margin:"1%"}} />

                        <Text
                        style={{fontSize:20,color:'#006ef9', marginLeft:'1%'}}>{'←'}돌아가기</Text>
                        <Divider style={{margin:"1%"}} />
                    </Pressable>
                    
                    {console.log("setSelectedAuth", selectedAuth)}
                    {selectedAuth==0?<Survey dog_id={aboutDog.id} setModalVisible={setModalVisible}></Survey>:null}
                    {selectedAuth==1?<Agreement dog_id={aboutDog.id} setModalVisible={setModalVisible}></Agreement>:null}
                    {selectedAuth==2?<Walk dog_id={aboutDog.id} setModalVisible={setModalVisible}></Walk>:null}
                    {selectedAuth==3?<TimeStamp dog_id={aboutDog.id} setModalVisible={setModalVisible} ts_check_time={passCondition.ts_check_time} ts_total_count={passCondition.ts_total_count} startTime={startTime} setStartTime={setStartTime} startDay={startDay}></TimeStamp>:null}
                    {selectedAuth==4?<MatDetector dog_id={aboutDog.id} setModalVisible={setModalVisible}></MatDetector>:null}
                    {selectedAuth==5?<RoomCheck dog_id={aboutDog.id} setModalVisible={setModalVisible}></RoomCheck>:null}

                </View>
            </Modal>

        </View>
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

export default AdoptionStep;