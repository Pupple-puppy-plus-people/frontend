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
import WeekComponent from '../../Template/Recycle/WeekComponent';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


var ts_check_time = 0;
var myData = [
    {
        user : 0,
        dog : 0,
        day : -1,
        press_time : 0, // char
        start_time : 0,
        evaluate : true
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
    {
        user : 0,
        dog : 0,
        day : 0,
        press_time : 0, // char
        start_time : 0,
        evaluate : false
    },
]




// mydata에 각 날짜들의 마지막 날 저장하기 총 7개, 없으면 넘김 
class SummaryList extends Component{
    constructor(props){
        super(props);
        this.state={
            dayIndex : 0,
            day_num : [0,1,2,3,4,5,6],
            myData : myData,
            dogID : this.props.parentState.dog_id,
            startDay : this.props.parentState.start_day,
        }
    }

    async getResult(){
        let empty = {
            user : 0,
            dog : 0,
            day : 0,
            press_time : 0, // char
            start_time : 0,
            evaluate : false
        }
        var myData2 = []
        var passDay = 0
        await axios.all(this.state.day_num.map((endpoint) => 
        axios.get(`${HS_API_END_POINT}/api/timestamp/get/?user=${this.props.parentState.user_id}&dog=${this.state.dogID}&day=${endpoint}`)))
        .then((res)=> { 
    
            startDay = new Date(Number(this.state.startDay)).getDay();
            endDay = new Date().getDay();
            //console.log("startDAY ===== ", startDay, endDay)
    
            res.forEach((dayHistory, index) => {
                //console.log(dayHistory.data)
                
                if(dayHistory.data.length==0){ // 특정 요일 누른 값이 없으면
                    copy = JSON.parse(JSON.stringify(empty)) //deepcopy
                    copy.id = 0 // id 컬럼 추가
                    
                    copy.day = -1 
    
                    myData2.push(copy)
                    
                }else{  // 특정 요일 결과가 있으면 그대로
                    myData2.push(dayHistory.data[dayHistory.data.length-1])
                    //console.log("put", dayHistory.data[dayHistory.data.length-1])

                    if(dayHistory.data[dayHistory.data.length-1].evaluate){
                        passDay = Number(passDay) + Number(1)
                    }
                }
            });
           
            console.log("1TimeStamp Data 받음."); 
            
        })
        .catch((err)=> {
            console.log(err);
        }) 
        //console.log("Summary list 받기 ",myData2.length, passDay); 

        this.setState({
            myData: myData2,
        })

        var progress =  Number(passDay)/Number(this.props.parentState.ts_total_count)*Number(100)
        //console.log("progeress", progress)
        this.props.progress = progress
        

    }
    componentDidMount(){    // this.setState 는 다시 렌더링을 유발하므로 render() 안에 들어가면 무한루프를 돌게 됨. 
        // 값이 달라진 경우 render
        this.getResult()    
    }
    render(){
        
        const dayEval = this.state.day_num.map((oneday)=>
        <MaterialCommunityIcons 
        key={oneday}
        name={this.state.myData[oneday].day == oneday ?
            (this.state.myData[oneday].evaluate?"check-circle-outline":"close-circle-outline")
        :   ("progress-question")}
        color={this.state.myData[oneday].day == oneday ?
            (this.state.myData[oneday].evaluate?'green':'red')
        :   ("purple")}
        size={25}
        />
        );
        
        // #eedbff background color
        return(
            <View style={styles.summary_row}>
                
                {this.props.evalType==='day'&&dayEval}
            </View>
        );
    }
}

// 하루 동안 누른 시간 목록의 표 제목 (번호, 누른 시간)
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


// 하루 동안 누른 시간 목록의 한 레코드
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

const TimeStamp = ({info, getlist}) => {
    const isFocused = useIsFocused();

    const [timer, setTimer] = useState(0)
    const [timelist, setTimeList] = useState([{}])
    const today = new Date().getDay();


    React.useEffect(()=> {

        axios.get(`${HS_API_END_POINT}/api/timestamp/get/?user=${info.parentState.user_id}&dog=${info.parentState.dog_id}`) 
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
                if(idx==0){
                    continue;
                }
                copy = JSON.parse(JSON.stringify(res.data[idx])) //deepcopy
                copy.press_time=convertTimeFormat(copy.press_time)
                copy.id = Number(idx)
                list.push(copy)
            }
            setTimeList(list);
            console.log("1TimeStamp Data 받음."); 
        })
        .catch((err)=> {
            console.log(err);
        })
    }, [isFocused]); 


