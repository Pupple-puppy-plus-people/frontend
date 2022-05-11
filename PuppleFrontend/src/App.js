/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigator from './Navigator';
import FilterDogList from './DogList/FilterComponent/FilterDogList';
import RoomCheck from './DogAuth/DogAuthComponent/RoomCheck'
//템플릿 구현 후 삭제
import TimeStamp from './Template/TimeStamp/';
import Walk from './Template/Walk';
import WalkPassCondition from './Template/WalkPassCondition'

const App = () => {
  const [walkDay, setWalkDay] = useState(7);
  const [walkTime, setWalkTime] = useState(30);
  const [walkDistance, setWalkDistance] = useState(2500);
  function setAllData(walkDayNew,walkTimeNew,walkDistanceNew){
    setWalkDay(walkDayNew);
    setWalkTime(walkTimeNew);
    setWalkDistance(walkDistanceNew);
  }
  useEffect(()=>{
    console.log(walkDay,walkTime,walkDistance)
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <Navigator/>
    // <Walk/>  
    <WalkPassCondition
    setAllData={setAllData}/>
    //<FilterDogList/>
    //<RoomCheck/>
    //<TimeStamp/>
  );
};


export default App;
