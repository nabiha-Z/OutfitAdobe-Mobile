import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

function NewStaff({ navigation }) {


    const [time2, setTime2] = useState("20:00");
    const [getName, setName] = useState(null);
    const [getContact, setContact] = useState(null);
    const [error, setError] = useState("");
    const [time1, setTime1] = useState("9:00");
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [image, setImage] = useState(null);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

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

    const pickImage = async () => {
        console.log("Picturesssss")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 2],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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
            <Text
                style={styles.heading}>
                Add a new Staff
            </Text>
            <Text
                style={styles.desc}>
                This will add a new staff in your business whom users can ask services from
            </Text>

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
                style={styles.inputField}
                placeholder='Enter Full Name'
                value={getName}
                onChangeText={text => setName(text)}
            />

            <Text style={styles.label}>Contact:</Text>
            <TextInput
                style={styles.inputField}
                placeholder='Enter Full Name'
                value={getContact}
                onChangeText={text => setContact(text)}
            />
            <Text style={styles.label}>Select your timings</Text>

            <View style={styles.timePickerView}>

                <TouchableOpacity
                    style={styles.timePicker}
                    onPress={() => setShow1(true)}
                >
                    <Text>{time1}</Text>
                </TouchableOpacity>
                <Text> --</Text>
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


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.imageBtn} onPress={pickImage} >
                    <Entypo name="arrow-up" size={15} color="white" style={{}} />
                    <Text style={{ color: 'white', textAlign: 'center', margin: 0 }}>Choose Image</Text>
                </TouchableOpacity>


                {image && (
                    <TouchableOpacity style={styles.selectedImgBtn} onPress={() => setImage(null)}>
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    </TouchableOpacity>)}
            </View>

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
        backgroundColor: 'white',
        padding: 20,

    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#5B5A59'
    },
    desc: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 5,
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

    },
    addButton: {
        backgroundColor: '#22524C',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        marginTop: 40,
        borderRadius: 15,

    },
    timePickerView: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
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
    },

    imageBtn: {
        flexDirection: 'row',
        backgroundColor: '#687EA3',
        padding: 10,
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 20,
        width: '45%',
        alignItems: 'center',
        textAlign: 'center',
        elevation: 20,
        shadowColor: '#0B1A34',
    },
    selectedImgBtn: {
        backgroundColor: '#E1E7F1', 
        width: 40, 
        height: 40, 
        zIndex: 2, 
        padding: 10, 
        borderRadius: 40 / 2,
        marginTop:20,
        marginLeft:10
    },
    selectedImage: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        position: 'absolute',
        alignSelf: 'center',
        top: 5

    }
});

export default NewStaff;
