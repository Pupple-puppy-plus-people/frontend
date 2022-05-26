
//import resyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, Component, useCallback} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {navigation} from '@react-navigation/native';

import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView,
    FlatList,
    Pressable, 
    useWindowDimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

import EnrollButton from './Shelter/EnrollButton'
import EmptyDogList from './EmptyList';
import axios from 'axios';
import { HS_API_END_POINT, USER_INFO } from '../../Shared/env';
import Item from './ItemComponent';
import DogListHome from '../../DogList/DogListComponent/DogListHome';

//import * as RNFS from 'react-native-fs'
//import axios from 'axios';
//import { HS_API_END_POINT } from '../../Shared/env';
//import { setJwt,setUserInfo } from '../Store/Actions';
//import { connect } from 'react-redux';

const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;


const Stack = createStackNavigator();

const USER = [
  {
    id: '0',
    title: '입양인',
  },
  {
    id: '1',
    title: '입양처',
  }
];
// 로그인 정보 조건문: 만약 입양처로 로그인했다면, 만약 입양인으로 로그인했다면에 따라 달라짐 -> 조건부 렌더링 알아보기
let USER_TYPE = 0;  // 0 이면 입양인, 1이면 입양처, 로그인 정보 받아오기
let USER_ID = 2;  // 판매자의 아이디임

var Listlen = 1;


function Authenticate ({navigation}) {
    const [type, setType] = useState("");
    const {width, height} = useWindowDimensions();
    const [dogs, setDogs] = useState([{}]) // USER_TYPE 바뀔때마다 dogs 비워줘야하는데 언제? ->  입양인, 입양처로 바꼈을 때 dogs 데이터가 남는 현상
    const [wishlist, setWishList] = useState([{}]) // USER_TYPE 바뀔때마다 dogs 비워줘야하는데 언제? ->  입양인, 입양처로 바꼈을 때 dogs 데이터가 남는 현상

      // -> 근데 로딩시간이 뭔가 문제인듯? --> 
      // 구매자 찜목록으로,    
      React.useEffect(()=> {   
        // (async function() {
          try { 
            //판매자
            if (USER_TYPE) {
              query = 
              '?'+
              'user_id='+USER_ID

            axios.get(`${HS_API_END_POINT}/api/dogs/${query}`)  
            .then((res)=> {      
                console.log("판매자 등록한 Data 받음.");
                setDogs(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
           }
           //구매자
           if (!USER_TYPE){ 

            let wish = []
            axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
            email: USER_INFO.USER_EMAIL,}) 
                  .then((res)=> {
                      wish = res.data
                      console.log("wishlist Data 받음.", wish);
                      // setWishList(wish);

                      wish_dog = []

                      for(dog in wish){
                        query = wish[dog].dog_id
                        axios.get(`${HS_API_END_POINT}/api/dogs/${query}`)
                          .then((res)=> {
                              wish_dog.push(res.data)
                              console.log("wish_dog: ", wish_dog.length)
                              setDogs(wish_dog)
                          })
                          .catch((err)=> {
                              console.log(err);
                          })
                      }

                  })
                  .catch((err)=> {
                      console.log(err);
                  })
        } } catch (e) {
              console.error(e);
            }
          // })();
      },[navigation]);

      


    // 반려견 리스트 정보
    const renderItem = ({ item }) => (
      // item: 아이템 배열
      // navigation: 네비게이션
      // icon: 표시할 아이콘 모양
      <Item item={item} navigation={navigation} icon={'circle'}/>
    );

    return (
        /* 노치 디자인에도 안전하게 화면의 콘텐츠를 확보할수 있음 */
        <SafeAreaView style={styles.container}>  
          
            <View style={{justifyContent: 'center', width: "100%", height: "100%"}}>

                {/* 리스트에 아무것도 없다면 */ console.log("dog 개수",Object.keys(dogs).length)}
                { Object.keys(dogs).length === 0 || Object.keys(dogs[0]).length === 0 ? 
                 /* 입양인/입양처로 로그인 유무에 따른 Empty Data 내용 다름 */
                    <EmptyDogList user={USER_TYPE} /> 
                  : 
                /* 반려견 리스트 */  
                  <FlatList
                    data={dogs}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}  // column의 개수
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      //marginBottom: 5,
                    }}/>
                }
                {/*마지막 홀수번째 리스트 이상함*/ }
            </View> 
            
      
           {/* 만약에 입양처로 로그인한다면 */}
            {USER_TYPE === 1 ? <EnrollButton navigation={navigation} /> : null}
  
        </SafeAreaView>

    );
};

