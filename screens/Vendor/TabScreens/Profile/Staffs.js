import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function StaffDetails({ route, navigation }) {


    const [staffs, setStaffs] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Current Staff Details</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddStaff')
                    }
                    }
                    style={styles.addButton}
                >
                    <AntDesign name="plus" size={20} style={{ color: '#D7D9D9' }} />
                </TouchableOpacity>

            </View>
            <ScrollView style={{ height: 10, marginHorizontal: -10 }}>
                {staffs.map((item, key) => (

                    <TouchableOpacity style={styles.tabContainer} key={key}>
                        <AntDesign name="user" size={24} style={{ marginRight: 10, top: 4 }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Staff {item.id}</Text>
                            <Text style={styles.subText}>Tap to view Details</Text>
                        </View>


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
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
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
        marginBottom: 20

    },
    mainText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15
    }

})