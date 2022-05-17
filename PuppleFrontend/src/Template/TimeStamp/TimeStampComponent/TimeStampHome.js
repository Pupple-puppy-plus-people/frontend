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
import {SafeAreaView} from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WeekComponent from '../../Recycle/WeekComponent';
import { HS_API_END_POINT } from '../../../Shared/env';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

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
    {console.log("itme:", item)}
    <Text style={[styles.body],{flex:1}}>   {item.id}</Text>
    <Text style={[styles.body],{flex:2}}>   {item.press_time}</Text>
    </View>
);

const TimeStamp = (props) => {
    const [timer, setTimer] = useState(0)
    const [prevTimer, setPrevTimer] = useState(0)   // 서버에서 받아온 것 중 가장 마지막  -> 누른 시각에 뜨기도 함
    const [isActive, setIsActive] = useState(false)
    const [timelist, setTimeList] = useState([{}])

    React.useEffect(()=> {
        axios.get(`${HS_API_END_POINT}/api/timestamp/`) 
        .then((res)=> {      
            setTimeList(res.data);
            props.getlist(res.data)
            console.log("TimeStamp Data 받음.", timelist, res.data); // 왜 timeList에 안들어가지 
        })
        .catch((err)=> {
            console.log(err);
        })
    }, []); 
    
    function postserver(timer){
        console.log("time:", timer)
        axios.post(`${HS_API_END_POINT}/api/timestamp/`,{ 
            userdog: 0,
            day: 0,
            press_time: timer,
            elapsed_time: 0,
            evaluate: true
        })
        .then(function (response){
            console.log(response.status);
        })
        .then(function (error){
            console.log(error);
        });
    }

    const handleStart = () => {
        //getfromserver('start')
        const date = new Date();
        console.log(date);

        const getSeconds = `0${date.getSeconds()}`.slice(-2)
        const minutes = `${date.getMinutes()}`
        const getMinutes = `0${date.getMinutes()}`.slice(-2)
        const getHours = `0${date.getHours()}`.slice(-2)
        setTimer((timer) => `${getHours}:${getMinutes}:${getSeconds}`)
        postserver(`${getHours}:${getMinutes}:${getSeconds}`) //timer
        // 누른 위치 체크 
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
                    <View style={{flex:2}}>
                    <Text style={[styles.smallbody]}>  누른 시간 </Text>
                    </View>
                </View>
                <Divider style={{margin:"5%"}} />
                {console.log("Timelist", timelist)}
                {
                Object.keys(timelist).length === 0? null : 
                <ScrollView style={{height:200,}}>
                <FlatList
                    data={timelist}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} // keyExtractor tells the list to use the ids for the react keys instead of the default key property.
                    style={styles.flatList}
                /></ScrollView>}
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
            <Pressable 
                style={[styles.stopwatchBtn,{backgroundColor: '#55e07a'}]}
                onPress={handleStart}>
                <Text style={{ fontSize: 30 ,paddingVertical:10}}>{ "Press"}</Text>
            </Pressable>
        </View>
    )
  }
  


class TimeStampComponent extends Component{
    constructor(props){
        super();
        this.state = { 
            //isPressed : false,
            timelist : ''
        };
        this.getlist = this.getlist.bind(this)
    }
    getlist(time) {
        const date = new Date()
        const now = date.getTime()
        console.log("---time :",time, now);

        // 마지막으로 누른 버튼 시간
        const times = time[Object.keys(time).length-1].press_time.split(':')

        times[0] = date.getHours()-Number(times[0])
        times[1] = date.getMinutes()-Number(times[1])
        times[2] = date.getSeconds()-Number(times[2])
        
        console.log("---times :", times);

        if(times[2]<0){
            times[2] += 60
            times[1] -= 1
        }
        if(times[1]<0){
            times[1] += 60
            times[0] -= 1
        }

        console.log("---times :", times);
        this.setState({timelist:times});
    }
    render(){
        // const [isPressed, setPressed] = useState(false);
        const getHeader = () => {
            return <Text style={styles.title}>타임스탬프 검증</Text>;
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
            informationName={'마지막 체크 후 지난 시간'}
            showData={[
                {
                    dataName:'시간',
                    data:`${this.state.timelist[0]}:${this.state.timelist[1]}:${this.state.timelist[2]}`
                },
              
            ]}/>
            
            {/* 산책 시작 버튼 */}
            
                <View style={[styles.container_background,styles.textInformation_container]}>
                    <Text style={styles.subTitle}>
                        Press Now!
                    </Text>
                    <TimeStamp parentlist={this.state.timelist} getlist={this.getlist}/>
                    {console.log("getlist:", this.state.timelist)}

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
    smallbody:{
        fontSize:15,
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
    },
    flatList: {
        justifyContent:'center',
        alignItems:'stretch',
    }
});

export default TimeStampComponent;