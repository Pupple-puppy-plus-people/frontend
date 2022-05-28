
//import resyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, Component, useCallback} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {navigation, useIsFocused} from '@react-navigation/native';

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


const width = Dimensions.get("window").width - 10; // container style에 paddingHorizontal*2
const height = Dimensions.get("window").height;


const Stack = createStackNavigator();


//&****************************** 로그인 정보로 받아와야함 ****************************// 

function Authenticate ({navigation}) {
  const isFocused = useIsFocused();
    const [type, setType] = useState("");
    const {width, height} = useWindowDimensions();
    const [dogs, setDogs] = useState([{}]) 

      // dog list 받아옴
      React.useEffect(()=> {
        // 구매자로 들어올때 
        if (USER_INFO.USER_TYPE == "customer"){ 
              let wish = []

              axios.post(`${HS_API_END_POINT}/api/users/wishlist/`,{ 
              email: USER_INFO.USER_EMAIL,}) 
                    .then((res)=> {
                        wish = res.data
                        console.log("구매자 wishlist Data 받음.");
  
                        dog_idx = []
                        for(dog in wish){
                          dog_idx.push(wish[dog].dog_id)
                          
                        }
                        console.log("id:", dog_idx)

                        axios.all(dog_idx.map((endpoint) => 
                        axios.get(`${HS_API_END_POINT}/api/dogs/list/${endpoint}/`))) //id= 으로 찾으려고 하면 오류남 Warning: Encountered two children with the same key, `:`
                        .then(
                          (data) => {
                            
                            wish_dog = []
                            for(dog in data){
                              wish_dog.push(data[dog].data)
                            }
                            setDogs(wish_dog)
                            //console.log("dog:", wish_dog)
                          }
                        );
  
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
          }else{  // 판매자로 들어올떄
              query = 
                  '?'+
                  'user_id='+USER_INFO.USER_ID 
                
               axios.get(`${HS_API_END_POINT}/api/dogs/list/${query}`)  
              .then((res)=> {      
                   console.log("판매자 등록한 Doglist Data 받음.");
                   setDogs(res.data);
               })
               .catch((err)=> {
                   console.log(err);
               })
          }
    },[isFocused]); // isFocused로 refresh시 state 업데이트 됨
      

    // 반려견 리스트 정보
    const renderItem = ({ item }) => (
      /* item: 아이템 배열
       * navigation: 네비게이션
       * icon: 표시할 아이콘 모양 */
      <Item item={item} navigation={navigation} icon={'circle'} nextPage='EnrollPage'/>
    );

    return (
        /* 노치 디자인에도 안전하게 화면의 콘텐츠를 확보할수 있음 */
        <SafeAreaView style={styles.container}>  
          
            <View style={{justifyContent: 'center', width: "100%", height: "100%"}}>

                {/* dog 리스트가 빈 리스트인지 확인*/}
                { Object.keys(dogs).length === 0 || Object.keys(dogs[0]).length === 0 ? 
                    /* 입양인/입양처에 따라 Empty Data 내용 다름 */
                    <EmptyDogList user={USER_INFO.USER_TYPE} /> 
                  : 
                  /* dog 리스트 */  
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
                {/*마지막 홀수번째 리스트 튀어나오는 현상, 이상함 -> flex 조정으로 해결*/ }
            </View> 
      
           {/* 판매자로 로그인시 등록 floating button 등장 */}
            {USER_INFO.USER_TYPE == "seller" ? <EnrollButton navigation={navigation} /> : null}
  
        </SafeAreaView>

    );
};
const Tab2Home = ({ navigation }) => {
  return (
    <Authenticate navigation={navigation}></Authenticate>
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