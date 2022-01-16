import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from "firebase/app";
const Tab = createMaterialTopTabNavigator();


function Activity() {
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
                      if(data1.data().service==user){
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
<Text style={styles.mainText}>name : {item.customer_name}</Text>
    <Text style={styles.mainText}>price : {item.price} $</Text>
    <Text style={styles.mainText}>Staff : {item.staff.name} $</Text>
</View>

<Text style={styles.mainText}>{item.date}</Text>
<Text style={styles.mainText}>time : {item.time}</Text>
</TouchableOpacity>

                          </>
                      )
                  }
              )
          }

        {/* <Text style={styles.heading}>No new activity</Text>
        
        <Image
        source={require('../../../../images/activity.png')}
        style={{ width: '50%', height: '25%' }}
      /> */}
      </View>
    );
  }
  
  function News() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>No new news</Text>
        <Image
        source={require('../../../../images/news.png')}
        style={{ width: '50%', height: '25%' }}
      />
      </View>
    );
  }

export default function Notifications() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    labelStyle: { fontSize: 14 },
                    tabStyle: { flex: 1, justifyContent: 'center' },
                    indicatorStyle: {
                        marginHorizontal: '5%',
                        width: '40%'
                    },
                }}
            >
                <Tab.Screen name="Activity" component={Activity} />
                <Tab.Screen name="News" component={News} />
            </Tab.Navigator>
        </>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignItems: 'center', 
    },
    heading: {
        fontSize: 20,
        margin: 25,
        fontWeight: 'bold',
        color: '#5B5A59',
        marginTop:-50
    },
})