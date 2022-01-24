import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import firebase from "firebase/app";
import { useSafeAreaFrame } from "react-native-safe-area-context";


export default function StaffDetails({ route, navigation }) {
    const auth = firebase.auth();
    const db = firebase.firestore();

    const [staffs, setStaffs] = useState([]);
    const [check, setcheck] = useState(true);
    const [tempId, setId] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const deleteStaff = (uid) => {
        db.collection('staffs').doc(uid).delete().then(
            (data) => {
                check ? setcheck(false) : setcheck(true);
                setModalVisible(false)
                Alert.alert("Staff Deleted Successfully");

            }
        )
    }

    useEffect(() => {
        db.collection('staffs').get().then(

            (data) => {
                var temp = [];
                data.docs.map(
                    (data1) => {
                        if (data1.data().store == auth.currentUser.uid) {
                            var a = data1.data();
                            a.uid = data1.id;
                            console.log(a);
                            temp.push(a);

                        }

                    }
                )
                setStaffs(temp);
            }
        )
    }, [check])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Current Staff Details</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddStaff')
                    }
                    }
                    style={styles.addButton}
                >
                    <AntDesign name="plus" size={20} style={{ color: '#D7D9D9' }} />
                </TouchableOpacity>

            </View>
            <ScrollView style={{ height: 10, marginHorizontal: 10 }}>
                {staffs.map((item, key) => (

                    <TouchableOpacity style={styles.tabContainer} key={key}>
                        <Image style={styles.img} source={{ uri: item.img }} />
                        {/* <AntDesign name="user" size={28} style={{ marginRight: 20, top: 4 }} /> */}
                        <View style={styles.textContainer}>
                            <Text style={styles.mainText}>{item.name}</Text>
                            <Text style={[styles.subText,{color:'#FFD933'}]}>{item.profession}</Text>
                            <Text style={styles.subText}>Contact : {item.contact}</Text>
                            <Text style={styles.subText}>From : {item.time1} to {item.time2}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setId(item.uid)
                                setModalVisible(true)
                            }}
                        >
                            <AntDesign name="delete" size={20} style={{ top: 4, color: '#D71212' }} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                ))}



            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible == true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={[styles.modalText, { fontSize: 24 }]}>Are you sure you want to delete the staff?</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={[styles.ModalBtn]}
                                onPress={() => { setModalVisible(false) }}
                            >
                                <Text style={{ fontSize: 17, color: '#145A32' }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ModalBtn, { backgroundColor: '#E03D3D' }]}
                                onPress={() => { deleteStaff(tempId) }}
                            >
                                <Text style={{ fontSize: 17, color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 0,
        paddingTop: 30,
    },
    heading: {
        fontSize: 25,
        marginTop: 17,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#5B5A59'
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
        marginBottom: 8
    },
    subText: {
        fontSize: 14,
        color: '#000000',
        lineHeight: 20,
    },
    addButton: {
        backgroundColor: '#22524C',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        padding: 10,
        margin: 10,
        marginRight: 20,
    },
    header: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 20

    },
    mainText: {
        fontSize: 16,
        color: '#020202',
        fontWeight: 'bold'
    },
    img: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25
    },
    centeredView: {
        borderTopWidth: 1,
        borderColor: '#908D8D',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 10,
        borderRadius: 20

    },
    modalView: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(12, 12, 12,0.6)',
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        height: '60%',
        width: '100%',
        flexWrap: 'wrap',
        borderRadius: 10
    },
    ModalBtn: {
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 16,
        width: 120,
        backgroundColor: '#F4F3F3',
        alignItems: 'center',
        alignContent: 'center',

    },
    modalText: {
        color: 'white',
        fontSize: 20,
        marginHorizontal:15
    },
    txt: {
        color: 'white',
        fontSize: 12
    },
    confirmed: {
        backgroundColor: '#54B8EA',
        padding: 5,
        color: 'white',
        borderRadius: 20,
        textAlign: 'center',
        marginTop: 20,
        width: '70%'
    },
    cancelBtn: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(165, 167, 167,0.4)',
        width: '20%',
        textAlign: 'center',
        alignItems: 'center',
    },
    cancelbtnContainer: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    serviceImg: {
        marginTop: 65,
        width: '30%',
        marginLeft:-80
    },
    blackTxt: {
        fontWeight: 'bold',
        fontSize: 15,
    },


})