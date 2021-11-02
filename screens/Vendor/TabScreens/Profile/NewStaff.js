import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

function NewStaff({ navigation }) {


    const [time2, setTime2] = useState("20:00");
    const [getName, setName] = useState(null);
    const [error, setError] = useState("");
    const [time1, setTime1] = useState("9:00");
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);



    const handlePicker1 = (dateTime) => {
        console.log("Selected Value= ", dateTime);
        var selectedTime = moment(dateTime).format('HH:mm');
        console.log("formatted time= ", selectedTime);
        setTime1(selectedTime);
        setShow1(false);
    }

    const handlePicker2 = (dateTime) => {
        console.log("Selected Value= ", dateTime);
        var selectedTime = moment(dateTime).format('HH:mm');
        console.log("formatted time= ", selectedTime);
        setTime2(selectedTime);
        setShow2(false);
    }

    const hidePicker = () => {
        setShow1(false);
        setShow2(false);
    }

    const addStaff = () => {

        if (getName != null && getTime != null) {
            // var requestOptions = {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         make: getName,
            //         modal: getTime,

            //     }),
            // };

            // fetch(`${FIREBASE_API_ENDPOINT}/car.json`, requestOptions)
            //     .then((response) => response.text())
            //     .then((result) => console.log(result))
            //     .catch((error) => console.log('error', error));

            // setName("");
            // setTime("");

            alert("Staff added");
        } else {
            setError("Fill out all fields");
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Add a new Staff</Text>
                <Text style={{
                    fontSize: 11,
                    color: '#4B494B',
                    textAlign: 'center',
                    marginTop: 7,
                    marginBottom: 10

                }}>This will add a new staff in your business whom users can ask services from</Text>
            </View>
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
                style={styles.inputField}
                placeholder='Enter Full Name'
                value={getName}
                onChangeText={text => setName(text)}
            />
            <Text style={styles.label}>Select your timings</Text>

            <View style={styles.timePickerView}>

                <TouchableOpacity
                    style={styles.timePicker}
                    onPress={() => setShow1(true)}
                >
                    <Text>{time1}</Text>
                </TouchableOpacity>
                <Text> to</Text>
                <TouchableOpacity
                    style={styles.timePicker}
                    onPress={() => setShow2(true)}
                >
                    <Text>{time2}</Text>
                </TouchableOpacity>

            </View>
            <DateTimePicker
                isVisible={show1}
                testID="dateTimePicker1"
                value={time1}
                mode="time"
                is24Hour={true}
                display="default"
                onConfirm={(e) => handlePicker1(e)}
                onCancel={hidePicker}
            />

            <DateTimePicker
                isVisible={show2}
                testID="dateTimePicker2"
                value={time2}
                mode="time"
                is24Hour={true}
                display="default"
                onConfirm={(e) => handlePicker2(e)}
                onCancel={hidePicker}
            />

            <TouchableOpacity
                onPress={addStaff}
                style={styles.addButton}
            >
                <Text style={{ color: '#D7D9D9' }}>Add Staff</Text>
            </TouchableOpacity>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20
    },

    header: {
        alignItems: 'center',
        margin: 40,
        marginTop: 10
    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#5B5A59'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10
    },
    inputField: {
        borderBottomWidth: 2,
        width: '70%',
        marginTop: 4,
        marginBottom: 15,
        padding: 5,
        borderColor: '#95BFBA',
        textAlign: 'center'
    },
    addButton: {
        backgroundColor: '#22524C',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        padding: 10,
        margin: 10,
        marginLeft: 20,
        marginTop: 40,
        borderRadius: 15,

    },
    timePickerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        width: '70%',
        marginTop: 10
    },
    timePicker: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#DFDEDD',
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 10
    },
    timePickerText: {
        fontSize: 13,
        color: '#8E8E8E',
        textAlign: 'center'

    }
});

export default NewStaff;
