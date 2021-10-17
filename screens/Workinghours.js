import React, { useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Switch, Modal, CheckBox } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import SwitchToggle from "react-native-switch-toggle";
import ToggleSwitch from 'toggle-switch-react-native';
import { Checkbox } from 'react-native-paper';
const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
function VendorSignup({ route, navigation }) {
    
    const [getEmail, setEmail] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [toggles,setToggles] = useState([
        { id: 0, day: 'Mon', toggle: false },
        { id: 1, day: 'Tue', toggle: false },
        { id: 2, day: 'Wed', toggle: false },
        { id: 3, day: 'Thur',toggle: false },
        { id: 4, day: 'Fri', toggle: false },
        { id: 5, day: 'Sat', toggle: false },
        { id: 6, day: 'Sun', toggle: false }]);
    useEffect(() => {
        
    }, toggles)
    const updateToggle = (item, index) => {

        // toggle[index] = !toggle[index]
        // console.log(toggle);
        // setToggle(toggle);
        const newData = toggles.map(newItem => {

            if (newItem.id === item.id) {
                var t = !item.toggle;
                console.log("t=",t);
                return{
                    ...newItem,
                    toggle: !item.toggle
                }
            }
            return{
                ...newItem,
                toggle: newItem.toggle
            }
        })
        console.log(newData);
        
        setToggles(newData);
        console.log("AFTERR= ",toggles);
    }

    return (

        <View style={styles.container}>

            <Text
                style={{ fontSize: 13, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10 }}>
                Add working hours
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                Choose your working hours, so the clients can book your services.
            </Text>

            {toggles.map((item, key) => (
                <View key={key} style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 10 }}>
                    <Text style={{ fontStyle: 'bold', marginTop: 6 }}>{item.day}</Text>
                    
                    <CheckBox
                       disabled={false}
                        onValueChange={()=>updateToggle(item)}
                        
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

                </View>
            ))}


            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { setModalVisible(true); }}
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
                            onPress={() => navigation.navigate('VendorLogin')}
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
        marginLeft: 10,
        width: '100%',
        top: 10,
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
    }

});
export default VendorSignup;
