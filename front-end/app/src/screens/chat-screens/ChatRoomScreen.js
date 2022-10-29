// prettier-ignore
import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
//prettier-ignore
import { DrawerLayoutAndroid, TouchableOpacity, Image, StyleSheet, View, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { Colors, List, Avatar, IconButton } from 'react-native-paper'
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
import { convertRank } from '../../helperfunctions/convertRank'
import { convertChatType } from '../../helperfunctions/convertChatType'

const imgUrl =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

export function ChatRoomScreen({ route }) {
  const navigation = useNavigation()

  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null)

  const [userMe, setUserMe] = useRecoilState(userState)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [chatType, setChatType] = useState('regular')
  const [typeItem, setTypeItem] = useState([
    { label: '보고', value: 'report' },
    { label: '지시', value: 'order' },
    { label: '기밀', value: 'secret' },
    { label: '일반', value: 'regular' },
  ])

  const { userdata, users, chatid, name } = route.params

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats', chatid, 'messages')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: new Date(doc.data().timestamp.toDate()),
          text: `[${convertChatType(doc.data().type)}] ${doc.data().text}`,
          user: {
            _id: doc.data().sender,
            name: doc.data().name,
            avatar: imgUrl,
          },
          type: doc.data().type,
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

  useEffect(
    () =>
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
      }),
    []
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

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
    const { user, createdAt, text, type } = messages[0]
    addDoc(collection(db, 'chats', chatid, 'messages'), {
      sender: user._id,
      name: `${user.name}`,
      timestamp: new Date(createdAt),
      text,
      type,
    })
    updateDoc(doc(db, 'chats', chatid), {
      recentmsg: text,
      rectime: new Date(createdAt),
    })
    console.log(await getScore(text))
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

  const customInput = (props) => (
    <InputToolbar
      {...props}
      renderComposer={() => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <DropDownPicker
            {...props}
            placeholder="유형"
            open={open}
            value={chatType}
            items={typeItem}
            setOpen={setOpen}
            setValue={setChatType}
            setItems={setTypeItem}
            style={styles.dropDown}
            containerStyle={{ width: '15%' }}
            dropDownContainerStyle={styles.dropDown}
            placeholderStyle={styles.dropDownText}
            textStyle={styles.dropDownText}
            showArrowIcon={false}
            showTickIcon={false}
          />
          <View style={[styles.commentInput, borderColor(focus)]}>
            <TextInput
              placeholder={`메시지를 입력하세요.`}
              multiline={true}
              onChangeText={(text) => setText(text)}
              value={text}
              style={styles.input}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              ref={inputRef}
            />
            <IconButton
              icon="send-outline"
              size={25}
              color={focus ? '#008275' : Colors.grey500}
              onPress={() => {
                props.onSend([
                  { ...props.text[0], text: `${text}`, type: chatType },
                ])
              }}
            />
          </View>
        </View>
      )}
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
        renderInputToolbar={(props) => customInput(props)}
        renderAvatarOnTop={true}
        messages={messages}
        multiline={true}
        onSend={(text) => onSend(text)}
        placeholder="메시지를 입력하세요."
        user={{
          _id: userMe._id,
          name: `${convertRank(userMe.Rank)} ${userMe.Name}`,
        }}
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

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: Colors.red300,
    borderWidth: 0,
    paddingBottom: 2,
    elevation: 4,
    borderRadius: 8,
  },
  dropDownText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  commentInput: {
    width: '84%',
    marginLeft: 3,
    backgroundColor: Colors.grey100,
    elevation: 4,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderRadius: 8,
    flex: 1,
  },
  input: {
    fontSize: 15,
    flex: 1,
  },
})

const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? '#008275' : Colors.grey400,
  })