/************************* 부가 설명 ****************************************** */
    // 12312493294501 같은 Date 객체를 hh:mm:ss yy-mm-dd 로 예쁘게 보여주는 코드
    // press_time은 new Date.getTime().toString()의 반환값임
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
  
    // 누른 시각 정보 
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
                {
                Object.keys(timelist).length === 0? null : 
                <ScrollView style={{height:200,}}>

                {/* 리스트 버벅임 현상 scroll view 안에 flatlist 라서 그럼 - 창훈님처럼 해보기*/}
                <FlatList
                    data={[...timelist].reverse()} // 원본 배열 유지 
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                /></ScrollView>
                }
            </View>

        </View>
    )
  }
  
// 전체 타임스탬프 컴포넌트 (부모 컴포넌트 역할) (자식 컴포넌트는 위에 있는 Timestamp('하루동안 누른 시간 목록')컴포넌트임)
class TimeStampRes extends Component{
    constructor(props){
        super(props);
        this.state = { 
            prev_timelist : [],
            parentState: this.props.parentState,
            dueTime: ``,
            ts_check_time:0,
            ts_total_count:0,
           
        };
        this.getlist = this.getlist.bind(this)
        this.getTSINFO();
    }
    
    getlist=(data)=> {
        let message;
        now = new Date()
        finish = new Date().setHours(this.state.parentState.start_time+12,0,0,0)
        if( Math.floor(now - finish) > 0 ){
            message = '오늘은 끝났어요 :)'
        }else{
            if(this.state.prev_timelist.length==0){ // 아무 것도 없을 떄 
                message = `하루를 시작해주세요 !!` 
            }else{
                if(this.state.prev_timelist.start_time==0){
                    message = `다음에 도전해봐요:)`
                }else{
                    message = `${this.state.prev_timelist.start_time}:00:00` 
                }
            }
        }
        this.setState({
            prev_timelist: data,
            dueTime: message,
        })
    }
    
    
    async getTSINFO(){
        
        await axios.get(`${HS_API_END_POINT}/api/passcondition/${this.state.parentState.dog_id}/`)
        .then(function (response) {
            ts_total_count = response.data[0]['ts_total_count']
            ts_check_time = response.data[0]['ts_check_time']
            console.log("pass condition: ",ts_check_time, ts_total_count);
            

        })
        .catch(error => {console.log('error : ',error)});
        
        this.setState({
            ts_total_count: ts_total_count,
            ts_check_time: ts_check_time
        })
        
    };

    componentDidUpdate(){    // this.setState 는 다시 렌더링을 유발하므로 render() 안에 들어가면 무한루프를 돌게 됨. 
        // 값이 달라진 경우 render

        if(this.state.ts_check_time!==ts_check_time){
            
        }
    
    }

    render(){
       
        const getHeader = () => {
            console.log("야호~~~~~");

            return (
            <View>
            <Text style={styles.title}>타임스탬프 검증</Text>
            <Text style={styles.subtitle}>* 통과 기준: 검사 주기 {this.state.ts_check_time}시간  | 횟수 {this.state.ts_total_count}일/7일</Text>
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
                                <WeekComponent chevronColor={'white'}/>
                                {/* status */}
                                <SummaryList evalType={'day'} parentState={this.state.parentState} progress={this.state.progress}/>
                            </View>
                        </View>

{/**************************************************************************************** */}
 
                        {/* 채팅에서는 이 부분을 요일 구분 없이 모든 누른 시간 목록으로 받아와도 됨 */}
                        <View style={[styles.container_background,styles.textInformation_container]}>
                            <Text style={styles.subTitle}> 
                                전체 누른 시간 목록
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
        backgroundColor: "white",
        borderRadius:15,
        margin:10
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

export default TimeStampRes;