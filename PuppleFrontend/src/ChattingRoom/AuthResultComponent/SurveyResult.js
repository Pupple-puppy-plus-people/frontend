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
    Modal

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

const SurveyResult=(props)=> {
    // dog id 제대로 들어가는지 확인하기!!!!!!!!!!!!!!!!

    const [reason, setReason] = useState("")
    const [numfamily, setNumFamily] = useState(null)
    const [family, setFamily] = useState("")
    const [familyagreeCheckBox, setFamilyagreeCheckBox] = useState(false)
    const [growDogCheckBox, setGrowDogCheckBox] = useState(false)
    const [noiseIssue, setNoiseIssue] = useState("")
    const [moveIssue,setMoveIssue ] = useState("")
    const [emptyIssue,setEmptyIssue ] = useState("")
    const [familyIssue,setFamilyIssue ] = useState("")
    const [mainPerson, setMainPerson ] = useState("")
    const [vaccinCost, setVaccinCost ] = useState("")
    const [foodCost, setFoodCost ] = useState("")
    const [neuteringCheckBox, setNeuteringCheckBox] = useState(false)
    const [ownHouse, setOwnHouse] = useState(false)
    const [apart, setApart] = useState(false)
    const [villa, setVilla] = useState(false)
    const [houseForm,setHouseForm]=useState("")

    React.useEffect(()=>{
        console.log(props.userId,props.dogId)
        if(apart===true){
            setHouseForm("apart")
        } else if(villa===true){
            setHouseForm("villa")
        } else if(ownHouse===true){
            setHouseForm("ownHouse")
        }
        //sendData={user_id:props.userId, dog_id:props.dogId}
        sendData={user_id:props.userId, dog_id:props.dogId}

        axios.post(`${HS_API_END_POINT}/api/survey/survey/get`,sendData)
        .then((res)=>{
            if(res.data.response==="success"){
                console.log(res.data.house_form)
                setReason(res.data.reason)
                setNumFamily(res.data.num_family)
                setFamily(res.data.family)
                setFamilyagreeCheckBox(res.data.family_agree)
                setGrowDogCheckBox(res.data.experience)
                setHouseForm(res.data.house_form)
                setNoiseIssue(res.data.noise_issue)
                setMoveIssue(res.data.move_issue)
                setEmptyIssue(res.data.empty_issue)
                setFamilyIssue(res.data.family_issue)
                setNeuteringCheckBox(res.data.neutering)
                setMainPerson(res.data.main_person)
                setVaccinCost(res.data.vaccin_cost)
                setFoodCost(res.data.food_cost)
                if(res.data.house_form === "apart"){
                        setApart(true)
                }else if(res.data.house_form === "villa") {
                        setVilla(true)
                } else if (res.data.house_form === "ownHouse"){
                    setOwnHouse(true)
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{margin:9,flex:9,backgroundColor:'#E9E0FF',borderRadius:15}}>
                <View style={{margin:10,flex:9}}>
                    <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(3),marginBottom:5}}> 설문조사 결과에요. </Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>입양을 원하는 이유가 무엇인가요?</Text>
                    <Text
                    style={styles.questInput}
                    >{reason}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>총 가족은 몇명인가요?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            <Text
                            style={{textAlign:'right',flex:1,borderBottomColor:'black',borderBottomWidth:1,marginHorizontal:20}}
                    
                            >{numfamily}</Text>
                        </View>
                        <View style={{flex:1}}><Text style={styles.questText}>명</Text></View>
                    </View>
                    <Text style={{...styles.questText, marginTop:30}}>가족은 어떻게 구성되어있나요?</Text>
                    <Text
                    style={styles.questInput}
                    value={family}
                    >{family}</Text>
                    <Text style={{...styles.questText, marginTop:30}}>가족구성원 모두 입양에 동의하시나요?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={familyagreeCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!familyagreeCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>현재 또는 과거에 반려견을 키우신 적이 있나요?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={growDogCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={!growDogCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>주거형태는 어떻게 되나요??</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={ownHouse}
                                />
                            </View>
                            <View style={{flex:2,justifyContent:'center'}}><Text style={{...styles.questText}}>단독주택</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={villa}
                                />
                            </View>
                            <View style={{flex:2,justifyContent:'center'}}><Text style={{...styles.questText}}>빌라</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true}
                                value={apart}
                                />
                            </View>
                            <View style={{flex:2,justifyContent:'center'}}><Text style={{...styles.questText}}>아파트</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>소음이나 위생 등으로 인한 이웃과의 마찰로 입양동물의 양육이 불가능해질 경우 어떻게 하실건가요?</Text>
                    <Text 
                    style={styles.questInput}
                    
                    >{noiseIssue}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>이사 또는 해외로 이주시 반려동물의 거취문제는 어떻게 해결하실건가요?</Text>
                    <Text
                    style={styles.questInput}
                    
                    >{moveIssue}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>집에 사람이 없는 때에 개는 어디서 지내게 되나요?</Text>
                    <Text
                    style={styles.questInput}
                    
                    >{emptyIssue}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>결혼,임신,출산 등 가족의 변화가 있는 경우 반려동물의 거취문제는 어떻게 해결하실건가요?</Text>
                    <Text
                    style={styles.questInput}
                    
                    >{familyIssue}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>반려견 중성화를 원하십니까?</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox disabled={true}
                                value={neuteringCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>네</Text></View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <CheckBox 
                                disabled={true    }
                                value={!neuteringCheckBox}
                                />
                            </View>
                            <View style={{flex:3,justifyContent:'center'}}><Text style={{...styles.questText}}>아니요</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>개를 주로 담당하게 될 사람은 누구인가요?</Text>
                    <Text 
                    style={{flex:1,borderBottomColor:'black',borderBottomWidth:1,marginTop:15,fontSize:15}}
                    
                    >{mainPerson}</Text>
                </View>
                <View style={styles.questBox}>
                    <Text style={styles.questText}>대략 어느정도의 비용이 들어갈지 예상되는 비용을 기입해주세요.</Text>
                    <Text style={styles.questText}>1. 1년 동안의 예방접종 비용</Text>
                    <Text 
                    style={styles.questInput}
                    
                    >{vaccinCost}</Text>
                    <Text style={{...styles.questText,marginTop:20}}>2. 1개월 동안의 사료 및 양육비용</Text>
                    <Text 
                    style={styles.questInput}
                    
                    >{foodCost}</Text>
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

export default SurveyResult;
