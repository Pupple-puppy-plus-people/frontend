/* 아직 등록된 강아지가 없어요 페이지ㅣ */


//import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EmptyChatList = ({user})=>{
      
    return (

        <Text style={{color:'#C9C9C9',fontWeight:'bold',textAlign:'center'}}>
        <Icon name="message" size={50}/>
        
        {'\n'} 채팅방이 열리지 않았어요. {'\n'} 
            <Text> 반려견 입양을 위한 채팅방이 열릴때까지 기다려주세요:{')'} </Text>
        </Text>
                    
    );
};

const styles = StyleSheet.create({
    centerView: {
       //flex: 1,  // 이건 안먹네.. 부모 view 의 특정 비율 만큼 차지하는데, 부모 view 가 없어서 그런가?
       //marginVertical:'70%',    // 80%로 하면 사라짐 왜지? -> flex 랑 관련있을 듯
    },
})

export default EmptyChatList;