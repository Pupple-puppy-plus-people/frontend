import React ,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import WalkPassComponent from './WalkPassComponent/WalkPassCondition';


class WalkPassCondition extends Component{
    constructor(props){
        super(props);
        //set this.state
    }
    render(){
        return(
            <View style={[styles.container, {backgroundColor:'white'}]}>
                <WalkPassComponent
                onWalkDay={this.props.onWalkDay} 
                onWalkTime={this.props.onWalkTime}
                onWalkDistance={this.props.onWalkDistance}/>
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
        top:"0.1%", // 여기 바꿨어요! 
        left:10,
        right:10,
        bottom:0,
    }
});

export default WalkPassCondition;