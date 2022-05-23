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
    TouchableOpacity,
} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import EvaluateRequest from './EvaluateRequest';
// temp data
let temp_image = [
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
]


const HandleTemplateReqeust = ({navigation, aboutDog}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [requestItem, setRequestItem] = useState(null);
    const [parentWidth, setParentWidth] = useState({width:0});
    const [parentHeight, setParentHeight] = useState({height:0});
    const [allRequest, setAllRequest] = useState([]);
    const onLayout=(event)=>{
        const {x,y,height,width} = event.nativeEvent.layout;
        setParentHeight({height:height});
        setParentWidth({width:width});
    }
    React.useEffect(()=>{
        axios.post(`${HS_API_END_POINT}/api/housephoto/get/mydog/onlyone/`,{
            dog_id:aboutDog.id
        })
        .then(function(res){
            console.log('success')
            res.data.map((oneRequest)=>{
                setAllRequest(allRequest=>([...allRequest,oneRequest]))
            })
        })
        .catch(function(error){
            // console.log(error)
            console.log('fail get onlyone dog')
        })
    },[]);
    const onPressRequest = (item)=>{
        setRequestItem(item)        
        setModalVisible(true)
    }

    const renderUsername = ({item}) =>(
        <View>
            <TouchableOpacity
            onPress={()=>
                // console.log('here',item)
                onPressRequest(item)
            }
            style={{
                borderColor:'purple',
                borderWidth:3,
                borderRadius:40,
                marginVertical:10,
                width:responsiveScreenWidth(70),
                alignSelf:'center',
                flexDirection:'row',
                justifyContent:'center'
                }}>
                <Text
                style={{fontSize:25,}}>{item.username}</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={{}} onLayout={onLayout}>
            <FlatList
                data={allRequest}
                renderItem={renderUsername}
                listKey={new Date().getTime().toString()}
            />
            <EvaluateRequest 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                requestItem={requestItem}
                allRequest={allRequest}
                setAllRequest={setAllRequest}
            />
        </View>
    )
}


const styles = StyleSheet.create({

})
export default HandleTemplateReqeust;