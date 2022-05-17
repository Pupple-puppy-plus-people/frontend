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
import TimePicker from 'react-gradient-timepicker';

import WeekComponent from '../../Recycle/WeekComponent';
import { HS_API_END_POINT } from '../../../Shared/env';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

class TimeStampComponent extends Component{

    constructor(props){
        super(props);
        this.state = { 
            isPressed : false,
            timelist : [],
        };
    }
    handler(time) {
        this.setState({
            timelist: time
        });
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
                    
                    {/* 산책 시작 버튼 */}
                    
                    <View style={[styles.container_background,styles.textInformation_container]}>
                        <Text style={styles.subTitle}>
                            Press Now!
                        </Text>

                        <View>
                        {/*<TimePicker
                            time="01:00"
                            theme="Bourbon"
                            className="timepicker"
                            placeholder="Start Time"
                            onSet={(val) => {
                                alert('val:' + "01:00 AM" );
                            }}
                        />*/}
                        </View>
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