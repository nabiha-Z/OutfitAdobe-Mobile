import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

import { LinearGradient } from 'expo-linear-gradient';
const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
function HomeScreen({ route, navigation }) {


    return (
        <View style={{ backgroundColor: '#A59393', height: '100%' }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <Image
                source={require('../images/logo2.png')}
                style={{ width: '100%', height: '30%', marginTop: 90 }}
            />
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 0,
                    color: '#FFFFFF',
                    fontSize: 20,
                }}>
                Welcome to One Queue
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('VendorLogin')}><Text style={styles.Txt}>Become a vendor</Text></TouchableOpacity>
                <View style={[styles.emailBtn, styles.elevation]}>
                    <Text onPress={() => navigation.navigate('LoginScreen')}>Continue with email</Text>
                </View>
                <Text style={styles.bottomTxt}> or connect with</Text>
                <View style={styles.bottomView}>
                <Icon name='google' style={styles.icons}/> 
                
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '90%',
    },
    emailBtn: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: ' 50%',
        borderRadius: 5
    },
    elevation: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    bottomView:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    bottomTxt:{
       color:'#FFFFFF',
       margin:10,
       alignSelf:'center'

    },
    Txt:{
        color:'#FFFFFF',
        margin:10,
        alignSelf:'center',
        textDecorationLine:'underline',
        opacity:0.6
    },
    icons:{
        backgroundColor:'white',
        borderRadius:50,
        padding:10,
        margin:10
    }

    
});
export default HomeScreen;
