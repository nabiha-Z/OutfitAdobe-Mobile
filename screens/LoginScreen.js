import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp,  } from "firebase/app";
import firebaseConfig from '../Firebase/FirebaseConfig';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";


const FIREBASE_API_ENDPOINT =
  'https://onequeue-912fa-default-rtdb.firebaseio.com/';



function Vendor({ route, navigation }) {
  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [users, setUsers] = useState([]);

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBTGehuql0lmwhW69joWIyjrlmf-0I9ReE",
  //   authDomain: "onequeue-912fa.firebaseapp.com",
  //   databaseURL: "https://onequeue-912fa-default-rtdb.firebaseio.com",
  //   projectId: "onequeue-912fa",
  //   storageBucket: "onequeue-912fa.appspot.com",
  //   messagingSenderId: "188273292512",
  //   appId: "1:188273292512:web:3f52d65ea600461edfcc85",
  //   measurementId: "G-2BNFLV95DK"
  // }

  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  const auth = getAuth(app); 

  onAuthStateChanged(auth, user => {

    if(user){
      console.log("logged in ");
      navigation.navigate("Dashboard")
    }else{
      console.log("logged out user");
      navigation.navigate("LoginScreen")
    }
    
  })


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



  const authenticateUser = () => {
    console.log("frfb");
    if (getEmail != null && getPassword != null) {
      signInWithEmailAndPassword(auth, getEmail, getPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;;
          alert("Logged in")
          navigation.navigate("Dashboard")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("erroe= ", errorMessage);
          alert("User not found")
        });
      // users.map((item, index) => {
      //   if (item.email == getEmail) {
      //     if (item.password == getPassword) {
      //       alert('Loged in');
      //       setEmail("");
      //       setPassword("");

      //     } else {
      //       alert('Incorrect Password');
      //     }
      //   } else {
      //     alert('Check your Email or Signup now.');
      //     //message.success('Check your Email or Signup now.');
      //   }
      // });
    } else {
      alert('Fill the fields');
      //message.error('Fill the fields');
    }
  };

 

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/img5.png')}
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
          <Text style={{ color: 'white' }}>Sign in</Text>
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
    backgroundColor: '#3E3737',
    paddingVertical: 10,
    borderRadius: 23,
    width: '70%'
  }

});
export default Vendor;
