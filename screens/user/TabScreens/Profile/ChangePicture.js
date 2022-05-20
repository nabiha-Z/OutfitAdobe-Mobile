import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image } from 'react-native';
import { AntDesign, FontAwesome, Entypo, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';


export default function ChangePicture({ route, navigation }) {
    const [image, setImage] = useState(null);
    const width = Dimensions.get('window').width;
    // const API_URL = 'https://outfit-adobe-server.herokuapp.com';
    const API_URL = 'http://192.168.100.8:8000';

    const currentUser = async () => {

        var user = await AsyncStorage.getItem('user');
        await fetch(`${API_URL}/user/loginuser`, {

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
                        console.log("user: ", jsonRes.user)
                        setImage(jsonRes.user.picture)

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

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })
        currentUser()
    }, [])



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            // base64: true,
            aspect: [4, 4]
        });

        if (!result.cancelled) {
            console.log("result.uri: ",result.uri)
            setImage(result.uri);
        }
    };
    
    const upload = async (picture) => {
        var user = await AsyncStorage.getItem('user');
        console.log("type: ", typeof (user))
        await fetch(`${API_URL}/user/changePicture`, {

            method: "POST",
            body: JSON.stringify({
                user,
                picture
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        alert("changed");
                        navigation.pop()

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

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Change Profile Picture</Text>
            {/* <Text style={{ color: '#A3A5A7', extAlign: 'center', marginLeft: 10 }}>Select from Gallery</Text> */}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.imageBtn} onPress={pickImage} >
                    <Entypo name="arrow-up" size={15} color="white" />
                    <Text style={{ color: 'white', textAlign: 'center', marginLeft: 10 }}>Select from Gallery</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <>
                    <Text style={[{ fontSize: 16, margin: 20, marginBottom: 0, fontWeight: 'bold', color: '#5D6571' }]}>Image Preview</Text>
                    <Text style={[{ fontSize: 12, margin: 20, marginTop: 5, color: '#5D6571' }]}>(Tap on the image below to remove it.)</Text>
                    <TouchableOpacity style={styles.selectedImgBtn} onPress={() => setImage(null)}>
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    </TouchableOpacity>
                </>)}
            <View style={[styles.nextBtn, { width: width * 0.9 }]}>
                <TouchableOpacity 
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: -10 }}
                onPress={()=>upload(null)}>
                    <EvilIcons name="trash" size={25} color="#E84545" />
                    <Text style={[styles.nextBtnTxt, { color: '#E84545', fontSize: 14 }]}> Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => upload(image)} style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', }}>
                    <Text style={styles.nextBtnTxt}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginTop: -90,
        color: '#7B7D80'
    },
    imageBtn: {
        flexDirection: 'row',
        backgroundColor: '#687EA3',
        padding: 10,
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 20,
        width: '55%',
        alignItems: 'center',
        textAlign: 'center',
        elevation: 20,
        shadowColor: '#0B1A34',
        justifyContent: 'center'
    },
    selectedImgBtn: {
        backgroundColor: '#E1E7F1',
        width: 190,
        height: 190,
        zIndex: 2,
        padding: 10,
        borderRadius: 40 / 2,
        marginTop: 20,
        marginLeft: 10
    },
    selectedImage: {
        width: 180,
        height: 180,
        borderRadius: 30 / 2,
        position: 'absolute',
        alignSelf: 'center',
        top: 5

    },
    nextBtn: {
        flexDirection: 'row',
        display: "flex",
        backgroundColor: 'white',
        marginTop: -30,
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 10,
        backgroundColor: 'white',
        marginTop: -30,
        bottom: 20,
        marginHorizontal: 10,
        height: 60,
        borderRadius: 10,
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#C6CBCA',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
            width: 10,
            height: 10
        },
        paddingHorizontal: 20,
    },
    nextBtnTxt: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: '200',
        color: '#2F5492',
    },
    icon: {
        fontSize: 20,
        textAlign: 'center',
        top: 2,
        color: '#2F5492',
    },
    footerImgBtn: {
        backgroundColor: '#E1E7F1',
        width: 35,
        height: 35,
        zIndex: 2,
        padding: 10,
        borderRadius: 35 / 2,
        marginTop: 20,
        marginLeft: 10
    },
    footerImage: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        position: 'absolute',
        alignSelf: 'center',
        top: 5

    },
    selectedImage: {
        width: 180,
        height: 180,
        borderRadius: 30 / 2,
        position: 'absolute',
        alignSelf: 'center',
        top: 5

    },
})