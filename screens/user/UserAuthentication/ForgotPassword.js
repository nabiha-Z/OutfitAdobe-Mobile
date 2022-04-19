import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function ForgotPassword({ route, navigation }) {
    const [Email, setEmail] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const API_URL = 'https://outfit-adobe-server.herokuapp.com';
    const API_URL = 'http://192.168.100.2:8000';

    const [data, setData] = React.useState({
        email: '',
        check_textInputChange: false,
        isValidUser: true,
    });

    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="small" color="white" />
            </>
        );
    };

    const textInputChange = (val) => {
        if (val.trim().length >= 10) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const sendCode = async () => {
        
        setIsLoading(true);
        if (data.email.length == 0) {
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        else {
            await fetch(`${API_URL}/user/forgotpassword`, {

                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

                .then(async res => {
                    try {

                        const jsonRes = await res.json();

                        if (jsonRes.message === true) {

                            setIsLoading(false);
                            console.log("sent ", data.email);
                            alert("Check your email");
                            navigation.navigate('CodeVerification', { email: data.email, code: jsonRes.resetCode });
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
    }

    return (
        <View style={styles.container}>

            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color: '#5B5A59' }}>
                Recover Password
            </Text>
            <Text
                style={styles.txt}>
                Enter your email to recover your account
            </Text>
            <Text
                style={[styles.txt, { marginTop: 2 }]}>
                A Reset Link will be sent to your registered email
            </Text>

            <Text style={[styles.txt, { fontSize: 15, marginTop: 40, opacity: 1, marginBottom: 10 }]}>Email</Text>
            <View style={styles.action}>

                <TextInput
                    placeholder="Your email"
                    placeholderTextColor="#666666"
                    style={[styles.businessField]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ?
                    <Animatable.View
                        animation="bounceIn"
                        style={{ marginTop: -5, }}
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
            </View>
            {data.isValidUser ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Enter valid email</Text>
                </Animatable.View>
            }


            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => sendCode()}
                >
                    {isLoading ? <LoadingData /> : (
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Send Link</Text>
                    )}
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

    businessField: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        width: '100%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
        marginHorizontal: 10,
    },
    footerTab: {

        padding: 0,
        flex: 0.25,
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
    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    txt: {
        fontSize: 13,
        opacity: 0.8,
        marginTop: 5,
        marginHorizontal: 10,
        color: '#56616D',

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },


})