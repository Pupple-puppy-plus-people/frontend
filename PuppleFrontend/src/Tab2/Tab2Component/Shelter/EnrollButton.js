import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;

const EnrollButton = ({navigation})=>{

    

    return (
        
        //<View>
        
            <TouchableOpacity style={[styles.button]}
                activeOpacity={0.8} /* 등록하기 버튼은 loginstate가 seller 일때만 보여짐 */
                underlayColor="#DDDDDD" 
                onPress={() => {navigation.navigate("EnrollStep1")}}
            >
                <Icon name="plus" size={35} style={{color:'white'}}/>  
            </TouchableOpacity> 
        //</View>

    );
}

/*
            <FAB icon={props => <Icon name="plus" {...props} />} color="primary" />
*/ 
const styles = StyleSheet.create({
    
    button: {
        // flex: 1,
        marginHorizontal:0,
        marginVertical:0,

        //marginVertical:5,
        //borderRadius: 15,
        //padding: 15,
        //elevation: 2,
        //width: '45%', // 크기 강아지 리스트와 맞추기 // 이거 화면 크기가 정해져있어야함 -> 따라서 강아지 수 많으면 page number 기능 있는 리스트 필요
        //height: '66%',  
        //height: height/4,
        //width: width/2 - 15,
        justifyContent: 'center',
        alignItems: 'center',
        //resizeMode: 'contain',
        position: 'absolute',    

        bottom: "1%",                                                    
        right: "3%",
        backgroundColor:'#9C27B0',
        borderRadius:100,

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
        width:70,   // resopnsive?
        height:70,
        resizeMode: 'contain',

    },
   
})

export default EnrollButton;