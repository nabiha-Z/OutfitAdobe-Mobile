import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import SwitchToggle from "react-native-switch-toggle";
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings({ route, navigation }) {

    const colors = ["#C2E4EE", "#B2DBD6", "#D2B1B1", "#D0D4FA"];
    const [toggle, setToggle] = useState(false);



    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(26, 62, 103,0.6)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.text}>Settings</Text>
                <View style={{ flexDirection: 'row' }}>
                   <AntDesign name="user" size={20} style={[styles.icon,{color:'white', marginRight:-5}]}/>
                    <Text style={{ fontSize: 16, color: 'white', letterSpacing: 2, marginLeft: 10 }} >Biya</Text>
                </View>
            </View>
            <View style={styles.lowerContainer}>


                <ScrollView style={{ height: 20, padding: 10}}>
                    <TouchableOpacity style={styles.tabContainer} >

                    <AntDesign name="user" size={20} style={[styles.icon]}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Personal Details</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate('user_Password')}>
                        <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Change Passwords</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabContainer} onPress={()=>navigation.navigate('change_picture')}>
                        <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 10, top: 4 }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Change Picture</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
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
        backgroundColor: '#D1A2A2',
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
        backgroundColor: '#D1A2A2',
        borderRadius:5
    },
    icon:{
        marginRight:10,
        alignSelf:'center',
        color:'#7E8183',
        width:'9%',
    }
})