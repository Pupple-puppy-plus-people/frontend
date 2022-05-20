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
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
import {SafeAreaView} from 'react-native-safe-area-context';
import { HS_API_END_POINT } from '../../../Shared/env';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WeekComponent from '../../Recycle/WeekComponent';
const today = new Date().getDay();
let baseUrl = `${HS_API_END_POINT}`
let userdog = 'dddd'
let dog_id = 13
function walkGet() {
    return new Promise((resolve,reject)=>{
        // axios
        // .all([axios.get(baseUrl+'/api/walkauth/'+userdog)
        //         ,axios.get(baseUrl+'/api/passcondition/'+dog_id)])
        // .then(
        //     axios.spread((res1,res2)=>{
        //         myData = res1.data
        //         pass_condition = res2.data
        //         console.log('axios in')
        //     })
        // )
        // .catch((error)=>console.log(error))
        axios.get(baseUrl+'/api/walkauth/'+userdog)
        .then(function(response){
            // handle success
            myData = response.data
            axios.get(baseUrl+'/api/passcondition/'+dog_id)
            .then(function(response){
                pass_condition = response.data[0]
                resolve();
            })
        })
        .catch(function (error) {
            //handle error
            console.log(error);
        })
        .then(function(){
            //always executed
        });
    });
}
function walkDelete() {
    axios.delete(baseUrl+'/api/walkauth/'+userdog+'/'+deleteData.userdog);

}
function postData2server(timer){
    walkauthData.elapsed_time = Math.floor(timer / 60)
    walkauthData.day = today
    axios.post(baseUrl+'/api/walkauth/'+userdog+'/',walkauthData)
    .then(function (response){
        console.log(response.status);
    })
    .then(function (error){
        console.log(error);
    });
}

// 산책 시작시 django server로 보낼 데이터
let walkauthData = {
    userdog : userdog,
    day : 0,
    start_time : 0,
    elapsed_time : 0,
    end_time : 0,
    distance : 0,
    evaluate : false
}
let pass_condition = {
    dog_id : 0,
    walk_total_count : 0,
    min_per_walk : 0,
    meter_per_walk : 0,
    ts_total_count : 0,
    ts_check_time : 0,
}
let myData = [
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
    {
        userdog : userdog,
        day : 0,
        start_time : 0,
        elapsed_time : 0,
        end_time : 0,
        distance : 0,
        evaluate : false
    },
]

let myTotal = {
    count : 0,
    time : 0,
    distance : 0

}

let lastLocation = {
    latitude : 0,
    longitude : 10
}

class SummaryList extends Component{
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
            {dataInfo.dataType === 0 && <Text>{'  일'}</Text>}
            {dataInfo.dataType === 1 && <Text>{'  분'}</Text>}
            {dataInfo.dataType === 2 && <Text>{'  m'}</Text>}
            
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
// FlatList 종료

const StopWatch = ({changeState}) => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const increment = useRef(null)
  
    const handleStart = () => {
      setIsActive(!isActive)
      {
          if (!isActive) {
                Geolocation.getCurrentPosition(
                    posision => {
                        lastLocation = posision.coords
                    },
                    error => {
                        console.log(error.code,error.messages);
                    },
                    {enableHighAccuracy:true,timeout:15000,maximumAge:10000},
                );
                increment.current = setInterval(() => {
                  setTimer((timer) => timer + 1)
                  Geolocation.getCurrentPosition(
                    posision => {
                        walkauthData.distance += getDistance(lastLocation,posision.coords)
                        lastLocation = posision.coords
                    },
                    error => {
                        console.log(error.code,error.messages);
                    },
                        {enableHighAccuracy:true,timeout:15000,maximumAge:10000},
                    );
                }, 1000);
          } else {
              postData2server(timer)
              clearInterval(increment.current)
              stopAndload()
              changeState()
        .then(function(response){
            // handle success
            myData = response.data
            resolve();
        })
        .catch(function (error) {
            //handle error
            console.log(error);
        })
        .then(function(){
            //always executed
        });
          }
      }
    }
  
    const handleReset = () => {
      clearInterval(increment.current)
      setIsActive(false)
      setTimer(0)
    }
  
    const formatTime = () => {
      const getSeconds = `0${(timer % 60)}`.slice(-2)
      const minutes = `${Math.floor(timer / 60)}`
      const getMinutes = `0${minutes % 60}`.slice(-2)
      const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  
      return `${getHours}:${getMinutes}:${getSeconds}`
    }
  
    return (
        <View>
            <View style={styles.dataInfoStyle}>
                <Text style={styles.body}>
                    시간
                </Text>
                <Text style={[styles.body,styles.body_data]}>
                {formatTime()}
                </Text>
            </View>
            <View style={styles.dataInfoStyle}>
                <Text style={styles.body}>
                    거리
                </Text>
                <Text style={[styles.body,styles.body_data]}>
                    {walkauthData.distance}{'  m'}
                </Text>
            </View>
            <Pressable 
            style={[styles.stopwatchBtn,{
                backgroundColor:isActive
                ? '#ff5959'
                : '#55e07a'}]}
            onPress={()=>{
                handleStart()
                }}>
                <Text style={{ fontSize: 30 ,paddingVertical:10}}>{!isActive ? "Start" : "Stop"}</Text>
            </Pressable>
            <Pressable onPress={handleReset}>
                <Text style={{ fontSize: 30 }}>Reset</Text>
            </Pressable>
        </View>
    )
}
async function stopAndload(){
    await walkGet();
    extract()
}
function extract(){
    let extract_elapsed_time = 0;
    let extract_distance = 0;
    for (let i = 0; i < myData.length; i++) {
        const element = myData[i];
        extract_elapsed_time += element.elapsed_time;
        extract_distance += element.distance;
    }
    myTotal = {
        count : myData.length,
        time : extract_elapsed_time,
        distance : extract_distance
    }
}

