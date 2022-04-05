
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

import EnrollButton from './Shelter/EnrollButton'

//import * as RNFS from 'react-native-fs'
//import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';


const USER = [
  {
    id: '0',
    title: '입양인',
  },
  {
    id: '1',
    title: '입양처',
  }
];
// 로그인 정보 조건문: 만약 입양처로 로그인했다면, 만약 입양인으로 로그인했다면에 따라 달라짐 -> 조건부 렌더링 알아보기

function Tab2Home ({navigation}) {
    const [type, setType] = useState(""); // 이거 다른 코드랑 많이 겹치는데 어떻게 못 합치나?
    const {width, height} = useWindowDimensions();
    const gotoNextScreen = (type) => {
      setType(type)
      navigation.navigate('EnterName',{types: type});
    }

    let USER_TYPE = 1;  // 0 이면 입양인, 1이면 입양처

    return (
        /* 노치 디자인에도 안전하게 화면의 콘텐츠를 확보할수 있음 */
        <SafeAreaView style={styles.container}>  
        
          {<View>
              
              {/* 만약에 입양처로 로그인한다면 -> if문 안되나?ㅠㅠ 조건문을 text로 읽어버리네 =해결=> {} 붙이기.. */}
              {USER_TYPE === 1 ? <EnrollButton /> : null}
              
              <View style={{alignItems: 'center', width: '100%', marginTop: '3%'}}>
              
              {/*반려견 리스트는 TouchableOpacity로 구현하지 말고 Pressable로 구현해서 꾹 누르면 삭제 버튼 뜰 수 있게 한다*/}
              

              </View>
          </View>}
         
  
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    eachView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
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
})

export default Tab2Home;