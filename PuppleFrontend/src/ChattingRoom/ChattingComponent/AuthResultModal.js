
import React, {Component, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView, 
  Alert,
  Modal,
  Pressable,
  Platform,
  FlatList,


} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Chip } from 'react-native-paper';
import { HS_API_END_POINT } from '../../Shared/env';
import WeekComponent from '../../Template/Recycle/WeekComponent';
import AgreementResult from '../AuthResultComponent/AgreementResult';
import SurveyResult from '../AuthResultComponent/SurveyResult';
import TimestampResult from '../AuthResultComponent/TimestampResult';
import WalkResult from '../AuthResultComponent/WalkResult';
import HousePhotoResult from '../AuthResultComponent/HousePhotoResult';



// Modal 부분 (필요하면 쓰세여)
const AuthResultModal = (props) => {
    // { title : '설문지', bool : true},
    //     { title : '동의서', bool : true},
    //     { title : '산책량 측정', bool : true},
    //     { title : '생활패턴 검증', bool : true},
    //     { title : '집 바닥재질 평가', bool : true},
    //     { title : '반려견 생활환경 평가', bool : true},
    

    return(
        <View style={{flex:1}}>
            {props.selectedTitle==='설문지' && <SurveyResult dogId={props.dogID} userId={props.customerID}/>}
            {props.selectedTitle==='동의서' && <AgreementResult dogId={props.dogID} userId={props.customerID}/>}
            {props.selectedTitle==='산책량 측정' && <WalkResult dogId={props.dogID} userId={props.customerID}/>}
            {props.selectedTitle==='생활패턴 검증' && <TimestampResult  dogId={props.dogID} userId={props.customerID}/>}
            {props.selectedTitle==='집 바닥재질 평가' && <Text style={{fontSize:50}}>5555555555</Text>}
            {props.selectedTitle==='반려견 생활환경 평가' && <HousePhotoResult dogId={props.dogID} userId={props.customerID}/>}
        </View>
    );
}

export default AuthResultModal