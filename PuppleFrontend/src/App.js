/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import Walk from './Template/Walk/';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <Navigator/>
    <Walk/>
    //<FilterDogList/>
    //<RoomCheck/>
    //<TimeStamp/>
  );
};


export default App;
