import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
const FIREBASE_API_ENDPOINT =
  'https://onequeue-7e7f9-default-rtdb.firebaseio.com/';

function SignupScreen({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [feature, setfeature] = useState([]);

  const [users, setUsers] = useState([]);
  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/users.json`);
    const data = await response.json();
    if (data == null) {
      setUsers([]);
    } else {
      let arr = Object.entries(data).map((item) => ({
        ...item[1],
        key: item[0],
      }));
      setUsers(arr);
    }
  };
  getData();

  const authenticateUser = () => {
    if (getEmail != null && getPassword != null) {
      users.map((item, index) => {
        if (item.email == getEmail) {
          if (item.password == getPassword) {
            alert('Loged in');
            
          } else {
            alert('Incorrect Password');
          }
        } else {
          alert('Check your Email or Signup now.');
        }
      });
    } else {
      alert('Fill the fields');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/img4.png')}
        style={{ width: '100%', height: '40%' }}
      />
      <Text
        style={{ fontSize: 20,  alignSelf: 'center', textAlign:'center' }}>
        Create a new Account
      </Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.5,
        }}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </Text>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 45,
          borderWidth: 2,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Icon name="user" color="#00716F" size={24} />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#00716F"
          // value={getUsername}
          onChangeText={(text) => setUsername(text)}
          style={{ paddingHorizontal: 10, width: 200 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 45,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          style={{ paddingHorizontal: 10, width: 200 }}
          placeholder="Email"
          placeholderTextColor="#00716F"
          // value={getEmail}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 45,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Icon name="phone" color="#00716F" size={24} />
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          placeholder="Contact"
          placeholderTextColor="#00716F"
          // value={getContact}
          onChangeText={(text) => setContact(text)}
          style={{ paddingHorizontal: 10 , width: 200}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 45,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 , width: 200}}
          value={getPassword}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          marginHorizontal: 45,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#00716F',
          paddingVertical: 10,
          borderRadius: 23,
        }}>
        <TouchableOpacity >
          <Text
            style={{
              color: 'white',
               width: 200,textAlign:'center'
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      width:'100%'
  },
  

});
export default SignupScreen;
