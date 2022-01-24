import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/app';

export default function PaymentScreen({ route, navigation }) {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [check, setcheck] = useState(true);

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    // console.log("params:", route.params);
    const { booking } = route.params;
    console.log("bookings:", booking.provider[0].businessName);
    console.log("Booking id: ", booking.bid)



    const cancelBtn = () => {

        setModalVisible(true);
    }
    
    const cancelBooking = (bid) => {
        db.collection('bookings').doc(bid).delete().then(
            (data) => {
                check ? setcheck(false) : setcheck(true);
                setModalVisible2(true)
                //Alert.alert("Product Deleted Successfully");

            }
        )
       
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ height: SCREEN_HEIGHT * 1.2, }}>
                <View style={styles.topView}>
                    <View style={styles.box}>
                        <View style={styles.boxContent}>

                            <View>
                                <Text style={styles.heading}> {booking.service_name},</Text>
                                <Text style={styles.subheading}> {booking.date} at</Text>
                                <Text style={styles.subheading}>{booking.time}</Text>
                                <Text></Text>
                                <Text style={styles.subText}>Booking RefNo: {booking.refno}</Text>
                                <Text style={styles.confirmed}>Confirmed</Text>
                                <Text style={styles.mainText}>{booking.provider[0].businessName}</Text>
                                <Text style={styles.subText}>{booking.provider[0].location}</Text>




                            </View>
                            <View style={styles.serviceImg}>

                                <Image
                                    source={{ uri: booking.service_img }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 20 / 2,
                                        alignSelf: "center",
                                    }}
                                />
                            </View>

                        </View>

                        <View style={styles.cancelbtnContainer}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelBtn()}>
                                <Entypo name="cross" color="white" size={20} />
                                <Text style={styles.txt}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>






                </View>

                <View style={styles.lowerView}>
                    <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Products</Text>
                    {booking.products.map((item, key) => (

                        <>
                            <View style={styles.productsView} key={key}>

                                <Image
                                    source={{ uri: item.img }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30 / 2,
                                        alignSelf: "center",
                                        marginRight: 10
                                    }}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={{ fontSize: 12 }}>{item.name}</Text>
                                </View>

                                <Text>$ {item.price}</Text>

                            </View>
                        </>)



                    )}

                    <Text></Text>
                    <Text style={styles.blackTxt}>Total : {booking.price}</Text>
                    <Text style={styles.blackTxt}>Payment Method : {booking.payment}</Text>

                </View>

            </ScrollView >

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible == true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={[styles.blackTxt, { fontSize: 24 }]}>Are you sure you want to cancel the booking?</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={[styles.ModalBtn]}
                                onPress={() => { setModalVisible(false) }}
                            >
                                <Text style={{ fontSize: 17, color: '#145A32' }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ModalBtn, { backgroundColor: '#E03D3D' }]}
                                onPress={() => { cancelBooking(booking.bid) }}
                            >
                                <Text style={{ fontSize: 17, color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible2 == true}
            >
                <View style={styles.centeredView2}>

                    <View style={styles.modalView2}>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', alignSelf: 'flex-end', zIndex:3}}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('Bookings')

                            }}>
                            <Entypo name="cross" color="white" size={30} style={{ color: 'white' }} />
                        </TouchableOpacity>
                        <View style={{width:'100%', height:'100%', justifyContent:'center', marginTop:-30}}>
                        <Image
                            source={require('../../images/tick.png')}
                            style={{ width: '100%', height: '40%' }}
                        />
                        <Text style={styles.modalText2}>Booking Canceled</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
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
        height: 500,
        color: 'white',

    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    subheading: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
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
        marginTop: 20,
        marginBottom: 8,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 5
    },
    subText: {
        fontSize: 13,
        color: '#AFB0B1',
        lineHeight: 15,
        marginHorizontal: 5
    },
    box: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#9C9FA2',
        padding: 20,
        marginBottom: 30
    },
    boxContent: {
        justifyContent: 'space-between',
        flexDirection: 'row'


    },
    textContainer: {
        width: '70%',
        justifyContent: 'center',
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
        borderColor: '#908D8D',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 10,
        borderRadius: 20

    },
    modalView: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        textAlign: 'center'
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
    centeredView2: {
        borderTopWidth: 1,
        borderColor: '#908D8D'

    },
    modalView2: {

        backgroundColor: 'rgba(32, 33, 33,0.9)',
        padding: 20,
       
        alignItems: "center",
        shadowColor: "#000",
        height: '100%',
        width: '100%'

    },
    ModalBtn2: {
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 16,
        width: 120,
        backgroundColor: '#ABEBC6',
        alignItems: 'center',
        alignContent: 'center',

    },
    modalText2: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    txt2: {
        fontWeight: 'bold',
        margin: 7
    }
});