import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase/app';
import moment from 'moment';
import { SliderBox } from "react-native-image-slider-box";


export default function Details({ route, navigation }) {

    const { details } = route.params;
    console.log("details:", details)
    const auth = firebase.auth();
    const [isSelected, setSelected] = useState(details.fav);
    const [staff, setstaff] = useState([{ id: 1, name: "Alex", rating: 4.6, profession: 'Hairstylist', rank:'Senior'}, { id: 2, name: "Zender", rating: 5.0, profession: 'Senior Makeup Artist', rank:'Senior'}, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank:'Mediocre'}, { id: 4, name: "Adams", rating: 4.0, profession: 'Menicure Artist', rank:'Junior'}, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank:'Senior' }, { id: 3, name: "Charles", rating: 4.9, profession: 'Menicure Artist', rank:'Senior'}])
    console.log(auth.currentUser.displayName);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    console.log("width:", SCREEN_WIDTH);
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()} style={{ margin: 15, zIndex: 2, }}>
                <MaterialIcons name="keyboard-arrow-left" size={40} color="white" style={{ zIndex: 1 }}></MaterialIcons>
            </TouchableOpacity>
        )
    })

    const favourite = () => {

        setSelected(!isSelected)
    }
    return (
        <View>
            <SliderBox
                images={details.imgs}
                sliderBoxHeight={SCREEN_WIDTH * 0.9}
                dotColor="#FAB7A0"
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: 8,
                    padding: 0,
                    margin: 0
                }}
                imageLoadingColor="#FAB7A0"
            />

            <ScrollView contentContainerStyle={{ height: 1700, backgroundColor:'white'}}>
                <View style={styles.description}>
                    <Text style={styles.subheading}>Business Name</Text>
                    <TouchableOpacity onPress={() => favourite()} style={{ justifyContent: 'center' }}>
                        <Ionicons name="heart" color={isSelected ? '#F75451' : '#D3D3D3'} size={30}></Ionicons>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.txt, { marginHorizontal: 20 }]}>Description about the business</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <Text style={[styles.subheading, { marginHorizontal: 20, fontSize: 16, color: '#214279' }]}>$ {details.price}</Text>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#336B99', width: '30%' }]} onPress={() => navigation.navigate('bookingscreen', { item: details })}>
                        <Text style={{ color: 'white' }}>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ margin: 15, justifyContent: 'space-between', marginHorizontal: 25 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Ionicons
                            name="location"
                            size={17}
                            color="#BFC0C3"
                        />
                        <Text style={[styles.txt, { marginLeft: 6, fontSize: 15 }]}>{details.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons
                            name="clock"
                            size={17}
                            color="#BFC0C3"
                        />
                        <Text style={[styles.txt, { marginLeft: 5, fontSize: 15 }]}>Open</Text>
                    </View>


                    <Text style={[styles.heading, { color: '#383939', fontSize: 17 }]}>Services</Text>

                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Service Name</Text>
                        </View>
                        <Text>$500</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Service Name</Text>
                        </View>
                        <Text>$500</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Service Name</Text>
                        </View>
                        <Text>$500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>Service Name</Text>
                        </View>
                        <Text>$500</Text>
                    </TouchableOpacity>

                </View>

                <Text style={[styles.heading, { color: '#383939', fontSize: 20, marginHorizontal:20 }]}>Our Staff</Text>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ height: 160, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {staff.map((item, key) =>
                    (
                        <>
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <View style={styles.staffView}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color:'#0F6B7A'}}>{item.name[0].toUpperCase()} </Text>
                                
                            </View>
                           
                                <View style={styles.ratingView}>
                                    <AntDesign name="star" color="#EED51F" size={12} />
                                    <Text style={{ textAlign: 'center', fontSize:12, fontWeight:'bold'}}>{item.rating} </Text>
                                </View>
                                <Text style={{ textAlign: 'center', fontSize:10, color:'#B8BABB', marginTop:10}}>{item.rank} </Text>
                                <Text style={{ textAlign: 'center', fontSize:10, color:'#B8BABB', marginTop:2}}>{item.profession} </Text>
                                
                            </View>
                        </>
                    )
                    )}

                </ScrollView>
                <Text>fsdfsd</Text>
            </ScrollView>
            {/* <View style={styles.btnView}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#BAC7CE', margin: 6 }]} onPress={() => navigation.pop()}>
                        <Text style={{ color: 'white' }}>Return back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#336B99', margin: 6 }]} onPress={() => navigation.navigate('bookingscreen', { item: details })}>
                        <Text style={{ color: 'white' }}>Book</Text>
                    </TouchableOpacity>
                </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topView: {
        backgroundColor: '#212F3D',
        padding: 10,
        justifyContent: 'flex-end',
        height: 250,

    },
    heading: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    lowerView: {
        margin: 15,
        marginBottom: 30,

    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        paddingBottom: 20,
        margin: 15
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },
    heading: {
        fontSize: 20,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold'
    },
    txt: {
        color: '#AAAAAB',
        padding: 10,
        paddingTop: 0,
        fontSize: 13
    },
    subheading: {
        color: '#343537',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',

    },
    picksView: {

        padding: 5,
        margin: 5

    },
    elevation: {
        elevation: 10,
        shadowColor: '#52006A',
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 26

    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 10,
    },
    btn: {
        borderRadius: 7,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%'
    },
    staffView: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: '#CAEAEF',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    ratingView: {
        width:60,
        height: 15,
        borderRadius: 20,
        padding: 10,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'#E0E3E3'
        
    }
});