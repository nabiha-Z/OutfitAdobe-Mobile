import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebaseConfig from '../Firebase/FirebaseConfig';
import Icon from '@expo/vector-icons/AntDesign';
import firebase from 'firebase';
import { LogBox } from 'react-native';
import _ from 'lodash';


function Vendor({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [vendors, setvendors] = useState([]);


  LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
  LogBox.ignoreAllLogs(); // ignore all logs
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {

    if (user) {
      console.log("logged in ");
      //navigation.navigate("Dashboard")
    } else {
      console.log("logged out user");
      navigation.navigate("VendorLogin")
    }

  })

  const authenticateUser = () => {
    if (getEmail != null && getPassword != null) {
      users.map((item) => {
        if (item.email == getEmail) {
          if (item.password === getPassword) {
            alert('Loged in');
            setEmail("");
            setPassword("");

          } else {
            alert('Incorrect Password');
          }
        } else {
          alert('Check your Email or Signup now.');
          //message.success('Check your Email or Signup now.');
        }
      });
    } else {
      alert('Fill the fields');
      //message.error('Fill the fields');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/img2.png')}
        style={{ width: '100%', height: '40%' }}
      />
      <Text
        style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>
        Welcome, Login into your account.
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
          <Text style={{ color: 'white' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <Text
        onPress={() => navigation.navigate('VendorSignup')}
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
    backgroundColor: '#3E3737',
    paddingVertical: 10,
    borderRadius: 23,
    width: '70%'
  }

});
export default Vendor;
