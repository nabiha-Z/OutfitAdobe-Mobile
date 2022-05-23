import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../../components/context';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const API_URL = 'https://outfitadobe-server.herokuapp.com';
// const API_URL = 'http://192.168.100.2:8000';

function SignupScreen({ route, navigation }) {

  const [getEmail, setEmail] = useState(null);
  const [getContact, setContact] = useState(null);
  const [getUsername, setUsername] = useState(null);
  const [getPassword, setPassword] = useState(null);
  const [getConfirmPass, setConfirmPass] = useState(null);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [users, setUsers] = useState([]);
  var count = 0;

  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    check_textInputChange: false,
    check_Contact: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidContact: true,
  });


  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    console.log("email=", val);
    var validEmailRegex = /^[a-z0-9._-]+@[a-zA-Z]+(.[a-z]{2,4})*$/;
    if (val.trim().length >= 10 && val.match(validEmailRegex)) {

      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      console.log("wrongL")
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const contactInputChange = (val) => {
    if (val.trim().length === 11) {
      setData({
        ...data,
        contact: val,
        check_Contact: true,
        isValidContact: true
      });
    } else {
      setData({
        ...data,
        contact: val,
        check_Contact: false,
        isValidContact: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const signupHandle = async () => {

    if (data.name.length == 0 || data.email.length == 0 || data.password.length == 0 || data.contact.length == 0 || data.address.length == 0) {
      Alert.alert('Wrong Input!', 'Input fields cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }

    else {
      await fetch(`${API_URL}/user/signup`, {

        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phonenumber: data.contact,
          password: data.password,
          address: data.address
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

        .then(async res => {
          try {

            const jsonRes = await res.json();
            console.log("json ", jsonRes)

            if (jsonRes.message === true) {

              console.log("signed up");
              navigation.navigate('Dashboard_user')

            } else {
              alert("User Already Exists")
              console.log("error found ", jsonRes.error)
            }

          } catch (err) {
            console.log(err);
          };
        })
        .catch(err => {
          console.log("error: ", err.message);
        });

    }
  }



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
        source={require('../../../images/draw5.png')}
        style={{ width: '80%', height: '40%', marginTop: -50 }}
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
          onChangeText={(val) => setData({
            ...data,
            name: val,
            isValidUser: true
          })}
          style={styles.textInput}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="mail" color="#00716F" size={24} />
        {/* <TextInput
          style={{ paddingHorizontal: 10 }}
          placeholder="Email"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_textInputChange ?
          <Animatable.View
            animation="bounceIn"
          >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View>
          : null}
        {data.check_textInputChange ?
          <Animatable.View
            animation="bounceIn"
          >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View>
          : null} */}
        <TextInput
          placeholder="Your email"
          placeholderTextColor="#666666"
          style={[styles.textInput]}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_textInputChange ?
          <Animatable.View
            animation="bounceIn"
          >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View>
          : null}

      </View>
      {data.isValidUser ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorTxt}>Enter a valid email.</Text>
        </Animatable.View>
      }
      <Text style={styles.errorTxt}>{emailError}</Text>

      <View
        style={[styles.inputField, { marginTop: -10 }]}>
        <Icon name="phone" color="#00716F" size={24} />
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          placeholder="Contact"
          placeholderTextColor="#00716F"
          value={getContact}
          onChangeText={(text) => contactInputChange(text)}
          style={[styles.textInput]}
        />
        {data.check_Contact ?
          <Animatable.View
            animation="bounceIn"
          >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View>
          : null}
      </View>

      {data.isValidContact ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorTxt}>Contact number must have 11 digits.</Text>
        </Animatable.View>
      }
      <View
        style={styles.inputField}>
        <Icon name="user" color="#00716F" size={24} />
        <TextInput
          placeholder="Address"
          placeholderTextColor="#00716F"
          value={getUsername}
          onChangeText={(val) => setData({
            ...data,
            address: val
          })}
          style={styles.textInput}
        />
      </View>
      <View
        style={styles.inputField}>
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#00716F"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[styles.textInput]}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}
        >
          {data.secureTextEntry ?
            <Feather
              name="eye-off"
              color="grey"
              size={20}
            />
            :
            <Feather
              name="eye"
              color="grey"
              size={20}
            />
          }
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorTxt}>Password must be 8 characters long.</Text>
        </Animatable.View>
      }



      <TouchableOpacity onPress={() => signupHandle()} style={styles.signupBtn}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Register
        </Text>
      </TouchableOpacity>

    </View >
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
    backgroundColor: '#177984',
    paddingVertical: 10,
    borderRadius: 13,
    width: '80%'
  },
  errorTxt: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },


});
export default SignupScreen;
