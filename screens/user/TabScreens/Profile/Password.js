import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase/app';

export default function Contact({ route, navigation }) {
    const [oldPass, setOldPass] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [errors, setErrors] = useState("");
    const [confirmPass, setConfirmPass] = useState(null);
    const auth = firebase.auth();


    const change = () => {

    }
 
    return (
        <View style={styles.container}>

            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color: '#5B5A59' }}>
                Change Password
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Enter new password to reset the password
            </Text>
            <Text style={styles.errorsTxt}>{errors}</Text>

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Current Password
            </Text>
            <TextInput style={styles.businessField} value={oldPass} onChangeText={(text) => setOldPass(text)} />
            
            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                New Password
            </Text>
            <TextInput style={styles.businessField} value={newPass}  onChangeText={(text) => setNewPass(text)} />

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Confirm Password
            </Text>
            <TextInput style={styles.businessField} value={confirmPass}  onChangeText={(text) => setConfirmPass(text)} />

            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => navigation.pop()}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        paddingTop: 20,
        paddingRight: 40,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#5B5A59'
    },
    desc: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 5,
    },
    businessField: {
        width: '90%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
        marginHorizontal: 10,
    },
    footerTab: {

        padding: 0,
        flex: 0.3,
        marginLeft: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',

    },
    footerBtn: {
        width: '100%',
        padding: 10,
        backgroundColor: '#1D4168',
        borderRadius: 5
    },


})