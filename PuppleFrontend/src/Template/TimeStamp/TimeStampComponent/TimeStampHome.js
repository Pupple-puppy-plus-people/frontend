import axios from 'axios';
import React ,{Component, useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    PanResponder,
    Pressable,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

import WeekComponent from '../../Recycle/WeekComponent';
import { HS_API_END_POINT, USER_INFO } from '../../../Shared/env';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

class SummaryList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.summary_row}>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'}   size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'}   size={25}/>
                <MaterialCommunityIcons name="progress-question"    color={'#eedbff'} size={25}/>
                <MaterialCommunityIcons name="close-circle-outline" color={'red'}     size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'}   size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'}   size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'}   size={25}/>
            </View>
        );
    }
}

class SummaryList2 extends Component{
    constructor(props){
        super(props);
        this.state={
            dayIndex : 0
        }
    }
    setDayIndex(newIndex) {
        this.setState({dayIndex:newIndex})    
    }
    render(){
        let day_index = 0;
        // const [dayIndex, setDayIndex] = useState(0);
        const day_num = [0,1,2,3,4,5,6];
        const dayEval = day_num.map((oneday)=>
            <MaterialCommunityIcons 
            key={oneday}
            name={myData[oneday].day == oneday ?
                (myData[oneday].evaluate?"check-circle-outline":"close-circle-outline")
            :   ("progress-question")}
            color={myData[oneday].day == oneday ?
                (myData[oneday].evaluate?'green':'red')
            :   ("purple")}
            size={25}/>
        );

        const timeEval = day_num.map((oneday)=>
            <View>
                <Text>{day_index}</Text>
                {
                    myData[day_index].day == oneday&&
                    myData[oneday].elapsed_time>=pass_condition.min_per_walk&&
                    <MaterialCommunityIcons
                    key={'time'+oneday}
                    name='check-circle-outline'
                    color={'green'}
                    size={25}/>
                }
                {
                    myData[day_index].day == oneday&&
                    myData[oneday].elapsed_time<pass_condition.min_per_walk&&
                    <MaterialCommunityIcons
                    key={'time'+oneday}
                    name='close-circle-outline'
                    color={'red'}
                    size={25}/>
                }
                {/* {myData[day_index].day == oneday && this.setDayIndex(this.state.dayIndex+1)} */}
            </View>    
        );
        const distanceEval = day_num.map((oneday)=>
            <View>
                {myData[oneday].distance>=pass_condition.meter_per_walk&&
                    <MaterialCommunityIcons
                    key={'distance'+oneday}
                    name='check-circle-outline'
                    color={'green'}
                    size={25}/>
                }
                {myData[oneday].distance<pass_condition.meter_per_walk&&
                    <MaterialCommunityIcons
                    key={'distance'+oneday}
                    name='close-circle-outline'
                    color={'red'}
                    size={25}/>
                }
            </View>
        );
        // #eedbff background color
        return(
            <View style={styles.summary_row}>
                {this.props.evalType==='time'&&timeEval}
                {this.props.evalType==='distance'&&distanceEval}
            </View>
        );
    }
}
// FlatList 시작
// list에 반복적으로 보여질 item
const Info_Item = ({dataInfo}) => (
    <View style={styles.dataInfoStyle}>
        <Text
        style={styles.body}>
            {dataInfo.dataName}
        </Text>
        <Text 
        style={[styles.body,styles.body_data]}>
            {dataInfo.data}
        </Text>
        <Text // 빈공간
        style={styles.body}> 
        </Text>
    </View>
);
// FlatList를 담은 const & 그 안에 반복될 item을 render할 const 포함
const Information = ({informationName,showData}) => {
    const renderData = ({item}) =>(
       <Info_Item dataInfo={item}/>
    );
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => false
    });
    return(
        <View style={[styles.textInformation_container,styles.container_background]}>
            <Text
            style={styles.subTitle}>
                {informationName}
            </Text>
            <FlatList
                data={showData}
                renderItem={renderData}
                listKey={new Date().getTime().toString()}
            />
        </View>
    );
}

