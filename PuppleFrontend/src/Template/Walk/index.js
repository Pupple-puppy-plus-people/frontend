import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import WalkAuthComponent from './WalkAuthComponent/WalkAuthentication';


class Walk extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        return(
            <View style={styles.container}>
                {console.log('Walk:   '+this.props.dog_id)}
                <WalkAuthComponent dog_id={this.props.dog_id}/>
            </View>
            // 화면 반응성(spring) && 돌아가기 추가
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        position: 'absolute',
        top:35,
        left:10,
        right:10,
        bottom:0,
    }
});

export default Walk;