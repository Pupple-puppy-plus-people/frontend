
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
//import * as RNFS from 'react-native-fs'
//import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';

const AdoptionStep = ({navigation})=>{
      
    return (
        <View style={styles.container}>
            <Text>
                헬로~~
            </Text>

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