import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
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
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>
                <MaterialCommunityIcons name="check-circle-outline" color={'green'} size={25}/>                
            </View>
        );
    }
}

class WalkAuthComponent extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        return(
            <View style={styles.main_container}>
                <Text style={styles.title}>
                    산책량 검증
                </Text>
                <View style={styles.summary_container}>
                    <View style={styles.summary_element_list}>
                        <Text style={styles.summary_element_text}>
                            권장시간
                        </Text>
                        <Text style={styles.summary_element_text}>
                            권장거리
                        </Text>
                        <Text style={styles.summary_element_text}>
                            권장거리
                        </Text>
                        <Text style={styles.summary_element_text}>
                            권장거리
                        </Text>
                        <Text style={styles.summary_element_text}>
                            권장거리
                        </Text>
                        <Text style={styles.summary_element_text}>
                            권장거리
                        </Text>
                    </View>
                    <View style={styles.summary_column}>
                        <WeekComponent/>
                        <SummaryList/>
                        <SummaryList/>
                        <SummaryList/>
                        <SummaryList/>
                        <SummaryList/>
                        <SummaryList/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
        flexDirection:'column',
    },
    summary_container:{
        flexDirection:'row'
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
    title:{
        textAlign:'left',
        fontSize:35,
        fontWeight:'bold',
        marginTop:40,
        marginLeft:30,
        marginBottom:20,
        // backgroundColor:'magenta'
    }
});

export default WalkAuthComponent;