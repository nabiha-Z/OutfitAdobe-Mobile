import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { initializeApp, getApps, getApp, } from "firebase/app";
import firebaseConfig from '../../../Firebase/FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";

export default function Profile(router, navigation) {

    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    const auth = getAuth(app);


    const logout = () => {
        signOut(auth).then(() => {
            console.log("signed Out")
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }]
            })
        }).catch((error) => {
            console.log("Logout Error: ", error.message)
        });
    }
    return (
        <View style={styles.container}>

            <ScrollView style={{ height: 20, marginHorizontal: -30 }}>
                <TouchableOpacity style={styles.tabContainer}>

                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Staff</Text>
                    </View>

                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Services</Text>
                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Resources</Text>
                    </View>

                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Inventory</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Contact Center</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Settings</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer} onPress={logout}>
                    <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Logout</Text>

                    </View>
                    <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                </TouchableOpacity>
            </ScrollView>
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