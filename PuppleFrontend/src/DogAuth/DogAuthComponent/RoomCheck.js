
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
    Modal

} from 'react-native';
//import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
// import DogDetail from './DogDetail';
import { useCameraFormat, Camera, useCameraDevices } from 'react-native-vision-camera';
import axios from 'axios';
import { HS_API_END_POINT } from '../../Shared/env';


const CameraView = ()=>{
    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    return (
        <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        />
    )
}
const RoomCheck = ({item,id}) => {
    const [isHeart, setIsHeart] = useState(false);
    const [camera, setCamera] = useState(false);
    
    renderCamera = () => {
        
            <CameraView/>
        
    }
    PressHeart =() => setIsHeart(!isHeart);
    // {
    //     // 하트누른 데이터베이스가 있다면, 속성으로는 사용자 아이디, 강아지아이디
    //     // insert item.id, user.id
    // }
    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    // const newCameraPermission = await Camera.requestCameraPermission()
    // const newMicrophonePermission = await Camera.requestMicrophonePermission()
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{margin:9,flex:9,backgroundColor:'white',borderRadius:15}}>
                <View style={{margin:10}}>
                    <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(3)}}> 방 크기 측정 </Text>
                    <Text style={{fontSize:responsiveScreenFontSize(2),fontWeight:'bold'}}> 방 사진을 모두 찍어서 업로드해주세요!</Text>

                </View>
                <View style={{margin:9,flex:3,backgroundColor:'#E9E0FF',borderRadius:15,padding:10}}>
                    {/*    
                    *
                    *
                    *                  
                    여기에 찍은 사진을 렌더링 해서 보여준다.
                    * 
                    */}
                    
                    <TouchableOpacity 
                    style={{margin:10,width:responsiveWidth(20),height:responsiveWidth(20),backgroundColor:'#EBEBEB',borderColor:'black',borderWidth:2,borderStyle:'dashed',justifyContent:'center'}}
                    onPress={renderCamera}
                    >
                        <Icon name="camera" size={responsiveWidth(7)} color="black" style={{alignSelf:'center',justifyContent:'center'}}/>
                    </TouchableOpacity>
                    <View style={{borderBottomColor:'black',borderBottomWidth:2}}></View>
                    
                </View>
                {/* <View style={{flex:1}}>

                </View> */}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    textList:{
        fontSize:responsiveScreenFontSize(2.5),
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

export default RoomCheck;