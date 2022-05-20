import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import TimestampPassComponent from './TimeStampPassComponent/TimeStampConditioin';


class TimestampCondition extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={[styles.container, {backgroundColor:'white'}]}>
                <TimestampPassComponent
                setData={this.props.setData}/>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        position: 'absolute',
        top:"0.1%", // 여기 바꿨어요! 
        left:10,
        right:10,
        bottom:0,
    }
});

export default TimestampCondition;