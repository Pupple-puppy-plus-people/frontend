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

    const [modalVisible, setModalVisible] = useState(false);

    const [parentWidth, setParentWidth] = useState({width:0});
    const [parentHeight, setParentHeight] = useState({height:0});
    let allRequestUsername=[]
    const onLayout=(event)=>{
        const {x,y,height,width} = event.nativeEvent.layout;
        setParentHeight({height:height});
        setParentWidth({width:width});
    }
    useEffect(()=>{
        axios.post(`${HS_API_END_POINT}/api/housephoto/get/mydog/onlyone/`,{
            dog_id:aboutDog.id
        })
        .then(function(res){
            console.log('success')
            res.data.map((oneRequest)=>{
                console.log(oneRequest.username)
                allRequestUsername.push(oneRequest.username)
            })
        })
        .catch(function(error){
            // console.log(error)
            console.log('fail get onlyone dog')
        })
    })
    return (
        <View style={{}} onLayout={onLayout}>
            <Text>begin</Text>
            <FlatList
                data={allRequestUsername}
                renderItem={renderUsername}
                listKey={new Date().getTime().toString()}
            />
            <Text>end</Text>
        </View>
    )
}

const renderUsername = ({item}) =>{
    return(
        <View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)
                }}>
                    <Pressable
                        style={{marginTop:40,
                            marginBottom:40,
                            zIndex:1,}}
                        onPress={()=>{
                            setModalVisible(!modalVisible)
                        }}>
                            <Text
                            style={{fontSize:20,color:'#006ef9'}}>{'←'}돌아가기</Text>
                    </Pressable>
                    <FlatList
                        data={temp_image}
                        renderItem={renderImage}
                        listKey={new Date().getTime().toString()}
                    />
                </Modal>
                <Pressable
                onPress={()=>{setModalVisible(true)}}
                style={{
                    // width:parentWidth.width,
                    borderColor:'purple',
                    borderWidth:3,
                    borderRadius:40,
                    marginHorizontal:60,
                    width:parentWidth.width/1.5,
                    alignSelf:'center',
                    flexDirection:'row',
                    justifyContent:'space-between'
                    }}>
                    <Text
                    style={{fontSize:25}}>{item}</Text>
                </Pressable>
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