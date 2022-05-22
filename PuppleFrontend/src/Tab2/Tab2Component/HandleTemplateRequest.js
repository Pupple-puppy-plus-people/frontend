import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    FlatList,
    Modal,
} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';

// temp data
let temp_image = [
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
]



const HandleTemplateReqeust = ({navigation, aboutDog}) => {
    const [parentWidth, setParentWidth] = useState({width:0});
    const [parentHeight, setParentHeight] = useState({height:0});
    const onLayout=(event)=>{
        const {x,y,height,width} = event.nativeEvent.layout;
        setParentHeight({height:height});
        setParentWidth({width:width});
    }
    useEffect(()=>{
        // axios.post(`${HS_API_END_POINT}/api/housephoto/`)
    })
    return (
        <View style={{}} onLayout={onLayout}>
            {/* <Modal
            animationType='slide'
            transparent={false}
            visible={false}
            onRequestClose={()=>{

            }}>

            </Modal> */}
            <FlatList
            data={temp_image}
            renderItem={renderImage}
            listKey={new Date().getTime().toString()}
            />
        </View>
    )
}

const renderImage = ({item}) =>{
    return(
        <View>
            <Text>a</Text>
            <Image style={{width:responsiveScreenWidth(24),height:responsiveScreenWidth(24)}} 
                    source={{uri:`data:image/jpeg;base64,${item}`}}/>
        </View>
    )
}


const styles = StyleSheet.create({

})
export default HandleTemplateReqeust;