import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Button, Image, ListItem, ScrollView } from 'react-native';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase/app';
import moment from 'moment';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


export default function BookingScreen({ route, navigation }) {

    const [selectedDate, setselectedDate] = useState("");
    const d = new Date();
    const date = JSON.stringify(d);
    const trimDate = date.indexOf('T');
    var currentDate = date.substring(0, trimDate);
    currentDate = currentDate.substring(1, currentDate.length);
    var formattedDate = moment(currentDate).format('DD-MM-YY');

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

                <Text style={styles.heading}>Select Time</Text>

            </View>
            <ScrollView>
                <View style={styles.lowerView}>

                    <Calendar
                        current={'2021-12-24'}
                        minDate={currentDate}
                        onDayPress={(day) => { formatDate(day.dateString) }}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        enableSwipeMonths={true}
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

                    {/* <Text style={{ textAlign: 'center', fontSize: 20, padding: 20, margin: 20 }}>Selected Date: {selectedDate}</Text> */}

                    <Text style={[styles.heading, { color: '#383939', fontSize: 18 }]}>Choose time slot</Text>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>9:00 - 9:30 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>9:30 - 10:00 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>10:00 - 10:30 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>10:30 - 11:00 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>11:00 - 11:30 AM</Text>
                        </View>
                        <AntDesign name="arrowright" size={16} color="#909193" style={{ left: 55, top: 20 }} />
                    </TouchableOpacity>


                    <View style={{ padding: 40 }}>

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
        justifyContent: 'flex-end',
        height: 250,

    },
    heading: {
        fontSize: 25,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold',
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
    }
});