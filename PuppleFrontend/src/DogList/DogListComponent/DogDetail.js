//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
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
    ScrollView

} from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const DogDetail = ({item,id}) => {
    var genderStr="";
    if (item.gender=="f"){
        genderStr = "여";
    } else{
        genderStr = "남";
    }
    return (
        <View style={{backgroundColor:'#E9E0FF', width:'100%',height:'100%',borderRadius:15}}>

            <View style={{ flex: 4}}>
                <View style={{flex:1,borderTopLeftRadius:15,borderTopRightRadius:15}}>
                    <Image source={item.image} style={{ flex: 1, width: '100%', height: '100%',resizeMode:'cover',borderRadius:15}}  />
                    {/* <Image source={{uri:base64Image}} resizeMode='contain' style={{flex:1, width:'100%', height:'100%'}} /> */}
                </View>
            </View>
            <View style={{flex:0.8, alignContent:'center',justifyContent:'center'}}>
                {/* <View style={{flex:8, justifyContent:'center'}}>
                    <Text style={{textAlign:'center',fontSize:responsiveScreenFontSize(3.5),fontWeight:'bold'}}>{item.name}</Text>
                </View>                     */}
                <TouchableOpacity
                style={{alignItems:'center',justifyContent:'center'}}>
                    <Icon name="heart-o" size={30} color="black" />

                </TouchableOpacity>
                {/* 
                <View style={{flex:0.5}}>
                <Icon name="times-circle" size={30} color="black" />
                </View> */}
                

            </View>
            <View style={{marginHorizontal:10,borderTopColor:'gray',borderTopWidth:2}}/>

            <View style={{flex:8}}>
                <ScrollView
                style={{flex:1}}>
                    <View style={{margin:10}}>

                    <View style={{flexDirection:'row',height:responsiveScreenHeight(5),alignContent:'center',marginHorizontal:responsiveScreenWidth(10)}}>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, fontSize:responsiveScreenFontSize(3)}}>이름</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList,textAlign:'right',fontSize:responsiveScreenFontSize(3)}}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                            
                            <Text style={styles.textList}>나이</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.age} 살</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>성별</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{genderStr}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>중성화 여부</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.desexing}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>크기</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.size}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>털빠짐 정도</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.hair_loss}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>짖음 정도</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.bark_term}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>활동성</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.activity}</Text>
                        </View>
                    </View>
                    <View style={{...styles.textBox, flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,}}>
                        <Text style={styles.textList}>입양처 위치</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{...styles.textList, textAlign:'right'}}>{item.location}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',margin:10, flex:1,backgroundColor:'white',borderRadius:15,padding:5}}>
                        <Text style={{...styles.textList,margin:5}}>이 친구는요...</Text>
                        <Text style={{margin:5}}>{item.introduction}</Text>
                    </View>
                           
                            
                            
                            
                    </View>
                            
    {/*                         
                            <Text>입양처 위치</Text>
                            <Text>맺음비(가격)</Text> */}

                </ScrollView>
            </View>
            

        </View>
    );
}
const styles = StyleSheet.create({
    textList:{
        fontSize:responsiveScreenFontSize(2.5),
        fontWeight:'bold',
        textAlign:'left'
    },
    textBox: {
        marginLeft:responsiveScreenWidth(10),
        marginRight:responsiveScreenWidth(10),
        justifyContent:'center',
        marginVertical:5,

    },
});

export default DogDetail;