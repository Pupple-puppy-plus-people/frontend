import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Walk extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        return(
            <View style={style.container}>
                <Text style={style.initialTest}>
                    Walk Authentication!
                </Text>
            </View>
        );
    }
}

const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColro:'#F5FcFF'
    },
    initialTest:{
        textAlign:'center'
    }
});

export default Walk;