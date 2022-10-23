import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Colors } from 'react-native-paper'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../config/firebase'

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
      }}
      textStyle={{
        left: {
          color: 'black',
        },
      }}
    />
  )
}

export function ChatRoomScreen() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    })

    return () => unsubscribe()
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    })
  }, [])

  return (
    <GiftedChat
      alignTop={true}
      renderBubble={renderBubble}
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      placeholder="메시지를 입력하세요."
      user={{ _id: 2, name: '김형민' }}
      textInputStyle={{
        width: '96%',
        backgroundColor: Colors.grey100,
        elevation: 4,
      }}
    />
  )
}
