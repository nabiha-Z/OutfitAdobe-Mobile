import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';

import SelectDropdown from 'react-native-select-dropdown';

function NewInventory({ navigation }) {


    const auth = firebase.auth();
    const db = firebase.firestore();
    const [getName, setName] = useState(null);
    const [getDesc, setDesc] = useState(null);
    const [getPrice, setPrice] = useState(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [service, setService] = useState([]);
    const [selectedService, setSelected] = useState(null);
    const uploadImage = async (uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();
        var imagename = getName + new Date().toString();
        var ref = firebase.storage().ref().child(imagename);
        await ref.put(blob);
        ref.getDownloadURL().then(
            (data) => {
                db.collection('products').add({
                    name: getName,
                    desc: getDesc,
                    price: getPrice,
                    img: data,
                    store: auth.currentUser.uid,
                    service:selectedService
                }).then(
                    data => {
                        Alert.alert('Product Added Successfully');
                        navigation.navigate('Profile');
                    }
                )
            }
        )

    };
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        db.collection('services').get().then(

            (data) => {
                var temp = [];
                data.docs.map(
                    (data1) => {
                        if (data1.data().store == auth.currentUser.uid) {
                            var a = data1.data();
                            temp.push(a.name);
                        }

                    }

                )
                setService(temp);
            }
        )
    }, []);







    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            // base64: true,
            aspect: [4, 3]
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text
                    style={styles.heading}>
                    Add a new Product
                </Text>
                <Text
                    style={styles.desc}>
                    This will add a new Product
                </Text>

                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Product Name'
                    value={getName}
                    onChangeText={text => setName(text)}
                />

                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Product Description'
                    value={getDesc}
                    onChangeText={text => setDesc(text)}
                />
                <Text style={styles.label}>Price:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='Enter Product Price'
                    value={getPrice}
                    onChangeText={text => setPrice(text)}
                />

                <Text style={styles.label}>Select the Service for the product</Text>
                <SelectDropdown
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
                    buttonStyle={selectedService != null ? [styles.button, { backgroundColor: 'white' }] : styles.button}
                    dropdownStyle={styles.dropdown}
                    rowTextStyle={styles.dropdownItems}
                    buttonTextStyle={selectedService != null ? [styles.buttonText, { color: '#12555C' }] : styles.buttonText}
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
    }
});

export default NewInventory;
