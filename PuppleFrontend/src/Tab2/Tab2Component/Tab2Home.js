
//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, Component} from 'react';
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
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

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
let USER_TYPE = 1;  // 0 이면 입양인, 1이면 입양처, 로그인 정보 받아오기

// 사진 같은 경우 image url이 https 로 시작해야한다.  
const DATA = [
  {
    id : 1,
    registration_number : 9845239851386541,
    image : 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1263&fileTy=ADOPTTHUMB&fileNo=1&thumbTy=L',
    name : 'test',
    gender : '수컷',
    kind : '리트리버',
    desexing : '중성',
    age : '2(세) 3(개월)',
    location : '종로구',
    size : '대형',
    hair_loss : '많이 빠짐',
    bark_term : '안 짖음',
    activity : '높음',
    person_personality : '활발함',
    adoptation_status : 'N',
    introduction : '장난감도 좋아하고 사람을 너무 좋아하는 활발한 겨자예요~긴급구호로 센터에 입소하게 된 겨자와 까치는 한 집에서 구조된 친구들이예요.짧은 다리로 오종종~ 우다다~ 하면서 간식도 잘 받아먹고, 장난감을 보면웃음이 얼굴에서 떠나지 않아요!!!견종 특유의 활발함과 호기심이 많아요~다른 강아지들과 크게 문제없이 잘 지내고 있습니다.(관심 두지 않아요. 공격성 없습니다.)패드배변 훈련중이고 어느정도 가리고 있어요,시간이 지나면 더 잘할 것 같습니다.사람에게 친화적이다보니 분리불안 증상이 있습니다.기본 지시어인 앉아, 기다려 등 어느정도 훈련도 되어 있습니다.꾸준한 훈련으로 멋진 반려견을 만들어주세요.장난감을 보면 흥분도가 최고조로 찍은 우리 익살꾸러기 겨자!!처음 반려견을 맞이하는 가족 또는 어린 아이가 있는 가정 등 어느 가정과도 적합해요.다만, 하울링이 있어 어느정도 방음이 잘 되어 있거나, 소음에 대한 민원이 문제가 되지 않는 환경이면 좋겠습니다.매력적인 웃음을 지닌 화끈한 겨자의 평생가족이 되어주세요.겨자를 카페에서 더 볼 수있습니다. https://cafe.naver.com/seoulanimalcare/3709',
    approval : '승인',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '멍뭉이',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1604&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '인절미',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1301&fileTy=ADOPTTHUMB&fileNo=1&thumbTy=L',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '나른이',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1501&fileTy=ADOPTTHUMB&fileNo=1&thumbTy=L'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '단추',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1541&fileTy=ADOPTTHUMB&fileNo=1&thumbTy=L',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '곱셈이',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1342&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '점박이',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1421&fileTy=ADOPTTHUMB&fileNo=2&thumbTy=L',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '나눔이',
    photo: 'https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1381&fileTy=ADOPTTHUMB&fileNo=1&thumbTy=L',
  },
  
];

/**
 * 반려견 리스트 가져오기 - hook으로 만드는 건가?
 */



  /*useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });*/


function Item({item, navigation}) {
  const [parentHeight, setParentHeight] = useState({height:0}); // 동적인 값 관리
  const [imagePos, setimagePos] = useState({X:0, Y:0}); // 동적인 값 관리

  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
    setParentHeight({height:height});
  };

  const onLayoutImage=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout; // position (x, y), size (height, width)
    setimagePos({X:x, Y:y});
  };

  return (
          <Pressable style={styles.dogCard} onLayout={onLayout} 
            backgroundColor='white' // background가 필요한지 모르겠음, 이미 dogCard에 있는데 
            activeOpacity={1}
            onPress={()=>{
            navigation.navigate({
              name:'EnrollPage',
              params: { aboutDog : item},
              merge:true,
            })
            }}
            // onLongPress 길게 누르면 삭제 될 수 있게 하기 
          >
          
          <View style={{alignSelf:'center'}} >
            <Image source={{uri: item.photo}} onLayout={onLayoutImage} 
              style={ {width: parentHeight.height/2,
              height:parentHeight.height/2,
              borderRadius:50,
              margin: '3%'}}/>
            {/* 입양처가 새로운 인증절차 확인할 것 있을 때 new state 나타내는 알림 표시, 크기 반응형 확인*/}
            <View style={[styles.add, {bottom:imagePos.X, right:imagePos.Y}]}>
              <Icon name="circle" size={25} color='lightgreen'/>
            </View>
          </View>

          <Text style={styles.btnTitle}>{item.title}</Text>
          <Text style={styles.btnText}>{2022-2021}살 {5}개월</Text>
          <Text style={styles.btnText}>{"수컷"} (중성화 {0}) </Text>
          <Text style={styles.btnText}>{"서울시 동작구"}</Text>

        </Pressable> 
  )
}

/*


                <View style={{alignItems: 'center', width: '100%', marginTop: '3%'}}>
                
                반려견 리스트는 TouchableOpacity로 구현하지 말고 Pressable로 구현해서 꾹 누르면 삭제 버튼 뜰 수 있게 한다
                //<Pressable></Pressable>

                //</View>

*/


var Listlen = 1;


function Authenticate ({navigation}) {
    const [type, setType] = useState(""); // 이거 다른 코드랑 많이 겹치는데 어떻게 못 합치나?
    const {width, height} = useWindowDimensions();
    
    // 반려견 리스트 정보
    const renderItem = ({ item }) => (
      <Item item={item} navigation={navigation}/>
    );


    return (
        /* 노치 디자인에도 안전하게 화면의 콘텐츠를 확보할수 있음 */
        <SafeAreaView style={styles.container}>  
          
            <View style={{justifyContent: 'center', width: "100%", height: "100%"}}>

                {/* 리스트에 아무것도 없다면 */}
                {(Listlen==0)? 
                 /* 입양인/입양처로 로그인 유무에 따른 Empty Data 내용 다름 */
                    <EmptyDogList user={USER_TYPE} /> 
                  : 
                /* 반려견 리스트 */  
                  <FlatList
                    data={DATA}
                    numColumns={2}  // column의 개수
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      //marginBottom: 5,
                    }}
                    keyExtractor={item => item.id}
                  
                    renderItem={renderItem}
                  />
                }
                {/*마지막 홀수번째 리스트 이상함*/ }
            </View> 
            
      
           {/* 만약에 입양처로 로그인한다면*/}
            {USER_TYPE === 1 ? <EnrollButton navigation={navigation}/> : null}
  
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
    text: {
      fontSize: 42,
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