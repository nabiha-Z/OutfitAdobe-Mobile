import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function Bookings({ route, navigation }) {
 
    const [bookings, setbookings] = useState([]);
    const [check, setcheck] = useState(true);
    
    return (
        <View style={styles.container}>
            {/* {
                bookings.map(
                    (item, key) => {
                        return (
                            <>
                                <TouchableOpacity
                                    style={styles.tabContainer}
                                    onPress={() => { navigation.navigate('bookingdetails', { booking: item }) }}
                                    key={key}>

                                    <FontAwesome name="calendar" size={16} color="black" style={{ marginLeft: 5, marginRight: 10, top: 4 }} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.mainText}>{item.service_name}</Text>
                                        <Text style={styles.subText}>Date: {item.date}</Text>
                                        <Text style={styles.subText}>Time:{item.time}</Text>
                                     
                                    </View>
                                    <MaterialIcons name="keyboard-arrow-right" size={20} style={{ marginLeft: 30, top: 4 }} />
                                </TouchableOpacity>

                            </>
                        )
                    }
                )
            } */}
            <Text>Some Screen</Text>






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
        marginBottom: 10,
        marginHorizontal: 20
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8
    },
    subText: {
        fontSize: 13,
        color: '#75A4BB',
        lineHeight: 15,
    }
})