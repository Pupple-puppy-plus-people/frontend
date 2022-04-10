import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// set today's number from 0 to 6 , 0 means Sunday and 6 means Saturday
const today = new Date().getDay();

class DayComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.column}>
                {today == this.props.dayNumber ?
                <MaterialCommunityIcons name="chevron-down" size={30}/>:
                <MaterialCommunityIcons name="chevron-down" color={'#eedbff'} size={30}/> }
                <Text style={styles.daytext}>
                    {this.props.dayName}
                </Text>
            </View>
        );
    }
}

class WeekComponent extends Component{
    constructor(props){
        super(props);
        //set this.state
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <DayComponent dayNumber={0} dayName={'S'}/>
                    <DayComponent dayNumber={1} dayName={'M'}/>
                    <DayComponent dayNumber={2} dayName={'T'}/>
                    <DayComponent dayNumber={3} dayName={'W'}/>
                    <DayComponent dayNumber={4} dayName={'T'}/>
                    <DayComponent dayNumber={5} dayName={'F'}/>
                    <DayComponent dayNumber={6} dayName={'S'}/>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        // backgroundColor:'orange'
    },
    column:{
        flexDirection:'column',
        alignItems:'center',
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    daytext:{
        color:'purple',
        fontSize:30,
        fontWeight:'bold',
        // backgroundColor:'magenta'
    }
});

export default WeekComponent;