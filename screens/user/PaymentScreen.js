import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app';

export default function PaymentScreen({ route, navigation }) {


    const { time, service, staff, products } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState('first');

    return (
        <View style={styles.container}>

            <View style={styles.topView}>

                <Text style={styles.heading}>Confirm Booking</Text>

            </View>
            <ScrollView>
                <View style={styles.lowerView}>

                    <View style={styles.box}>

                        <Text style={styles.subheading}>{service.title}</Text>
                        <Text>Date: {time}</Text>
                        <Text>Staff: {staff.name}</Text>
                        {products.map((item, key) => (
                            <>
                                <View style={styles.productsView}>

                                    <Image
                                        source={item.icon}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 30 / 2,
                                            alignSelf: "center",
                                        }}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.mainText}>{item.title}</Text>
                                    </View>

                                    <Text>$ {item.price}</Text>
                                </View>
                            </>)



                        )}
                    </View>

                    <View style={{ padding: 10, margin: 10 }}>
                        <Text style={styles.subheading}>
                            Payment Method
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text style={styles.txt}> COD </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
                        <Text style={{ color: 'white' }}>Book</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible == true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={require('../../images/tick.png')}
                            style={{ width: '100%', height: '40%' }}
                        />
                        <Text style={styles.modalText}>Booking Confirmed</Text>
                        <TouchableOpacity
                            style={[styles.ModalBtn]}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('Bookings')

                            }}
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}>View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        height: 150,
        color: 'white',

    },
    heading: {
        fontSize: 25,
        marginTop: 10,
        padding: 10,
        color: 'white'
    },
    subheading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    lowerView: {
        margin: 15,
        marginBottom: 30,

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
    box: {
        padding: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9C9FA2'

    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    mainText: {
        marginBottom: 8,
        marginLeft: 8
    },
    subText: {
        fontSize: 11,
        color: '#909193',
        lineHeight: 15,
    },
    productsView: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#D4D4D7',
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderColor: "white",
        backgroundColor: "white",
        borderColor: "#C8C4C4",
        flexDirection: 'row',
    },
    btnTxt: {
        fontSize: 11,
        opacity: 0.6,
        alignSelf: "center",
        textAlign: "center",
        top: 5,
    },
    btn: {
        borderRadius: 7,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#336B99',
        margin: 6
    },
    centeredView: {
        borderTopWidth: 1,
        borderColor: '#908D8D'

    },
    modalView: {

        backgroundColor: 'rgba(32, 33, 33,0.7)',
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
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    txt:{
        fontWeight:'bold',
        margin:7
    }
});