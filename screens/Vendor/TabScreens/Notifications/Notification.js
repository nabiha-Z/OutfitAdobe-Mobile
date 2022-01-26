import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from "firebase/app";
import { FontAwesome } from '@expo/vector-icons';
const Tab = createMaterialTopTabNavigator();


function Activity() {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser.uid;
    const [bookings, setbookings] = useState([]);
    const [check, setcheck] = useState(true);
    useEffect(() => {
        db.collection('bookings').get().then(

            (data) => {
                var temp = [];
                data.docs.map(
                    (data1) => {
                        if (data1.data().service == user) {
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
             <Text style={styles.heading}>New Bookings</Text>
            {
                bookings.map(
                    (item) => {
                        return (
                            <>
                                <TouchableOpacity style={styles.tabContainer}>
                                   
                                    <FontAwesome name="calendar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.mainText}>{item.service_name}</Text>
                                        <Text style={styles.mainText}>name : {item.customer_name}</Text>
                                        <Text style={styles.mainText}>price : {item.price} $</Text>
                                        <Text style={styles.mainText}>Staff : {item.staff.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.mainText}>  {item.date}</Text>
                                        <Text style={styles.mainText}>{item.time}</Text>
                                    </View>
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
                        width: '40%',
                        color:'#FADF3A',
                        backgroundColor:'#FADF3A'
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
        color: '#63625E',
        marginTop: -50,
        marginBottom:30
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