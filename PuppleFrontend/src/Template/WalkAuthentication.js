import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import WeekComponent from './Recycle/WeekComponent';


class Walk extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        return(
            <View style={styles.container}>
                <WeekComponent/>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    initialTest:{
        color:'white',
        textAlign:'center'
        
    }
});

export default Walk;