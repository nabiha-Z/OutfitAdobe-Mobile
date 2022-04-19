import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, EvilIcons, Feather } from '@expo/vector-icons';

export default function EmptyCart() {

    return(

    
    <View style={styles.container}>
        <View style={{ alignItems: 'center', marginHorizontal: 10, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={styles.subText}> Please Login into your account first.</Text>
            <Text style={{ color: '#799CAD' }}> Click on the Profile Icon below on the tab bar.</Text>
        </View>
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
    subText: {
        fontSize: 17,
        color: '#909193',
        margin:10,
        fontWeight:'bold'
    },
})

