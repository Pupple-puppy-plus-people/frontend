import axios from 'axios';
import React ,{useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert, // 디버깅 용으로 잠깐 추가
    
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { HS_API_END_POINT } from '../../../Shared/env';

const WalkPassComponent = ({setAllData}) => {
    const [walkDay, setWalkDay] = useState(7);
    const [walkTime, setWalkTime] = useState(30);
    const [walkDistance, setWalkDistance] = useState(2500)
    const putTest=()=>{
        console.log('putTest')
        axios.patch(HS_API_END_POINT+'/api/passcondition/13',{
            walk_total_count : walkDay,
            min_per_walk : walkTime,
            meter_per_walk : walkDistance
        })
        .then(function (response){
            console.log(response.status);
        })
        .then(function (error){
            console.log(error);
        });
    }
    return(
        <SafeAreaView style={[]}>
            <ScrollView>
            <Text style={styles.title}>산책 통과 기준</Text>
            <View style={[styles.conatiner_background,styles.textInformation_container]}>
                <Text style={styles.subTitle}>일주일에 몇 번 할까요?</Text>
                <View style={{
                    backgroundColor:'#e5f6d5',
                    borderRadius:15,
                    marginHorizontal:40,
                }}>
                    <Picker
                    selectedValue={walkDay}
                    onValueChange={(itemValue, itemIndex) =>
                        setWalkDay(itemValue)
                    }>
                        <Picker.Item label="1" value={1} />
                        <Picker.Item label="2" value={2} />
                        <Picker.Item label="3" value={3} />
                        <Picker.Item label="4" value={4} />
                        <Picker.Item label="5" value={5} />
                        <Picker.Item label="6" value={6} />
                        <Picker.Item label="7" value={7} />
                    </Picker>
                </View>
            </View>
            <View style={[styles.conatiner_background,styles.textInformation_container]}>
                <Text style={styles.subTitle}>한 번에 몇 분 할까요?</Text>
                <View style={{
                    backgroundColor:'#daf6d5',
                    borderRadius:15,
                    marginHorizontal:40
                }}>
                    <Picker
                    selectedValue={walkTime}
                    onValueChange={(itemValue, itemIndex) =>
                        setWalkTime(itemValue)
                    }>
                        <Picker.Item label="30분 이상" value={30} />
                        <Picker.Item label="40분 이상" value={40} />
                        <Picker.Item label="50분 이상" value={50} />
                        <Picker.Item label="60분 이상" value={60} />
                    </Picker>
                </View>
            </View>
            <View style={[styles.conatiner_background,styles.textInformation_container]}>
                <Text style={styles.subTitle}>한 번에 몇 m 할까요?</Text>
                <View style={{
                    backgroundColor:'#cef6d5',
                    borderRadius:15,
                    marginHorizontal:40,
                }}>
                    <Picker
                    selectedValue={walkDistance}
                    onValueChange={(itemValue, itemIndex) =>
                        setWalkDistance(itemValue)
                    }>
                        <Picker.Item label="2000m 이상" value={2000} />
                        <Picker.Item label="2500m 이상" value={2500} />
                        <Picker.Item label="3000m 이상" value={3000} />
                        <Picker.Item label="4000m 이상" value={4000} />
                    </Picker>
                </View>
                <Pressable 
                style={[]}
                onPress={()=>{
                    // setAllData(walkDay,walkTime,walkDistance)
                    Alert.alert( // 디버깅 용으로 잠깐 추가
                        "입력완료!"
                    );
                    setAllData(walkDay,walkTime,walkDistance)
                    }}>
                    <Text style={{ fontSize: 30 ,paddingVertical:10}}>asdf</Text>
                </Pressable>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conatiner_background:{
        backgroundColor: "#eedbff",
        borderRadius:15,
    },
    title:{
        textAlign:'left',
        fontSize:35,
        fontWeight:'bold',
        marginTop:10,
        marginLeft:30,
        marginBottom:20,
        // backgroundColor:'magenta'
    },
    subTitle:{
        fontSize:27,
        marginTop:20,
        marginBottom:10,
    },
    textInformation_container:{
        marginBottom:15,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
    },
    PickerContainer:{
        
    },
})


export default WalkPassComponent;