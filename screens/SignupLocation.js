import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, CheckBox, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
import hair from '../images/hair.png';
import spa from '../images/spa.png';
import beard from '../images/beard.png';
import aesthetic from '../images/aesthetic.png';
import salon from '../images/salon.png';
import beauty from '../images/beauty.png';
const categories = [
    { id: 1, icon: hair, title: 'Hair Salon' },
    { id: 2, icon: spa, title: 'Spa' },
    { id: 3, icon: beard, title: 'Barbershop' },
    { id: 4, icon: aesthetic, title: 'Aesthetic' },
    { id: 5, icon: salon, title: 'Salon' },
    { id: 6, icon: beauty, title: 'Beauty Salon' }]

function VendorSignup({ route, navigation }) {
    const [getEmail, setEmail] = useState(null);
    const [getPassword, setPassword] = useState(null);
    const [isSelected, setSelection] = useState(false);

    return (

        <View style={styles.container}>

            <Text
                style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10 }}>
                Set your location
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Add your business location
            </Text>

            <Text
                style={{ fontSize: 17, marginTop: 10, marginHorizontal: 10 }}>
                Where's your buisness located?
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <EvilIcons name="location" size={30} color="black" style={{ justifyContent: 'center', padding: 5, marginHorizontal: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 3 }} />
                <TextInput style={styles.businessField} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                />
                <Text>I don't have a business address (mobile and online service only)</Text>
            </View>



            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={()=>navigation.navigate('WorkingHours')}
                    >
                        

                    <Text style={{ color: 'white', alignSelf: 'center' }}>Next step</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 10,
        paddingTop:20,
        paddingRight: 40
    },
    businessField: {
        width: '80%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#DFDFDF',
        marginHorizontal: 10,
        marginLeft: -12

    },

    footerTab: {
        borderTopWidth: 1,
        borderTopColor: '#B6B5B4',
        padding: 0,
        flex: 0.3,
        marginLeft: 10,
        width: '100%',
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',

    },
    footerBtn: {
        width: '100%',
        padding: 10,
        backgroundColor: 'black'
    },
    elevation: {
        elevation: 5,
        shadowColor: '#F4F0F0',
    },
    btnTxt: {
        fontSize: 10,
        opacity: 0.5,
        alignSelf: 'center',
        textAlign: 'center'
    }

});
export default VendorSignup;
