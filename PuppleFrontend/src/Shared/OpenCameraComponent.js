import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import React, {Component, useCallback,useState,useEffect} from 'react';

const OpenCamera = (props) => {
    const photoData = [];
    
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
            props.setPhotoData([...photoData,response.assets[0].base64]) //access like this
        }
    });
    //launchImageLibrary(options, setPickerResponse);
    //console.log(pickerResponse);
};

export default OpenCamera;