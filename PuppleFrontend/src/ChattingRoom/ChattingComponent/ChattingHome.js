
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
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

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
//import * as RNFS from 'react-native-fs'
//import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';

const ChattingHome = ({navigation})=>{
      
    return (
        <SafeAreaView style={styles.container}>
  
            
          <TouchableWithoutFeedback 
            // onPress={() => removeButtonVisible && setRemoveButtonVisible(false)}
          >
            <View>
                <View>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        // onPress={() => setModal(true)}
                    >
                        <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>
                            나의 조건과 맞는 반려견 추천받기
                        </Text>
                    </Pressable>
                </View>
                <View style={{alignItems: 'center', width: '100%', marginTop: '3%'}}>
                <Text style={{
                    textAlign: 'left',
                    width: '90%',
                    marginBottom: '1%',
                    fontSize: responsiveScreenFontSize(1.5),
                    fontWeight: '600',
                    
                }}>보관함 </Text>
                <View style={{width: '90%', borderBottomWidth: 1, borderBottomColor: 'gray'}}/>
                </View>
            </View>
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback 
            onPress={() => removeButtonVisible && setRemoveButtonVisible(false)}
          >
            <FlatList
              data={bookData}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={refreshItems}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              numColumns={numColumns}
              />
          </TouchableWithoutFeedback> */}
  
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    bookBox: {
        margin:'5%',
        alignItems:'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    pressItemStyle: { 
        height: '90%',
        alignItems:'center',
        shadowColor: 'gray',
        shadowOffset: {
          width: 3,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 30
    },
    image: {
      width: '100%',
      height: '100%',
      borderWidth:1,
      borderColor: '#C2C2C2',
      borderRadius: 5

    },
    title: {
        width: '100%',
        textAlign: 'center',
        height: '10%',
        overflow: 'hidden',
        fontSize: responsiveScreenFontSize(0.9)
    },
    removeButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'red',
      position: 'absolute',
      alignSelf: 'flex-end',
      marginTop: 5,
      zIndex: 10
    },
    button: {
        marginHorizontal:5,
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#9C27B0",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },

})

export default ChattingHome;