import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const today = new Date().getDay();

class DayComponent extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    {/* Sunday */}
                    <View style={styles.column}>
                        {today == 0 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            S
                        </Text>
                    </View>

                    {/* Monday */}
                    <View style={styles.column}>
                        {today == 1 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            M
                        </Text>
                    </View>

                    {/* Tuesday */}
                    <View style={styles.column}>
                        {today == 2 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            T
                        </Text>
                    </View>

                    {/* Wednesday */}
                    <View style={styles.column}>
                        {today == 3 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            W
                        </Text>
                    </View>

                    {/* Thursday */}
                    <View style={styles.column}>
                        {today == 4 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            T
                        </Text>
                    </View>

                    {/* Friday */}
                    <View style={styles.column}>
                        {today == 5 ?
                         <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                         <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            F
                        </Text>
                    </View>

                    {/* Saturday */}
                    <View style={styles.column}>
                        {today == 6 ?
                        <MaterialCommunityIcons name="chevron-down" color={'black'} size={30}/>:
                        <MaterialCommunityIcons name="chevron-down" color={'white'} size={30}/> }
                        <Text style={styles.daytext}>
                            S
                        </Text>
                    </View>
                </View>
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
            <DayComponent/>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginHorizontal:50
    },
    column:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
    },
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    daytext:{
        color:'purple',
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold'
    }
});

export default WeekComponent;