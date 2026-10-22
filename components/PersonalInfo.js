import { Text, SafeAreaView, TextInput, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import DatePicker from '../components/DatePicker.js';
import {useState} from 'react';


export default function PersonalInfo({screenstyle, data, setData}) {

  const [dob, setDob] = useState(new Date("2000-01-01"));
 
  const [showDTP,setShowDTP] = useState(false);
  function showDatePicker(){
    setShowDTP(true);
  }
  function hideDatePicker(value){
    setDob(value);
    setShowDTP(false);
  }
  return (
    <View style={screenstyle}>
      <View style={styles.label}><Text style={styles.label}>Firstname</Text></View>
      <TextInput style={styles.textbox} placeholder="Enter your first name"/>
      <Text style={styles.label}>Lastname</Text>
      <TextInput style={styles.textbox} placeholder="Enter your last name"/>  
      <DatePicker thisDate={dob} setThisdate={setDob} datelabel="Date of Birth" />
    </View>
  );
}

const styles = StyleSheet.create({ 
  label: {
    flexDirection:"row",
    fontSize: 24,
    fontWeight: "bold",
  },
  textbox:  {
    flexDirection: "row",
    borderRadius: 5,
    padding: 7,
    border: "1px solid black",
    width: "100%",
    fontSize: 24,
    marginBottom: 14,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#0569FF',
    borderColor: '#0569FF'
  }
  
});
