import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from "firebase/app";
export default function Bookings() {
    const db=firebase.firestore();
    const user=firebase.auth().currentUser.uid;
    const [bookings,setbookings]=useState([]);
    const [check,setcheck]=useState(true);
    useEffect(() => {
        db.collection('bookings').get().then(
        
            (data)=>{
                var temp=[];
                data.docs.map(
                    (data1)=>{
                        if(data1.data().customer_id==user){
                            temp.push(data1.data());
                        }
                      
                    }
                   
                )
             setbookings(temp);
            }
        )
    }, [check])

    return (
        <View style={styles.container}>
          {
              bookings.map(
                  (item)=>{
                      return(
                          <>
                            <TouchableOpacity style={styles.tabContainer}>

<FontAwesome name="calendar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
<View style={styles.textContainer}>
<Text style={styles.mainText}>{item.service_name}</Text>
   
    <Text style={styles.mainText}>time : {item.time}</Text>
    <Text style={styles.mainText}>price : {item.price} $</Text>
</View>

<Text style={styles.mainText}>{item.date}</Text>
</TouchableOpacity>

                          </>
                      )
                  }
              )
          }
           

         

          

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 30
    },
    tabContainer: {
        flexDirection: 'row',
        width: '90%',
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
    }
})