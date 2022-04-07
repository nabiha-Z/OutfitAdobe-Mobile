import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

import { LinearGradient } from 'expo-linear-gradient';
import { firebaseConfig } from '../Firebase/FirebaseConfig';
import firebase from "firebase/app";

function HomeScreen({ route, navigation }) {

    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['rgba(12, 13, 15,0.9)', 'transparent']}
                style={styles.background}
            /> */}
            <Image
                source={require('../images/mainlogo.png')}
                style={{ width: '100%', height: '30%', marginTop: 90 }}
            />
            <Text
                style={styles.heading}>
                Welcome to One Queue
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('VendorLogin')}
                activeOpacity={0.6}>
                <Text style={styles.txt}>Become a vendor</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            activeOpacity={0.6}
            style={[styles.emailBtn, styles.elevation]}>
                <Text onPress={() => navigation.navigate('LoginScreen')} style={{ color: '#31302A' }}>Sign In with email</Text>
            </TouchableOpacity>
            <Text style={styles.bottomTxt}> or connect with</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 5 }}>
                <TouchableOpacity style={styles.bottomView}>

                    <Icon name='google' style={styles.icons} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomView}>
                    <Image
                        source={require('../images/apple.png')}
                        style={[styles.icons, { width: '10%', height: '25%', alignSelf: 'center', padding: 16, }]}
                    />

                </TouchableOpacity>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '90%',
        
    },
    emailBtn: {
        backgroundColor: '#ffd933',
        padding: 15,
        width: '70%',
        alignItems: 'center',
        marginTop: ' 40%',
        borderRadius: 5
    },
    elevation: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    bottomView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomTxt: {
        color: '#525251',
        margin: 10,
        alignSelf: 'center'

    },
    txt: {
        color: '#525251',
        margin: 10,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        opacity: 0.6
    },
    icons: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        margin: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#363635',
        textAlign: 'center'
    }


});
export default HomeScreen;
