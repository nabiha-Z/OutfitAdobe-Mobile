import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

import { LinearGradient } from 'expo-linear-gradient';
import {firebaseConfig} from '../Firebase/FirebaseConfig';
import firebase from "firebase/app";

function HomeScreen({ route, navigation }) {
    firebase.initializeApp(firebaseConfig);

    return (
        <View style={{ backgroundColor: '#A59393', height: '100%' }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <Image
                source={require('../images/logo2.png')}
                style={{ width: '100%', height: '30%', marginTop: 90 }}
            />
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 0,
                    color: '#FFFFFF',
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>
                Welcome to One Queue
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('VendorSignup')}><Text style={styles.Txt}>Become a vendor</Text></TouchableOpacity>
            <View style={[styles.emailBtn, styles.elevation]}>
                <Text onPress={() => navigation.navigate('LoginScreen')}>Continue with email</Text>
            </View>
            <Text style={styles.bottomTxt}> or connect with</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft:5}}>
               <TouchableOpacity style={styles.bottomView}>
               
                    <Icon name='google' style={styles.icons} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomView}>
                    <Image
                        source={require('../images/apple.png')}
                        style={[styles.icons,{ width: '10%', height: '25%', alignSelf: 'center', padding: 16,}]}
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
        backgroundColor: '#FFFFFF',
        padding: 15,
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
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
        color: '#FFFFFF',
        margin: 10,
        alignSelf: 'center'

    },
    Txt: {
        color: '#FFFFFF',
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
    }


});
export default HomeScreen;