const Item = ({ item }) => (
    <View style={{flexDirection:'row', alignItems:'center'}}>
        <View style={{flex:1}}>
            <Text style={[styles.body,{flex:1}]}>{item.id}</Text>
        </View>
        <View style={{flex:4}}>
            <Text style={[styles.body,{flex:2}]}>{item.press_time}</Text> 
        </View>
    </View>

);
// // document.writeln(curr);
const TimeStamp = ({info, getlist}) => {
    const isFocused = useIsFocused();

    const [timer, setTimer] = useState(0)
    const [prevTimer, setPrevTimer] = useState(0)   // 서버에서 받아온 것 중 가장 마지막  -> 누른 시각에 뜨기도 함
    const [isActive, setIsActive] = useState(false)
    const [timelist, setTimeList] = useState([{}])
    const today = new Date().getDay();


    React.useEffect(()=> {
        console.log("parentState", info)
        // 오늘 요일에 해당하는 누른 시간 가져옴
        axios.get(`${HS_API_END_POINT}/api/timestamp/get/?user=${USER_INFO.USER_ID}&dog=${info.parentState.dog_id}&day=${Number(today)}`) 
        .then((res)=> { 

            list = []
            
            //getlist(res.data)
            if(res.data.length==0){
                console.log("NO DATA")
            }else{
                info.prev_timelist = res.data[res.data.length-1] // 마지막 리스트
                console.log("-=====>", info.prev_timelist)
                getlist(res.data[res.data.length-1])
            }

            for(idx in res.data){
                copy = JSON.parse(JSON.stringify(res.data[idx])) //deepcopy
                copy.press_time=convertTimeFormat(copy.press_time)
                copy.id = Number(idx)+Number(1)
                list.push(copy)
            }
            setTimeList(list);
            console.log("1TimeStamp Data 받음."); 
        })
        .catch((err)=> {
            console.log(err);
        })
    }, [isFocused]); 


    function postserver(time){
        console.log("time:", time, info)

        dogID = info.parentState.dog_id // 개 아이디 
        start_time = info.parentState.start_time // 사용자 설정 시작 시간
        prev_start_time = start_time // 마직막에 누른 시간의 시작 시간
        ts_check_time = info.parentState.ts_check_time // 공백 시간

        var compare= new Date();

        data = { 
            user: USER_INFO.USER_ID,
            dog: dogID,
            day: today,
            press_time: time.getTime().toString(), // 1/1000초의 string
        }

        // 초 단위로 비교
        if(info.prev_timelist.length==0){ // 이전에 누른 시간이 없을 때 
            compare.setHours(start_time, 0, 0, 0); // 시작 시간으로 
            console.log("===didi==>", Math.floor(time - compare)/1000, time, compare)
            if(Math.floor(time - compare)/1000 < 0 ){
                // 시작 시간 이전에 누른 경우
                Alert.alert("시작 시간이 전이에요:)");
                return 0;
            }
            if(Math.floor(time - compare)/1000 <= 3600*ts_check_time){
                // 시작 시간 + 공백 시간 전에 누른 경우 
                data.start_time = start_time 
                data.evaluate = true
                Alert.alert("좋아요! 순조로운 시작:)");
            }else{
                // 시간 시간 + 공백 시간 후에 누른 경우
                data.start_time = 0
                data.evaluate = false
                Alert.alert("오늘 하루는 늦은 시작이네요:(");
            }
        }else{ // 이전에 누른 시간이 있는 경운
            prev_start_time = info.prev_timelist.start_time // 마직막에 누른 시간의 시작 시간
            compare.setHours(prev_start_time, 0, 0, 0); // 검사할 시간

            if(info.prev_timelist.evaluate){
                // 이전에 누른게 true 일때 
                if(Math.floor(time - compare)/1000 <= 3600*ts_check_time){
                    // 이전 시간의 시작 시간 전에 누른 경우
                    data.start_time = prev_start_time  
                    data.evaluate = true
                    Alert.alert("이미 통과에요! 다음 마감 시간까지 쉬어도 돼요:)");
                }else{
                    // 이전 시간의 시작 시간 후에 누른 경우
                    if(Math.floor(time - compare)/1000 <= 3600*(prev_start_time+ts_check_time)){
                        // 이전 시간의 시작 시간 + 공백 시간 보다 작을 때 
                        data.start_time = prev_start_time + ts_check_time 
                        data.evaluate = true
                        Alert.alert("통과에요! 반려견이 기뻐해요:)");
                    }else{
                        // 이전 시간의 시작 시간 + 공백 시간 보다 클 때 
                        data.start_time = 0   
                        data.evaluate = false
                        Alert.alert("늦었어요! 반려견과의 시간을 지켜주세요:(");
                    }
                }     
            }else{
                // 이전에 누른게 false 일때
                // post 하지 않는다. 
                //data.start_time = 0
                //data.evaluate = false
                Alert.alert("다음 기회에! 내일이 있어요:(");
                return 0;
            }
           
        }
        getlist(data)

        console.log("data---->", data)
        // post를 해야할 때 
        axios.post(`${HS_API_END_POINT}/api/timestamp/add/`,data)
        .then(function (response){
            console.log(response);
        })
        .then(function (error){
            console.log(error);
        });

        if(timelist.length==0){
            data.id = 1
            data.press_time=convertTimeFormat(data.press_time)
            setTimeList([data])
        }else{

            data.id = Number(timelist[timelist.length-1].id)+Number(1)
            data.press_time=convertTimeFormat(data.press_time)
            // setTimeList(timelist.append(data))
            timelist.push(data)
            setTimeList(timelist)
        }
    }

    const handleStart = () => {
        const date = new Date();
        console.log(date);
        postserver(date) //timer
    }

    function convertTimeFormat(press_time){
        const date = new Date(Number(press_time));

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateString = year + '-' + month  + '-' + day;

        const getSeconds = `0${date.getSeconds()}`.slice(-2)
        const minutes = `${date.getMinutes()}`
        const getMinutes = `0${date.getMinutes()}`.slice(-2)
        const getHours = `0${date.getHours()}`.slice(-2)
        return `${getHours}:${getMinutes}:${getSeconds}  ${dateString}`
    }


    const formatTime = () => {
        
        if(timer==0){
            return '00:00:00'
        }else{
            return timer
        }
    }
  
    // 누른 시각 정보 (요일별)
    const renderItem = ({ item }) => (
        <View>
        <Item item={item}/>
        <Divider style={{margin:"5%"}} color='##2089dc'/>
        </View>
    );

    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <View style={{flex:1, borderColor:'black', borderTopWidth:1, borderBottomWidth:1, margin:'5%', width:'80%'}}> 
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <Text style={[styles.smallbody]}> 번호 </Text>
                    </View>
                    <View style={{flex:4}}>
                    <Text style={[styles.smallbody]}>  누른 시간 </Text>
                    </View>
                </View>
                <Divider style={{margin:"5%"}} />
                {console.log("Timelist", timelist)}
                {
                Object.keys(timelist).length === 0? null : 
                <ScrollView style={{height:200,}}>

                {/*버벅임 현상 <TouchableWithoutFeedback > 아님 scroll view 없애보기*/}

                <FlatList
                    data={[...timelist].reverse()} // 원본 배열 유지 
                    renderItem={renderItem}
                    keyExtractor={item => item.id} // keyExtractor tells the list to use the ids for the react keys instead of the default key property.
                    style={styles.flatList}
                /></ScrollView>
                }
            </View>

            <View style={styles.dataInfoStyle}>
                <View style={{flex:1}}/>
                <View style={{flex:2}}>
                <Text style={styles.body}>
                    누른 시간
                </Text>
                </View>
                <View style={{flex:3}}>
                <Text style={[styles.body]}>
                {formatTime()}
                </Text>
                </View>
            </View>

            {/** 채팅에서 필요없는 부분 (Press butoon) */}
            <Pressable 
                style={[styles.stopwatchBtn,{backgroundColor: '#55e07a'}]}
                onPress={handleStart}>
                <Text style={{ fontSize: 30 ,paddingVertical:10}}>{"Press"}</Text>
            </Pressable>
        </View>
    )
  }
  

