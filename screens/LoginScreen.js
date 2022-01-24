import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { LogBox } from 'react-native';
import _ from 'lodash';
import { firebaseConfig } from '../Firebase/FirebaseConfig';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';




function Vendor({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [users, setUsers] = useState([]);
  LogBox.ignoreLogs(['Warning:...']); // ignore specific logsFF
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("connected");
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.onAuthStateChanged(user => {

    if (user) {
      console.log("current: ", user.uid)
      
      const data = db.collection('users').where(firebase.firestore.FieldPath.documentId(), '==', user.uid).get().then(
        (a) => {
          console.log("if")
          if (a.docs.length == 1) {
            navigation.navigate("Dashboard_user")
          }
          else {
            console.log("else")
          }
        }
      )
    } else {
      navigation.navigate("LoginScreen")
    }
  })

  const authenticateUser = () => {
    if (getEmail != null && getPassword != null) {
      auth.signInWithEmailAndPassword(getEmail, getPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const uid = user.uid
          console.log("logged in user :", uid)
          const data = db.collection('users').where(firebase.firestore.FieldPath.documentId(), '==', uid).get().then(
            (a) => {
              console.log("length", a.docs.length)
              if (a.docs.length == 1) {
                console.log("if")
                //alert("if")
                setEmail("");
                setPassword("");
                //console.log("a: ",a.docs)
                navigation.navigate("Dashboard_user")
              }
              else {
                console.log("else")
                //navigation.navigate("Dashboard_user")
              }

            }
          )
            .catch((error) => {
              console.log("error found: ", error.message);
            })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("erroe= ", errorMessage);
          alert("User not found")
        });
    } else {
      alert('Fill the fields');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/draw1.png')}
        style={{ width: '90%', height: '35%' }}
      />
      <Text
        style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>
        Welcome, Log into your account.
      </Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.5,
          marginBottom: 20
        }}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </Text>
      <View
        style={styles.inputField}>
        <Icon name="mail" color="#3E3737" size={24} />
        <TextInput
          style={{ paddingHorizontal: 20 }}
          placeholder="Email"
          placeholderTextColor="#3E3737"
          value={getEmail}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="lock" color="#3E3737" size={24} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#3E3737"
          style={{ paddingHorizontal: 20 }}
          value={getPassword}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={styles.signupBtn}>
        <TouchableOpacity
          style={{
            color: 'white',
          }}
          onPress={authenticateUser}>
          <Text style={{ color: '#525251' }}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <Text
        onPress={() => navigation.navigate('SignupScreen')}
        style={{
          alignSelf: 'center',
          color: '#3E3737',
          paddingVertical: 20,
        }}>
        New User?
      </Text>
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
    borderColor: '#3E3737',
    borderRadius: 23,
    paddingVertical: 4,
    width: '70%'
  },
  signupBtn: {
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ffd933',
    paddingVertical: 10,
    borderRadius: 23,
    width: '70%'
  }

});
export default Vendor;
