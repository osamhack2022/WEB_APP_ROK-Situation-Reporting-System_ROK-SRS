import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { Colors } from 'react-native-paper'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../config/firebase'

// 추후에 textinput 디자인 수정

export function ChatRoomScreen({ route, navigation }) {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [messages, setMessages] = useState([])

  const { userdata, users, chatid, name } = route.params
  navigation.setOptions({ title: name })

  useEffect(() => {
    const collectionRef = collection(db, 'chats', chatid, 'messages')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: new Date(doc.data().timestamp.seconds),
          text: doc.data().text,
          user: {
            _id: doc.data().sender,
            name: doc.data().name,
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          },
        }))
      )
    })

    return () => unsubscribe()
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
    const { user, createdAt, text } = messages[0]
    addDoc(collection(db, 'chats', chatid, 'messages'), {
      sender: user._id,
      name: `${user.name}`,
      timestamp: new Date(createdAt),
      text,
      type: '긴급',
    })
    updateDoc(collection(db, 'chats', chatid), {
      recentmsg: text,
      rectime: new Date(createdAt),
      severity: doc(db, 'chats', chatid).severity, // need some fix
    })
  }, [])

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{ left: { backgroundColor: Colors.amber200 } }}
      textStyle={{ left: { color: Colors.black } }}
      timeTextStyle={{ left: { color: Colors.black } }}
      usernameStyle={{ color: Colors.black }}
      key={props.key}
    />
  )

  return (
    <GiftedChat
      messagesContainerStyle={{ backgroundColor: Colors.white }}
      renderUsernameOnMessage={true}
      alignTop={true}
      isLoadingEarlier={true}
      renderBubble={renderBubble}
      renderAvatarOnTop={true}
      messages={messages}
      multiline={true}
      onSend={(text) => onSend(text)}
      placeholder="메시지를 입력하세요."
      user={{ _id: userMe._id, name: `${userMe.Rank} ${userMe.Name}` }}
    />
  )
}
