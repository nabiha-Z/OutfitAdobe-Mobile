import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, CheckBox, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { EvilIcons } from '@expo/vector-icons';
const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';

function VendorLocation({ route, navigation }) {

    var {categories,businessName,Email, SubCat, TeamSize} = route.params;
    
    const [isSelected, setSelection] = useState(false);
    const [business, setBusiness] = useState(true);
    const [regionuser, setregionuser] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
    });

    const changeForm = () => {
        setSelection(!isSelected);
        setBusiness(!business);
        
    }

    return (

        <View style={styles.container}>

            <Text
                style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color:'#5B5A59'}}>
                Set your location
            </Text>
            


            {business ? (
                <>
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
                    <MapView
                        style={{ flex: 1, alignItems: 'center', margin: 10 }}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        initialRegion={regionuser}
                        onRegionChangeComplete={region => { setregionuser(region) }}


                    >
                        <Marker
                            coordinate={{ latitude: regionuser.latitude, longitude: regionuser.latitude }}
                            title={"Your location"}

                        />
                    </MapView>
                    <Text
                        style={{ fontSize: 14, marginTop: 10, marginHorizontal: 10 }}>
                        longitude
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <EvilIcons name="location" size={25} color="black" style={styles.iconBox} />
                        <TextInput style={styles.businessField} value={"" + regionuser.longitude} />

                    </View>
                    <Text
                        style={{ fontSize: 14, marginTop: 6, marginHorizontal: 10 }}>
                        latitude
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <EvilIcons name="location" size={25} color="black" style={{ justifyContent: 'center', padding: 5, marginHorizontal: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 3 }} />
                        <TextInput style={styles.businessField} value={"" + regionuser.latitude} />

                    </View>
                    <Text
                        style={{ fontSize: 14, marginTop: 6, marginHorizontal: 10 }}>
                        Area
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <EvilIcons name="location" size={25} color="black" style={{ justifyContent: 'center', padding: 5, marginHorizontal: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 3 }} />
                        <TextInput style={styles.businessField} />

                    </View>
                </>
            ) :
                <>
                <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Add your business contact
            </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Feather name="smartphone" size={25} color="black" style={{ justifyContent: 'center', padding: 5, marginHorizontal: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 3 }} />
                        <TextInput style={styles.businessField} placeholder="Enter Contact"/>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <MaterialCommunityIcons name="email-outline" size={25} color="black" style={{ justifyContent: 'center', padding: 5, marginHorizontal: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 3 }} />
                        <TextInput style={styles.businessField} placeholder="Enter Email"/>

                    </View>
                </>}

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <CheckBox
                    value={isSelected}
                    onValueChange={()=>changeForm()}
                />
               
                <Text>I don't have a business address (mobile and online service only)</Text>
            </View>


            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => navigation.navigate('WorkingHours')}
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
        paddingTop: 20,
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
        marginLeft: 20,
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
    },
    iconBox: {
        justifyContent: 'center',
        padding: 5,
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 3
    }

});
export default VendorLocation;