class TimeStampComponent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            //isPressed : false,
            prev_timelist : [],
            //start_time: this.props.parentState.start_time,
            parentState: this.props.parentState,
            dueTime: ``,
        };
        this.getlist = this.getlist.bind(this)
    }
    
    getlist=(data)=> {
        console.log("callback", data)
        let message;
        now = new Date()
        finish = new Date().setHours(this.state.parentState.start_time+12,0,0,0)
        /*if( Math.floor(now - finish) > 0 ){
            message = '오늘은 끝났어요 :)'
        }else{*/
            if(this.state.prev_timelist.length==0){ // 아무 것도 없을 떄 
                message = `하루를 시작해주세요 !!` 
            }else{
                if(this.state.prev_timelist.start_time==0){
                    message = `다음에 도전해봐요:)`
                }else{
                    message = `${this.state.prev_timelist.start_time}:00:00` 
                }
            }
        //}
        this.setState({
            prev_timelist: data,
            dueTime: message,
        })
        console.log("callback2", this.state.dueTime, message)
    }
    
    render(){
        console.log("parent state", this.state)
        const getHeader = () => {
            return (
            <View>
            <Text style={styles.title}>타임스탬프 검증</Text>
            <Text style={styles.subtitle}>* 통과 기준: 검사 주기 {this.state.parentState.ts_check_time}시간  | 횟수 {this.state.parentState.ts_total_count}일/7일</Text>
            <Text style={styles.subtitle}>* 사용자 설정 시작 시간: 오전 {this.state.parentState.start_time}시 </Text>
            </View>
            );
        };
        const getFooter = () => {
            return null;
        };
        
        const renderItem = () => {
            now = new Date()
            finish = new Date().setHours(this.state.parentState.start_time+12,0,0,0)
            if( Math.floor(now - finish) > 0 ){
                this.state.dueTime = '오늘은 끝났어요 :)'
            }else{
                if(this.state.prev_timelist.length==0){ // 아무 것도 없을 떄 
                    this.state.dueTime = `하루를 시작해주세요 !!` 
                }else{
                    if(this.state.prev_timelist.start_time==0){
                        this.state.dueTime = `다음에 도전해봐요:)`
                    }else{
                        this.state.dueTime = `${this.state.prev_timelist.start_time}:00:00` 
                    }
                }
            }
            return (
                <TouchableWithoutFeedback>
                    <View>
                        {/* status for element & day */}
                        <View style={[styles.summary_container,styles.container_background]}>
                            {/* element name */}
                            <View style={styles.summary_element_list}>
                                <Text style={styles.summary_element_text}>
                                    통과한 날
                                </Text>
                                
                            </View>

                            <View style={styles.summary_column}>
                                <WeekComponent/>
                                {/* status */}
                                <SummaryList/>
                            </View>
                        </View>
                        {/* pass condition */}
                        

                        {/* total information text about walking */}
                        

                        {/* average information text about walking */}
                        <Information
                        informationName={'통과하기 위한 다음 마감 시간'}
                        showData={[
                            {
                                dataName:'시간',
                                data:`${this.state.dueTime}` // 마지막 누른 시간
                            },
                        ]}/>
                    
                        {/* 채팅에서는 이 부분을 요일 구분 없이 모든 누른 시간 목록으로 받아와도 됨 */}
                        <View style={[styles.container_background,styles.textInformation_container]}>
                            <Text style={styles.subTitle}> 
                                하루동안 누른 시간 목록
                            </Text>
                            <TimeStamp info={this.state} getlist={this.getlist}/>

                        </View>   
                    </View>
            </TouchableWithoutFeedback>
            );
        };
        return(
            <SafeAreaView style={[styles.main_container, {marginTop:40}]}>
                <FlatList
                    data={[{id:0}]}
                    renderItem={renderItem}
                    listKey={new Date().getTime().toString()}
                    onEndReached={getFooter}
                    ListHeaderComponent={getHeader}
                    ListFooterComponent={getFooter}
                    contentContainerStyle={flex=1}
                />      
            </SafeAreaView>
        );
    }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
        flexDirection:'column',
    },
    title:{
        textAlign:'left',
        fontSize:responsiveScreenFontSize(3.5),
        marginTop:responsiveScreenHeight(2),
        marginBottom:responsiveScreenHeight(1),
        fontWeight:'bold',
        // backgroundColor:'magenta'
    },
    container_background:{
        backgroundColor: "#eedbff",
        borderRadius:15,
    },
    summary_container:{
        flexDirection:'row',
        paddingHorizontal:10,
    },
    summary_element_list:{
        // marginTop(70) = day_chevron size(30) + dayText_fontSize(30) + marginBottom(5)
        marginTop:65,
        justifyContent:'space-around',
        // backgroundColor:'gray',
    },
    summary_element_text:{
        fontSize:18,
        fontWeight:'bold',
        // backgroundColor:'green',
    },
    summary_column:{
        flex:1,
        flexDirection:'column',
        // backgroundColor:'gray',
    },
    summary_row:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:5,
        marginBottom:5,
        // backgroundColor:'magenta'
    },
    textInformation_container:{
        marginTop:15,
        paddingBottom:10,
        paddingLeft:30,
    },
    subtitle:{
        fontSize:responsiveScreenFontSize(2.5),
    },
    subTitle:{
        fontSize:responsiveScreenFontSize(3),
        marginVertical:responsiveScreenHeight(1),
    },
    dataInfoStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
    },
    body:{
        fontSize:20,
        marginLeft:10,
    },
    smallbody:{
        fontSize:15,
    },
    body_data:{
        //marginRight:10
    },
    stopwatchBtn:{
        borderRadius:100,
        borderBottomColor:'gray',
        borderRightColor:'gray',
        borderRightWidth:1,
        borderBottomWidth:3,
        alignItems:'center',
        marginTop:10,
        marginRight:100,
        marginLeft:70,
    },
    flatList: {
        justifyContent:'center',
        alignItems:'stretch',
    }
});

export default TimeStampComponent;