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
  FlatList,


} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Chip } from 'react-native-paper';
import AuthResultModal from './AuthResultModal';


const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;



const Item = (props) => {

    if(props.item.bool){
        return (
            <TouchableOpacity
                //activeOpacity={0.5}  
                underlayColor="#DDDDDD" 
                onPress={props.onPress}
                >
                <View>
                    <Modal  
                        animationType="fade" // 임시 코드
                        transparent={true}
                        visible={props.modalVisible}
                        onRequestClose={() => {
                        props.setModalVisible(!props.modalVisible)
                    }}>
                        
                        <Pressable // 모달 dispaly의 뒷배경 눌러도 버튼 취소 효과
                            style={[styles.iOSBackdrop, styles.backdrop]} onPress={() => props.setModalVisible(false)} />
                        
                        <View style={[styles.menu]}>

                            <View style={styles.modalView}>
                                <AuthResultModal 
                                selectedTitle={props.selectedTitle}
                                customerID={props.customerID}
                                dogID={props.dogID}
                                >

                                </AuthResultModal>
                            </View>
                            
                            <View style={{margin:"2%"}}></View> 
                            <View>
                                <TouchableOpacity 
                                    activeOpacity={0.8} 
                                    underlayColor="#DDDDDD" 
                                    onPress={() => 
                                        props.setModalVisible(false)
                                    }
                                    style={[styles.closeButton, {backgroundColor:'#FBEDFD'}]}
                                    >
                                    <Icon name='close' size={35} style={{color:'black'}}/>  
                                </TouchableOpacity> 
                            </View>

                        </View>
                    </Modal>
                <Chip style={styles.chip} textStyle={styles.chipText}> {props.item.title} </Chip>
                </View>
            </TouchableOpacity> 
        );
    }
    else{
        return (null);
    }
}

        
/* 혹시 필요하시면, {
    dogs (props.aboutDog)
    구매자 ID (props.customerID), 
    판매자 ID (props.sellerID) }는 넘겨받아왔어요!*/
const CustomToolBar = (props)=>  {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);
    
    let chiplist = [     // chip 리스트
        { title : '설문지', bool : true},
        { title : '동의서', bool : true},
        { title : '산책량 측정', bool : true},
        { title : '생활패턴 검증', bool : true},
        { title : '집 바닥재질 평가', bool : true},
        { title : '반려견 생활환경 평가', bool : true},
    ];
    
    if(!props.aboutDog.floor_auth){
        chiplist[4].bool=false
    }
    if(!props.aboutDog.house_auth){ // dogs에서 인증절차 여부에 따라 chiplist의 bool 바뀜
        chiplist[5].bool=false
    }

    const renderItem = ({ item }) => (
        <Item 
        item={item}
        onPress={()=> {
            setModalVisible(true)
            setSelectedTitle(item.title)
        }}
        selectedTitle={selectedTitle}
        customerID={props.customerID}
        dogID={props.aboutDog.id}
        setModalVisible={setModalVisible} 
        modalVisible={modalVisible}
        
        />
    );

    return (

        <View style={{flex:1, flexDirection:'row'}}>
            <FlatList
                horizontal={true}   // 스크롤
                contentContainerStyle={{
                    flexDirection: 'row', // 횡
                    flexWrap: 'nowrap', // 줄바꿈
                }}
                data={chiplist}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                style={{alignSelf:'center'}}
            />
            <View style={{alignItems:"flex-end", justifyContent:'center', right:-20}}>
                <Icon name='chevron-right' size={responsiveScreenFontSize(5)} style={styles.slideIcon}></Icon>
            </View>

            
            {/* <Modal  
                animationType="fade" // 임시 코드
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                
                <Pressable // 모달 dispaly의 뒷배경 눌러도 버튼 취소 효과
                    style={[styles.iOSBackdrop, styles.backdrop]} onPress={() => setModalVisible(false)} />
                
                <View style={[styles.menu]}>

                    <View style={styles.modalView}>
                        <Document 
                        value={"hello"}
                        >

                        </Document>
                    </View>
                    
                    <View style={{margin:"2%"}}></View> 
                    <View>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            underlayColor="#DDDDDD" 
                            onPress={() => 
                                setModalVisible(false)
                            }
                            style={[styles.closeButton, {backgroundColor:'#FBEDFD'}]}
                            >
                            <Icon name='close' size={35} style={{color:'black'}}/>  
                        </TouchableOpacity> 
                    </View>

                </View>
            </Modal> */}
        </View>    

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    chip:{
        width:'auto',
        margin:4,
        backgroundColor:'#FBEDFD',
        borderWidth: 1,
        borderColor: 'rgba(153, 0, 255, 0.7)', // rgba(153, 0, 255, 0.7)
    },
    chipText:{
        fontSize:responsiveScreenFontSize(2),
        //fontWeight:'bold',
        color:'rgba(153, 0, 255, 0.7)',
    },
    slideIcon: {
        padding: 10,
        position: 'absolute',
        //alignSelf: 'center',
        color: 'white',
        shadowColor: "black", // #C9C9C9
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        //justifyContent:"flex-end"
    },
    modalView: {
        marginTop:'15%',width:'90%',height:'80%',alignSelf:'center',
        //backgroundColor:'#E9E0FF',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        //position: 'absolute',    

        borderRadius:100,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
        width:responsiveScreenHeight(6),   
        height:responsiveScreenHeight(6),

    }, 
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
    },conatiner_background:{
        backgroundColor: "#eedbff",
        borderRadius:15,
    },
})

export default CustomToolBar;