import React, {Component, useCallback,useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Modal

} from 'react-native';
import RNCamera from 'react-native-camera'
import { CameraScreen } from 'react-native-camera-kit';
import { Camera, CameraType } from 'react-native-camera-kit';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';

const RoomCheckHome=({navigation, route})=> {
    const [photoUri,setPhotoUri] = useState([]);
    const [photoData,setPhotoData] = useState([]);


    const [pickerResponse, setPickerResponse] = useState(null);
    // useEffect(() => {
    //     if(route.params){
    //         setPhotoUri([...photoUri,...route.params.photoUri])
    //         console.log("route image : ",route.params.photoUri)
    //         console.log(photoUri)
    //     }
    //   }, [route.params]);
    
    const openCamera = () => {
        
        const options = {
            maxHeight: 250,
            maxWidth: 250,
            //selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        };
        launchCamera(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else if (response.fileSize > 5242880) {
                Alert.alert(
                    "Nilamhut Say\'s",
                    "Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry",
                    [
                        { text: "OK", onPress: () => console.log('ok Pressed') }
                    ],
                    { cancelable: false }
                )
            }
            else {
                console.log('Response uri = ', response.assets[0].uri)
                // console.log("base64 = ",response.assets[0].base64);
                setPhotoData([...photoData,response.assets[0].base64]) //access like this
            }
        });
        //launchImageLibrary(options, setPickerResponse);
        console.log(pickerResponse);
    };
    const uploadImage = () => {
        // axios.post(`${HS_API_END_POINT}/api/housephoto/add/`,{"email":USER_INFO.USER_EMAIL,"dog_id":route.params.dog_id,"image":photoData})
        axios.post(`${HS_API_END_POINT}/api/housephoto/add/`,{"email":USER_INFO.USER_EMAIL,"dog_id":45,"image":photoData})
        .then(function(res){
            
            console.log(res.data);
        })
        .catch(function(error) {
            console.log("error : ",error);
        })
    }
    const getImage = () => {
        // route.params.dog_id=1
        axios.post(`${HS_API_END_POINT}/api/housephoto/get/mydog/`,{"email":USER_INFO.USER_EMAIL})
        .then(function(res){
            console.log(res.data);
        })
        .catch(function(error) {
            console.log("error : ",error);
        })
    }
    const getOneImage = () => {
        // route.params.dog_id=1
        axios.post(`${HS_API_END_POINT}/api/housephoto/get/mydog/onlyone/`,{"dog_id":44})
        .then(function(res){
            console.log(res.data);
        })
        .catch(function(error) {
            console.log("error : ",error);
        })
    }

    const renderItem = useCallback(({item}) => (
        <View style={{justifyContent:'center',margin:3}}>
            <Image style={{marginHorizontal:5,width:responsiveScreenWidth(24),height:responsiveScreenWidth(24)}} source={{uri:`data:image/jpeg;base64,${item}`}}/>
        </View>
    ),[photoData]);
    //if(route.params) console.log("RRR ",route.params.imguri)
    
    return ( 
        <SafeAreaView style={{flex:1}}>
            <View style={{margin:9,flex:9,backgroundColor:'white',borderRadius:15}}>
                <View style={{margin:10,flex:1}}>
                    <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(3)}}> 방 크기 측정 </Text>
                    <Text style={{fontSize:responsiveScreenFontSize(2),fontWeight:'bold'}}> 방 사진을 모두 찍어서 업로드해주세요!</Text>

                </View>
                <View style={{margin:9,flex:8,backgroundColor:'#E9E0FF',borderRadius:15,padding:10}}>
                    
                   
                    <View style={{flex:1.5}}>
                        <TouchableOpacity 
                        style={{margin:10,width:responsiveWidth(20),height:responsiveWidth(20),backgroundColor:'#EBEBEB',borderColor:'black',borderWidth:2,borderStyle:'dashed',justifyContent:'center'}}
                        onPress={openCamera}
                        //onPress={renderCamera}
                        >
                            <Icon name="camera" size={responsiveWidth(7)} color="black" style={{alignSelf:'center',justifyContent:'center'}}/>
                        </TouchableOpacity>
                    </View>
                        
                    <View style={{flex:0.1,borderBottomColor:'black',borderBottomWidth:2}}></View>
                    <View style={{flex:5,alignItems:'center'}}>
                        
                        <FlatList
                        numColumns={3}
                        // refreshing={true}
                        data={photoData}
                        renderItem={renderItem}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',margin:3,alignItems:'center'}}>
                        <TouchableOpacity 
                        onPress={uploadImage}
                        style={{margin:3,backgroundColor:'purple',width:'80%',height:'70%',justifyContent:'center',borderRadius:20}}>
                            <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(2.5),textAlign:'center',color:'white'}}>업로드</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:'center',margin:3,alignItems:'center'}}>
                        <TouchableOpacity 
                        onPress={getImage}
                        style={{margin:3,backgroundColor:'purple',width:'80%',height:'70%',justifyContent:'center',borderRadius:20}}>
                            <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(2.5),textAlign:'center',color:'white'}}>받기테스트</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:'center',margin:3,alignItems:'center'}}>
                        <TouchableOpacity 
                        onPress={getOneImage}
                        style={{margin:3,backgroundColor:'purple',width:'80%',height:'70%',justifyContent:'center',borderRadius:20}}>
                            <Text style={{fontWeight:'bold',fontSize:responsiveScreenFontSize(2.5),textAlign:'center',color:'white'}}>한마리 받기테스트</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    // <View style={{flex:1,backgroundColor:'tomato'}}> 
    //     {/* <StatusBar animated hidden /> */}
    // </View>
    )
 
}
export default React.memo(RoomCheckHome);