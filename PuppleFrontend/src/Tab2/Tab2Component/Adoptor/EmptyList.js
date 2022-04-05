/* 아직 등록된 강아지가 없어요 페이지ㅣ */


//import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const EmptyDogList = ({})=>{
      
    return (
            <View style={styles.centerView}>
            <Text style={{color:'#C9C9C9',fontWeight:'bold',textAlign:'center'}}>
            <MaterialCommunityIcons name="dog" size={50}/>
            {'\n'} 등록된 반려견이 없어요. {'\n'} Home에서 당신의 반려견을 찾아주세요. 
            </Text>

            </View>
                    
    );
};

const styles = StyleSheet.create({
    centerView: {
       //flex: 1,  // 이건 안먹네.. 부모 view 의 특정 비율 만큼 차지하는데, 부모 view 가 없어서 그런가?
       marginVertical:'70%',    // 80%로 하면 사라짐 왜지? -> flex 랑 관련있을 듯
    },
})

export default EmptyDogList;