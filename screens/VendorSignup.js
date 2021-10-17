import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, CheckBox, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
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
            {/* <Image
        source={require('../images/img4.png')}
        style={{ width: '100%', height: '40%' }}
      /> */}
            <Text
                style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10 }}>
                Have any business name in mind?
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                This shall be your brand name, that your clients will get to see.
            </Text>

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Business Name
            </Text>
            <TextInput style={styles.businessField} />

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Email
            </Text>
            <TextInput style={styles.businessField} placeholder="abc@gmail.com"/>



            {/* <Checkbox
      value={isSelected}
      onValueChange={setSelection}
    //   value="salon"
    //   onChange={(e) => {if(e.checked){
    //       setCategory([...categories, e.value])}
    //     }}
        style={styles.checkbox}
      /> */}
            <ScrollView style={{ height: 20, marginHorizontal: 10, marginTop: 15, }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                    {categories.map((item, key) => 
                  
                    (
                    
                        <TouchableOpacity key={key} style={[styles.customCheckbox, styles.elevation]}>
                            <Image source={item.icon} style={{width:'100%', height:'80%'}}/>
                            {/* <Feather name={item.icon} size={24} color="black" /> */}
                            <Text style={styles.btnTxt}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}




                </View>
            </ScrollView>
            <View style={styles.footerTab}>
                <TouchableOpacity 
                style={styles.footerBtn}
                onPress={()=>navigation.navigate('SignupLocation')}
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
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 10,
        paddingRight: 40
    },
    businessField: {
        width: '90%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    customCheckbox: {
        flexDirection: 'row',
        borderColor: '#C8C4C4',

        padding: 10,
        borderWidth: 1,
        width: 80,
        height: 100,
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        marginTop: 10

    },
    checkbox: {
        flexDirection: 'row',
        flexWrap: 'wrap'


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
        alignSelf:'center',
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
    btnTxt:{
        fontSize:10,
        opacity:0.5,
        alignSelf:'center',
        textAlign:'center'
    }

});
export default VendorSignup;
