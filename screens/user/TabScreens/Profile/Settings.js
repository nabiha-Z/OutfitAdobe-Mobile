import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase/app'
import SwitchToggle from "react-native-switch-toggle";
import firebaseConfig from '../../../../Firebase/FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings({ route, navigation }) {

    const colors = ["#C2E4EE", "#B2DBD6", "#D2B1B1", "#D0D4FA"];
    const [toggle, setToggle] = useState(false);

    if (!firebase.apps.length) {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();


    return (
        <View style={styles.container}>


            <View style={styles.upperContainer}>

                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(26, 62, 103,0.8)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.text}>Settings</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../../../../images/user.png')}
                        style={{ width: '7%', height: '100%' }}
                    />
                    <Text style={{ fontSize: 16, color: 'white', letterSpacing: 2, marginLeft: 10 }} >{auth.currentUser.displayName}</Text>
                </View>
            </View>
            <View style={styles.lowerContainer}>


                <ScrollView style={{ height: 20, padding: 10}}>
                    <TouchableOpacity style={styles.tabContainer} >

                        <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Personal Details</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 50, top: 5 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate('user_Password')}>
                        <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Change Passwords</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 50, top: 5 }} />
                    </TouchableOpacity>

                    
                </ScrollView>

                <View style={styles.footerTab}>
                    <TouchableOpacity
                        style={styles.footerBtn}
                        onPress={() => navigation.pop()}
                    >
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Done</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E4E4E7',
        paddingBottom: 20,
        marginBottom: 10,
        padding:10
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8,
        color: '#6D6D6F',
        fontWeight:'bold'
        
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },
    imgContainer: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        padding: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    imgLabel: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#3F3E40',

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '80%',
    },
    upperContainer: {
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#7DABDE',
        width: '100%',
        height: '40%',
    },
    lowerContainer: {
        backgroundColor: 'white',
        width: '85%',
        height: '65%',
        borderRadius: 5,
        marginTop: -80,
    },
    ViewContainer: {
        width: '80%',
        padding: 10,
        margin: 5
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -25,
        marginBottom: 6,
        letterSpacing: 3,
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
        borderRadius:5
    },
})