import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from '../Firebase/FirebaseConfig';
import Icon from '@expo/vector-icons/AntDesign';


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


  let app;
  if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
    } 
  const auth = firebase.auth();
  const db =firebase.firestore();


  
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


          await auth.createUserWithEmailAndPassword( getEmail, getPassword)
            .then((user) => {

              db.collection("users").doc(firebase.auth().currentUser.uid)
                    .set({
                      email: firebase.auth().currentUser.email,
                      username:getUsername,
                      contact:getContact
                    }).then(
                      
                        ()=>{
                          console.log(getUsername)
                           user.user.updateProfile({
                                displayName: getUsername
                              })
                        }
                    
                    )
              navigation.navigate('LoginScreen')
            })
            .catch(error => {
              console.log("Error= ", typeof(error.message))
              const err =error.message;
              if(err[0] === "P"){
                alert(error.message)
              }else{
                alert("User already existed with this email")
              }
              
            })

           
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
