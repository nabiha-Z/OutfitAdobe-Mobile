import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign, FontAwesome} from '@expo/vector-icons';

export default function Contact({ route, navigation }) {
    return (
        <View style={styles.container}>

            <ScrollView style={{ height: 80 }}>
                <Text
                    style={{ fontSize: 15, opacity: 0.5, marginHorizontal: 10 }}>
                    Contact Center
                </Text>
                <Text
                    style={styles.heading}>
                    How can we help you?
                </Text>
                <Text
                    style={styles.desc}>
                    Feel free to contact us regarding any of your queries.
                </Text>
                <Text style={styles.paragraph}>We have a commitment to our customers. It's to provide you with the best possible service in our vicinity while offering an easy way leverage them. </Text>
                <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                <Text
                    style={[styles.heading, { fontSize: 20, marginTop: 20 }]}>
                    How to contact us?
                </Text>
                <Text style={styles.paragraph}>You can ask any of the relevant question regarding your queries using following contact mediums.</Text>
                <Text style={styles.paragraph}>Our help center team will get it sorted for you.</Text>
                <View style={styles.iconsView}>
                    <TouchableOpacity><AntDesign name='google' size={25} style={styles.icon}/></TouchableOpacity>
                    <TouchableOpacity><AntDesign name='instagram' size={25} style={styles.icon}/></TouchableOpacity>
                    <TouchableOpacity><AntDesign name='twitter' size={25} style={styles.icon}/></TouchableOpacity>
                    <TouchableOpacity><FontAwesome name='facebook' size={25} style={styles.icon}/></TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
     
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
    paragraph: {
        fontSize: 15,
        opacity: 0.7,
        marginTop: 10,
        lineHeight: 23,
        textAlign:'justify'
    },
    iconsView: {
        top: 15,
        flexDirection: 'row',
        paddingBottom:20
        
    },
    icon:{
        margin:10
    }


})