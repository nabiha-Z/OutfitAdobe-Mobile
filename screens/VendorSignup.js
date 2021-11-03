import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';

const FIREBASE_API_ENDPOINT =
    'https://onequeue-912fa-default-rtdb.firebaseio.com/';
import hair from '../images/hair.png';
import spa from '../images/spa.png';
import beard from '../images/beard.png';
import aesthetic from '../images/aesthetic.png';
import salon from '../images/salon.png';
import beauty from '../images/beauty.png';

import one from '../images/onee.png';
import two from '../images/3people.png';
import five from '../images/5people.png';
import eleven from '../images/11people.png';



function VendorSignup({ route, navigation }) {
    const [categories, setCategories] = useState([
        { id: 0, icon: beauty, title: 'Beauty & Wellness', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Beauty Salons', 'Hair Salons', 'Nail Salons', 'Spa'] },
        { id: 1, icon: spa, title: 'Medical', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Psychologist', 'Physiologist', 'Dentists', 'Acupunture', 'Chiropractors', 'Medical'] },
        { id: 2, icon: beard, title: 'Sports', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Gyms', 'Golf Classes', 'Sport Item Rental', 'Sport Resources'] },
        { id: 3, icon: aesthetic, title: 'Freelancer', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Driving Schools', 'Pet Services', 'Household', 'Cleaning', 'Design Consulltions', 'Spiritual Services', 'Meeting Rooms', 'Coaching', 'Counselling'] },
        { id: 4, icon: salon, title: 'Events', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Business Event', 'Events', 'Photographers'] },
        { id: 5, icon: beauty, title: 'Entertainment', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Resturants', 'Escape Rooms', 'Equipment Rental', 'Art Classes'] },
        { id: 6, icon: salon, title: 'Official', border: '#C8C4C4', background: 'white', checked: false, subCat: ['City Councils', 'Embassies & Consulates', 'Attorney', 'Legal', 'Business Attorney', 'Financial Services', 'Interview Scheduling', 'Call Centers'] },
        { id: 7, icon: salon, title: 'Education', border: '#C8C4C4', background: 'white', checked: false, subCat: ['Universities', 'Colleges', 'Libraries', 'Teaching', 'Tutoring Lessons', 'Parent Meetings', 'Child care'] }]);

    const [teamSize, setTeamSize] = useState([
        { id: 0, icon: one, title: "It's just me", border: '#C8C4C4', background: 'white', selected: false },
        { id: 1, icon: two, title: "2-4", border: '#C8C4C4', background: 'white', selected: false },
        { id: 2, icon: five, title: "5-10", border: '#C8C4C4', background: 'white', selected: false },
        { id: 3, icon: eleven, title: "11+", border: '#C8C4C4', background: 'white', selected: false }
    ]);


    const [team, setTeam] = useState("");
    const [email, setEmail] = useState("");
    const [length, setlength] = useState(1);
    const [vendors, setVendors] = useState([]);
    const [display, setDisplay] = useState(false);
    const [getPassword, setPassword] = useState(null);
    const [businessName, setBusinessName] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);
    const [username, setUsername] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [show, setShow] = useState({ visible: false, currentItem: '' });
    const [selectedSub, setSelectedSub] = useState([{ title: "", subcate: [] }]);
    const [errors, setErrors] = useState({ field: '', email: '', pass: '', categories: '', team: '' });

    const getData = async () => {
        const response = await fetch(`${FIREBASE_API_ENDPOINT}/vendors.json`);
        const data = await response.json();
        if (data == null) {
            setVendors([]);
        } else {
            let arr = Object.entries(data).map((item) => ({
                ...item[1],
                key: item[0],
            }));
            setVendors(arr);
        }
    };
    const DisplayCheckedItem = () => {
        console.log("Display checkeddddd: ", display);
        return (


            checkedItems.map((item) => (
                <>

                    <TouchableOpacity
                        style={{ backgroundColor: 'grey', padding: 5, borderRadius: 20, margin: 5 }}>

                        <Text style={{ color: 'white', fontSize: 10 }}>{item}</Text>
                    </TouchableOpacity>
                </>
            ))


        )

    }

    useEffect(() => {
        getData()
        DisplayCheckedItem()

    }, [])

    const nextPage = () => {
        var count = 0, countCat = 0, countTeam = 0;
        var validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(.[a-z]{2,4})*$/;

        console.log("lengths= ", businessName.length);
        if (businessName.length === 0 || email.length === 0 || username.length === 0 || getPassword.length === 0) {
            setErrors({ field: 'Fill out all fields', email: '', pass: '', categories: '', team: '' });
        } else if (email.match(validEmailRegex)) {

            setErrors({ field: '', email: '', pass: '', categories: '', team: '' });
            vendors.map((item, index) => {
                //checking if any user already exists
                if (item.email === email) {
                    count = count + 1;

                }
            });
            if (count === 0) {
                if (getPassword.length < 6) {
                    setErrors({ field: '', email: '', pass: 'Password should have alteat 6 characters', categories: '', team: '' });
                } else {
                    setErrors({ field: '', email: '', pass: '', categories: '', team: '' });

                    const selectedData = [], subcategories = [];

                    categories.map(item => {

                        if (item.checked === true) {

                            selectedData.push({ id: item.id, title: item.title, icon: item.icon, subCat: item.subCat, checked: item.checked });
                        } else {
                            countCat++;
                        }

                    })

                    if (countCat === categories.length) {
                        setErrors({ field: 'Select Categories', email: '', pass: '', categories: 'Select Categories', team: '' });
                    } else {

                        setErrors({ field: '', email: '', pass: '', categories: '', team: '' });
                        categories.map((item) => {
                            selectedSub.map((element) => {
                                if (item.title == element.title) {
                                    if (item.checked === true) {

                                        subcategories.push(element);
                                    }
                                }
                            })
                        })

                        teamSize.map((item) => {
                            if (item.selected === false) {
                                countTeam++;
                            }
                        })

                        if (countTeam === teamSize.length) {
                            setErrors({ field: 'Select Team Size', email: '', pass: '', categories: '', team: 'Select Team Size' });
                        } else {
                            setErrors({ field: '', email: '', pass: '', categories: '', team: '' });
                            //console.log("next page data= ", subcategories);
                            navigation.navigate('SignupLocation', {
                                categories: selectedData, businessName: businessName, Username: username, Email: email, Password: getPassword, SubCat: subcategories, TeamSize: team
                            })
                        }


                    }
                }
            } else {
                setErrors({ field: '', email: 'This email has already been used', pass: '', categories: '', team: '' });


            }

        } else {

            setErrors({ field: '', email: 'Invalid Email', pass: '', categories: '', team: '' });

        }
    }
    const onChange = (item) => {

        setErrors("");
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

            // console.log("AFTERRR = ", show);;
            setModalVisible(true);
        }

    }

    const onSizeSelect = (item) => {

        //console.log("Item Radio = ", item);
        var color, background;
        const newData = teamSize.map(newItem => {

            if (newItem.selected === true && (newItem.id != item.id)) {
                console.log("Uncheck")
                color = '#C8C4C4';
                background = 'white';
                return {
                    ...newItem,
                    border: color,
                    background: background,
                    selected: !item.selected
                }
            }

            if (newItem.id === item.id) {

                if (item.selected === false) {
                    color = '#EAF3F2';
                    background = '#EAF3F2';
                    setTeam(item.title);

                } else {
                    color = '#C8C4C4';
                    background = 'white';
                }

                return {
                    ...newItem,
                    border: color,
                    background: background,
                    selected: !item.selected
                }
            }
            return {
                ...newItem,
                selected: newItem.selected
            }
        })

        setTeamSize(newData);
    }

    const closeModal = () => {
        show.visible = false;
        show.currentItem = '';
        setModalVisible(false);
        var arr = [];
        setCheckedItems(arr);
        setCheckedItems(arr);
        setDisplay(false);
        //console.log("checked = ", checkedItems);

    }


    const onSelect = (item, element) => {

        var arr = checkedItems;
        if (arr.length == 0) {
            arr[0] = item.title;
            arr[1] = element
            setDisplay(true);
        } else if (arr.indexOf(element, 1) == -1) {
            arr.push(element);
            setCheckedItems(arr);

            setDisplay(false);

        }
        setDisplay(true);


        console.log("On select checkedArray= ", checkedItems);
    }
    const onConfirm = () => {
        var title = checkedItems[0];
        var count = 0;
        if (length != 1) {

            selectedSub.map((item) => {
                if (item.title === title) {
                    count++;
                }
            })
            if (count == 0) {


                var cat = checkedItems.splice(1, checkedItems.length);

                setSelectedSub([...selectedSub, { title: title, subcate: cat }]);
            }


            console.log("New data seletedd= ", selectedSub);
        } else {

            var cat = checkedItems.splice(1, checkedItems.length);

            setSelectedSub([{ title: title, subcate: cat }]);
            setlength(2);

            console.log("selesctedddd= ", selectedSub);
        }
        closeModal();
    }
    return (

        <View style={styles.container}>
            {/* <Image
        source={require('../images/img4.png')}
        style={{ width: '100%', height: '40%' }}
      /> */}
            <ScrollView style={{ height: 80 }}>
                <Text
                    style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                    Business Setup
                </Text>
                <Text
                    style={styles.heading}>
                    Have any business name in mind?
                </Text>
                <Text
                    style={styles.desc}>
                    This shall be your brand name, that your clients will get to see.
                </Text>

                <Text style={styles.errorsTxt}>{errors.field}</Text>
                <Text
                    style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                    Business Name
                </Text>
                <TextInput style={styles.businessField} onChangeText={(text) => setBusinessName(text)} />

                <Text
                    style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                    Email
                </Text>
                <TextInput style={styles.businessField} onChangeText={(text) => setEmail(text)} />
                <Text style={styles.errorsTxt}>{errors.email}</Text>

                <Text
                    style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                    Username
                </Text>
                <TextInput style={styles.businessField} onChangeText={(text) => setUsername(text)} />

                <Text
                    style={{ fontSize: 12, marginTop: 10, marginHorizontal: 10 }}>
                    Password
                </Text>
                <TextInput 
                 secureTextEntry
                style={styles.businessField}
                 onChangeText={(text) => setPassword(text)} />
                <Text style={styles.errorsTxt}>{errors.pass}</Text>

                <Text
                    style={[styles.heading, { fontSize: 20 }]}>
                    Select Categories
                </Text>
                <Text style={styles.errorsTxt}>{errors.categories}</Text>
                <ScrollView style={{ height: 370, marginHorizontal: 5, marginTop: 15, marginLeft: 11, paddingRight: 15 }}>
                    <View style={styles.categoriesView}>
                        {categories.map((item, key) =>

                        (
                            <>

                                <View style={styles.checkboxContainer} key={key}>
                                    <CheckBox
                                        key={item.id}
                                        checked={item.checked}
                                        containerStyle={[styles.ckItem, { zIndex: 1 }]}
                                        disabled={false}
                                        onAnimationType='fill'
                                        offAnimationType='fade'
                                        boxType='square'
                                        onPress={() => onChange(item)}
                                    />
                                    <View style={[styles.customCheckbox, { zIndex: 0, borderColor: item.border, backgroundColor: item.background }]} >
                                        <Image source={item.icon} style={{ width: '80%', height: '60%', alignSelf: 'center' }} />
                                        <Text style={styles.btnTxt}>{item.title} </Text>
                                    </View>


                                </View>


                            </>
                        ))}
                    </View>
                </ScrollView>



                <Text
                    style={styles.heading}>
                    What's your team size?
                </Text>

                <Text
                    style={[styles.desc, { color: 'black' }]}>
                    Your team size shall help us set up your calendar accordingly.
                </Text>
                <Text style={styles.errorsTxt}>{errors.team}</Text>
                <View style={styles.categoriesView}>
                    {teamSize.map((item, key) =>

                    (
                        <>

                            <View style={[styles.checkboxContainer, { width: '40%', marginHorizontal: 13 }]} key={key}>

                                <CheckBox
                                    key={item.id}
                                    checked={item.selected}
                                    containerStyle={[styles.ckItem, { zIndex: 1 }]}
                                    disabled={false}
                                    onAnimationType='fill'
                                    offAnimationType='fade'
                                    boxType='square'
                                    onPress={() => onSizeSelect(item)}
                                />
                                <View style={[styles.customCheckbox, { zIndex: 0, borderColor: item.border, backgroundColor: item.background, width: '100%', height: 120, }]} >
                                    <Image source={item.icon} style={{ width: '100%', height: '80%', alignSelf: 'center' }} />
                                    <Text style={styles.btnTxt}>{item.title} </Text>
                                </View>


                            </View>


                        </>
                    ))}
                </View>

                <View style={styles.footerTab}>
                    <TouchableOpacity
                        style={styles.footerBtn}
                        onPress={() => nextPage()}
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
                                if (item.title === show.currentItem) {

                                    return (
                                        <View>
                                            <Text style={[styles.heading, styles.subCateHeading]}> Select sub categories</Text>

                                            <View style={[styles.checkboxContainer]}>
                                                <ScrollView style={{ height: 280, marginHorizontal: -10 }}>

                                                    {item.subCat.map((element, index) => (
                                                        <>

                                                            <TouchableOpacity
                                                                key={index}
                                                                style={styles.subCatBtn}
                                                                onPress={() => onSelect(item, element)}
                                                            >
                                                                <Text style={{ color: 'white', marginTop: 5 }}>{element}</Text>
                                                            </TouchableOpacity>



                                                        </>

                                                    ))}

                                                </ScrollView>
                                            </View>



                                        </View>
                                    )
                                }
                            })}

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 40 }}>

                                {display && DisplayCheckedItem()}

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={[styles.ModalBtn, { backgroundColor: 'black' }]}
                                    onPress={() => closeModal()}
                                >
                                    <Text style={{ fontSize: 17, color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.ModalBtn]}
                                    onPress={() => onConfirm()}
                                >
                                    <Text style={{ fontSize: 17, color: 'white' }}>Done</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </ScrollView>
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
        paddingRight: 30,

    },
    businessField: {
        width: '90%',
        padding: 4,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DFDFDF',
        marginHorizontal: 10

    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#5B5A59'
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
        borderColor: '#908D8D',
        justifyContent: 'center',
        alignItems: "center",


    },
    modalView: {

        backgroundColor: 'rgba(41, 41, 41,0.8)',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        height: '86%',
        width: '90%',

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
    errorsTxt: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
        marginHorizontal: 10,
    },
    subCateHeading: {
        backgroundColor: 'rgba(41, 41, 41,0.9)',
        padding: 10,
        fontSize: 18,
        marginBottom: 30,
        color: 'white',
        borderRadius: 10, textAlign: 'center',

    },
    subCatBtn: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(31, 32, 32,0.4)',
        width: '90%',
        marginHorizontal: 10,
        margin: 10
    }
    ,
    desc: {
        fontSize: 13,
        opacity: 0.7,
        marginTop: 5,
        marginHorizontal: 10
    }

});
export default VendorSignup;
