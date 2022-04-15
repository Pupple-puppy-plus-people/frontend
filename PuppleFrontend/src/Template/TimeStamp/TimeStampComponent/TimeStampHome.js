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

let baseUrl = 'http:127.0.0.1:8000'
function walkGet() {
    axios.get(baseUrl+'/api/walkauth/')
            .then(function(response){
                // handle success
                
                loadedData = response.data[0]
                deleteData = response.data[0]
                console.log(loadedData);
            })
            .catch(function (error) {
                //handle error
                console.log(error);
            })
            .then(function(){
                //always executed
            });
}
function walkDelete() {
    axios.delete(baseUrl+'/api/walkauth/'+deleteData.id);

}
function getfromserver(method){
    if(method == 'stop'){
        Promise.all([walkGet(),walkDelete()])
        .then(function (results){
            console.log(results)
        });
    }
    else {
        if(method == 'start'){
            axios.post(baseUrl+'/api/walkauth/',{ 
                index : 0,
                start_time : 0,
                elapsed_time : 0,
                distance : 100
            })
            .then(function (response){
                console.log(response.status);
            })
            .then(function (error){
                console.log(error);
            });
        }
    }
    
}

// 산책 시작시 django server에서 받아온 데이터
let loadedData = {
    start_time:0,
    elapsed_time:20,
    distance:10
};
let deleteData = {
    start_time:0,
    elapsed_time:20,
    distance:10
};

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

const StopWatch = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const increment = useRef(null)
  
    const handleStart = () => {
      setIsActive(!isActive)
      {
          if (!isActive) {
              getfromserver('start')
              increment.current = setInterval(() => {
                  setTimer((timer) => timer + 1)
                  walkGet()
              }, 1000);
          } else {
              getfromserver('stop')
              clearInterval(increment.current)
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
                    누른 시간
                </Text>
                <Text style={[styles.body,styles.body_data]}>
                {formatTime()}
                </Text>
            </View>
            
            <Pressable 
            style={[styles.stopwatchBtn,{
                backgroundColor:isActive
                ? '#ff5959'
                : '#55e07a'}]}
            onPress={handleStart}>
                <Text style={{ fontSize: 30 ,paddingVertical:10}}>{!isActive ? "Press" : "Stop"}</Text>
            </Pressable>
            <Pressable onPress={handleReset}>
            </Pressable>
        </View>
    )
  }
  

class WalkAuthComponent extends Component{
    constructor(props){
        super(props);
        this.state = { isPressed : false };
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
            informationName={'마지막 버튼을 누른 후 지난 시간'}
            showData={[
                {
                    dataType:1,
                    dataName:'시간',
                    data:30
                },
              
            ]}/>
            
            {/* 산책 시작 버튼 */}
            
            <View style={[styles.container_background,styles.textInformation_container]}>
                    <Text style={styles.subTitle}>
                        Press Now!
                    </Text>
                    <StopWatch/>
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