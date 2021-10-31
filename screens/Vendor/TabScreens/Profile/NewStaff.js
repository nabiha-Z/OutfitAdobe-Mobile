import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { initializeApp, getApps, getApp, } from "firebase/app";
import firebaseConfig from '../../../../Firebase/FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";

export default function Profile(router, navigation) {


    const [getcolor, setcolor] = useState(null);
    const [getyear, setyear] = useState(null);
    const [getEngine, setEngine] = useState(null);
    const [getmodal, setmodal] = useState(null);
    const [getmake, setmake] = useState(null);
    const [geturl, seturl] = useState("");

    const insertItem = () => {

        if(getmake!=null && getmodal!=null && getcolor!=null & getyear!=null & getEngine!=null){
        var requestOptions = {
          method: 'POST',
          body: JSON.stringify({
            make: getmake,
            engine:getEngine,
            modal:getmodal,
            year:getyear,
            photo:geturl,
            color:getcolor
            
          }),
        }}else{
            alert("Fill out all fields");
          }
    }


    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    const auth = getAuth(app);



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white'}}>
      <Text style={styles.title}>Add a new Car</Text>
      <Text style={styles.textInner}>Make</Text>
    <TextInput 
      style={styles.inputField}
      placeholder='Enter Make (e.g:Toyota)'
      value={getmake}
      onChangeText={text => setmake(text)}
      />
      <Text style={styles.textInner}>Model</Text>
      <TextInput 
      style={styles.inputField}
      placeholder='Enter Modal (e.g:Corolla)'
      value={getmodal}
      onChangeText={text => setmodal(text)}
      />
      <Text style={styles.textInner}>Manufacuring year</Text>
      <TextInput 
      style={styles.inputField}
      keyboardType = 'number-pad'
      placeholder='Enter year (e.g:2016)'
      value={getyear}
      onChangeText={text => setyear(text)}
      />
      <Text style={styles.textInner}>Engine Power</Text>
      <TextInput 
      style={styles.inputField}
      placeholder='Enter Modal (e.g:(e.g. 1600cc)'
      value={getEngine}
      onChangeText={text => setEngine(text)}
      />
      <Text style={styles.textInner}>Color</Text>
      <TextInput 
      style={styles.inputField}
     
      placeholder='Enter Color'
      value={getcolor}
      onChangeText={text => setcolor(text)}
      />
      <Text style={styles.textInner}>Image </Text>
      <TextInput 
      style={styles.inputField}
     
      placeholder='Enter image url'
      value={geturl}
      onChangeText={text => seturl(text)}
      />
       <TouchableOpacity
           onPress={insertItem}
          style={styles.addButton}
      >
      <Text style={{color:'#D7D9D9'}}>Add Item</Text>
      </TouchableOpacity>
      
    
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 0,
        paddingTop: 30,
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        paddingBottom: 20,
        marginBottom: 10
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },
    imgContainer: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        padding: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    imgLabel: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#3F3E40',

    }
})