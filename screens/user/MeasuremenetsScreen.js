import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { AntDesign, SimpleLineIcons, MaterialIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
import modal from '../../images/modal1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screenWidth } from "react-native-calendars/src/expandableCalendar/commons";

export default function Measurements({ navigation }) {

    const [user, setUser] = useState([]);
    const [image, setImage] = useState(null);
    const [userMeasurements, setUserMeasurements] = useState([]);
    const [measuremenets, setMeasuremenets] = useState("");
    const [img, setImg] = useState("");
    const [shoulders, setShoulders] = useState("");
    const [fullLength, setFullLength] = useState("");
    const [KneeL, setKneeL] = useState("");
    const [armsL, setArmsL] = useState("");
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [waistL, setWaistL] = useState("");
    const [shirtL, setShirtL] = useState("");
    const [bottomL, setBottomL] = useState("");
    const [check, setCheck] = useState(false);
    const [showModal, setSetModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [fetchingData, setFetching] = useState(false);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    const API_URL = 'https://outfitadobe-server.herokuapp.com';
    // const API_URL = 'http://192.168.100.8:8000';
    var uid = "";

    const currentUser = async () => {
        setFetching(true)
        uid = await AsyncStorage.getItem('user');
        console.log("id: ", uid)
        await fetch(`${API_URL}/user/getMeassurements`, {

            method: "POST",
            body: JSON.stringify({
                uid: uid, flag: "1"
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(async res => {
                try {

                    const jsonRes = await res.json();

                    if (jsonRes.message === true) {
                        setUserMeasurements(jsonRes.measurement)
                        setFetching(false);
                        console.log("measue: ", userMeasurements)
                        console.log("measue: ", userMeasurements.length)
                        setShoulders(jsonRes.measurement[0].shoulders)
                        setArmsL(jsonRes.measurement[0].arms)
                        setFullLength(jsonRes.measurement[0].fullLength)
                        setKneeL(jsonRes.measurement[0].knee)
                        setShirtL(jsonRes.measurement[0].tshirt)
                        setWaistL(jsonRes.measurement[0].waist)
                        setBottomL(jsonRes.measurement[0].bottom)

                    } else {
                        console.log("error found ", jsonRes.error)
                    }

                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log("error: ", err.message);
            });

    }
    useEffect(() => {
        currentUser()
    }, [check])

    const deleteFunc = async () => {
        console.log("userMeasurements[0]._id: ", userMeasurements[0]._id)
        try {
            await fetch(`${API_URL}/user/deleteMeassurements`, {

                method: "POST",
                body: JSON.stringify({
                    mid: userMeasurements[0]._id,
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(async (response) => {
                    const jsonRes = await response.json();
                    console.log("res: ", jsonRes)
                    if (jsonRes.message === true) {
                        setCheck(!check)
                        //window.location.reload()

                    } else {
                        console.log(jsonRes.error)
                    }
                })
                .catch((err) => {
                    console.log("err", err.message)
                })
        } catch (e) {
            console.log("error found in try: ", e.message)
        }
    }


    const LoadingData = () => {
        return (
            <>
                <ActivityIndicator size="large" color="#E7AA9E" />
                {/* <Text style={{ paddingTop: 20, color: '#DEBF4D', textAlign: 'center' }}>
              Loading Data from JSON Placeholder API ...
            </Text> */}
            </>
        );
    };



    return (
        <View style={styles.container}>
            {fetchingData ? <LoadingData /> : (
                <>
                    {userMeasurements.length === 0 ? (

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                            <Text style={styles.lightHeading}>Start of with our body tracking feature to get your body measurements</Text>
                            <TouchableOpacity style={styles.measuremenetBtn} onPress={() => navigation.navigate('CameraScreen')}>
                                <Text style={styles.txt}>Take Measurements</Text>
                                <Ionicons name="camera" color="white" size={18} />
                            </TouchableOpacity>

                        </View>


                    ) : (<ScrollView style={{ height: 50, padding: 5 }}>

                        <View style={{ flexDirection: 'row', marginLeft: -20 }}>
                            <Text style={styles.lightHeading}>Your Body Measurements</Text>
                            <TouchableOpacity onPress={() => setEditModal(!editModal)} style={styles.editBtn}>
                                <SimpleLineIcons name="pencil" color="white" size={15} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => deleteFunc()} style={[styles.editBtn, { backgroundColor: 'rgb(221, 55, 55)' }]}>
                                <EvilIcons name="trash" color="white" size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 10 }}></View>
                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Shoulders Length")
                            setValue(userMeasurements[0].shoulders)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Shoulders</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Full Length")
                            setValue(userMeasurements[0].fullLength)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Full Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Arms Length")
                            setValue(userMeasurements[0].arms)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Arms Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Tshirt Length")
                            setValue(userMeasurements[0].tshirt)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Tshirt Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Knee Length")
                            setValue(userMeasurements[0].knee)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Knee Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Waist Length")
                            setValue(userMeasurements[0].waist)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Waist Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabContainer} onPress={() => {
                            setTitle("Bottom Length")
                            setValue(userMeasurements[0].bottom)
                            setSetModal(true)
                        }}>
                            <Ionicons name="body-outline" size={30} style={styles.icon} />
                            <View style={styles.textContainer}>
                                <Text style={styles.mainText}>Bottom Length</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={20} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={{ height: 150 }}>
                            <Text></Text>
                        </View>

                    </ScrollView>)}
                </>
            )}
            {showModal && (<Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View>
                    <View style={[styles.modalView, { marginTop: SCREEN_HEIGHT * 0.1 }]}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setSetModal(!showModal)}
                        >
                            <AntDesign name="close" color="#585555" size={20} />
                        </TouchableOpacity>
                        <Image source={modal} style={styles.modal} />
                        <Text style={[styles.txt, { fontSize: 18, color: '#6B6767', fontWeight: '200' }]}>{title}</Text>
                        <Text style={styles.heading}>{value} inch</Text>

                    </View>
                </View>
            </Modal>)}

            {editModal && (<Modal
                animationType="slide"
                transparent={true}
                visible={editModal}
            >
                <View>
                    <View style={[styles.modalView, { marginTop: SCREEN_HEIGHT * 0.1, heigth:  SCREEN_HEIGHT*0.6}]}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setEditModal(false)}
                        >
                            <AntDesign name="close" color="#585555" size={20} />
                        </TouchableOpacity>

                        <View style={{ display: 'flex', padding: 10 }}>
                            <Text style={[styles.heading,{color:'#272525', fontSize:20, marginTop:10}]}>Edit Your Measurements</Text>
                            <Text style={[styles.txt,{color:'#585454'}]}>Enter your changed measurements using the inches scale.</Text>
                            {/* <h4 style={{ color: '#C72C2C', fontWeight: 20, fontSize: 20 }}>{error}</h4> */}
                        </View>
                        <ScrollView style={styles.editContainer}>
                            <View >
                                <Text style={[styles.txt,{color:'#585454'}]}>Shoulders Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Shoulders in inches" value={shoulders} onChangeText={(e) => setShoulders(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text style={[styles.txt,{color:'#585454'}]}>Arms Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Arms length in inches" value={armsL} onChangeText={(e) => setArmsL(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text sstyle={[styles.txt,{color:'#585454'}]}>Full Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Full length in inches" value={fullLength} onChangeText={(e) => setFullLength(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text style={[styles.txt,{color:'#585454'}]}>Knee Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Knee length in inches" value={KneeL} onChangeText={(e) => setKneeL(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text style={[styles.txt,{color:'#585454'}]}>Waist Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Waist length in inches" value={waistL} onChangeText={(e) => setWaistL(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text style={[styles.txt,{color:'#585454'}]}>Knee Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Tshirt length in inches" value={shirtL} onChangeText={(e) => setShirtL(e.target.value)} required />
                            </View>
                            <View style={styles.inputfield}>
                                <Text style={[styles.txt,{color:'#585454'}]}>Bottom Length</Text>
                                <TextInput style={styles.inputfield} placeholder="Bottom length in inches" value={bottomL} onChangeText={(e) => setBottomL(e.target.value)} required />
                            </View>

                        </ScrollView>
                        <TouchableOpacity style={styles.updateBtn} onPress={() => edit()}><Text>Edit & Save</Text></TouchableOpacity>



                    </View>
                </View>
            </Modal>)}
        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        paddingBottom: 20,
        marginBottom: 10
    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        width: '90%',
        marginBottom: 8,
        color: '#707173',
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },
    imgContainer: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        padding: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 40

    },
    imgText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#3F3E40',

    },
    lightHeading: {
        marginHorizontal: 20,
        fontSize: 16,
        margin: 30,
        // marginTop:0,
        // marginBottom:50,
        color: '#959292',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#383636'
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center',
        color: '#7E8183',
        width: '9%',
    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: 80,
    },
    measuremenetBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#9C626B',
        padding: 10,
        color: 'rgb(238, 235, 235)',

    },
    txt: {
        color: 'rgb(238, 235, 235)',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        position: 'absolute',
        top: 8,
        right: 8,
        borderRadius: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modal: {
        margin: 20,
        alignSelf: 'center',
        width: '100%',
        height: '65%',
        marginLeft: -140
    },
    editForm: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    editContainer: {
        width: '100%',
        
    },
    editBtn: {
        borderRadius: 10,
        backgroundColor: 'rgb(45, 193, 171)',
        padding: 10,
        margin: 10,
        color: 'rgb(238, 235, 235)',
        fontWeight: 'bold',
        flexDirection: 'row',
        alignSelf: 'center',
        height: 35,
        marginRight: -5
    },
    inputfield: {
        width: '50%',
        padding: 15,
        borderColor: '#858181'
    }
    
});