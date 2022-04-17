import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { AsyncStorage } from 'react-native';
import { StyleSheet, TextInput, View, YellowBox, Button,Text } from 'react-native'
import firebase from "firebase/app";
import {firebaseConfig} from '../../../../Firebase/FirebaseConfig';


// YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])



export default function Chats({route, navigation}) {
   
   

   
    return <View> </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
