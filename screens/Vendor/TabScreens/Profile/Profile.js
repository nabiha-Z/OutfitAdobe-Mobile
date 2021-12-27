import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app'
import firebaseConfig from '../../../../Firebase/FirebaseConfig';
import { StackActions } from '@react-navigation/native';


import staff from '../../../../images/staff.png';
import inventory from '../../../../images/inventory.png';
import service from '../../../../images/service.png';
import setting from '../../../../images/settings.png';
import contact from '../../../../images/contact.png';
import logoutI from '../../../../images/logout.png';

export default function Profile({ route, navigation }) {

    const colors = ["#C2E4EE", "#B2DBD6", "#D2B1B1", "#D0D4FA"];

  
    const auth = firebase.auth();


    const logout = () => {

        auth.signOut().then(() => {
            console.log("signed Out")
            navigation.dispatch(
                StackActions.popToTop()
              );
        }).catch((error) => {
            console.log("Logout Error: ", error.message)
        });
    }
    return (
        <View style={styles.container}>



            <View style={{ alignItems: 'center' }}>
                <View style={[styles.imgContainer, { backgroundColor: colors[Math.floor(Math.random() * 5) + 0] }]}>
                    <Text style={styles.imgLabel}>{auth.currentUser.displayName}</Text>
                </View>
                <Text style={styles.imgLabel}>{auth.currentUser.displayName}</Text>
                <Text style={{ color: '#6791DA', marginBottom: 40 }}>My Profile</Text>
            </View>


            <ScrollView style={{ height: 20, marginHorizontal: -7, padding: 10 }}>
                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate("StaffDetails")}>

                <Image source={staff} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Staff</Text>
                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate("ServiceDetails")}>
                <Image source={service} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Services</Text>
                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                

                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate("ProductDetails")}> 
                <Image source={inventory} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Inventory</Text>

                    </View>
                    
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>


                <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate('ContactScreen')}>
                <Image source={contact} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Contact Center</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate('SettingScreen')}>
                <Image source={setting} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Settings</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer} onPress={logout}>
                <Image source={logoutI} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Logout</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>
                <View style={{ height: 150 }}>
                    <Text></Text>
                </View>
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
        marginBottom: 8,
        color: '#3C4C7E',
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
        fontSize: 20,
        color: '#3F3E40',

    }
})