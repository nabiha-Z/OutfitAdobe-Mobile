import React, { useEffect, useState } from 'react';
import {
    Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView,
    Modal
} from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import firebase from 'firebase/app';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { CheckBox } from "react-native-elements";

function NewStaff({ navigation }) {

    const auth = firebase.auth();
    const db = firebase.firestore();
    const [time2, setTime2] = useState("20:00");
    const [getName, setName] = useState(null);
    const [getContact, setContact] = useState(null);
    const [skill, setSkill] = useState(null);
    const [errors, setError] = useState("");
    const [serviceError, setServiceError] = useState("");
    const [time1, setTime1] = useState("9:00");
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [image, setImage] = useState(null);
    const [service, setService] = useState([]);
    const [selectedServices, setSelected] = useState([]);
    const [temp2, setTemp2] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })

        db.collection('services').get().then(

            (data) => {
                var temp = [], temparr = [];
                data.docs.map(
                    (data1) => {
                        if (data1.data().store == auth.currentUser.uid) {
                            var a = data1.data();
                            a.sid = data1.id;
                            var obj = {};
                            obj.name = a.name;
                            obj.sid = a.sid;
                            obj.border = "#C8C4C4";
                            obj.background = "white";
                            obj.checked = false;
                            temp.push(obj);
                            temparr.push(a);
                        }

                    }

                )
                setService(temp);
                setTemp2(temparr);
            }

        )
        //console.log("service:", service)
        console.log("selectedSSSS:", selectedServices)
    }, [])


    const uploadImage = async (uri) => {

        if (getName !== null && getContact !== null & selectedServices.length != 0 && skill != null && image != null) {


            setError("");
            setServiceError("");
            var tempArr = [];

            temp2.map((item) => {

                selectedServices.map((element) => {
                    if (element.sid === item.sid) {

                        console.log("founddd")
                        tempArr.push(item);
                    }
                })
            })
            console.log("tempArr:", tempArr);
            setSelected(tempArr);

            console.log("final:", selectedServices)

            const response = await fetch(uri);
            const blob = await response.blob();
            var imagename = getName + new Date().toString();
            var ref = firebase.storage().ref().child(imagename);
            await ref.put(blob);
            ref.getDownloadURL().then(
                (data) => {
                    db.collection('staffs').add({
                        name: getName,
                        contact: getContact,
                        time1: time1,
                        time2: time2,
                        img: data,
                        store: auth.currentUser.uid,
                        service: tempArr,
                        rating: "3.5",
                        profession: skill
                    }).then(
                        data => {
                            Alert.alert('Staff Added Successfully');
                            navigation.navigate('Profile');
                        }
                    )
                }
            )
        } else if (selectedServices.length == 0) {
            setServiceError("Select atleast one service");
        } else {
            setError("Fill out all fields")
        }


    };


    const handlePicker1 = (dateTime) => {

        var selectedTime = moment(dateTime).format('HH:mm');
        setTime1(selectedTime);
        setShow1(false);
    }

    const handlePicker2 = (dateTime) => {
        var selectedTime = moment(dateTime).format('HH:mm');
        setTime2(selectedTime);
        setShow2(false);
    }

    const hidePicker = () => {
        setShow1(false);
        setShow2(false);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            // base64: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const closeModal = () => {
        console.log("selected:", selectedServices)
        setModalVisible(false);
    };




    const addServices = (item) => {
        var color, background;
        const newData = service.map((newItem) => {

            if (newItem.sid === item.sid) {
                if (item.checked === false) {
                    color = "#EAF3F2";
                    background = "#EAF3F2";


                } else {
                    color = "#C8C4C4";
                    background = "white";
                }

                return {
                    ...newItem,
                    border: color,
                    background: background,
                    checked: !item.checked,
                };
            }
            return {
                ...newItem,
                checked: newItem.checked,
            };
        });

        setService(newData);
    }


    const confirmed = () => {
        var tempArr = [];

        service.map((item, key) => {
            if (item.checked === true) {
                tempArr.push(item);
            }
        })

        setSelected(tempArr);
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text
                    style={styles.heading}>
                    Add a new Staff
                </Text>
                <Text
                    style={styles.desc}>
                    This will add a new staff in your business whom users can ask services from
                </Text>

                <Text style={styles.errorsTxt}>{errors}</Text>
                <Text style={styles.label}>Full Name:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Full Name'
                    value={getName}
                    onChangeText={text => setName(text)}
                />

                <Text style={styles.label}>Contact:</Text>
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputField}
                    placeholder='Enter Contact Detail'
                    value={getContact}
                    onChangeText={text => setContact(text)}
                    maxLength={11}
                />

                <Text style={styles.label}>Skill:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter your profession'
                    value={skill}
                    onChangeText={text => setSkill(text)}
                />


                {/* <SelectDropdown
                    data={service}
                    onSelect={(selectedItem, index) => {
                        setSelected(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {

                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    defaultButtonText="Click for options"
                    buttonStyle={selectedServices != null ? [styles.button, { backgroundColor: 'white' }] : styles.button}
                    dropdownStyle={styles.dropdown}
                    rowTextStyle={styles.dropdownItems}
                    buttonTextStyle={selectedServices != null ? [styles.buttonText, { color: '#12555C' }] : styles.buttonText}
                /> */}

                <TouchableOpacity
                   style={selectedServices.length != 0 ? [styles.button, { backgroundColor: 'white' }] : styles.button}
                    activeOpacity={0.5}
                    onPress={() => { setModalVisible(true) }}>
                    <Text style={selectedServices.length != 0 ? [styles.buttonText, { color: '#FAD842' }] : styles.buttonText}>{selectedServices.length!=0?selectedServices[0].name:"Select Service(s)"}</Text>
                </TouchableOpacity>
                <Text style={styles.errorsTxt}>{serviceError}</Text>

                <Modal animationType="slide" transparent={true} visible={isModalVisible}>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <Text style={[styles.heading, { marginBottom: 20 }]}>Services</Text>
                            {service.map((item, key) => (

                                <View style={styles.checkboxContainer} key={key}>
                                    <CheckBox
                                        key={item.sid}
                                        checked={item.checked}
                                        containerStyle={[styles.ckItem, { zIndex: 1 }]}
                                        disabled={false}
                                        onAnimationType="fill"
                                        offAnimationType="fade"
                                        boxType="square"
                                        onPress={() => addServices(item)}
                                    />

                                    <View style={[
                                        styles.customCheckbox,
                                        {
                                            zIndex: 0,
                                            borderColor: item.border,
                                            backgroundColor: item.background,

                                        }
                                    ]}>
                                        <Text>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            )

                            )}


                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <TouchableOpacity
                                    style={[styles.ModalBtn, { backgroundColor: "white", borderWidth: 1, borderColor: '#CBCECE' }]}
                                    onPress={() => closeModal()}
                                >
                                    <Text style={{ fontSize: 17, color: "black" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.ModalBtn]}
                                    onPress={() => confirmed()}
                                >
                                    <Text style={{ fontSize: 17, color: "white" }}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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
                    onPress={() => uploadImage(image)}
                    style={styles.addButton}
                >
                    <Text style={{ color: '#D7D9D9' }}>Add</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20

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
        marginTop: 20,
        marginLeft: 10
    },
    selectedImage: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        position: 'absolute',
        alignSelf: 'center',
        top: 5

    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#253530',
        height: 35,
        width: '65%',
        paddingHorizontal: 10,
        zIndex: 1,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#253530',

    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    },
    dropdown: {
        backgroundColor: '#F4F6F7',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        width: 300,
        borderRadius: 10,
        height: 300
    },
    dropdownItems: {
        textAlign: 'center',
        color: '#414244'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,

    },
    centeredView: {
        backgroundColor: 'rgba(16, 17, 17,0.3)',
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        padding: 20
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        height: "50%",
        width: "100%",
    },
    ModalBtn: {
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 16,
        width: 120,
        backgroundColor: "#152139",
        alignItems: "center",
        alignContent: "center",
    },
    modalText: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: "red",
    },
    customCheckbox: {
        padding: 10,
        borderWidth: 1,
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderColor: "white",
        backgroundColor: "white",
        borderColor: "#C8C4C4",
    },
    ckItem: {
        alignSelf: "center",
        width: '100%',
        height: 90,
        opacity: 0,
        position: "absolute",
    },

});

export default NewStaff;
