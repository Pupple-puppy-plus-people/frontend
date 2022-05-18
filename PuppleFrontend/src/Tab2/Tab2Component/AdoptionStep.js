
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Walk from '../../Template/Walk/';
//import * as RNFS from 'react-native-fs'
//import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';

const AdoptionStep = ({navigation,aboutDog})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    return (
        <View style={styles.container}>
            <View style={{marginVertical:20}}>
            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>{
                setModalVisible(!modalVisible)
            }}>
                <View
                style={{flexDirection:'column',flex:1}}>
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
                    <Walk/>
                </View>
            </Modal>
            <Pressable
            onPress={()=>{setModalVisible(true)}}
            style={{
                borderColor:'purple',
                borderWidth:3,
                borderRadius:40,
                marginHorizontal:60}}>
                <Text
                style={{fontSize:25,textAlign:'center'}}>Walk</Text>
            </Pressable>
            </View>
            <View>
            <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible2}
            onRequestClose={()=>{
                setModalVisible2(!modalVisible2)
            }}>
                <View
                style={{flexDirection:'column',flex:1}}>
                    <Pressable
                    style={{marginTop:40,
                        marginBottom:40,
                        zIndex:1,}}
                    onPress={()=>{
                        setModalVisible2(!modalVisible2)
                    }}>
                        <Text
                        style={{fontSize:20,color:'#006ef9'}}>{'←'}돌아가기2</Text>
                    </Pressable>
                    <Walk/>
                </View>
            </Modal>
            <Pressable
            onPress={()=>{setModalVisible2(true)}}
            style={{
                borderColor:'purple',
                borderWidth:3,
                borderRadius:40,
                marginHorizontal:60}}>
                <Text
                style={{fontSize:25,textAlign:'center'}}>Other Auth</Text>
            </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    bookBox: {
        margin:'5%',
        alignItems:'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
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
    removeButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'red',
      position: 'absolute',
      alignSelf: 'flex-end',
      marginTop: 5,
      zIndex: 10
    },
    button: {
        marginHorizontal:5,
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#9C27B0",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },

})

export default AdoptionStep;