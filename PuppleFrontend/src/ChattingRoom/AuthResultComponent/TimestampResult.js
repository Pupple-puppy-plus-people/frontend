import React ,{Component, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import TimeStampRes from './TimestampRes';
// import TimeStampSet from '../TimeStampPassCondition/TimeStampPassComponent/TimeStampConditioin';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import {Picker} from '@react-native-picker/picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';





class TimestampResult extends Component{
    constructor(props){
        super(props);
        this.state = { 
            start_time : this.props.startTime,
            dog_id: this.props.dog_id,
            // ts_check_time: this.props.ts_check_time,
            // ts_total_count: this.props.ts_total_count,
        };

      
    }
   
    
    render(){


        return(
            
            <View style={styles.container}>

                <TimeStampRes
                    parentState={this.state}
                />               
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#E9E0FF',
        borderRadius:15,
    },textInformation_container:{
        marginBottom:responsiveHeight(2),
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
    },title:{
        textAlign:'left',
        fontSize:responsiveFontSize(3),
        marginTop:responsiveHeight(1),
        fontWeight:'bold',
        alignSelf:'center',
    },subTitle:{
        fontSize:responsiveFontSize(2.5),
        marginTop:responsiveHeight(1),
        marginBottom:10,
        alignSelf:'center',
    },modalView: {
        justifyContent:'center',
        width:responsiveWidth(90),
        height:responsiveHeight(100),
        alignSelf:'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },menu: {
        justifyContent: 'center',
        alignItems: 'center',
    },iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.5
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },conatiner_background:{
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        backgroundColor: "#eedbff",
        borderRadius:15,
    },
    closeButton: {
        alignSelf:'center',
        borderRadius:15,
        width:responsiveWidth(50),   

    }, 
});

export default TimestampResult;