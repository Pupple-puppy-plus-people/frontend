import React, {Component, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView, 
  Alert,
  Modal,
  Pressable,
  Platform,


} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';


const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;




const EnrollButton = ({navigation})=>  {

    const [modalVisible, setModalVisible] = useState(false);
    const [buttonPos, setButtonPos] = useState({X:0, Y:0}); // 동적인 값 관리

    const onLayoutButton=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
        setButtonPos({X:x, Y:y});
    };

    return (
        
        //<View>
        <SafeAreaView style={styles.container}>
            
            <View style={{flex:1}}>
            <TouchableOpacity onLayout={onLayoutButton} 
                activeOpacity={0.8} /* 등록하기 버튼은 loginstate가 seller 일때만 보여짐 */
                underlayColor="#DDDDDD" 
                // 누른 상태에 따라 버튼 바뀜
                onPress={() => 
                    setModalVisible(true)
                }
                style={[styles.button, {backgroundColor:"#9C27B0"}]}
            >
                <Icon name={'plus'} size={35} style={{color:"white"}}/>  
            </TouchableOpacity> 
            
            {console.log("onLayout", buttonPos)}
            <Modal  animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                
                <Pressable // 모달 dispaly의 뒷배경 눌러도 버튼 취소 효과
                    style={[styles.iOSBackdrop, styles.backdrop]} onPress={() => setModalVisible(false)} />
                
                <View style={[styles.menu]}>

                    <TouchableOpacity 
                        style={[styles.menuEntry]}
                        onPress={() => {
                            navigation.navigate("EnrollStep1"),
                            setModalVisible(false)}}
                    >
                        <Text style={styles.btnTitle}>
                        <Icon name='home' size={responsiveScreenFontSize(2.5)}/>  
                        <Text > 동물보호소</Text>
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.menuEntry,]}
                        onPress={() => {navigation.navigate("EnrollStep1"),
                        setModalVisible(false)}}
                    >
                        <Text style={styles.btnTitle}>
                        <Icon name='human-greeting-variant' size={responsiveScreenFontSize(2.5)}/>  
                        <Text > 개인분양자</Text>
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity 
                        activeOpacity={0.8} /* 등록하기 버튼은 loginstate가 seller 일때만 보여짐 */
                        underlayColor="#DDDDDD" 
                        // 누른 상태에 따라 버튼 바뀜
                        onPress={() => 
                            setModalVisible(false)
                        }
                        style={[styles.button, {backgroundColor:'#FBEDFD'}, {X:buttonPos.X, Y:buttonPos.Y}]}
                    >
                        <Icon name='close' size={35} style={{color:'black'}}/>  
                    </TouchableOpacity> 


                </View>
            </Modal>
                
            </View>
        </SafeAreaView>
        //</View>             


    );
};
/**
 * 
 * <TouchableOpacity
                activeOpacity={0.8} /* 등록하기 버튼은 loginstate가 seller 일때만 보여짐 
                underlayColor="#DDDDDD" 
                // 누른 상태에 따라 버튼 바뀜
                onPress={() => 
                    !this.state.isPressed ? (
                    this.setState(
                    { iconName: "close", iconColor: 'black', isPressed:true, iconBackgroundColor:'#FBEDFD'}),
                    this.setModalVisible(!this.state.modalVisible)
                    )
                    :(this.setState(
                    { iconName: "plus", iconColor: 'white', isPressed:false, iconBackgroundColor:'#9C27B0'}))
                    
                }
                style={[styles.button, {backgroundColor:this.state.iconBackgroundColor}]}
            >
                <Icon name={this.state.iconName} size={35} style={{color:this.state.iconColor}}/>  
            </TouchableOpacity> 
 * 
 */
/*
            <FAB icon={props => <Icon name="plus" {...props} />} color="primary" />
*/ 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnTitle: {
        fontSize: responsiveScreenFontSize(2.5),
        margin: '2%',
        textAlign: 'center',
        width: "100%",
        position:'absolute'
    },
    menu: {
        flex: 1,
        bottom: "8%",       // 이거 modal 이 들어와도 살릴 수 있게 하기                                             
        right: "4.1%",

        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',    
    },
    menuEntry: {
        flex:1,
        bottom: "100%",     // menu 로부터 %                                               
        //right: "3%",
        backgroundColor:'#FBEDFD',
        borderRadius:15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
        width:150,   // resopnsive?
        height:40,

        marginHorizontal:0,
        marginVertical:5,

        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        flex: 1,
        marginHorizontal:0,
        marginVertical:10,

        //marginVertical:5,
        //borderRadius: 15,
        //padding: 15,
        //elevation: 2,
        //width: '45%', // 크기 강아지 리스트와 맞추기 // 이거 화면 크기가 정해져있어야함 -> 따라서 강아지 수 많으면 page number 기능 있는 리스트 필요
        //height: '66%',  
        //height: height/4,
        //width: width/2 - 15,
        justifyContent: 'center',
        alignItems: 'center',
        //resizeMode: 'contain',
        position: 'absolute',    

        bottom: "1%",                                                    
        right: "3%",
        //backgroundColor:'#9C27B0',
        borderRadius:100,

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
        width:70,   // resopnsive?
        height:70,

    },
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
     
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
   
})

export default EnrollButton;