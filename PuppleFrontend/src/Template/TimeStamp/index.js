import React ,{Component, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import TimeStampComponent from './TimeStampComponent/TimeStampHome';
// import TimeStampSet from '../TimeStampPassCondition/TimeStampPassComponent/TimeStampConditioin';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import {Picker} from '@react-native-picker/picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationHelpersContext } from '@react-navigation/native';


/************************* 부가 설명 : 채팅에서 필요 없을 부분****************************************** */
const SetStartTime = ({onStartTime}) => {

    const [time, setTime] = useState(6);
    const [modalVisible, setModalVisible] = useState(true);

    const setChangeTime = (number) => {
        setTime(number);
    }

    return(
            <Modal  animationType="fade" // 임시 코드
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                <View // 모달 dispaly의 뒷배경 눌러도 버튼 취소 효과
                    style={[styles.iOSBackdrop, styles.backdrop]} onPress={() => setModalVisible(false)} />

                <View styles={styles.menu}>
                    <View style={styles.modalView}>
                    <View style={[styles.conatiner_background,styles.textInformation_container]}>
                     <Text style={styles.title}>시작 시간 초기화</Text>
                        <Text style={styles.subTitle}>하루를 시작하는 시간을 말해주세요. 초기 설정한 시작 시간부터 하루씩 12시간 동안만 유효한 검사입니다:{')'}</Text>
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
                                <Picker.Item label="01:00" value={1} />
                                <Picker.Item label="02:00" value={2} />
                                <Picker.Item label="03:00" value={3} />
                                <Picker.Item label="04:00" value={4} />
                                <Picker.Item label="05:00" value={5} />
                                <Picker.Item label="06:00" value={6} />
                                <Picker.Item label="07:00" value={7} />
                                <Picker.Item label="08:00" value={8} />
                                <Picker.Item label="09:00" value={9} />
                                <Picker.Item label="10:00" value={10} />
                                <Picker.Item label="11:00" value={11} />
                                <Picker.Item label="12:0" value={12} />
                            </Picker>
                        </View>

                        <View style={{margin:"2%"}}></View> 
                        <View>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                underlayColor="#DDDDDD" 
                                onPress={() => {
                                    setModalVisible(false);
                                    onStartTime(time);
                                }}
                                style={[styles.closeButton, {backgroundColor:'purple'}]}
                                >
                                <Text style={[styles.subTitle, {color:'white'}]}>완료</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                    </View>

                    
                </View>
        </Modal>
    );
}



class TimeStamp extends Component{
    constructor(props){
        super(props);
        this.state = { 
            start_time : this.props.startTime,
            dog_id: this.props.dog_id,
            ts_check_time: this.props.ts_check_time,
            ts_total_count: this.props.ts_total_count,
            start_day : this.props.startDay,
        };

      
    }
    
    /************************* 부가 설명 : 채팅에서 필요 없을 부분****************************************** */
    setInitStartTime= async(number) =>{
        this.start_time = number;
        console.log(this.start_time, this.props.dog_id);
        axios.post(`${HS_API_END_POINT}/api/timestamp/add/`,{
            user: USER_INFO.USER_ID,
            dog: this.props.dog_id,
            day: -1,
            start_time: number, // 6으로 올리고, 받아서 계산할 때는 그날의 6시로 Date().getTime 형식으로 바꾸기 
            press_time: new Date().getTime(), // 1/1000초 
            evaluate: true,
            }) 
            .then((res)=> {     
                this.props.setStartTime(number)
                console.log("SET TIMESTAMP START TIME", res); // 왜 timeList에 안들어가지 
                navigation.navigate('EnrollPage')
            })
            .catch((err)=> {
                console.log(err);
            })
    }
   
    
    render(){

{/************************* 부가 설명 : 채팅에서 필요 없을 부분****************************************** */}
        // 다음 5줄은 채팅에서는 필요없는 코드
        let initMenu;
        console.log("끝", this.state.start_time)
        {this.state.start_time===0
        ? initMenu = <SetStartTime onStartTime={this.setInitStartTime}/> // 시작 시간 설정하기 
        : initMenu = null}

        return(
            
            <View style={styles.container}>

{/************************* 부가 설명 : 채팅에서 필요 없을 부분****************************************** */}
                {initMenu /**<- 채팅에서는 필요 없는 코드 */}  
{/************************************************************************************************ */}

                <TimeStampComponent
                    parentState={this.state}
                />               
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        position: 'absolute',
        top:35,
        left:10,
        right:10,
        bottom:0,
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

export default TimeStamp;