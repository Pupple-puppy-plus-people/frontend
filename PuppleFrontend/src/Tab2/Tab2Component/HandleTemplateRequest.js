import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable
} from 'react-native';

import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';

const HandleTemplateReqeust = ({navigation, aboutDog}) => {
    const [parentWidth, setParentWidth] = useState({width:0});
    const [parentHeight, setParentHeight] = useState({height:0});
    const onLayout=(event)=>{
        const {x,y,height,width} = event.nativeEvent.layout;
        setParentHeight({height:height});
        setParentWidth({width:width});
    }
    return (
        <View style={{}} onLayout={onLayout}>
            <Text>{aboutDog.name}</Text>
        </View>
    )
}

export default HandleTemplateReqeust;