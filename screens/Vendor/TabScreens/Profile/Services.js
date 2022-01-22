import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from "firebase/app";
import { useSafeAreaFrame } from "react-native-safe-area-context";


export default function ServicesDetails({ route, navigation }) {
const auth=firebase.auth();
const db=firebase.firestore();

    const [staffs, setStaffs] = useState([]);
    const [check,setcheck]=useState(true);
    const deleteService=(uid)=>{
         db.collection('services').doc(uid).delete().then(
             (data)=>{
                 check?setcheck(false):setcheck(true);
                 Alert.alert("Staff Deleted Successfully");

             }
         )
    }
useEffect(()=>{
    console.log("current u :", auth.currentUser.uid)
 db.collection('services').get().then(
     
     (data)=>{
         var temp=[];
         data.docs.map(
             (data1)=>{
                 if(data1.data().store==auth.currentUser.uid){
                     var a=data1.data();
                     a.uid=data1.id;
                     console.log(a);
                      temp.push(a);
                      
                 }
                 
             }
            
         )
         setStaffs(temp);
     }
 )
},[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Current Services Details</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddService')
                    }
                    }
                    style={styles.addButton}
                >
                    <AntDesign name="plus" size={20} style={{ color: '#D7D9D9' }} />
                </TouchableOpacity>

            </View>
            <ScrollView style={{ height: 10, marginHorizontal: 10 }}>
                {staffs.map((item, key) => (

                    <TouchableOpacity style={styles.tabContainer} key={key}>
                        <Image style={styles.img} source={{uri:item.img}} />
                        {/* <AntDesign name="user" size={28} style={{ marginRight: 20, top: 4 }} /> */}
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>{item.name}</Text>
                            <Text style={styles.subText}>Detail : {item.detail}</Text>
                            <Text style={styles.subText}>From : {item.time1} to {item.time2}</Text>
                        </View>
                        <TouchableOpacity
                        onPress={()=>deleteService(item.uid)}
                        >
                        <AntDesign name="delete" size={20} style={{top: 4,color:'#D71212' }} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                ))}



            </ScrollView>
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
    heading: {
        fontSize: 25,
        marginTop: 17,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#5B5A59'
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
        fontSize: 14,
        color: '#717273',
        lineHeight: 20,
    },
    addButton: {
        backgroundColor: '#22524C',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        padding: 10,
        margin: 10,
        marginRight: 20,
    },
    header: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 20,
        marginHorizontal:10

    },
    mainText: {
        fontSize: 16,
        color: '#020202',
        fontWeight: 'bold'
    },
    img: {
        width:50,
        height:50,
        marginRight:10,
        borderRadius:25
    }
    

})