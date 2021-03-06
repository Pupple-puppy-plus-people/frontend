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

const AgreementResult = (props) =>{
    
    const [personalInfo, setPersonalInfo] = useState(false)
    const [location, setLocation] = useState(false)
    const [dogEntrance, setdogEntrance] = useState(false)
    const [other, setOther] = useState(false)
    const [accept, setAccept] = useState(false)
    const [moreInfo, setMoreInfo] = useState(false)
    React.useEffect(()=>{
        sendData={user_id:props.userId, dog_id:props.dogId}
        // sendData={user_id:2, dog_id:1}
        
        axios.post(`${HS_API_END_POINT}/api/survey/agreement/get`,{user_id:props.userId, dog_id:props.dogId})
        .then((res)=>{
            if(res.data.response==="success"){
                // console.log(res.data)
                setPersonalInfo(res.data.person_info)
                setLocation(res.data.location_info)
                setdogEntrance(res.data.dog_entrance)
                setOther(res.data.chit_penalty)
                setAccept(res.data.cannot_adopt)
                setMoreInfo(res.data.more_info)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{margin:9,flex:9,backgroundColor:'#E9E0FF',borderRadius:15}}>
                <View style={{margin:10,flex:9}}>
                    <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(3),marginBottom:5}}> ????????? ?????? ????????????</Text>
                    <View>

                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>???????????? ?????? ??? ????????? ????????? ???????????????????</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={personalInfo}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!personalInfo}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>?????? ??? ??????????????? ????????? ?????? ????????????????????? ???????????????????</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={location}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!location}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>????????? ?????? ?????? ????????? ????????? ????????? ?????? ???????????????????</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={dogEntrance}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!dogEntrance}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>????????? ?????? ?????? ????????? ????????? ?????? ??????????????? ?????? ????????????, ????????? ?????? ???????????? ?????? ?????? ???????????????????</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={other}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!other}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>?????? ???????????? ????????? ??????????????? ?????? ????????? ????????? ????????? ?????? ??????????????? ?????????????????? ?????? ???????????????????</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={accept}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!accept}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>?????? ????????? ????????? ?????? ????????? ??????????????? ?????? ???????????? ????????? ????????? ??? ????????????.</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={moreInfo}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>???</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!moreInfo}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>?????????</Text></View>
                        </View>
                    </View>
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

export default AgreementResult;