const Tab2Home = ({ navigation,route }) => {
  const [type, setType] = useState("");
    const {width, height} = useWindowDimensions();
    const [dogs, setDogs] = useState([{}]) // USER_TYPE 바뀔때마다 dogs 비워줘야하는데 언제? ->  입양인, 입양처로 바꼈을 때 dogs 데이터가 남는 현상
    const [wishlist, setWishList] = useState([{}]) // USER_TYPE 바뀔때마다 dogs 비워줘야하는데 언제? ->  입양인, 입양처로 바꼈을 때 dogs 데이터가 남는 현상

      // -> 근데 로딩시간이 뭔가 문제인듯? --> 
      // 구매자 찜목록으로,    
      React.useEffect(()=> {   
          // (async function() {
            try { 
              //판매자
              if (USER_TYPE) {
                query = 
                '?'+
                'user_id='+USER_ID
  
              axios.get(`${HS_API_END_POINT}/api/dogs/${query}`)  
              .then((res)=> {      
                  console.log("판매자 등록한 Data 받음.");
                  setDogs(res.data);
              })
              .catch((err)=> {
                  console.log(err);
              })
             }
             //구매자
             if (!USER_TYPE){ 
  
              let wish = []
              axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
              email: USER_INFO.USER_EMAIL,}) 
                    .then((res)=> {
                        wish = res.data
                        console.log("wishlist Data 받음.", wish);
                        // setWishList(wish);
  
                        wish_dog = []
  
                        for(dog in wish){
                          query = wish[dog].dog_id
                          axios.get(`${HS_API_END_POINT}/api/dogs/${query}`)
                            .then((res)=> {
                                wish_dog.push(res.data)
                                console.log("wish_dog: ", wish_dog.length)
                                setDogs(wish_dog)
                            })
                            .catch((err)=> {
                                console.log(err);
                            })
                        }
  
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
          } } catch (e) {
                console.error(e);
              }
        
          // })();
      },[navigation]);

      


    // 반려견 리스트 정보
    const renderItem = ({ item }) => (
      // item: 아이템 배열
      // navigation: 네비게이션
      // icon: 표시할 아이콘 모양
      <Item item={item} navigation={navigation} icon={'circle'}/>
    );

    return (
        /* 노치 디자인에도 안전하게 화면의 콘텐츠를 확보할수 있음 */
        <SafeAreaView style={styles.container}>  
          
            <View style={{justifyContent: 'center', width: "100%", height: "100%"}}>

                {/* 리스트에 아무것도 없다면 */ console.log("dog 개수",Object.keys(dogs).length)}
                { Object.keys(dogs).length === 0 || Object.keys(dogs[0]).length === 0 ? 
                 /* 입양인/입양처로 로그인 유무에 따른 Empty Data 내용 다름 */
                    <EmptyDogList user={USER_TYPE} /> 
                  : 
                /* 반려견 리스트 */  
                  <FlatList
                    data={dogs}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}  // column의 개수
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      //marginBottom: 5,
                    }}/>
                }
                {/*마지막 홀수번째 리스트 이상함*/ }
            </View> 
            
      
           {/* 만약에 입양처로 로그인한다면 */}
            {USER_TYPE === 1 ? <EnrollButton navigation={navigation} /> : null}
  
        </SafeAreaView>

    );
};

// 스타일 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    scrollView: {
      //backgroundColor: 'pink',
      marginHorizontal: 0,
      flex: 1,
    },
    centerView: {
      flex: 1,
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
    button: {
        marginHorizontal:5,
        marginVertical:10,
        
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        width: '45%', // 크기 강아지 리스트와 맞추기 // 이거 화면 크기가 정해져있어야함 -> 따라서 강아지 수 많으면 page number 기능 있는 리스트 필요
        height: '65%',  
    },
    buttonOpen: {
      backgroundColor: "#white", // 
      borderWidth: 2, // 테투리 굵기  
      borderColor: '#C9C9C9', // 테투리 색상
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    
    btnTitle: {
      fontSize: responsiveScreenFontSize(2.5),
      margin: '2%',
      textAlign: 'center',
      width: "50%"
    },
    btnText: {
      fontSize: responsiveScreenFontSize(1.5),
      textAlign: 'center',
      width: "50%"  // 텍스트 길이 제한
    },
    dogCard: { 
      //flex: 1/2, -> 이거로 하니까 리스트 개수가 홀수개일 때 마지막 리스트 사이즈가 튀어나옴
      backgroundColor: 'white',
      
      margin: '2%',
      //borderWidth: 2, // 테투리 굵기  
      //borderColor: '#C9C9C9', // 테투리 색상
      borderRadius: 15, // 테투리 각도
      
      justifyContent: 'center', // 세로방향
      alignItems: 'center', // 가로방향
      
      height: height/4,
      width: '46%', // width/2로 하니까 더 옆으로 가서 잘림. 스크린 정의가 다른듯? %는 부모의 것을 기준으로 함
      
      // border 만 shadow: 배경색을 넣어주면 됨ㅋㅋ...
      shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
      shadowOpacity: 0.25,
      shadowRadius: 2,

      // flex:1, 
  },
  add: {
    backgroundColor:'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'white',
    borderWidth: 1,
    borderRadius: 30,
  },
})

export default Tab2Home;