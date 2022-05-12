import axios from 'axios';
import React, {useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { FlatList } from "react-native-gesture-handler";

const baseUrl = 'http:127.0.0.1:8000';
let query = '?';
function filterRequest(){

}

//         selectedFilter[filterNumber].value = choicesName[filterNumber][checkboxId]



const data = [
    //{ title : '성별', filterNumber : 0},
    //{ title : '품종', filterNumber : 1},
    //{ title : '중성화', filterNumber : 2},
    { title : '나이', filterNumber : 0},
    { title : '크기', filterNumber : 1},
    { title : '털 빠짐', filterNumber : 2},
    { title : '짖기', filterNumber : 3},
    { title : '활동성', filterNumber : 4},
    { title : '잘맞는 성격', filterNumber : 5},
];
  
const choicesName=[
    //['수컷','암컷'],
    //['리트리버','보스턴테리어','믹스','스피츠','닥스훈트','말티즈','웰시코기','푸들','포메라 니안'],
    //['중성','미중성'],
    ['~1','2~4','5~8','9~'],
    ['소형','중형','대형'],
    ['덜 빠짐','많이 빠짐'],
    ['안 짖음','자주 짖음'],
    ['적음','보통','높음'],
    ['차분함','활발함']    
];
const Checkbox = ({
    id,
    btnstyles,
    btnstylesSelect,
    checked,
    selectedIndex,
    onCheckboxChange,
    choicesName,
    }) => {
    return selectedIndex !== id ? (
        <TouchableOpacity
        style={btnstyles}
        onPress={() => {
            onCheckboxChange(id);
        }}>
            <Text style={{textAlign:'center'}}>{choicesName[id]}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
        style={btnstylesSelect}
        onPress={() => {
            onCheckboxChange(id);
        }}>
            <Text style={{textAlign:'center'}}>{choicesName[id]}</Text>
        </TouchableOpacity>
    );
};
  
const Choice = ({
    selectedFilter, // 이거 추가해줬는데, 바꿀 순 있음
    callback,
    text,
    btnstyles,
    btnTxtStyles,
    btnstylesSelect,
    btnTxtStylesSelect,
    onValueChange,
    choicesCount,
    choicesName,
    whatFilter,
    }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleCheckboxChange = (id) => {
        if(selectedIndex === id){
            setSelectedIndex(-1)
            selectedFilter[whatFilter].value = ""
            
        }else{
            setSelectedIndex(id)
            if (onValueChange) {
                onValueChange(whatFilter, id);
            }
        }
    };
    const indexRange = (start) =>{
       return (
        <View style={{flexDirection:'column',alignItems:'center'}}>
            <Checkbox
                id={start}
                btnstyles={btnstyles}
                btnstylesSelect={btnstylesSelect}
                selectedIndex={selectedIndex}
                onCheckboxChange={handleCheckboxChange}
                choicesName={choicesName}
            />
            <Checkbox
                id={start+1}
                btnstyles={btnstyles}
                btnstylesSelect={btnstylesSelect}
                selectedIndex={selectedIndex}
                onCheckboxChange={handleCheckboxChange}
                choicesName={choicesName}
            />
            <Checkbox
                id={start+2}
                btnstyles={btnstyles}
                btnstylesSelect={btnstylesSelect}
                selectedIndex={selectedIndex}
                onCheckboxChange={handleCheckboxChange}
                choicesName={choicesName}
            />
        </View>
       );
    };
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={btnTxtStyles}>
                <Text>{text}</Text>
            </View>
            {
               Array.from({length: choicesCount}).map((item, index) => (
                    <Checkbox
                    id={index}
                    btnstyles={btnstyles}
                    btnstylesSelect={btnstylesSelect}
                    selectedIndex={selectedIndex}
                    onCheckboxChange={handleCheckboxChange}
                    choicesName={choicesName}
                    />
                ))
            }
           
        </View>
    );
};

  
const SelectDogInfo = ({navigation, selectedFilter}) => {
    const handleValueChange = (filterNumber, checkboxId) => {
        // do what ever you want with this two
        selectedFilter[filterNumber].value = choicesName[filterNumber][checkboxId]
        
      };
    const renderItem=()=>{
        return(
            <View style={styles.container}>
            {data.map((x) => (
            <Choice
                selectedFilter={selectedFilter}
                text={x.title}
                whatFilter={x.filterNumber}
                btnTxtStyles={styles.btnTxtStyles}
                btnstyles={styles.btnstyles}
                btnstylesSelect={styles.btnstylesSelect}
                onValueChange={handleValueChange}
                choicesCount={choicesName[x.filterNumber].length}
                choicesName={choicesName[x.filterNumber]}
            />
            ))}

        </View>
        );
    }
    return (
        <FlatList
            data={[{id:0}]}
            renderItem={renderItem}
            listKey={new Date().getTime().toString()}
            contentContainerStyle={flex=1}/>
    );
};

const checkBoxBaseStyles = {
    height: responsiveScreenHeight(6),
    width: responsiveScreenHeight(6),
    margin: 10,
};

const labelDimentions = {
  width: 100
};

const styles = StyleSheet.create({
  btnstyles: {
    ...checkBoxBaseStyles,
    borderWidth: 1,
    borderColor: '#d3a4fc',
    borderRadius: 100,
    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
  },
  btnstylesSelect: {
    ...checkBoxBaseStyles,
    backgroundColor: '#d3a4fc',
    borderRadius: 100,
    justifyContent: 'center',
  },
  btnTxtStyles: {
    ...labelDimentions,
    alignItems: 'center',
  },
});
export default SelectDogInfo;