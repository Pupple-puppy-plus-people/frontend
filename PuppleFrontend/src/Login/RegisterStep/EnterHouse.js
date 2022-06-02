import React, {useState, createRef} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';


import Postcode from '@actbase/react-daum-postcode';


const EnterHouse = ({navigation,route}) => {

    const [isModal, setModal] = useState(false);
    
    const gotoNextScreen = (data) => {
        // alert(data.address);
        setModal(!isModal);
        navigation.navigate('EnterEmail',{types: route.params.types, names: route.params.names, address: data.address});
    }
    return (
        <View style={[styles.centeredView,{backgroundColor:'white',marginTop:0}]}>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={isModal}
            
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Postcode
                        style={{ width: responsiveWidth(80), height: 400 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={gotoNextScreen}
                        />
                    </View>
                    <View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModal(!isModal)}
                        >
                            <Text style={styles.textStyle}>나가기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{flex:1}}/>
            <View style={[styles.board,{backgroundColor:'#E1BEE7',flex:5,padding:30,borderRadius:20}]}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={styles.title}>Step 3.</Text>
                    <Text style={styles.title}>당신의 집은 어디인가요??</Text>
                    <Text style={{marginTop:10,fontSize: responsiveFontSize(2),color:'rgba(0,0,0,0.8)',textDecorationLine: 'underline'}}>어느 건물인지만 알려주세요!</Text>
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModal(true)}
                    >
                        <Text style={styles.textStyle}>클릭하여 주소찾기</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{flex:2}}/>
        </View>
    );
}
const styles = StyleSheet.create({
  board:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
},
    title: {
        fontSize: responsiveFontSize(3.5),
        fontWeight:'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
    button: {
        marginHorizontal:10,
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
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:responsiveFontSize(2)
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
export default EnterHouse;
                        // onSelected={data => {
                        // setModal(JSON.stringify(data.address));
                        
                        // }}