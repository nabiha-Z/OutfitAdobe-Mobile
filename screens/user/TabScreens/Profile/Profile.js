import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { AntDesign, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import setting from '../../../../images/settings.png';
import contact from '../../../../images/contact.png';
import logout from '../../../../images/logout.png';
import { AuthContext } from '../../../../components/context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ check, setCheck }) {

    const navigation = useNavigation();
    const { signOut } = React.useContext(AuthContext);
    const [user, setUser] = useState([]);
    const [image, setImage] = useState(null);
    const colors = ["#C2E4EE", "#B2DBD6", "#D2B1B1", "#D0D4FA"];
    // const API_URL = 'https://outfit-adobe-server.herokuapp.com';
    const API_URL = 'http://192.168.100.8:8000';

    const currentUser = async () => {

        var user = await AsyncStorage.getItem('user');
        await fetch(`${API_URL}/user/currentuser`, {

            method: "POST",
            body: JSON.stringify({
                user,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        setUser(jsonRes.user)
                        setImage(jsonRes.user.picture)
                        console.log("user puicture: ", user.picture)

                    } else {
                        console.log("error found ", jsonRes.error)
                    }

                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log("error: ", err.message);
            });

    }
    useEffect(() => {
        currentUser()
    }, [])


    return (
        <View style={styles.container}>           
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.imgContainer, { backgroundColor: colors[Math.floor(Math.random() * 5) + 0] }]}>
                 
                    {user.picture!==null
                    ? <Image source={{uri: image}} style={styles.picture}/>
                    :  <Text style={styles.imgLabel}>B</Text>}
                </View>
                <Text style={styles.lightHeading}>nabihazubair100@gmil.com</Text>
                <Text style={{ color: '#6791DA', marginBottom: 40 }}>My Profile</Text>
            </View>


            <ScrollView style={{ height: 20, marginHorizontal: 7, padding: 10 }}>

                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('MeasurmenetScreen')}>
                    {/* <Image source={contact} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} /> */}
                    <Ionicons name="body-outline" size={30} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Measurements</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('favourites')}>
                    <AntDesign name="hearto" size={26} style={styles.icon} />
                    {/* <Image source={setting} style={{ width: '8%', height: '100%', alignSelf: 'center', marginRight:10 }} /> */}
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Favourites</Text>

                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('SettingScreen')}>
                    <AntDesign name='setting' size={28} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>Settings</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabContainer}>
                    <AntDesign name='logout' size={24} style={styles.icon} />
                    <TouchableOpacity style={styles.textContainer} onPress={async () => {
                        signOut()
                        setCheck(check ? false : true)
                        navigation.navigate('Dashboard_user')
                    }}>
                        <Text style={styles.mainText}>Logout</Text>
                    </TouchableOpacity>
                    <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
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
        width: '90%',
        marginBottom: 8,
        color: '#707173',
        fontWeight: 'bold',
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
        margin:40

    },
    imgLabel: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#3F3E40',

    },
    lightHeading: {
        fontSize: 15,
        color: '#3F3E40',
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
        color: '#7E8183',
        width: '9%',
    },
    picture:{
        width:150,
        height:150,
        borderRadius:80,
    },
})