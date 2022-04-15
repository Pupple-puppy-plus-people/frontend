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
let selectedFilter = [
    {filter:'gender',value : ""},
    {filter:'kind',value : ""},
    {filter:'desexing',value : ""},
    {filter:'age',value : ""},
    {filter:'size',value : ""},
    {filter:'hair_loss',value : ""},
    {filter:'bark_term',value : ""},
    {filter:'activity',value : ""},
    {filter:'person_personality',value : ""},
]
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
            {whatFilter !== 1 &&
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
            {whatFilter ===1 &&
            <View style={{flexDirection:'row',alignItems:'center'}}>
                {indexRange(0)}
                {indexRange(3)}
                {indexRange(6)}
            </View>
            }
            
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
    ['리트리버','보스턴테리어','믹스','스피츠','닥스훈트','말티즈','웰시코기','푸들','포메라 니안'],
    ['중성','미중성'],
    ['~1','2~4','5~8','9~'],
    ['소형','중형','대형'],
    ['덜 빠짐','많이 빠짐'],
    ['안 짖음','자주 짖음'],
    ['적음','보통','높음'],
    ['차분함','활발함']    
];
  
const FilterDogList = ({navigation}) => {
    const handleValueChange = (filterNumber, checkboxId) => {
        // do what ever you want with this two
        selectedFilter[filterNumber].value = choicesName[filterNumber][checkboxId]
        
      };
    const renderItem=()=>{
        return(
            <View style={styles.container}>
            {data.map((x) => (
            <Choice
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
            <View style={{flexDirection:'row',
            marginHorizontal:responsiveScreenWidth(10),
            marginVertical:responsiveScreenHeight(1),
            justifyContent:'space-around'}}>
                <TouchableOpacity
                style={{
                    backgroundColor:'#ab4ec7',
                    borderRadius:100,
                    width:responsiveScreenHeight(15),
                    height:responsiveScreenHeight(6),
                    alignItems:'center',
                    justifyContent:'center',
                    }}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    backgroundColor:'#ab4ec7',
                    borderRadius:100,
                    width:responsiveScreenHeight(15),
                    height:responsiveScreenHeight(6),
                    alignItems:'center',
                    justifyContent:'center',
                    }}
                    onPress={() => {
                        query = 
                        '?'+
                        'gender='+selectedFilter[0].value+'&'+
                        'kind='+selectedFilter[1].value+'&'+
                        'desexing='+selectedFilter[2].value+'&'+
                        'size='+selectedFilter[4].value+'&'+
                        'hair_loss='+selectedFilter[5].value+'&'+
                        'bark_term='+selectedFilter[6].value+'&'+
                        'activity='+selectedFilter[7].value+'&'+
                        'person_personality='+selectedFilter[8].value
                        axios.get(baseUrl+'/api/dogs'+query)
                        .then(function (response){
                            //success
                            console.log(baseUrl+'/api/dogs'+query)
                            console.log(response.data);
                        })
                        .catch(function (error){
                            //error
                        });
                        navigation.goBack()
                    }}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>적용</Text>
                </TouchableOpacity>
            </View>
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
export default FilterDogList;