import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { AsyncStorage } from 'react-native';
import { StyleSheet, TextInput, View, YellowBox, Button,Text } from 'react-native'
import firebase from "firebase/app";
import {firebaseConfig} from '../../../../Firebase/FirebaseConfig';


// YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])



export default function Chats({route, navigation}) {
   
    const db = firebase.firestore()
const chatsRef = db.collection('chats')
const auth=firebase.auth()
// console.log(chatsRef);

    const [user, setUser] = useState({_id:auth.currentUser.uid,name:auth.currentUser.displayName})
    const [name, setName] = useState(route.params.name)
    const [messages, setMessages] = useState([])
  
   const getAllMessage = async ()=>{
    const docid=auth.currentUser.uid>route.params.uid ? auth.currentUser.uid+'-'+route.params.uid : route.params.uid+'-'+auth.currentUser.uid
    const qs= await db.collection('chat').doc(docid).collection('messages').orderBy("createdAt","desc").get()
    var m=qs.docs.map(
        docSnap=>{
            // console.log(docSnap.data().createdAt.toDate())
            return{
                ...docSnap.data(),
                createdAt:docSnap.data().createdAt.toDate()
            }
        }
    )
setMessages(m)
   }
    useEffect(() => {
        // console.log("hellooo");
     getAllMessage()
        
    }, [messages])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handleSend(message) {
        const msg=message[0];
        const mymsg={
            ...msg,
            sentBy:auth.currentUser.uid,
            sentTo:route.params.uid,
            createdAt: new Date()
        }
        const docid=auth.currentUser.uid>route.params.uid ? auth.currentUser.uid+'-'+route.params.uid : route.params.uid+'-'+auth.currentUser.uid
       await  db.collection('chat').doc(docid).collection('messages').add(
          mymsg
        ).then(
            async ()=>{
              await db.collection('chat-room').doc(auth.currentUser.uid).collection('person').add(
                  {to:route.params.uid,name:route.params.name}
              )
              await db.collection('chat-room').doc(route.params.uid).collection('person').add(
                {to:auth.currentUser.uid,name:auth.currentUser.displayName}
            )
            }
        )

        
        

        // console.log(messages)
        // const writes = messages.map((m) => chatsRef.add(m))
        // await Promise.all(writes)
    }

   
    return <GiftedChat  messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
