import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
const FIREBASE_API_ENDPOINT =
  'https://marketing-bcbe8-default-rtdb.firebaseio.com/';

function SignupScreen({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);

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
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      {/* <Image
        source={require('../images/img1.png')}
        style={{ width: '100%', height: '40%' }}
      /> */}
      <Text
        style={{ fontSize: 30,  alignSelf: 'center', }}>
        Social Media Marketing
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
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 45,
          borderWidth: 2,
          marginTop: 50,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 4,
        }}>
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          style={{ paddingHorizontal: 20 }}
          placeholder="Email"
          placeholderTextColor="#00716F"
          value={getEmail}
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
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 20 }}
          value={getPassword}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          marginHorizontal: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          backgroundColor: '#00716F',
          paddingVertical: 10,
          borderRadius: 23,
        }}>
        <TouchableOpacity
          style={{
            color: 'white',
          }}
          onPress={authenticateUser}>
          <Text style={{ color: 'white' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <Text
        onPress={() => navigation.navigate('Register')}
        style={{
          alignSelf: 'center',
          color: '#00716F',
          paddingVertical: 20,
        }}>
        New User?
      </Text>
    </View>
  );
}

export default SignupScreen;
