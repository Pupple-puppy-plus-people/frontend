import React ,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    PanResponder,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WeekComponent from '../../Recycle/WeekComponent';

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
    <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
    }}>
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
// FlatList 종료

class WalkAuthComponent extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        const getHeader = () => {
            return <Text style={styles.title}>산책량 검증</Text>;
        };
        const getFooter = () => {
            return null;
        };
        const renderItem = () => {
            return (
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
                    <SummaryList/>
                    <SummaryList/>
                </View>
            </View>
            {/* pass condition */}
            <Information
            informationName={'Pass Condition'}
            showData={[
                {
                    dataName:'총 횟수(일)',
                    data:5
                },
                {
                    dataName:'평균 산책(분)',
                    data:30
                },
                {
                    dataName:'평균 거리(m)',
                    data:1000
                },
            ]}
            />

            {/* total information text about walking */}
            <Information
            informationName={'Current Total'}
            showData={[
                {
                    dataName:'횟수(일)',
                    data:4
                },
                {
                    dataName:'시간(분)',
                    data:120
                },
                {
                    dataName:'거리(m)',
                    data:4000
                }
            ]}/>

            {/* average information text about walking */}
            <Information
            informationName={'Daily Average'}
            showData={[
                {
                    dataName:'시간(분)',
                    data:30
                },
                {
                    dataName:'거리(m)',
                    data:1000
                }
            ]}/>
            
            {/* 산책 시작 버튼 */}


            </View>
            );
        };
        return(
            <SafeAreaView style={styles.main_container}>
                
                <FlatList
                    data={[{id:0}]}
                    renderItem={renderItem}
                    listKey={new Date().getTime().toString()}
                    onEndReachedThreshold={1}
                    onEndReached={getFooter}
                    ListHeaderComponent={getHeader}
                    ListFooterComponent={getFooter}
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
    body:{
        fontSize:20,
    },
    body_data:{
        marginRight:130
    }
});

export default WalkAuthComponent;