import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, ActivityIndicator } from 'react-native';
import { AntDesign, EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Measurements({ navigation }) {

    const [user, setUser] = useState([]);
    const [image, setImage] = useState(null);
    const [userMeasurements, setUserMeasurements] = useState([]);
    const [measuremenets, setMeasuremenets] = useState("");
    const [img, setImg] = useState("");
    const [shoulders, setShoulders] = useState("");
    const [fullLength, setFullLength] = useState("");
    const [KneeL, setKneeL] = useState("");
    const [armsL, setArmsL] = useState("");
    const [waistL, setWaistL] = useState("");
    const [shirtL, setShirtL] = useState("");
    const [bottomL, setBottomL] = useState("");
    const [check, setCheck] = useState(false);
    const [showModal, setSetModal] = useState(false);
    const [fetchingData, setFetching] = useState(false);

    const colors = ["#C2E4EE", "#B2DBD6", "#D2B1B1", "#D0D4FA"];
    const API_URL = 'https://outfit-adobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.2:8000';
    var uid = "";

    const currentUser = async () => {
        setFetching(true)
        uid = await AsyncStorage.getItem('user');
        await fetch(`${API_URL}/user/getMeassurements`, {

            method: "POST",
            body: JSON.stringify({
                uid,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        setUserMeasurements(jsonRes.measurement)
                        setFetching(false);

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


    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="large" color="#E7AA9E" />
                {/* <Text style={{ paddingTop: 20, color: '#DEBF4D', textAlign: 'center' }}>
              Loading Data from JSON Placeholder API ...
            </Text> */}
            </>
        );
    };

    const ModalPopup = () => {

        {showModal ? (<Modal>
            
            </Modal>):""}

    }


    return (
        <View style={styles.container}>
            {fetchingData ? <LoadingData /> : (
                <>
                    {userMeasurements.length === 0 ? (

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                            <Text style={styles.lightHeading}>Start of with our body tracking feature to get your body measurements</Text>
                            <TouchableOpacity style={styles.measuremenetBtn} onPress={() => navigation.navigate('CameraScreen')}>
                                <Text style={styles.txt}>Take Measurements</Text>
                                <Ionicons name="camera" color="white" size={18} />
                            </TouchableOpacity>

                        </View>


                    ) : (<ScrollView style={{ height: 50, marginHorizontal: 4, padding: 5 }}>

                        <Text style={styles.lightHeading}>Your Body Measurements</Text>
                        <View style={{ margin: 10 }}></View>
                        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('CameraScreen')}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Shoulders</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('favourites')}>
                            <AntDesign name="hearto" size={26} style={styles.icon} />

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
                    </ScrollView>)}
                </>
            )}
        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
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
        margin: 40

    },
    imgLabel: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#3F3E40',

    },
    lightHeading: {
        marginHorizontal: 20,
        fontSize: 16,
        margin: 30,
        // marginTop:0,
        // marginBottom:50,
        color: '#959292',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
        color: '#7E8183',
        width: '9%',
    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: 80,
    },
    measuremenetBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#9C626B',
        padding: 10,
        color: 'rgb(238, 235, 235)',

    },
    txt: {
        color: 'rgb(238, 235, 235)',
        fontWeight: 'bold',
    }
})