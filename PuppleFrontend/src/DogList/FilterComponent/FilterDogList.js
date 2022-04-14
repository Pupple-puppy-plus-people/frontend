import React, {useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

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
            <Text>{choicesName[id]}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
        style={btnstylesSelect}
        onPress={() => {
            onCheckboxChange(id);
        }}>
            <Text>{choicesName[id]}</Text>
        </TouchableOpacity>
    );
};
  
const Choice = ({
    callback,
    text,
    btnstyles,
    btnTxtStyles,
    btnstylesSelect,
    btnTxtStylesSelect,
    onValueChange,
    choicesCount,
    choicesName
    }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleCheckboxChange = (id) => {
        setSelectedIndex(id)
        if (onValueChange) {
        onValueChange(text, id);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={btnTxtStyles}>
                <Text>{text}</Text>
            </View>
            {Array.from({length: choicesCount}).map((item, index) => (
            <Checkbox
                id={index}
                btnstyles={btnstyles}
                btnstylesSelect={btnstylesSelect}
                selectedIndex={selectedIndex}
                onCheckboxChange={handleCheckboxChange}
                choicesName={choicesName}
            />
            ))}
        </View>
    );
};

const data = [
    { title : '성별', filterNumber : 0},
    { title : '품종', filterNumber : 1},
    { title : '중성화', filterNumber : 2},
    { title : '나이', filterNumber : 3},
    { title : '크기', filterNumber : 4},
    { title : '털 빠짐', filterNumber : 5},
    { title : '짖기', filterNumber : 6},
    { title : '활동성', filterNumber : 7},
    { title : '당신의 성격', filterNumber : 8},
];
  
const choicesName=[
    ['수컷','암컷'],
    ['리트리버'],
    ['중성','미중성'],
    ['0','1','2','3'],
    ['소형','중형','대형'],
    ['덜 빠짐','많이 빠짐'],
    ['안 짖음','자주 짖음'],
    ['적음','보통','높음'],
    ['차분함','활발함']    
];
  
const FilterDogList = () => {
    const handleValueChange = (filtername, checkboxId) => {
        // do what ever you want with this two
      };
    
    return (
        <ScrollView>
            <View style={styles.container}>
                {data.map((x) => (
                <Choice
                    text={x.title}
                    btnTxtStyles={styles.btnTxtStyles}
                    btnstyles={styles.btnstyles}
                    btnstylesSelect={styles.btnstylesSelect}
                    onValueChange={handleValueChange}
                    choicesCount={choicesName[x.filterNumber].length}
                    choicesName={choicesName[x.filterNumber]}
                />
                ))}
            </View>
        </ScrollView>
    );
};

const checkBoxBaseStyles = {
    height: 40,
    width: 40,
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
    // backgroundColor: '#FFFFFF',
  },
  btnstylesSelect: {
    ...checkBoxBaseStyles,
    backgroundColor: '#d3a4fc',
    borderRadius: 100,
  },
  btnTxtStyles: {
    ...labelDimentions,
    alignItems: 'center',
  },
  choicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: labelDimentions.width
  },
});
export default FilterDogList;