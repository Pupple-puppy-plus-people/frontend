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

const TimestampPassComponent = ({onTime, onChangeDay}) => {
    const [time, setTime] = useState(7);
    const [checktDay, setCheckDay] = useState(7);

    const setChangeTime = (number) => {
        setTime(number);
        onTime(number);    // 자식에서 부모로 값 보냄(자식이 부모 값 바꿈)
    }
    const setChangeDay = (number) => {
        setCheckDay(number);
        onChangeDay(number);    // 자식에서 부모로 값 보냄(자식이 부모 값 바꿈)
    }
    return(
            <ScrollView>
                <Text style={styles.title}>시간 통과 기준</Text>
                <View style={[styles.conatiner_background,styles.textInformation_container]}>
                    <Text style={styles.subTitle}>몇 시간 마다 한번은 반려견과 함께여야하나요?</Text>
                    <View style={{
                        backgroundColor:'#e5f6d5',
                        borderRadius:15,
                        marginHorizontal:40,
                    }}>
                        <Picker
                        selectedValue={time} // 이거 없으면 고른 것이 돌아감
                        onValueChange={(itemValue, itemIndex) =>
                            setChangeTime(itemValue)
                        }>
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                            <Picker.Item label="6" value={6} />
                            <Picker.Item label="7" value={7} />
                            <Picker.Item label="8" value={8} />
                            <Picker.Item label="9" value={9} />
                            <Picker.Item label="10" value={10} />
                            <Picker.Item label="11" value={11} />
                            <Picker.Item label="12" value={12} />
                        </Picker>
                    </View>
                </View>
                <View style={[styles.conatiner_background,styles.textInformation_container]}>
                    <Text style={styles.subTitle}>일주일에 몇 번 할까요?</Text>
                    <View style={{
                        backgroundColor:'#daf6d5',
                        borderRadius:15,
                        marginHorizontal:40,
                    }}>
                        <Picker
                        selectedValue={checktDay} // 이거 없으면 고른 것이 돌아감
                        onValueChange={(itemValue, itemIndex) =>
                            setChangeDay(itemValue)
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
            </ScrollView>
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
        //marginLeft:30,
        marginBottom:20,
        alignSelf:'center',
        // backgroundColor:'magenta'
    },
    subTitle:{
        fontSize:27,
        marginTop:20,
        marginBottom:10,
        //alignSelf:'center',
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


export default TimestampPassComponent;