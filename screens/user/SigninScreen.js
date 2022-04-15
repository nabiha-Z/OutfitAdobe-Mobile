import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../components/context';
const API_URL = 'https://outfit-adobe-server.herokuapp.com';
// const API_URL = 'http://192.168.100.2:8000';

const SignInScreen = ({ check, setCheck }) => {

    console.log("params check: ", check)
    const navigation = useNavigation();
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });


    const { signIn } = React.useContext(AuthContext);

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

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
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

    const loginHandle = async () => {

        if (data.email.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        else {
            await fetch(`${API_URL}/user/login`, {

                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
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
                            var currentUser = jsonRes.user._id;
                            currentUser = JSON.stringify(currentUser)
                            const token = jsonRes.token;
                            signIn(currentUser, token);
                            setCheck(check ? false : true)
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

            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.header}>
                <Text style={styles.text_header}>LogIn</Text>
            </LinearGradient>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer]}
            >
                <Text style={[styles.text_footer]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#4B4E4F"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
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
                        <Text style={styles.errorMsg}>email must be 4 characters long.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#4B4E4F"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
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
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle() }}
                    >

                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Sign In</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupScreen')}
                        style={[styles.signIn, {
                            backgroundColor: 'transparent',
                            borderColor: '#D89E92',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#D89E92'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7AA9E'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#D89E92'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});