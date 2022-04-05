import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EnrollButton = ({})=>{

    return (
        <View>
            <TouchableOpacity /* 등록하기 버튼은 loginstate가 seller 일때만 보여짐 */
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {gotoNextScreen("seller")}}
            >
                <View style={styles.eachView} /* color, testalign 같이 합치는 법 */> 
                <MaterialCommunityIcons name="dog" size={50} style={{color:'#C9C9C9', textAlign:'center'}}/>
                <MaterialCommunityIcons name="plus-circle" size={25} style={{color:'#C9C9C9', textAlign:'center', margin: '3%'}}/>
                <Text style={{color:'#C9C9C9',fontWeight:'bold',textAlign:'center', margin: '3%'}}>
                    등록하기
                </Text>
            </View>
            </TouchableOpacity>
            
        </View>
    );
}
const styles = StyleSheet.create({
    eachView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
        marginHorizontal:5,
        marginVertical:10,
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        width: '45%', // 크기 강아지 리스트와 맞추기 // 이거 화면 크기가 정해져있어야함 -> 따라서 강아지 수 많으면 page number 기능 있는 리스트 필요
        height: '66%',  
    },
    buttonOpen: {
      backgroundColor: "#white", // 
      borderWidth: 2, // 테투리 굵기  
      borderColor: '#C9C9C9', // 테투리 색상
    },
})

export default EnrollButton;