import React, { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Icon from '@expo/vector-icons/AntDesign';
const FIREBASE_API_ENDPOINT =
  'https://onequeue-912fa-default-rtdb.firebaseio.com/';

function SignupScreen({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getContact, setContact] = useState(null);
  const [getUsername, setUsername] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [getConfirmPass, setConfirmPass] = useState(null);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [users, setUsers] = useState([]);
  var count = 0;


  const firebaseConfig = {
    apiKey: "AIzaSyBTGehuql0lmwhW69joWIyjrlmf-0I9ReE",
    authDomain: "onequeue-912fa.firebaseapp.com",
    databaseURL: "https://onequeue-912fa-default-rtdb.firebaseio.com",
    projectId: "onequeue-912fa",
    storageBucket: "onequeue-912fa.appspot.com",
    messagingSenderId: "188273292512",
    appId: "1:188273292512:web:3f52d65ea600461edfcc85",
    measurementId: "G-2BNFLV95DK"
  }

  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  const auth = getAuth(app);
  const db = getFirestore();


  // const writeData = () =>{
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }

  // }


  const addUser = async () => {
    console.log("email=", getEmail);
    var validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(.[a-z]{2,4})*$/;


    if (getUsername != null &&
      getPassword != null &&
      getContact != null &&
      getEmail != null) {

      if (getEmail.match(validEmailRegex)) {
        setEmailError("");
        users.map((item, index) => {
          //checking if any user already exists
          if (item.email === getEmail) {
            count = count + 1;
            console.log("Count= ", count);
          }
        });
        if (count === 0) {


          const userAuth = await createUserWithEmailAndPassword(auth, getEmail, getPassword)
            .then((user) => {
              console.log("userrrrrr=", user);
              console.log("created")
              setUsername('');
              setPassword('');
              setContact('');
              setEmail('');
              alert('Account Created');
            })
            .catch(error => {
              console.log("Error= ", error.message)
              alert("User already existed with this email")
            })

            console.log("Contact: ", getContact);
            console.log("phoneNumber=", auth.currentUser)
          await updateProfile(auth.currentUser, {
            phoneNumber: getContact,
            displayName: getUsername,
          }).then(() => {
            console.log("");
          }).catch((error) => {
            console.log("error: ", error)
          });

          console.log("userAuth: ", auth.currentUser);
          //   var user = {
          //     name: getUsername,
          //     phone: getContact,
          //     uid: userAuth.uid,
          //     email: userAuth.email
          // }
          // .then((userCredential) => {

          //   console.log("created");
          //   const user = userCredential.user;
          //   console.log("user=", user)
          //   
          //   navigation.navigate('LoginScreen');
          // })
          // .catch(error => {
          //   console.log('error= ', error.message);

          // })
          // fetch(`${FIREBASE_API_ENDPOINT}/users.json`, requestOptions)
          //   .then((response) => response.text())
          //   .then((result) => console.log(result))
          //   .catch((error) => console.log('error', error));

        } else {
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
        style={{ width: '80%', height: '30%', marginTop: -30 }}
      />
      <Text
        style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>
        Create a new account
      </Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.5,
          marginBottom: 20
        }}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor amet sint.
      </Text>
      <View
        style={styles.inputField}>
        <Icon name="user" color="#00716F" size={24} />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#00716F"
          value={getUsername}
          onChangeText={(text) => setUsername(text)}
          style={{ paddingHorizontal: 10 }}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          style={{ paddingHorizontal: 10 }}
          placeholder="Email"
          placeholderTextColor="#00716F"
          value={getEmail}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Text style={styles.errorTxt}>{emailError}</Text>

      <View
        style={styles.inputField}>
        <Icon name="phone" color="#00716F" size={24} />
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          placeholder="Contact"
          placeholderTextColor="#00716F"
          value={getContact}
          onChangeText={(text) => setContact(text)}
          style={{ paddingHorizontal: 10 }}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#00716F"
          style={{ paddingHorizontal: 10 }}
          value={getPassword}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={styles.signupBtn}>
        <TouchableOpacity onPress={() => addUser()}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
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
    width: '100%'
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 5,
    borderColor: '#ADADAD',
    borderRadius: 9,
    paddingVertical: 4,
    width: '80%'
  },
  signupBtn: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#457973',
    paddingVertical: 10,
    borderRadius: 13,
    width: '80%'
  },
  errorTxt: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
    marginHorizontal: 10,
  }


});
export default SignupScreen;
