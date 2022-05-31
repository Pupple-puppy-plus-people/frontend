import { NavigationContainer } from '@react-navigation/native';
import React, {Component, useCallback,useState} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, StatusBar, Image} from 'react-native';
import RNCamera from 'react-native-camera'
import { CameraScreen } from 'react-native-camera-kit';
import { Camera, CameraType } from 'react-native-camera-kit';
import { FlatList } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MatDetectorHome from './MatDetectorHome';

const CameraPage=({navigation,route})=> {
    var camera;
    // const [camera,setCamera] = useState(null);
    const [photoUri,setPhotoUri] = useState([]);
    //const [photo,setPhoto] = useState([]);
    const takePhoto=()=>{
        if(camera) {
            camera.capture()
            .then((data)=>{
                setPhotoUri([...photoUri,data.uri])
                // this.photoUri.push(data.uri);
                //setPhoto(this.photoUri);
                console.log("data = ",data)
                console.log("uri= ",photoUri);
            })
            .catch(err => console.error("Error: ",err));
        }
        
        console.log("찰칵")
    }
    const goBackRoom=()=>{
        navigation.navigate("MatDetectorHome",{photoUri:photoUri});
    }
    const renderItem = useCallback(({item}) => (
        <View style={{justifyContent:'center'}}>
            <Image style={{marginHorizontal:5,width:responsiveScreenWidth(20),height:responsiveScreenWidth(20)}} source={{uri:item}}/>
        </View>
    ),[photoUri]);
    return (
    <>
        {/* <StatusBar hidden></StatusBar> */}
        <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:'white',}}></View>
            <View style={{flex:1.5,flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flex:1, justifyContent:'center',alignContent:"center"}}>
                    <TouchableOpacity 
                    onPress={goBackRoom}
                    style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}
                    >
                        <MaterialIcons name="arrow-back-ios" size={responsiveScreenWidth(8)}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:9}}>
                    {/* <Image style={{style}} source={{uri:"file:///var/mobile/Media/DCIM/103APPLE/IMG_3609.JPG"}}/> */}
                    <FlatList
                        horizontal={true}
                        //refreshing={true}
                        data={photoUri}
                        renderItem={renderItem}
                    />

                </View>
            </View>
            {/* <CameraScreen
            style={{flex:99}}
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            hideControls={true} // (default false) optional, hides camera controls
            showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
            /> */}
            <Camera
            style={{flex:9}}
            ref={(ref) => (camera=ref)}
            saveToCameraRoll={true}
            cameraType={CameraType.Back} // front/back(default)
            />
            <View style={{flex:3,backgroundColor:'white',flexDirection:'row'}}>
                <View style={{flex:1}}/>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}></TouchableOpacity>
                </View>
                <View style={{flex:1}}/>
            </View>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'white',
        width:responsiveScreenWidth(20),
        height:responsiveScreenWidth(20),
        borderRadius:50,
        borderColor:'purple',
        borderWidth:4,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
export default CameraPage;