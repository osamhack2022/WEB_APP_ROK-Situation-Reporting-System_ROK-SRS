import React, { useState, useCallback, useEffect, useRef } from 'react'
import { DrawerLayoutAndroid, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { Colors, List, Avatar } from 'react-native-paper'
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../config/firebase'

// 추후에 textinput 디자인 수정
// 시간 되면 modal 추가

const imgUrl =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'

export function ChatRoomScreen({ route }) {
  const navigation = useNavigation()

  const [userMe, setUserMe] = useRecoilState(userState)
  const [messages, setMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { userdata, users, chatid, name } = route.params

  console.log(name)

  useEffect(() => {
    const collectionRef = collection(db, 'chats', chatid, 'messages')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: new Date(doc.data().timestamp.toDate()),
          text: doc.data().text,
          user: {
            _id: doc.data().sender,
            name: doc.data().name,
            avatar: imgUrl,
          },
        }))
      )
    })
    return () => unsubscribe()
  }, [])

  const drawer = useRef(null)

  const toggleDrawer = () => {
    if (isOpen) {
      drawer.current.closeDrawer()
    } else {
      drawer.current.openDrawer()
      setIsOpen(true)
    }
  }

  useEffect(() =>
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer()
          }}
        >
          <Avatar.Icon
            icon="format-list-bulleted"
            size={50}
            style={{ backgroundColor: Colors.white }}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatListScreen')
          }}
        >
          <Avatar.Icon
            icon="arrow-left"
            size={50}
            style={{ backgroundColor: Colors.white }}
          />
        </TouchableOpacity>
      ),
    })
  )

  const navigationView = () => (
    <List.Section>
      {Object.entries(userdata).map(([id, user]) => (
        <List.Item
          title={user.full}
          left={() => (
            <Image
              source={{ uri: imgUrl }}
              style={{ width: 40, height: 40, borderRadius: 15 }}
            />
          )}
          key={id}
          style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey200 }}
          titleStyle={{ fontSize: 14 }}
        />
      ))}
    </List.Section>
  )

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
    updateDoc(doc(db, 'chats', chatid), {
      recentmsg: text,
      rectime: new Date(createdAt),
      // severity: doc(db, 'chats', chatid).severity, need some fix
    })
  }, [])

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: 'greenyellow' },
        right: { backgroundColor: 'skyblue' },
      }}
      textStyle={{
        left: {
          color: Colors.black,
          fontWeight: '300',
        },
      }}
      timeTextStyle={{ left: { color: Colors.black } }}
      usernameStyle={{ color: Colors.black }}
      key={props.key}
    />
  )

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={275}
      drawerPosition="right"
      renderNavigationView={navigationView}
      onDrawerClose={() => setIsOpen(false)}
    >
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
        renderAvatar={() => (
          <Image
            source={{ uri: imgUrl }}
            style={{ width: 38, height: 38, borderRadius: 15 }}
          />
        )}
      />
    </DrawerLayoutAndroid>
  )
}
