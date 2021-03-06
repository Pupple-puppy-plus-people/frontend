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

const DogDetail = ({item,id}) => {
    const [isHeart, setIsHeart] = useState(false);
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
    PressHeart =() => setIsHeart(!isHeart);
    // {
    //     // 하트누른 데이터베이스가 있다면, 속성으로는 사용자 아이디, 강아지아이디
    //     // insert item.id, user.id
    // }
    return (
        <View style={{backgroundColor:'#E9E0FF', borderRadius:15,}}>

            <View style={{marginVertical:10,alignSelf:'center'}}>
                <View style={{height:responsiveScreenHeight(30),width:responsiveScreenWidth(80)}}>
                    <Image source={imageStr} style={{ width: '100%', height: '100%',resizeMode:'cover',borderRadius:15}}  />
                </View>
            </View>
            <View style={{marginTop:10,marginHorizontal:10,borderTopColor:'gray',borderTopWidth:2}}/>

            <View style={{margin:10,}}>
                <View style={{flexDirection:'row',height:responsiveScreenHeight(5),alignContent:'center',marginHorizontal:responsiveScreenWidth(10)}}>
                    <View style={{flex:1}}>
                        <Text style={{...styles.textList, fontSize:responsiveScreenFontSize(3)}}>이름</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList,textAlign:'right',fontSize:responsiveScreenFontSize(3)}}>{item.name}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                        
                        <Text style={styles.textList}>나이</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.age} 살</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>성별</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{genderStr}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>중성화 여부</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.desexing}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>크기</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.size}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>털빠짐 정도</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.hair_loss}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{}}>
                    <Text style={styles.textList}>짖음 정도</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.bark_term}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>활동성</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList, textAlign:'right'}}>{item.activity}</Text>
                    </View>
                </View>
                <View style={{...styles.textBox, flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <Text style={styles.textList}>입양처 위치</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{...styles.textList,fontSize:responsiveScreenFontSize(2), textAlign:'right'}}>{item.location}</Text>
                    </View>
                </View>
                <View style={{justifyContent:'center',margin:10, backgroundColor:'white',borderRadius:15,padding:5}}>
                        <Text style={{...styles.textList,margin:5,}}>이 친구는요...</Text>
                        <Text style={{margin:5,}}>{item.introduction}</Text>
                </View>
                {/* 포함하는 입양 절차를 동그란 칩으로 */}
                <View style={{}}>
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
            </View>

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