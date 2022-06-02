
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
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
    RefreshControl,
    TouchableWithoutFeedback,
    ScrollView,
    Modal

} from 'react-native';
//import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import DogDetail from './DogDetail';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import { isMessageIgnored } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import PullToRefreshViewNativeComponent from 'react-native/Libraries/Components/RefreshControl/PullToRefreshViewNativeComponent';

// import * as RNFS from 'react-native-fs'
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';




const DogListHome = ({ navigation,route }) => {
    
    const [detailVisible, setDetailVisible] = useState(false);
    //const [partBookPurchaseVisible, setPartBookPurchaseVisible] = useState(false);
    const [selectedDog, setSelectedDog] = useState({});
    const [selectedDogId, setSelectedDogId] = useState({});
    const [heartDogId, setHeartDogId] = useState([]);
    const [backBoard, setBackBoard] = useState({backgroundColor:'white'})
    const [dogs, setDogs] = useState([])
    

    React.useEffect(()=> {
        if(route.params?.dogs){
            setDogs(route.params?.dogs)
        }
        else{
            axios.get(`${HS_API_END_POINT}/api/dogs/list/`)
            .then((res)=> {      
                console.log("dogs Data 받음.");
                setDogs(res.data);
                // console.log("처음 받은 개들", res.data);

                //console.log(dogs.image);
                // handleBookObj("allBook",res.data.data);
                // handleBookObj("workBook", res.data.data.filter(item => item.category === '문제집'))
                // handleBookObj("majorBook", res.data.data.filter(item => item.category === '전공도서'))
                // handleBookObj("otherBook", res.data.data.filter(item => item.category === '기타'))
            })
            .catch((err)=> {
                console.log(err);
            })
            axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{"email":USER_INFO.USER_EMAIL})
            .then((res)=>{
                console.log(res.data);
                var array=[];
                for(x=0;x<res.data.length;x++){
                    console.log("x: ",x," dog_id : ",res.data[x].dog_id);
                    array.push(res.data[x].dog_id)
                }

                setHeartDogId(array); 
                console.log(heartDogId);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[route.params?.dogs]); 

    const Item = ({ item }) => {
        // const base64Image = 'data:image/jpeg;base64,' + item.bookCoverResource;
        const [isHeart, setIsHeart] = useState((heartDogId.indexOf(item.id)<0)?false:true);
        var genderStr="";
        if(item){
            if (item.gender=="암컷"){
                genderStr = "여";
            } else{
                genderStr = "남";
            }
            var imageStr;
            if(item.image[0]==='h'){
                //`data:image/jpeg;base64,${item.image.substring(2, item.image.length-1)}`
                imageStr = {uri: item.image};
                //imageStr = {uri: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1584&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L'}
                // console.log("->", imageStr)
            }else{
                imageStr = {uri: `data:image/jpeg;base64,${item.image}`}
            }
        // console.log(item.image);
        
            // console.log("imageStr", dogs);

            return (
                
                <TouchableOpacity 
                style={styles.dogCard}
                onPress={
                    ()=>{
                        setSelectedDog(item);
                        setSelectedDogId(item.id);
                        setDetailVisible(true);
                        setBackBoard({backgroundColor:'gray'});
                    }
                }
                >
                    <View style={{ flex: 1,alignItems:'center',justifyContent:'center'}}>
                        {/* 지금 http에 s가 다빠져있어서 오류나서 임시로 다 넣어놓음 */}
                        {imageStr && <Image source={imageStr} style={{ width:responsiveScreenHeight(12),height: responsiveScreenHeight(12),resizeMode:'cover',borderRadius:50 }}  />}
                    </View>
                    <View style={{ flex: 1,marginTop:3}}>
                    {!isHeart && <Icon name="heart-o" size={15} color="black" style={{alignSelf:'center',margin:2}} />}
                    {isHeart && <Icon name="heart" size={15} color="red" style={{alignSelf:'center',margin:2}} />}
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(2), textAlign: 'center',fontWeight:'bold',marginBottom:3 }}>{item.name}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flex:1, marginLeft:0, justifyContent:'center'}}>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'right' }}>성별   :</Text>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'right' }}>중성화 :</Text>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'right' }}>지역   :</Text>
                        </View>
                        <View style={{flex:2.5,justifyContent:'center'}}>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'center' }}>{genderStr} </Text>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'center' }}>{item.desexing} </Text>
                            <Text style={{ fontSize: responsiveScreenFontSize(1.8), textAlign: 'center' }}>{item.location} </Text>
                        </View>
                    </View>
                    </View>
        
        
                </TouchableOpacity>
            );
        }
        else{
            return ;
        }

    }
    
    // const onRefresh = () => {
    //   setRefreshing(true);
    //   axios.get(`${HS_API_END_POINT}/book-purchase/book-list`)
    //           .then((res)=> {      
    //               console.log(res.data.data);
    //               handleBookObj("allBook",res.data.data);
    //               handleBookObj("workBook", res.data.data.filter(item => item.category === '문제집'))
    //               handleBookObj("majorBook", res.data.data.filter(item => item.category === '전공도서'))
    //               handleBookObj("otherBook", res.data.data.filter(item => item.category === '기타'))
    //               setRefreshing(false);
    //           })
    //           .catch((err)=> {
    //               console.log(err);
    //               setRefreshing(false);
    //       })
    // }
    const exitDogDetail = useCallback(() =>{
        setDetailVisible(false);
        setBackBoard({backgroundColor:'white'});
        axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{"email":USER_INFO.USER_EMAIL})
        .then((res)=>{
            console.log(res.data);
            var array=[];
            for(x=0;x<res.data.length;x++){
                console.log("x: ",x," dog_id : ",res.data[x].dog_id);
                array.push(res.data[x].dog_id)
            }

            setHeartDogId(array); 
            console.log(heartDogId);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[detailVisible]);
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (
        <SafeAreaView style={{...styles.container}}>
            <Modal
                visible = {detailVisible}
                animationType='slide'
                transparent={true}
                // isVisible={detailVisible}
                // useNativeDriver={true}
                // onBackdropPress={()=> setDetailVisible(false)}
                // onSwipeComplete={()=> setDetailVisible(false)}
                // swipeDirection="down"
                // hideModalContentWhileAnimating={true} 
            >   
                <View style={styles.modalView}>
                <DogDetail item={selectedDog} id={selectedDogId} heart={heartDogId} />
                <TouchableOpacity 
                        onPress={exitDogDetail} style={{alignContent:'flex-end'}}>
                        <Icon name="window-close" size={40} color="purple" />
                </TouchableOpacity>
                </View>
                
            </Modal>
            <View 
            //style={backBoard}
            >

                <View style={{flexDirection:'row'}}>
                    <Pressable
                        style={{...styles.buttonOpen,flex:1,
                            marginHorizontal: 5,
                            borderRadius: 15,
                            elevation: 2}}
                    // onPress={() => setModal(true)}
                        onPress={() =>
                        navigation.navigate('FilterDogList')}
                    >
                        <View style={{borderRadius:20,alignItems:'center',flexDirection:'row',padding:10, backgroundColor:'#E9E0FF'}}>
                            
                            <Icon2 name="menu" size={30} color="purple" style={{alignSelf:'center',marginHorizontal:10}} />
                            <Text style={{fontSize:responsiveFontSize(2),fontWeight:'bold',alignSelf:'center'}}>
                                원하는 조건의 강아지를 선택해 보세요!
                            </Text>
                        </View>
                    </Pressable>
                    
                </View>

                <SafeAreaView style={{ alignItems: 'center', width: '100%', marginTop: '3%' }}>
                    
                    <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'gray' }} />
                    
                    {dogs.length == 0? 
                        <Text style={{color:'#C9C9C9',fontWeight:'bold',textAlign:'center', alignSelf:'center', justifyContent:'center', marginTop:responsiveScreenHeight(30)}}>
                        <Icon name="search" size={50}/>
                        {'\n\n'} 검색된 반려견이 없어요. {'\n'} 다른 조건의 반려견도 만나보세요!
                        </Text>
                    : 
                        <FlatList
                        data={dogs}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        style={{alignSelf:'center',height:'93%'}}  
                        />
                    }
                    
                </SafeAreaView>
            </View>
            {/* </ScrollView>  */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    bookBox: {
        margin: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    pressItemStyle: {
        height: '90%',
        alignItems: 'center',
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
        borderWidth: 1,
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
        flex:1,
        marginHorizontal: 5,
        borderRadius: 15,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "white",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    dogCard:{
        backgroundColor: 'white', 
        width: '46%', 
        height: responsiveScreenHeight(25),
        margin:'2%',
        borderColor: 'rgba(153, 0, 255, 0.7)', 
        borderWidth: 0,
        borderRadius:15,
        shadowColor: 'rgba(153, 0, 255, 1)', //그림자색
        shadowOpacity: 0.2,//그림자 투명도
        shadowOffset: { width: 1, height: 1 }, //그림자 위치
    //ANDROID
        elevation: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginTop:'15%',width:'90%',height:'80%',alignSelf:'center',backgroundColor:'#E9E0FF',
        backgroundColor: '#E9E0FF',
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

})

export default DogListHome;