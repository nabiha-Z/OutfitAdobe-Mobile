import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase/app';
import moment from 'moment';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


export default function BookingScreen({ route, navigation }) {

    const [selectedDate, setselectedDate] = useState("");
    const [slots, setLots] = useState([' 9:00-9:30 ', ' 9:30-10:00 ', ' 10:00-10:30 ', ' 10:30-11:00 '])

    const today = new Date();
    const date = JSON.stringify(today);
    const trimDate = date.indexOf('T');
    var currentDate = date.substring(0, trimDate);
    currentDate = currentDate.substring(1, currentDate.length);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    console.log(nextweek);
    console.log("current:", currentDate);
    var formattedDate = moment(currentDate).format('DD-MM-YY');

    console.log("date:", selectedDate)
    const {service, staff, products} = route.params;

    useEffect(() => {

        setselectedDate(formattedDate);
    }, [])

    const formatDate = (date) => {
        var formattedDate = moment(date).format('DD-MM-YY');
        setselectedDate(formattedDate)
    }

    return (
        <View style={styles.container}>

            <View style={styles.topView}>

                <Text style={styles.heading}>{staff.name}</Text>
                <Text style={{ color: 'white' }}>{staff.profession}</Text>
                <View style={styles.ratingView}>
                    <AntDesign name="star" color="#EED51F" size={12} />
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>{staff.rating} </Text>
                </View>

            </View>
            <ScrollView>
                <View style={styles.lowerView}>

                    <Calendar

                        current={currentDate}
                        minDate={currentDate}
                        maxDate={nextweek}
                        onDayPress={(day) => { formatDate(day.dateString) }}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        enableSwipeMonths={true}
                        markedDates={selectedDate}
                        style={{
                            padding: 0,
                            borderRadius: 5,
                            borderColor: 'white',
                            shadowColor: 'white',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            elevation: 2
                        }}

                    />


                    <Text style={[styles.subheading, { color: '#383939', fontSize: 18 }]}>Available Slots for</Text>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#8EB3CB', fontSize: 16 }}>{selectedDate}</Text>
                    {/* <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>9:00 - 9:30 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity> */}
                    {slots.map((item, key) => (
                        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('paymentscreen', { date:selectedDate, time:item, service:service, staff: staff, products:products })}>
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>{item}</Text>
                            </View>
                            <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                        </TouchableOpacity>
                    ))}

                  

                    <View style={{ padding: 20 }}>

                    </View>

                </View>
            </ScrollView>
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
        justifyContent: 'center',
        height: 250,
        color: 'white',
        alignItems: 'center'

    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    subheading: {
        fontSize: 20,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    lowerView: {
        margin: 15,
        marginBottom: 30,

    },
    tabContainer: {
        flexDirection: 'row',
        width: '95%',
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
    ratingView: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
});