//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
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
    ScrollView,
    Alert

} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Chip } from 'react-native-paper';
import axios from 'axios';
import { HS_API_END_POINT,  USER_INFO } from '../../Shared/env';

const DogDetail = ({item,id, heart}) => {
    const [isHeart, setIsHeart] = useState(false);
    // var isHeart = (heart.indexOf(item.id)<0)?false:true;
    React.useEffect(()=>{
        console.log(heart);
        if(heart.indexOf(item.id)<0){
            setIsHeart(false);
        } else{
            setIsHeart(true);
        }
    },[]);
    var genderStr="";
    if (item.gender=="암컷"){
        genderStr = "여";
    } else{
        genderStr = "남";
    }
    var imageStr = {uri: 'http://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L'}
    if(item.image[0]==='h'){
        //`data:image/jpeg;base64,${item.image.substring(2, item.image.length-1)}`
        imageStr = {uri: item.image};
        //imageStr = {uri: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L'}
        // console.log("->", imageStr)
    }else{
        imageStr = {uri: `data:image/jpeg;base64,${item.image}`}
    }
    PressHeart =() => {
        
        if(!isHeart){
            console.log("하트 만들기");
            axios.post(`${HS_API_END_POINT}/api/users/wishlist/add/`,{"email":USER_INFO.USER_EMAIL,"dog_id":item.id})
            .then(function(res){
                if(res.data==="success"){
                    console.log(success);
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
        else{
            console.log("하트 취소하기");
            axios.post(`${HS_API_END_POINT}/api/users/wishlist/delete/`,{"email":USER_INFO.USER_EMAIL,"dog_id":item.id})
            .then(function(res){
                if(res.data==="success"){
                    console.log(success);
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
        
        // isHeart = !isHeart;
        setIsHeart(!isHeart)
        
    };
    // {
    //     // 하트누른 데이터베이스가 있다면, 속성으로는 사용자 아이디, 강아지아이디
    //     // insert item.id, user.id
    // }
    return (
        <View style={{backgroundColor:'#E9E0FF', width:'100%',height:'100%',borderRadius:15}}>

            <View style={{ flex: 4}}>
                <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15}}>
                    <Image source={imageStr} style={{ flex: 1, width: '100%', height: '100%',resizeMode:'cover',borderRadius:15}}  />
                    {/* <Image source={{uri:base64Image}} resizeMode='contain' style={{flex:1, width:'100%', height:'100%'}} /> */}
                </View>
            </View>

            {/* 하트 버튼 위치 */}
            <View style={{flex:0.8, alignContent:'center',justifyContent:'center'}}>
                <TouchableOpacity
                style={{alignItems:'center',justifyContent:'center'}}
                onPress={PressHeart}
                >
                    {!isHeart && <Icon name="heart-o" size={30} color="red" />}
                    {isHeart && <Icon name="heart" size={30} color="red" />}
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:10,borderTopColor:'gray',borderTopWidth:2}}/>

            {/* 스크롤뷰 위치 */}
            <View style={{flex:8}}><ScrollView style={{flex:1}}>

            {/* 강아지와 관련된 정보를 담아둠 */}
                <View style={{margin:10}}>
                    <View style={{flexDirection:'row',height:responsiveScreenHeight(5),alignContent:'center',marginHorizontal:responsiveScreenWidth(10)}}>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, fontSize:responsiveScreenFontSize(3)}}>이름</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList,textAlign:'right',fontSize:responsiveScreenFontSize(3)}}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                            
                            <Text style={styles.textList}>나이</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.age} 살</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>성별</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{genderStr}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>중성화 여부</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.desexing}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>크기</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.size}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>털빠짐 정도</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.hair_loss}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>짖음 정도</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.bark_term}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>활동성</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.activity}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>입양처 위치</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{...styles.textList,fontSize:responsiveScreenFontSize(2), textAlign:'right'}}>{item.location}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',margin:10, flex:1,backgroundColor:'white',borderRadius:15,padding:5}}>
                        <Text style={{...styles.textList,margin:5}}>이 친구는요...</Text>
                        <Text style={{margin:5}}>{item.introduction}</Text>
                    </View>
                </View>
{/*          */}
                {/* 포함하는 입양 절차를 동그란 칩으로 */}
                <View>
                    <View style={{margin:10,marginLeft:20}}>
                        <Text style={{fontSize:responsiveScreenFontSize(2.5),fontWeight:'bold'}}>아래의 검증과정이 추가로 필요해요!</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', flexWrap:'wrap',marginBottom:20,marginHorizontal:10}}>
                        <Chip style={styles.chip} textStyle={styles.chipText}> 산책량 측정 </Chip>
                        <Chip style={styles.chip} textStyle={styles.chipText}>  생활패턴 검증 </Chip>
                        {item.floor_auth && <Chip style={styles.chip} textStyle={styles.chipText}>  집 바닥재질 평가 </Chip>}
                        {item.house_auth && <Chip style={styles.chip} textStyle={styles.chipText}>  반려견 생활환경 평가 </Chip>}
                    </View> 
                </View>

                

            </ScrollView></View>
            

        </View>
    );
}
const styles = StyleSheet.create({
    textList:{
        fontSize:responsiveScreenFontSize(2.3),
        fontWeight:'bold',
        textAlign:'left'
    },
    textBox: {
        marginLeft:responsiveScreenWidth(10),
        marginRight:responsiveScreenWidth(10),
        justifyContent:'center',
        marginVertical:5,

    },
    chip:{
        width:'auto',
        margin:4,
        backgroundColor:'purple',
    },
    chipText:{
        fontSize:responsiveScreenFontSize(2),
        fontWeight:'bold',
        color:'white'
    }
});

export default DogDetail;