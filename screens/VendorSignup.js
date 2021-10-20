import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, CheckBox, ScrollView, Modal } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
import hair from '../images/hair.png';
import spa from '../images/spa.png';
import beard from '../images/beard.png';
import aesthetic from '../images/aesthetic.png';
import salon from '../images/salon.png';
import beauty from '../images/beauty.png';
import { back } from 'react-native/Libraries/Animated/src/Easing';


function VendorSignup({ route, navigation }) {
    const [categories, setCategories] = useState([
        { id: 1, icon: beauty, title: 'Beauty & Wellness', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Beauty Salons', 'Hair Salons', 'Nail Salons', 'Spa'] },
        { id: 2, icon: spa, title: 'Medical', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Psychologist', 'Physiologist', 'Dentists', 'Acupunture', 'Chiropractors', 'Medical'] },
        { id: 3, icon: beard, title: 'Sports', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Gyms', 'Golf Classes', 'Sport Item Rental', 'Sport Resources'] },
        { id: 4, icon: aesthetic, title: 'Freelancer', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Driving Schools', 'Pet Services', 'Household', 'Cleaning', 'Design Consulltions', 'Spiritual Services', 'Meeting Rooms', 'Coaching', 'Counselling'] },
        { id: 5, icon: salon, title: 'Events', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Business Event', 'Events', 'Photographers'] },
        { id: 6, icon: beauty, title: 'Entertainment', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Resturants', 'Escape Rooms', 'Equipment Rental', 'Art Classes'] },
        { id: 7, icon: salon, title: 'Official', border: '#C8C4C4', background: 'white', checked: false, subCat: ['City Councils', 'Embassies & Consulates', 'Attorney', 'Legal', 'Business Attorney', 'Financial Services', 'Interview Scheduling', 'Call Centers'] },
        { id: 8, icon: salon, title: 'Education', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Universities', 'Colleges', 'Libraries', 'Teaching', 'Tutoring Lessons', 'Parent Meetings', 'Child care'] }]);

    const [show, setShow] = useState({ visible: false, currentItem: '' });
    const [isModalVisible, setModalVisible] = useState(false);

    const onChange = (item) => {

        const newData = categories.map(newItem => {

            if (newItem.id === item.id) {
                var color, background;
                if (item.checked === false) {
                    color = '#EAF3F2';
                    background = '#EAF3F2';

                } else {
                    color = '#C8C4C4';
                    background = 'white';
                }

                return {
                    ...newItem,
                    border: color,
                    background: background,
                    checked: !item.checked
                }
            }
            return {
                ...newItem,
                checked: newItem.checked
            }
        })

        //console.log(newData);

        console.log("LATESTT\n\n");
        setCategories(newData);
        // const newShow = show.map(element => {
        //     return {

        //     }
        // })
        if (item.checked === false) {
            show.visible = true;
            show.currentItem = item.title;
            //console.log("newShow= ", newShow);
            setShow(show);

            console.log("AFTERRR = ", show);;
            setModalVisible(true);
        }

    }

    const closeModal = () => {
        show.visible = false;
        show.currentItem = '';
        setModalVisible(false);
        console.log("showw= ", show);
    }

    const ModalContent = (sub) => {
        console.log("gfgfjdghjhgjhdjfhg")
        return (
            <>
                {console.log("sub= ", sub)}
                <Text>{sub}</Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        disabled={false}
                        onAnimationType='fill'
                        offAnimationType='fade'
                        boxType='square'
                        onValueChange={() => onChange()}
                    />

                    {/* <Text style={styles.label}>Do you like React Native?</Text> */}
                    {/* <View style={[styles.customCheckbox, styles.elevation, { borderColor: bordercolor }]} >
                    
                    {/* <Feather name={item.icon} size={24} color="black" /> 
                    <Text style={styles.btnTxt}>{item.title}</Text>
                </View> */}

                </View>
            </>
        )
    }
    return (

        <View style={styles.container}>
            {/* <Image
        source={require('../images/img4.png')}
        style={{ width: '100%', height: '40%' }}
      /> */}
            <Text
                style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                Business Setup
            </Text>
            <Text
                style={{ fontSize: 25, marginTop: 5, marginHorizontal: 10, fontWeight: 'bold', color: '#5B5A59' }}>
                Have any business name in mind?
            </Text>
            <Text
                style={{ fontSize: 13, opacity: 0.7, marginTop: 5, marginHorizontal: 10 }}>
                This shall be your brand name, that your clients will get to see.
            </Text>

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Business Name
            </Text>
            <TextInput style={styles.businessField} />

            <Text
                style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                Email
            </Text>
            <TextInput style={styles.businessField} />



            {/* <Checkbox
      value={isSelected}
      onValueChange={setSelection}
    //   value="salon"
    //   onChange={(e) => {if(e.checked){
    //       setCategory([...categories, e.value])}
    //     }}
        style={styles.checkbox}
      /> */}

            <ScrollView style={{ height: 20, marginHorizontal: 5, marginTop: 15, marginLeft: 11, paddingRight: 15 }}>
                <View style={styles.categoriesView}>
                    {categories.map((item, key) =>

                    (
                        <>

                            <View style={styles.checkboxContainer} key={key}>
                                <CheckBox
                                    key={item.id}
                                    value={item.checked}
                                    style={[styles.ckItem, { zIndex: 1 }]}
                                    disabled={false}
                                    onAnimationType='fill'
                                    offAnimationType='fade'
                                    boxType='square'
                                    onValueChange={() => onChange(item)}
                                />
                                <View style={[styles.customCheckbox, { zIndex: 0, borderColor: item.border, backgroundColor: item.background }]} >
                                    <Image source={item.icon} style={{ width: '80%', height: '60%', alignSelf: 'center' }} />
                                    <Text style={styles.btnTxt}>{item.title} </Text>
                                </View>
                                {/* <Text style={styles.label}>Do you like React Native?</Text> */}
                                {/* <View style={[styles.customCheckbox, styles.elevation, { borderColor: bordercolor }]} >
                                    
                                    {/* <Feather name={item.icon} size={24} color="black" /> 
                                    <Text style={styles.btnTxt}>{item.title}</Text>
                                </View> */}

                            </View>


                        </>
                    ))}
                </View>
            </ScrollView>


            <View style={styles.footerTab}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => navigation.navigate('SignupLocation')}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Next step</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={show.visible}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {categories.map((item, key) => {

                            {
                                item.title == show.currentItem &&

                                <>

                                    <View style={styles.checkboxContainer} key={key}>
                                        <CheckBox
                                            key={item.id}

                                            disabled={false}
                                            onAnimationType='fill'
                                            offAnimationType='fade'
                                            boxType='square'
                                            onValueChange={() => onChange()}
                                        />
                                        <View style={[styles.customCheckbox, { zIndex: 0, borderColor: item.border, backgroundColor: item.background }]} >
                                            <Image source={item.icon} style={{ width: '80%', height: '60%', alignSelf: 'center' }} />
                                            <Text style={styles.btnTxt}>{item.title} </Text>
                                        </View>
                                        {/* <Text style={styles.label}>Do you like React Native?</Text> */}
                                        {/* <View style={[styles.customCheckbox, styles.elevation, { borderColor: bordercolor }]} >
                
                {/* <Feather name={item.icon} size={24} color="black" /> 
                <Text style={styles.btnTxt}>{item.title}</Text>
            </View> */}

                                    </View>


                                </>

                            }
                        })}


                        <TouchableOpacity
                            style={[styles.ModalBtn]}
                            onPress={() => closeModal()}
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}>Close</Text>
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
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 10,
        paddingRight: 40
    },
    businessField: {
        width: '90%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    customCheckbox: {
        padding: 10,
        borderWidth: 1,
        width: 80,
        height: 100,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: 'white',
        borderColor: '#C8C4C4',
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
    elevation: {
        elevation: 5,
        shadowColor: '#F4F0F0',

    },
    btnTxt: {
        fontSize: 10,
        opacity: 0.5,
        alignSelf: 'center',
        textAlign: 'center',
        top: 5
    },
    categoriesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    ckItem: {
        alignSelf: "center",
        width: 80,
        height: 90,
        opacity: 0,
        position: 'absolute'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
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

});
export default VendorSignup;
