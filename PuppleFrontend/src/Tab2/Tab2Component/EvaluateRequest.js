import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    FlatList,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';

// temp data
let temp_image = [
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
]

export default function EvaluateRequest({
    modalVisible,
    setModalVisible,
    requestItem,
    allRequest,
    setAllRequest}) {
    const renderImage = ({item}) =>(
        <View
        style={{alignSelf:'center',marginVertical:10,borderColor:'black',borderWidth:3}}>
            <Image style={{width:responsiveScreenWidth(70),height:responsiveScreenWidth(40)}} 
                    source={{uri:`data:image/jpeg;base64,${item}`}}/>
        </View>
    )
    function removeElement(){
        let newRequest=[]
        for(var i=0;i<allRequest.length; i++){
            if (allRequest[i] !== requestItem){
                newRequest.push(allRequest[i])
            }
        }
        console.log(newRequest.length)
        return newRequest
    }
    const getFooter = ()=>{
        return(
            <View 
            style={{
                flexDirection:'row',
                justifyContent:'space-evenly'}}>
                <TouchableOpacity
                style={{backgroundColor:'#c452d1',borderRadius:30,paddingVertical:10,paddingHorizontal:20}}
                onPress={()=>{
                    setAllRequest(allRequest=>(removeElement()))
                    // fail axios
                    axios.post(`${HS_API_END_POINT}/api/housephoto/update/pass/`,{"user_id":USER_INFO.USER_ID,"dog_id":item.id,"pass":false})
                    .then(function(res){
                        
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                    setModalVisible(!modalVisible)
                }}>
                    <Text style={{color:'#eae8eb',fontSize:35}}>Fail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{backgroundColor:'#c452d1',borderRadius:30,paddingVertical:10,paddingHorizontal:20}}
                onPress={()=>{
                    setAllRequest(allRequest=>(removeElement()))
                    // pass axios
                    axios.post(`${HS_API_END_POINT}/api/housephoto/update/pass/`,{"user_id":USER_INFO.USER_ID,"dog_id":item.id,"pass":true})
                    .then(function(res){
                        
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                    setModalVisible(!modalVisible)
                }}>
                    <Text style={{color:'#eae8eb',fontSize:35}}>Pass</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <View>
            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>{
                setModalVisible(!modalVisible)
            }}>
                <Pressable
                    style={{marginTop:40,
                        marginBottom:40,
                        zIndex:1,}}
                    onPress={()=>{
                        setModalVisible(!modalVisible)
                    }}>
                        <Text
                        style={{fontSize:20,color:'#006ef9'}}>{'←'}돌아가기</Text>
                </Pressable>
                <View
                style={styles.headerContainer}>
                    <Text
                    style={styles.title}>이 사람의 공간이</Text>
                    <Text
                    style={styles.title}>충분할까요?</Text>
                </View>
                <FlatList
                    data={requestItem?.photo.split(',')}
                    renderItem={renderImage}
                    listKey={new Date().getTime().toString()}
                    ListFooterComponent={getFooter}
                />
                
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        marginHorizontal:responsiveScreenWidth(10),
        marginBottom:responsiveScreenHeight(2),
        backgroundColor:'#E1BEE7',borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding:responsiveScreenWidth(3),
    },
    title:{
        fontWeight:'500',
        textAlign:'center',
        fontSize:30,
    },
})