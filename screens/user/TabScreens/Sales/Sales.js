import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Sales() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabContainer}>

                <FontAwesome name="calendar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>Hair Cut</Text>
                    <Text style={styles.subText}>Your booking to etc haircut saloon</Text>
                </View>
                <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
            </TouchableOpacity>

           

         

          

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