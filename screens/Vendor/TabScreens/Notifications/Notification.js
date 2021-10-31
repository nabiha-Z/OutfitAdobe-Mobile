import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Notifications() {
    return (
        <View style={styles.container}>
            <Text>This the Notifications screen</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
})