class WalkAuthComponent extends Component{
    constructor(props){
        super(props);
        Geolocation.requestAuthorization('always');
        this.state={
            total_count : 0,
            total_time : 0,
            total_distance : 0,
            pass_count : 0,
            pass_time : 0,
            pass_distance : 0
        };
        this.loadData();
    }
    async loadData(){
        await walkGet();
        extract();
        this.setState({
            total_count : myData.length,
            total_time :  myTotal.time,
            total_distance :  myTotal.distance,
            pass_count : pass_condition.walk_total_count,
            pass_time : pass_condition.min_per_walk,
            pass_distance : pass_condition.meter_per_walk
        })
    }
    changeState = () => {
        this.loadData()
    }
    componentDidUpdate(){
        // 값이 달라진 경우 render
        if(this.state.total_count !== myTotal.count){}
    }
    render(){
        // const [isPressed, setPressed] = useState(false);
        const getHeader = () => {
            return <Text style={styles.title}>산책량 검증</Text>;
        };
        const getFooter = () => {
            return null;
        };
        const renderItem = () => {
            return (
                <TouchableWithoutFeedback>
                <View>
                {/* status for element & day */}
                <View style={[styles.summary_container,styles.container_background]}>
                {/* element name */}
                <View style={styles.summary_element_list}>
                    <Text style={styles.summary_element_text}>
                        권장시간
                    </Text>
                    <Text style={styles.summary_element_text}>
                        권장거리
                    </Text>
                </View>

                <View style={styles.summary_column}>
                    <WeekComponent/>
                    {/* status */}
                    <SummaryList evalType={'time'}/>
                    <SummaryList evalType={'distance'}/>
                </View>
            </View>

            {/* pass condition */}
            <Information
            informationName={'Pass Condition'}
            showData={[
                {
                    dataType:0,
                    dataName:'총 횟수',
                    data:this.state.pass_count
                },
                {
                    dataType:1,
                    dataName:'평균 산책',
                    data:this.state.pass_time
                },
                {
                    dataType:2,
                    dataName:'평균 거리',
                    data:this.state.pass_distance
                },
            ]}
            />
            <View style={[styles.textInformation_container,styles.container_background]}>
                <Text
                style={styles.subTitle}>
                Current Total
                </Text>
                <View style={styles.dataInfoStyle}>
                    <Text
                    style={styles.body}>
                    횟수
                    </Text>
                    <Text 
                    style={[styles.body,styles.body_data]}>
                    {this.state.total_count}{'  일'}
                    </Text>
                </View>
                <View style={styles.dataInfoStyle}>
                    <Text
                    style={styles.body}>
                    시간
                    </Text>
                    <Text 
                    style={[styles.body,styles.body_data]}>
                    {this.state.total_time}{'  분'}
                    </Text>
                </View>
                <View style={styles.dataInfoStyle}>
                    <Text
                    style={styles.body}>
                    거리
                    </Text>
                    <Text 
                    style={[styles.body,styles.body_data]}>
                    {this.state.total_distance}{'  m'}
                    </Text>
                </View>
            </View>
            <View style={[styles.textInformation_container,styles.container_background]}>
                <Text
                style={styles.subTitle}>
                Daily Average
                </Text>
                <View style={styles.dataInfoStyle}>
                    <Text
                    style={styles.body}>
                    시간
                    </Text>
                    {this.state.total_count ==0 && <Text style={[styles.body,styles.body_data]}>0{'  분'}</Text>}
                    {this.state.total_count !=0 && <Text style={[styles.body,styles.body_data]}>
                    {Math.floor(this.state.total_time / this.state.total_count)}{'  분'}
                    </Text>}
                </View>
                <View style={styles.dataInfoStyle}>
                    <Text
                    style={styles.body}>
                    거리
                    </Text>
                    {this.state.total_count ==0 && <Text style={[styles.body,styles.body_data]}>0{'  m'}</Text>}
                    {this.state.total_count !=0 && <Text style={[styles.body,styles.body_data]}>
                    {Math.floor(this.state.total_distance / this.state.total_count)}{'  m'}
                    </Text>}
                </View>
            </View>
            {/* 산책 시작 버튼 */}
            
            <View style={[styles.container_background,styles.textInformation_container]}>
                <Text style={styles.subTitle}>
                    Walk Now!
                </Text>
                <StopWatch changeState={this.changeState}/>
            </View>
                        
            </View>
            </TouchableWithoutFeedback>
            );
        };
        return(
            <SafeAreaView style={styles.main_container}>
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
        marginTop:30,
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
    subTitle:{
        fontSize:27,
        marginTop:20,
        marginBottom:10,
    },
    dataInfoStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
    },
    body:{
        fontSize:20,
    },
    body_data:{
        marginRight:130
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
    }
});

export default WalkAuthComponent;