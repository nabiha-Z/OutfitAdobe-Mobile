import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import moment from 'moment';
import firebase from 'firebase/app';
import { DataTable } from 'react-native-paper';
import SwitchToggle from "react-native-switch-toggle";
import firebaseConfig from '../Firebase/FirebaseConfig';
import DateTimePicker from 'react-native-modal-datetime-picker';


const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
function WorkingHours({ route, navigation }) {
    var { categories, businessName, Username, Email, Password, SubCat, TeamSize, Region, BusinessEmail, Contact } = route.params;

    console.log("Params: ", Password);


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [errors, setErrors] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [toggles, setToggles] = useState([
        { id: 0, day: 'Mon', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 1, day: 'Tue ', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 2, day: 'Wed', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 3, day: 'Thur', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 4, day: 'Fri   ', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 5, day: 'Sat  ', toggle: false, time1: '9:00', time2: '20:00' },
        { id: 6, day: 'Sun ', toggle: false, time1: '9:00', time2: '20:00' }]);

    const updateToggle = (item, index) => {

        const newData = toggles.map(newItem => {

            if (newItem.id === item.id) {
                return {
                    ...newItem,
                    toggle: !item.toggle
                }
            }
            return {
                ...newItem,
                toggle: newItem.toggle
            }
        })

        //console.log(newData);

        setToggles(newData);


    }

    const handlePicker1 = (dateTime, item) => {
        console.log("Selected Value= ", dateTime);
        console.log("selected item", item);
        var selectedTime = moment(dateTime).format('HH:mm');
        console.log("formatted time= ", selectedTime);
        //setTime(selectedTime);
        setShow1(false);
        console.log("item id= ", item.id);


        const newData = toggles.map(newItem => {

            if (newItem.id === item.id) {
                console.log("newItem id= ", newItem.id);
                return {
                    ...newItem,
                    time1: selectedTime
                }
            }
            return {
                ...newItem,
                time1: newItem.time1
            }
        })

        // console.log(newData);

        setToggles(newData);
        // console.log("AFTERRR = ", toggles)

        // if(selectedDate != undefined){
        //     const selectedTime = selectedDate;

        //     setTime(selectedTime);
        // }
        // setShow(Platform.OS === 'ios');
        // console.log("time=", time);
    };

    const handlePicker2 = (dateTime, item) => {
        console.log("Selected Value= ", dateTime);
        //console.log("item id= ", item.id);
        var selectedTime = moment(dateTime).format('HH:mm');
        //console.log("formatted time= ", selectedTime);
        //setTime(selectedTime);
        setShow2(false);



        const newData = toggles.map(newItem => {

            if (newItem.id === item.id) {
                return {
                    ...newItem,
                    time2: selectedTime
                }
            }
            return {
                ...newItem,
                time2: newItem.time2
            }
        })

        //console.log(newData);

        setToggles(newData);
        //console.log("AFTERRR = ", toggles)


    };


    const hidePicker = () => {
        setShow1(false);
        setShow2(false);
    }

    const signup = async () => {
        let count = 0, selectedData = [];

        toggles.map((item) => {
            if (item.toggle === true) {
                selectedData.push({ id: item.id, day: item.day, toggle: item.toggle, time1: item.time1, time2: item.time2 });

            } else {
                count++;
            }
        })

        if (count === toggles.length) {
            setErrors("Select your working hours");

        } else {
           
            setErrors("");
            //add data into databse


            console.log("Created!")
            await auth.createUserWithEmailAndPassword(Email, Password)
                .then((user) => {
                    console.log("userrrrrr=", user);
                    console.log("created")
                })
                .catch(error => {
                    alert(error.message)


                })
            await auth.currentUser.updateProfile({
               
                displayName: Username,
            }).then(() => {
                console.log("updated");
            }).catch((error) => {
                console.log("error: ", error)
            });

            setModalVisible(true);
            navigation.navigate('Dashboard')

        }
    }
    return (

        <View style={styles.container}>

            <Text
                style={{ fontSize: 13, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color: '#5B5A59' }}>
                Add working hours
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Choose your working hours, so the clients can book your services.
            </Text>
            <Text style={styles.errorsTxt}>{errors}</Text>
            <View style={styles.Records}>

                <DataTable>
                    <DataTable.Header style={{ fontSize: 20, fontWeight: 'bold' }}>

                        <DataTable.Title  ><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Days</Text></DataTable.Title>
                        <DataTable.Title  ><Text style={{ fontSize: 15, fontWeight: 'bold' }}>    Open</Text></DataTable.Title>
                        <DataTable.Title  ><Text style={{ fontSize: 15, fontWeight: 'bold' }}>       Timings</Text></DataTable.Title>
                        <DataTable.Title >       </DataTable.Title>

                    </DataTable.Header>
                    <ScrollView style={{ height: 320 }}>
                        {toggles.map((item, key) => (
                            <View key={key} style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 15 }}>
                                <Text style={{ marginTop: 10 }}>{item.day}</Text>

                                <SwitchToggle
                                    switchOn={item.toggle}
                                    onPress={() => updateToggle(item)}
                                    backgroundColorOff="#CFD2D1"
                                    backgroundColorOn="#87BEA6"
                                    circleColorOff="#484B4A"
                                    containerStyle={{
                                        marginTop: 10,
                                        marginLeft: 52,
                                        width: 50,
                                        height: 23,
                                        borderRadius: 25,
                                        padding: 1,
                                    }}
                                    circleStyle={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 20,

                                    }}

                                />

                                {/* <SwitchToggle
                        switchOn={toggle[item.id]}
                        onPress={() => updateToggle(item.id,toggle[item.id])}
                        containerStyle={{
                            marginTop: 16,
                            width: 50,
                            height: 20,
                            borderRadius: 25,
                            padding: 2,

                        }}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,

                        }}
                    /> */}
                                {/* <ToggleSwitch
                        key={key}
                        isOn={item.toggle}
                        onColor="green"
                        offColor="grey"
                        label={item.day}
                        labelStyle={{ color: "black", fontWeight: "900", marginRight:20}}
                        size="large"
                        onToggle={() => updateToggle(item.id,isOn)}
                    /> */}

                                <View style={styles.timePickerView}>

                                    <TouchableOpacity
                                        style={styles.timePicker}
                                        onPress={() => setShow1(true)}
                                    >
                                        <Text>{item.time1}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.timePicker}
                                        onPress={() => setShow2(true)}
                                    >
                                        <Text>{item.time2}</Text>
                                    </TouchableOpacity>

                                </View>

                                <DateTimePicker
                                    isVisible={show1}
                                    testID="dateTimePicker1"
                                    value={item.time1}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onConfirm={(e) => handlePicker1(e, item)}
                                    onCancel={hidePicker}
                                />

                                <DateTimePicker
                                    isVisible={show2}
                                    testID="dateTimePicker2"
                                    value={item.time2}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onConfirm={(e) => handlePicker2(e, item)}
                                    onCancel={hidePicker}
                                />


                            </View>
                        ))}
                    </ScrollView>

                </DataTable>
            </View>

            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={signup}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible == true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={require('../images/tick.png')}
                            style={{ width: '100%', height: '40%' }}
                        />
                        <Text style={styles.modalText}>Your business is set up</Text>
                        <TouchableOpacity
                            style={[styles.ModalBtn]}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('Dashboard')
                            }}
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}>Signin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        top: 30,
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
    btnTxt: {
        fontSize: 10,
        opacity: 0.5,
        alignSelf: 'center',
        textAlign: 'center'
    },
    centeredView: {
        borderTopWidth: 1,
        borderColor: '#908D8D'

    },
    modalView: {

        backgroundColor: 'rgba(230, 230, 230,0.9)',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        height: '100%',
        width: '100%'

    },
    ModalBtn: {
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 16,
        width: 120,
        backgroundColor: '#3E3737',
        alignItems: 'center',
        alignContent: 'center',

    },
    modalText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    timePickerView: {
        flexDirection: 'row',
        justifyContent: 'center',

        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 30,
        alignContent: 'center'
    },
    timePicker: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#DFDEDD',
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    timePickerText: {
        fontSize: 13,
        color: '#8E8E8E',
        textAlign: 'center'

    },
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
        marginHorizontal: 10,
    },

});
export default WorkingHours;
