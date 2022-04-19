import React, { useEffect, useState } from 'react';
import {
    Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Modal, Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export default function CodeVerification({route, navigation }) {

    // const [image, setImage] = useState(null);
    const [data, setData] = React.useState({
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: '',
        isValidOTP: true,
    });


    const {email, code} = route.params;
    console.log("email: ", email);
    console.log("code: ", code);
    const width = Dimensions.get('window').width;
    // const API_URL = 'https://outfit-adobe-server.herokuapp.com';
    const API_URL = 'http://192.168.100.2:8000';

    // useEffect(() => {

    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })
    // }, [])

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         // base64: true,
    //         aspect: [2, 3]
    //     });

    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };


    const sendCode = async () => {

        await fetch(`${API_URL}/user/forgotpassword`, {

            method: "POST",
            body: JSON.stringify({
                email: email,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {

                        console.log("logged in");
                        alert("Check your email");
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

    const validateCode = () => {

        const userCode = data.digit1 + '' + data.digit2 + '' + data.digit3 + '' + data.digit4;
        console.log("userCode: ", typeof(userCode))
        console.log("code: ", typeof(code))
        let otp = code.toString();
        console.log("otp: ", typeof(otp))
        if (otp === userCode) {
            setData({
                ...data,
                isValidOTP: true
            })
            navigation.navigate('ResetScreen', { email: email })
        } else {
            console.log("wrong");
            setData({
                ...data,
                isValidOTP: false
            })
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>OTP Verification</Text>
            <Text style={{ color: '#A3A5A7', textAlign: 'center', marginLeft: 10 }}>Enter the OTP Code Below</Text>
            <View style={styles.codeBtns}>
                <TextInput 
                keyboardType='numeric' 
                maxLength={1}
                style={styles.textbox} 
                value={data.digit1} 
                onChangeText={(val) =>setData({...data, digit1: val})} />

                <TextInput 
                keyboardType='numeric' 
                maxLength={11}
                style={styles.textbox} value={data.digit2} 
                onChangeText={(val) =>setData({...data,digit2: val})} />

                <TextInput 
                keyboardType='numeric'
                 maxLength={1} 
                style={styles.textbox} 
                value={data.digit3} 
                onChangeText={(val) => setData({ ...data,digit3: val})} />

                <TextInput 
                keyboardType='numeric' 
                maxLength={11}
                style={styles.textbox} 
                value={data.digit4} 
                onChangeText={(val) =>setData({...data,digit4: val})} />
            </View>

            {!data.isValidOTP &&
                <>
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Invalid OTP Code</Text>
                    </Animatable.View>
                </>
            }


            <TouchableOpacity onPress={() => sendCode()}>
                <Text style={styles.resendbtn}>Resend Code</Text>
            </TouchableOpacity>


            <View style={[styles.nextBtn, { width: width * 0.9 }]}>
                <TouchableOpacity onPress={() => validateCode()} style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={styles.nextBtnTxt}>Next</Text>
                    < MaterialIcons name="keyboard-arrow-right" style={styles.icon} />
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
        marginTop: -190,
        color: '#484A4D'
    },
    imageBtn: {
        flexDirection: 'row',
        backgroundColor: '#687EA3',
        padding: 10,
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 20,
        width: '45%',
        alignItems: 'center',
        textAlign: 'center',
        elevation: 20,
        shadowColor: '#0B1A34',
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
    codeBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    textbox: {
        width: 50,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: '#AEAFB0',
        margin: 10,
        borderRadius: 6,
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'#616263'
    },
    resendbtn: {
        textDecorationLine: 'underline',
        color: '#518FD3'
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
        justifyContent: 'flex-end',
        height: 60,
        borderRadius: 10,
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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },

})