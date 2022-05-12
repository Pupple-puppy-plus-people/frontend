import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState, useEffect, Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {navigation} from '@react-navigation/native';

import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView,
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';

const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;


function Item({item, navigation, icon}) {

    console.log("item: ", item);

    const [parentHeight, setParentHeight] = useState({height:0}); // 동적인 값 관리
    const [imagePos, setimagePos] = useState({X:0, Y:0}); // 동적인 값 관리
  
    const onLayout=(event)=> {
      const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
      setParentHeight({height:height});
    };
  
    const onLayoutImage=(event)=> {
      const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
      setimagePos({X:x, Y:y});
    };
  
    return (
            <Pressable style={styles.dogCard} onLayout={onLayout} 
              backgroundColor='white' // background가 필요한지 모르겠음, 이미 dogCard에 있는데 
              activeOpacity={1}
              onPress={()=>{
              navigation.navigate('EnrollPage',
              {aboutDog : item})
              }}
              // onLongPress 길게 누르면 삭제 될 수 있게 하기 
            >
            
            <View style={{alignSelf:'center'}} >
              <Image source={{uri: item.image}} onLayout={onLayoutImage} 
                style={ {width: parentHeight.height/2,
                height:parentHeight.height/2,
                borderRadius:50,
                margin: '3%'}}/>
              {/* 입양처가 새로운 인증절차 확인할 것 있을 때 new state 나타내는 알림 표시, 크기 반응형 확인*/}
              <View style={[styles.add, {bottom:imagePos.X, right:imagePos.Y}]}>
                <Icon name={icon} size={25} color='lightgreen' />
              </View>
            </View>
  
            <Text style={styles.btnTitle}>{item.name}</Text>
            <Text style={styles.btnText}>{item.gender} (중성화 {item.desexing=='중성'?'O':'X'}) </Text>
            <Text style={styles.btnText}>{item.age} 살</Text>  
            <Text style={styles.btnText}>{item.location}</Text>
  
          </Pressable> 
    )
  }
// {/** 생년월일로 받는게 이상적 -> 현재 년도 월에서 빼주누는 걸로 */}

// 스타일 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    scrollView: {
      //backgroundColor: 'pink',
      marginHorizontal: 0,
      flex: 1,
    },
    centerView: {
      flex: 1,
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
    button: {
        marginHorizontal:5,
        marginVertical:10,
        
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        width: '45%', // 크기 강아지 리스트와 맞추기 // 이거 화면 크기가 정해져있어야함 -> 따라서 강아지 수 많으면 page number 기능 있는 리스트 필요
        height: '65%',  
    },
    buttonOpen: {
      backgroundColor: "#white", // 
      borderWidth: 2, // 테투리 굵기  
      borderColor: '#C9C9C9', // 테투리 색상
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    
    btnTitle: {
      fontSize: responsiveScreenFontSize(2.0),
      margin: '2%',
      textAlign: 'center',
      width: "50%",
      fontWeight:'bold',
    },
    btnText: {
      fontSize: responsiveScreenFontSize(1.7),
      textAlign: 'center',
      width: "100%"  // 텍스트 길이 제한
    },
    dogCard: { 
      //flex: 1/2, -> 이거로 하니까 리스트 개수가 홀수개일 때 마지막 리스트 사이즈가 튀어나옴
      backgroundColor: 'white',
      
      margin: '2%',
      //borderWidth: 2, // 테투리 굵기  
      //borderColor: '#C9C9C9', // 테투리 색상
      borderRadius: 15, // 테투리 각도
      
      justifyContent: 'center', // 세로방향
      alignItems: 'center', // 가로방향
      
      height: responsiveScreenHeight(26),
      width: '46%', // width/2로 하니까 더 옆으로 가서 잘림. 스크린 정의가 다른듯? %는 부모의 것을 기준으로 함
      
      // border 만 shadow: 배경색을 넣어주면 됨ㅋㅋ...
      shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
      shadowOpacity: 0.25,
      shadowRadius: 2,

      // flex:1, 
  },
  add: {
    backgroundColor:'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'white',
    borderWidth: 1,
    borderRadius: 30,
  },
})

  export default Item;