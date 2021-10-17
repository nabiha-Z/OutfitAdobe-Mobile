import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
const FIREBASE_API_ENDPOINT =
  'https://onequeue-912fa-default-rtdb.firebaseio.com/';

function SignupScreen({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getContact, setContact] = useState(null);
  const [getUsername, setUsername] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [getConfirmPass, setConfirmPass] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [users, setUsers] = useState([]);
  var count = 0;

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


  useEffect(() => {
    getData()
  }, [])

  const addUser = () => {
    var validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(.[a-z]{2,4})*$/;
    // console.log('here');
    // console.log(
    //   'getUsername= ',
    //   getUsername,
    //   'getPassword=',
    //   getPassword,
    //   'getContact=',
    //   getContact,
    //   'getConfirmPass=',
    //   getConfirmPass,
    //   'getEmail=',
    //   getEmail
    // );

    if (getUsername != null &&
      getPassword != null &&
      getContact != null &&
      getEmail != null) {

      if (getEmail.match(validEmailRegex)) {
        setEmailError(null);
        users.map((item, index) => {
          //checking if any user already exists
          if (item.email === getEmail) {
            count = count + 1;
            console.log("Coint= ", count);
          }
        });
        if (count === 0) {
          var requestOptions = {
            method: 'POST',
            body: JSON.stringify({
              username: getUsername,
              password: getPassword,
              contact: getContact,
              email: getEmail,
            }),
          };
          fetch(`${FIREBASE_API_ENDPOINT}/users.json`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log('error', error));

        setUsername('');
        setPassword('');
        setContact('');
        setEmail('');
        alert('Account Created');
        navigation.navigate('LoginScreen');
        }else{
          alert("This account already exists")
        }
        

      } else {
        setEmailError("Invalid Email")
      }
    } else {
      alert('Fill');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/img4.png')}
        style={{ width: '80%', height: '30%' }}
      />
      <Text
        style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>
        Create a new Account
      </Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.5,
        }}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      </Text>
      <View
        style={styles.inputField}>
        <Icon name="user" color="#796565" size={24} />
        <TextInput
          placeholder="Username"
<<<<<<< HEAD
          placeholderTextColor="#796565"
          value={getUsername}
=======
          placeholderTextColor="#00716F"
          // value={getUsername}
>>>>>>> 49b9c2f60e3e451a6afa50bd3bed04fb9fdbfdb0
          onChangeText={(text) => setUsername(text)}
          style={{ paddingHorizontal: 10, width: 200 }}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="mail" color="#796565" size={24} />
        <TextInput
          style={{ paddingHorizontal: 10, width: 200 }}
          placeholder="Email"
<<<<<<< HEAD
          placeholderTextColor="#796565"
          value={getEmail}
=======
          placeholderTextColor="#00716F"
          // value={getEmail}
>>>>>>> 49b9c2f60e3e451a6afa50bd3bed04fb9fdbfdb0
          onChangeText={(text) => setEmail(text)}
        />

      </View>
      <Text style={{ color: 'red', fontSize: 12 }}>{emailError}</Text>
      <View
        style={styles.inputField}>

        <Icon name="phone" color="#796565" size={24} />
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          placeholder="Contact"
<<<<<<< HEAD
          placeholderTextColor="#796565"
          value={getContact}
=======
          placeholderTextColor="#00716F"
          // value={getContact}
>>>>>>> 49b9c2f60e3e451a6afa50bd3bed04fb9fdbfdb0
          onChangeText={(text) => setContact(text)}
          style={{ paddingHorizontal: 10 , width: 200}}
        />
      </View>
      <Text style={{ color: 'red', fontSize: 12 }}>{contactError}</Text>
      <View
        style={styles.inputField}>
        <Icon name="lock" color="#796565" size={24} />
        <TextInput
          secureTextEntry
          placeholder="Password"
<<<<<<< HEAD
          placeholderTextColor="#796565"
          style={{ paddingHorizontal: 10 }}
=======
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 , width: 200}}
>>>>>>> 49b9c2f60e3e451a6afa50bd3bed04fb9fdbfdb0
          value={getPassword}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
<<<<<<< HEAD
        style={styles.loginBtn}>
        <TouchableOpacity onPress={addUser}>
          <Text
            style={{
              color: 'white',
=======
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
>>>>>>> 49b9c2f60e3e451a6afa50bd3bed04fb9fdbfdb0
            }}>
            Create Account
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
    width: '100%'
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 45,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: '#796565',
    borderRadius: 23,
    paddingVertical: 4,
    width: '70%'
  },
  loginBtn: {
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#796565',
    paddingVertical: 10,
    borderRadius: 23,
    width: '70%'
  }


});
export default SignupScreen;
