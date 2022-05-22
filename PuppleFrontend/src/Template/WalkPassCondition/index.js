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
            <View style={styles.container}>
                <WalkPassComponent
                setAllData={this.props.setAllData}/>
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

export default WalkPassCondition;