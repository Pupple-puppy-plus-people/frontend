import React, {Component, useCallback,useState,useEffect} from 'react';
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
    Modal,
    Alert

} from 'react-native';
import RNCamera from 'react-native-camera'
import CheckBox from '@react-native-community/checkbox';
import { CameraScreen } from 'react-native-camera-kit';
import { Camera, CameraType } from 'react-native-camera-kit';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import { TextInput } from 'react-native-gesture-handler';

const Agreement=(props)=> {

    const [personalInfo, setPersonalInfo] = useState(false)
    const [location, setLocation] = useState(false)
    const [dogEntrance, setdogEntrance] = useState(false)
    const [other, setOther] = useState(false)
    const [accept, setAccept] = useState(false)
    const [moreInfo, setMoreInfo] = useState(false)

    const sendAgreement = () => {
        // route.params.dog_id = 1;
        sendData = {
            user_id:USER_INFO.USER_ID, 
            dog_id:props.dog_id, 
            person_info:personalInfo, 
            location_info:location, 
            chit_penalty:other, 
            cannot_adopt:accept,
            dog_entrance:dogEntrance,
            more_info:moreInfo
        }
        axios.post(`${HS_API_END_POINT}/api/survey/agreement/update`,sendData)
        .then(function(res){
            if(res.data.response==="success"){
                Alert.alert("응답이 전송되었습니다!");
                props.setModalVisible(false)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{margin:9,flex:9,backgroundColor:'#E9E0FF',borderRadius:15}}>
                <View style={{margin:10,flex:9}}>
                    <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(3),marginBottom:5}}> 인증을 진행하기 전 동의서입니다.</Text>
                    <Text style={{fontSize:responsiveScreenFontSize(2),fontWeight:'bold'}}> *동의하지 않아도 지속적으로 인증을 진행할 수는 있지만, 추후 진행과정에서 불이익이 있을 수 있어요. </Text>
                    <View>

                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>개인정보 수집 및 이용에 대해서 동의하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={personalInfo}
                                onValueChange={(newValue) => {
                                    setPersonalInfo(!personalInfo);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!personalInfo}
                                onValueChange={(newValue) => {
                                    setPersonalInfo(!personalInfo);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>산책 및 타임스탬프 검증을 위한 위치정보이용에 동의하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={location}
                                onValueChange={(newValue) => {
                                    setLocation(!location);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!location}
                                onValueChange={(newValue) => {
                                    setLocation(!location);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>입양을 마친 이후 반드시 동물을 등록할 것에 동의하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={dogEntrance}
                                onValueChange={(newValue) => {
                                    setdogEntrance(!dogEntrance);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!dogEntrance}
                                onValueChange={(newValue) => {
                                    setdogEntrance(!dogEntrance);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>본인이 아닌 다른 사람이 입양을 위한 인증절차를 대신 진행하고, 적발될 경우 불이익을 받는 것에 동의하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={other}
                                onValueChange={(newValue) => {
                                    setOther(!other);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!other}
                                onValueChange={(newValue) => {
                                    setOther(!other);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>모든 입양인증 절차를 수행하여도 입양 보내는 사람의 선택에 의해 입양여부가 최종결정되는 것에 동의하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={accept}
                                onValueChange={(newValue) => {
                                    setAccept(!accept);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!accept}
                                onValueChange={(newValue) => {
                                    setAccept(!accept);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>입양 보내는 사람이 추후 앱내의 채팅기능을 통해 추가적인 정보를 요구할 수 있습니다.</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={false}
                                value={moreInfo}
                                onValueChange={(newValue) => {
                                    setMoreInfo(!moreInfo);
                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={false}
                                value={!moreInfo}
                                onValueChange={(newValue) => {
                                    setMoreInfo(!moreInfo);

                                    }}/>
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={{alignContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    style={{width:responsiveScreenWidth(80),height:responsiveScreenHeight(5),borderRadius:15,justifyContent:'center',backgroundColor:'purple',margin:30}}
                    onPress={sendAgreement}
                    >
                        <Text style={{fontSize:responsiveScreenFontSize(3),color:'white',fontWeight:'bold',textAlign:'center'}}>제출할게요!</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    questBox : {
        margin:9,
        flex:1,
        backgroundColor:'white',
        borderRadius:15,
        padding:10
    },
    questText: {
        fontSize:responsiveScreenFontSize(2),
        fontWeight:'bold',
        marginBottom:5
    },
    questInput: {
        borderColor:'black',
        borderWidth:1,
        height:100,
        borderRadius:15, 
        padding:10, 
        fontSize:15
    },


})

export default Agreement;
