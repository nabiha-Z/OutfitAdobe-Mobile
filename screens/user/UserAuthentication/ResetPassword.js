import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResetPassword({ route, navigation }) {
    const {email} = route.params;
    console.log("email: ", email);
    const [error, setError] = useState("");
    const [newPass, setNewPass] = useState("");
    const [errors, setErrors] = useState("");
    const [check, setCheck] = useState(true);
    const [token, setToken] = useState(null);
    const [secureTextEntry, setSecure] = useState(true);
    const [confirmPass, setConfirmPass] = useState("");
    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.2:8000';


    async function fetchData() {
        var userToken = await AsyncStorage.getItem('user');
        setToken(userToken);
        console.log("Token: ", userToken);
    }
    useEffect(() => {
        fetchData();
        console.log("check: ", check)
    }, [check])


    const updateSecureTextEntry = () => {
        setSecure(!secureTextEntry);
    }

    const updatePassword = async () => {

        if (newPass === confirmPass) {


            await fetch(`${API_URL}/user/resetpassword`, {

                method: "POST",
                body: JSON.stringify({
                    email: email,
                    pass: newPass
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

                .then(async res => {
                    try {

                        const jsonRes = await res.json();

                        if (jsonRes.message === true) {
                            setError("Passwords didn't matched");

                            console.log("logged in");
                            alert("Password Reset!")
                            navigation.navigate('Dashboard_user');
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
        } else {
            setError("Passwords didn't matched");
        }
    }
    return (
        <View style={styles.container}>

            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color: '#5B5A59' }}>
                Choose Password
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Enter new password to reset the password
            </Text>
            <Text style={styles.errorsTxt}>{errors}</Text>

            <View style={styles.action}>
            <TextInput
                placeholder="New Password"
                placeholderTextColor="#666666"
                secureTextEntry={secureTextEntry ? true : false}
                style={[styles.businessField]}
                autoCapitalize="none"
                value={newPass}
                onChangeText={(text) => setNewPass(text)}
            />
            <TouchableOpacity
                onPress={updateSecureTextEntry}
                style={{marginTop:8}}
            >
                {secureTextEntry ?
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}
                    />
                }
            </TouchableOpacity>
            </View>
            {newPass.length < 8 &&
                (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>)
            }

            <View style={styles.action}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={secureTextEntry ? true : false}
                    style={[styles.businessField]}
                    autoCapitalize="none"
                    value={confirmPass}
                    onChangeText={(text) => setConfirmPass(text)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                    style={{marginTop:8}}
                >
                    {secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>

            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{error}</Text>
            </Animatable.View>

            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => updatePassword()}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        paddingTop: 20,
        paddingRight: 40,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#5B5A59'
    },
    desc: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 5,
    },
    businessField: {
        width: '90%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
        marginHorizontal: 10,
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
        borderRadius: 5
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginLeft:10
    },


})