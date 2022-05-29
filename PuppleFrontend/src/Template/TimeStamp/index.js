import React ,{Component, useState} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import TimeStampComponent from './TimeStampComponent/TimeStampHome';
// import TimeStampSet from '../TimeStampPassCondition/TimeStampPassComponent/TimeStampConditioin';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import {Picker} from '@react-native-picker/picker';


const SetStartTime = ({onStartTime}) => {

    const [time, setTime] = useState(6);

    const setChangeTime = (number) => {
        setTime(number);
        onStartTime(number);    // 자식에서 부모로 값 보냄(자식이 부모 값 바꿈)
    }

    return(

        <View style={[styles.conatiner_background,styles.textInformation_container]}>
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
        
    );
}


class TimeStamp extends Component{
    constructor(props){
        super(props);
        this.state = { 
            timelist : [],
            start_time : 0,
            dogID: this.props.dog_id,
        };
    }
    getlist= async() => {

        await axios.get(`${HS_API_END_POINT}/api/timestamp/get/?user=${USER_INFO.USER_ID}&dog=${this.props.dog_id}&day=${-1}`) 
        .then((res)=> {      
            this.timelist = res.data[0]
            if(Object.keys(this.state.timelist).length!=0){
                start_time = this.timelist.start_time
            }
            console.log("TimeStamp start time", res.data, typeof(this.timelist), this.dogID); // 왜 timeList에 안들어가지 
        })
        .catch((err)=> {
            console.log(err);
        })
    };
    
    setInitStartTime= async(number) =>{
        this.start_time = number;
        console.log(this.start_time, this.props.dog_id);
        axios.post(`${HS_API_END_POINT}/api/timestamp/add/`,{
            "user": USER_INFO.USER_ID,
            "dog": this.props.dog_id,
            "day": -1,
            "start_time": number,
            }) 
            .then((res)=> {      
                console.log("SET TIMESTAMP START TIME", res); // 왜 timeList에 안들어가지 
            })
            .catch((err)=> {
                console.log(err);
            })
    }
    componentDidMount() {
        this.getlist();  // loadItem 호출
    }
    render(){
        return(
            <View style={styles.container}>

                {Object.keys(this.state.timelist).length==0
                ?<SetStartTime onStartTime={this.setInitStartTime}/>// 시작 시간 설정하기 
                : null}
                <TimeStampComponent
                dog_id={this.props.dog_id}
                ts_check_time={this.props.ts_check_time}
                ts_total_count={this.props.ts_total_count}
                />
               
                {/*<TimeStampSet/>*/}
            </View>
            // 화면 반응성(spring) && 돌아가기 추가
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
    }
});

export default TimeStamp;